'use strict'

let superagent = require('superagent');
superagent = require('superagent-proxy')(superagent);
const Controller  = require('egg').Controller;
const cheerio = require('cheerio');

class SegmentfaultController extends Controller {
  constructor(props) {
    super(props)
    this.reqHeader = { // 请求头
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.122 Safari/537.36',
       'Host': 'segmentfault.com',
    }
    this.pageUrl = 'https://segmentfault.com/channel/frontend'; // 请求url
  }

  async index() { 
    const data = await this.getHtmlContent(this.todayType)
  }

  /**
   * @description: 获取页面节点对象
   * @param {String} 请求的范围（周，日） 
   * @return: {Array} 收集的数据
   */
  async getHtmlContent(type) {
    const { pageUrl, reqHeader } = this;
    const res = await superagent.get(pageUrl).set(reqHeader);
    const $ = cheerio.load(res.text);
    return this.parseHtml($)
  }

  /**
   * @description: 解析html的内容，收集数据
   * @param {Object} cheerio对象 
   * @return: {Array} 收集的数据
   */
  parseHtml($) {
    const rows = $('.news-list .news-item')
    let records = []
    rows.map((idx, itemEl) => {
      const originalUrl = $(itemEl).find('.news__item-info a').attr('href');
      const title = $(itemEl).find('.news__item-title').text()
      const origin = 'segmentfault'
      const createdAt = new Date()
      const desc = $(itemEl).find('.article-excerpt').text()
      records.push({
        title,
        origin,
        originalUrl: `https://segmentfault.com${originalUrl}`,
        createdAt,
        desc
      })
    })
    return records;
  }
}

module.exports = SegmentfaultController;