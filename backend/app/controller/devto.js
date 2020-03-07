'use strict'

let superagent = require('superagent');
superagent = require('superagent-proxy')(superagent);
const Controller  = require('egg').Controller;
const cheerio = require('cheerio');

class DevtoController extends Controller {
  constructor(props) {
    super(props)
    this.reqHeader = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
       'Host': 'dev.to',
    }
    this.pageUrl = 'https://dev.to/t/javascript'
    this.todayType = '/'
    this.weekType = '/top/week'
  }

  async index() { 
    const data1 = await this.getHtmlContent(this.todayType)
    const data2 = await this.getHtmlContent(this.weekType)
  }

  /**
   * @description: 获取页面节点对象
   * @param {String} 请求的范围（周，日） 
   * @return: {Array} 收集的数据
   */
  async getHtmlContent(type) {
    const { pageUrl, reqHeader } = this;
    const res = await superagent.get(`${pageUrl}${type}`).set(reqHeader);
    const $ = cheerio.load(res.text);
    return this.parseHtml($)
  }

  /**
   * @description: 解析html的内容，收集数据
   * @param {Object} cheerio对象 
   * @return: {Array} 收集的数据
   */
  parseHtml($) {
    const rows = $('#substories .single-article')
    let records = []
    rows.map((idx, itemEl) => {
      const title = $(itemEl).find('.index-article-link h3').text();
      const el = $(itemEl).find('h4 a')
      const username = el.text()
      const originalCreatedAt = el.find('time').text()
      const origin = 'dev.to'
      const createdAt = new Date()
      const originalUrl = `https://dev.to${$(itemEl).find('.index-article-link').attr('href')}`

      records.push({
        username,
        originalCreatedAt,
        title,
        origin,
        originalUrl,
        createdAt,
      })
    })
    return records;
  }
}

module.exports = DevtoController;