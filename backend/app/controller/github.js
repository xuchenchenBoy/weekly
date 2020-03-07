'use strict'

let superagent = require('superagent');
superagent = require('superagent-proxy')(superagent);
const Controller  = require('egg').Controller;
const cheerio = require('cheerio');

class GithubController extends Controller {
  constructor(props) {
    super(props)
    this.reqHeader = { // 请求头
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
       'Host': 'github.com',
    }
    this.pageUrl = 'https://github.com/trending/javascript?since='; // 请求url
    this.todayType = 'daily' // 日常参数 
    this.weekType = 'weekly' // 周参数
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
    const rows = $('.explore-pjax-container .Box-row')
    let records = []
    rows.map((idx, itemEl) => {
      const originalUrl = $(itemEl).find('h1 a').attr('href');
      const title = originalUrl.slice(1)
      const origin = 'github'
      const createdAt = new Date()
      const desc = $(itemEl).children('p').text()
      records.push({
        title,
        origin,
        originalUrl: `https://github.com${originalUrl}`,
        createdAt,
        desc
      })
    })
    return records;
  }
}

module.exports = GithubController;