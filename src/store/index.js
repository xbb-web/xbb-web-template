/*
  vuex 相关文档链接：http://vuex.vuejs.org/zh-cn/
*/
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
Vue.use(Vuex)

const state = {
  // advanced: false,
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
