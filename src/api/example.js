/*
 * @Author: kai.yang
 * @LastEditors: kai.yang
 * @Description: API管理
 * @Date: 2019-02-19 14:45:28
 * @LastEditTime: 2019-02-20 13:54:04
 */

import request from '@/api/axios'
// 应用列表
export function getAppList (data) {
  return request({
    url: '/app/list',
    // method: 'post', 默认为post，可忽略不写
    data
  })
}
// 新建应用
export function addApp (data) {
  return request({
    url: '/app/add',
    method: 'get',
    data
  })
}
