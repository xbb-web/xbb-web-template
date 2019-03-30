/*
 * @Author: kai.yang
 * @LastEditors: kai.yang
 * @Description: 路由跳转权限控制
 * @Date: 2019-02-19 11:28:56
 * @LastEditTime: 2019-03-30 15:32:59
 */

export default {
  // Check the login status
  checkLoginAuth (to, from, next) {
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      next()
      // 做一些权限校验，不通过跳转到登录页
      // if ($auth.checkSession()) {
      //   next()
      // } else {
      //   next({
      //     path: '/login'
      //   })
      // }
    }
  },

  // Check page permissions
  checkPageAuth (to, from, next) {
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      // check user auth here....
      next()
    }
  }
}
