/*
 * @Author: kai.yang
 * @LastEditors: kai.yang
 * @Description: 打包或提交时，额外去校验的eslint
 * @Date: 2019-02-18 10:43:53
 * @LastEditTime: 2019-02-20 16:38:08
 */
// TODO：目前提交时，会整个项目运行运行eslint监测，应该只检测提交的文件 2018-12-04 14:33:29
module.exports = {
  'rules': {
    'no-debugger': 2
  }
}

