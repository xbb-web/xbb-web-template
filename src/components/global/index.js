/*
 * @Author: kai.yang
 * @LastEditors: kai.yang
 * @Description: 提供注册全局组件入口，默认放入到当前目录的vue文件都会被注册为全局组件
 * @Date: 2019-02-20 10:55:12
 * @LastEditTime: 2019-02-20 15:34:24
 */
import Vue from 'vue'
const files = require.context('.', true, /\.vue$/)

export default {
  register () {
    files.keys().forEach((key) => {
      const component = files(key).default
      Vue.component(component.name || key.replace(/(^\.\/|\.vue$)/g, ''), component)
    })
  }
}
