'use strict';

let superagent = require('superagent');
superagent = require('superagent-proxy')(superagent);
const Controller = require('egg').Controller;

class JuejinController extends Controller {
  constructor(props) {
    super(props)

    this.reqHeader = { // 请求头
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
       'Host': 'web-api.juejin.im',
       'Origin': 'https://juejin.im',
       'X-Agent': 'Juejin/Web',
       'Referer': 'https://juejin.im/welcome/frontend?sort=popular'
    }

    // 请求的参数
    this.requestParams = {
      NEWEST: { // 最新
        first: 10,
        order: 'NEWEST'
      },
      THREE_DAYS_HOTTEST: { // 热榜
        first: 5,
        order: 'THREE_DAYS_HOTTEST'
      },
      POPULAR: { // 热门
        first: 5,
        order: 'POPULAR'
      }
    }
  }
   
  async index() {
    const { ctx } = this;
    const data1 = await this.getData(this.requestParams.NEWEST);
    const data2 = await this.getData(this.requestParams.THREE_DAYS_HOTTEST);
    const data3 = await this.getData(this.requestParams.POPULAR);
  }

  // 获取数据
  async getData(payload) {
    try {
      const url = 'https://web-api.juejin.im/query'
      const res = await superagent.post(url).send({ 
        variables: {
          ...payload
        },
        extensions: { 
          query: {
            id: '653b587c5c7c8a00ddf67fc66f989d42' 
          }
        }
      }).set(this.reqHeader);
      const { data } = JSON.parse(res.text);
      const { articleFeed: { items: { edges = [] }}} = data;
      const list = edges.map(i => {
        const { originalUrl, title, createdAt, user: { username }} = i.node
        return {
          originalUrl,
          title,
          originalCreatedAt: createdAt,
          username,
          origin: '掘金',
          createdAt: new Date()
        }
      })
      return list;
    } catch (err) {
      console.log('err', err)
    }
  }
}

module.exports = JuejinController;
