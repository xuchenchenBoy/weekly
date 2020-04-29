/*
 * @Author: your name
 * @Date: 2020-03-08 20:29:54
 * @LastEditTime: 2020-03-08 20:29:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /weekly/article/docs/.vuepress/config.js
 */

module.exports = {
  title: '技术周刊',
  description: '前端技术周刊',
  themeConfig: {
    nav: [
      { text: '2020年', link: '/2020/第17周' },
    ],
    sidebar: {
      '/2020/': [
        '第17周',
        '第16周'
      ]
    }
  },
  search: false,
  smoothScroll: true
}