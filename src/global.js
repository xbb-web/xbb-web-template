import Vue from 'vue'
import utils from './utils'
import '@/assets/styles/base-element.scss'
import globalComponents from '@/components/global/'

import '@/element-ui/index.js'
import * as filters from './filters' // global filterss

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 注册全局组件
globalComponents.register()
window.utils === undefined && (window.utils = utils)
