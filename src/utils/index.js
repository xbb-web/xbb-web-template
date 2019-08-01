/**
 * 这个文件主要放全局的util工具
 * 暴露在window下面，使用方法是utils.xxx
 */
import vueCookie from 'vue-cookies'

// 设置cookie
const CK = {
  // 设置key
  set: (keyName, value) => {
    return vueCookie.set(keyName, value) // this
  },
  // 获取key
  get: (keyName) => {
    return vueCookie.get(keyName) // value
  },
  // 删除key
  remove: (keyName) => {
    return vueCookie.remove(keyName) // true、false
  },
  // 是否存在key
  isKey: (keyName) => {
    return vueCookie.isKey(keyName) // true、false
  },
  // 获取所有key
  keys: () => {
    return vueCookie.keys() // array
  }
}

// 解析JSON Object，并加入异常处理
/*
  传入参数列表
    str: 要解析的字符串
    def: 如果解析失败，所返回的默认值，不填则返回一个空数组
  demo:
    json('{key: value}', {})
*/

const json = function (str, def) {
  if (typeof str === 'string') {
    try {
      return JSON.parse(str)
    } catch (e) {
      console.warn('捕获异常：', e, str)
      return def || []
    }
  }
}

// 以下是处理javascript小数精度加减乘除的四个的函数
/**
 * 必需要传的前两个参数:传入两个要计算的数字
 * 非必要传的最后一个参数:自己想要精确的位数
 */

// 计算两位数应该乘以的数，为加减乘数服务的函数
function formatNumber (num1, num2) {
  let r1, r2
  try {
    r1 = num1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = num2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  let sum = r1 + r2
  let sub = r2 - r1
  return {'max': Math.pow(10, Math.max(r1, r2)), 'sum': Math.pow(10, sum), 'sub': Math.pow(10, sub)}
}

// 加法
const plus = function (num1, num2, n) {
  let formatNum = formatNumber(num1, num2).max * 100
  let result = (num1 * formatNum + num2 * formatNum) / formatNum
  if (n) {
    return result.toFixed(n)
  }
  return result
}

// 减法
const subtract = function (num1, num2, n) {
  let formatNum = formatNumber(num1, num2).max * 100
  let result = (num1 * formatNum - num2 * formatNum) / formatNum
  if (n) {
    return result.toFixed(n)
  }
  return result
}

// 乘法
const multiply = function (num1, num2, n) {
  let sum = formatNumber(num1, num2).sum * 100
  let s1 = Number(num1.toString().replace('.', ''))
  let s2 = Number(num2.toString().replace('.', ''))
  let result = (s1 * s2) / sum
  if (n) {
    return result.toFixed(n)
  }
  return result
}

// 除法
const divide = function (num1, num2, n) {
  let sub = formatNumber(num1, num2).sub * 100
  let r1 = Number(num1.toString().replace('.', ''))
  let r2 = Number(num2.toString().replace('.', ''))
  let result = (r1 / r2) * sub
  if (n) {
    return result.toFixed(n)
  }
  return result
}

// localStorage的获取，增加，删除
const LS = {
  get (name) {
    let value = window.localStorage.getItem(name)
    if (/^\{.*\}$/.test(value) || /^\[.*\]$/.test(value)) value = JSON.parse(value)
    return value
  },
  set (name, value) {
    if (typeof value === typeof {}) value = JSON.stringify(value)
    return window.localStorage.setItem(name, value)
  },
  remove (name) {
    return window.localStorage.removeItem(name)
  }
}

// 检测是否是钉钉环境
const isDingTalk = function () {
  let flag
  let userAgent = window.navigator.userAgent
  flag = /DingTalk/i.test(userAgent)
  return flag
}

/**
 * 计算字符长度
 * @param {Sting} val input value
 * @returns {number} output value
 */
const getByteLen = function (val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\\x00-\\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

// 防抖节流
const debounce = function (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

// 深拷贝
const deepClone = function (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/* json 返回指定列 */
const getParamValues = function (name, arr) {
  const ret = []
  for (var i = 0, len = arr.length; i < len; i++) {
    ret.push(arr[i][name])
  }
  return ret
}

/* guid */
const getGuid = function () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const global = {
  CK,
  json,
  plus,
  subtract,
  divide,
  multiply,
  LS,
  isDingTalk,
  getByteLen,
  debounce,
  deepClone,
  getParamValues,
  getGuid
}

export default global
