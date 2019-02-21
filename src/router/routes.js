export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      pathName: '主页'
    },
    component: resolve => require(['@/views/home'], resolve)
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      pathName: '用户登录',
      ignoreAuth: true
    },
    component: resolve => require(['@/views/login'], resolve)
  }
]
