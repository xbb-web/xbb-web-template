/*
 * @Author: xuwang.bao
 * @Date: 2019-01-07 17:16:53
 * @LastEditors: kai.yang
 * @LastEditTime: 2019-02-20 13:53:19
 * @Description: axios 实例配置
 */

import axios from 'axios'
import { Message } from 'element-ui' // 消息组建
import vueCookie from 'vue-cookies'
// 控制api版本前缀
const API_PREFIX = ''

// 创建axios实例
const http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.BASE_URL : '', // api的base_url
  /* baseURL: "proxy", */
  // `method` 是创建请求时使用的方法
  method: 'post', // 默认是 post
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'sign': '123'
  },
  data: {
    corpid: '1',
    userId: vueCookie.get('userId') || '1',
    platform: 'web',
    frontDev: '1'
  }
})
http.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'
// 添加请求拦截器
http.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    // if (store.getters.token) {
    //   config.headers['X-Token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
    // }

    return config // 此处切记记得将请求参数return出去
  },
  error => {
    // 对请求错误做些什么

    console.log(error) // for debug
    Promise.reject(error)
  }
)

// 添加响应拦截器
http.interceptors.response.use(
  response => {
    let { data } = response
    const { code, msg } = data
    if (code !== 1) {
      Message({ message: msg, type: 'error', duration: 5 * 1000 })
      return Promise.reject(msg)
    }
    // 对响应数据做点什么
    if (response && response.data.status === '403') {
      // router.push('/login')
    }
    // 只将response 中的 data 输出

    return data
  },
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  err => {
    // 对响应错误做点什么
    console.log('err' + err) // for debug
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break
        case 401:
          err.message = '未授权，请登录'
          break
        case 403:
          err.message = '拒绝访问'
          break
        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break
        case 408:
          err.message = '请求超时'
          break
        case 500:
          err.message = '服务器内部错误'
          break
        case 501:
          err.message = '服务未实现'
          break
        case 502:
          err.message = '网关错误'
          break
        case 503:
          err.message = '服务不可用'
          break
        case 504:
          err.message = '网关超时'
          break
        case 505:
          err.message = 'HTTP版本不受支持'
          break
        default:
      }
    }
    Message({ message: err.message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(err)
  }
)

export default function (config, mock = false) {
  let newConfig = config
  config['url'] = API_PREFIX + config['url']
  // 只对开发环境进行处理
  if (process.env.NODE_ENV === 'development') {
    // 开启mock
    if (mock) {
      newConfig = {
        ...config,
        url: '/mock' + config['url']
      }
    } else {
      newConfig = {
        ...config,
        url: '/dev' + config['url']
      }
    }
  }

  return http(newConfig)
}
