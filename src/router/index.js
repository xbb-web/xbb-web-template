import Vue from 'vue'
import Router from 'vue-router'
import beforeEachHooks from './beforeEachHooks'
import routesMap from './routes.js'

Vue.use(Router)

const routerInstance = new Router({
  /*
    @desc: base,应用的基路径;如整个单页应用服务在 /app/ 下，base 就应该设为 "/app/";
    @reference: https://router.vuejs.org/zh-cn/api/options.html#base
  */
  base: '/',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routesMap
})

// 线上环境做权限校验
if (process.env.NODE_ENV === 'production') {
  Object.values(beforeEachHooks).forEach((hook) => {
    routerInstance.beforeEach(hook)
  })
}

export default routerInstance
