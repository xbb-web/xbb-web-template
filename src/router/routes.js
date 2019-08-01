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
    component: () => import(/* webpackChunkName: "home" */ '@/views/home')
  },
  {
    path: '/login',
    name: 'login',
    meta: {
      pathName: '用户登录',
      ignoreAuth: true
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/login')
  }
]
