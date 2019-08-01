/*
 * @Author: qianqian.zhao
 * @Date: 2018-12-03 10:06:23
 * @LastEditors: xuwang.bao
 * @LastEditTime: 2019-01-08 12:26:19
 * @Description: 日期公共文件
 */

// 将时间戳转换为日期格式
function timestampToTime (timestamp) {
  const res = /^[0-9]+$/
  if (res.test(timestamp)) {
    const date = new Date(String(timestamp).length === 13 ? Number(timestamp) : Number(timestamp) * 1000)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const mintes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return {
      year: year,
      month: month,
      day: day,
      hours: hours,
      mintes: mintes
    }
  } else {
    return timestamp
  }
}
// 将日期转换为时间戳的格式
function timeToTimestamp (time) {
  if (!isNaN(Date.parse(time))) {
    return Date.parse(time) / 1000
  } else {
    return time
  }
}
// 获取当前日期前后的日期
function getDay (addDayCount) {
  const nowDay = new Date()
  nowDay.setDate(nowDay.getDate() + addDayCount)
  const y = nowDay.getFullYear()
  const m = (nowDay.getMonth() + 1) < 10 ? '0' + (nowDay.getMonth() + 1) : nowDay.getMonth() + 1
  const d = nowDay.getDate() < 10 ? '0' + nowDay.getDate() : nowDay.getDate()
  return y + '-' + m + '-' + d
}

export { timestampToTime, timeToTimestamp, getDay }
