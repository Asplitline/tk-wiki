---
title: JavaScript
order: 3
---

# JavaScript 实战

## getType

作用：获取元素类型

```js
function getType(source) {
  return Object.prototype.toString.call(source).slice(8, -1).toLowerCase()
}
```

## deepClone - pending

作用：深拷贝

pending...

## isEmpty

作用：判断值是否为空

```js
function isEmpty(value: any) {
  const type = Object.prototype.toString.call(value).slice(8, -1).toLowerCase()
  if (type === 'string' || type === 'array') {
    return value.length === 0
  } else if (type === 'object') {
    return Object.keys(value).length === 0
  } else if (type === 'number') {
    return value === 0
  } else {
    return !value
  }
}
```

```js
;[0, '', undefined, null, [], {}, false, 'false'].map(isEmpty)
// [true, true, true, true, true, true, true, false]
```

## omit

作用：将对象中部分值剔除

```js
/**
 *
 * @param {Object} obj
 * @param {String | Array} omitKey
 * @returns {Object}
 * @example
 */

function omit(obj, omitKey) {
  const allKeys = Object.keys(obj)
  if (Array.isArray(omitKey)) {
    const rest = {}
    allKeys.forEach((key) => {
      if (!omitKey.includes(key)) {
        rest[key] = obj[key]
      }
    })
    return rest
  } else {
    const { [omitKey]: omitValue, ...rest } = obj
    return rest
  }
}
```

```js
const obj = { a: 1, b: 2, c: 3, d: 4 }
const omitObj1 = omit(obj, 'a') // { b: 2, c: 3 }
const omitObj2 = omit(obj, ['a', 'c']) // { b: 2 }
const omitObj3 = omit(obj, 'd') // { a: 1, b: 2, c: 3 }
```

## pick

作用：选出对象部分值，重新组合成对象

```js
/**
 * @param {Object} obj
 * @param {String | Array} pickKey
 * @returns {Object}
 */

function pick(obj, pickKey) {
  const allKeys = Object.keys(obj)
  if (Array.isArray(pickKey)) {
    const rest = {}
    pickKey.forEach((key) => {
      if (allKeys.includes(key)) {
        rest[key] = obj[key]
      }
    })
    return rest
  } else {
    if (!allKeys.includes(pickKey)) return {}
    return {
      [pickKey]: obj[pickKey]
    }
  }
}
```

```js
const obj = { a: 1, b: 2, c: 3 }
const pickObj1 = pick(obj, 'a') // { a: 1 }
const pickObj2 = pick(obj, ['a', 'c']) // { a: 1, c: 3 }
```

## uniqueArr

作用：数组去重

```js
/**
 * @name uniqueArr
 * @param {Array} arr
 * @returns
 */
function uniqueArr(arr = []) {
  return [...new Set(arr)]
}
```

```js
uniqueArr([1, 2, 3, 1, 2])
// [1,2,3]
```

## kebab2Camel

作用：短横线转小驼峰

```js
function kebab2Camel(str) {
  /**
   * $ - 匹配值
   * $1 - 第一个捕获值
   */
  return str.replace(/-([a-z])/g, ($, $1) => {
    return $1.toUpperCase()
  })
}
```

```js
kebab2Camel('card-item')
// cardItem
```

## kebab2Pascal

作用：短横线转大驼峰

```js
function kebab2Pascal(str) {
  const Camel = str.replace(/-([a-z])/g, ($, $1) => {
    return $1.toUpperCase()
  })
  return Camel ? Camel[0].toUpperCase() + Camel.slice(1) : ''
}
```

```js
kebab2Pascal('card-item')
// CardItem
```

## obj2FormData

作用：对象转 formData

```js
function obj2FormData(obj) {
  const formData = new FormData()
  for (const key in obj) {
    formData.append(key, obj[key])
  }
  return formData
}
```

## obj2Params

作用：对象转 params

```js
/**
 * @name obj2Params
 * @param {Object} obj
 * @returns {String}
 */
function obj2Params(obj) {
  if (typeof obj !== 'object' || obj === null) return obj
  const res = []
  Object.entries(obj).forEach(([key, value]) => {
    res.push(`${key}=${value}`)
  })
  return res.join('&')
}
```

```js
obj2Params({ a: 2, c: '3', d: 'abc', e: '' })
// 'a=2&c=3&d=abc&e='
```

## dateFormat

作用：日期格式化

```js
function dateFormat(t, format = 'YYYY-MM-DD HH:mm:ss') {
  let date = t ? new Date(t) : new Date(),
    Y = date.getFullYear() + '',
    M = date.getMonth() + 1,
    D = date.getDate(),
    H = date.getHours(),
    m = date.getMinutes(),
    s = date.getSeconds()
  if (date.toString() === 'Invalid Date') return '-/-'
  return format
    .replace(/YYYY|yyyy/g, Y)
    .replace(/YY|yy/g, Y.substr(2, 2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD|dd/g, (D < 10 ? '0' : '') + D)
    .replace(/HH|hh/g, (H < 10 ? '0' : '') + H)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}
```

```js
dateFormat(1672761086317)
// '2023-01-03 23:51:26'
```

## timeAgo

作用：时间转消息

```js
/**
 * @name timeAgo
 * @param date
 * @returns
 */
function timeAgo(date) {
  const val = new Date(date).getTime()
  const now = Date.now()
  const diff = now - val
  if (diff < 0) return '未知'
  const fl = Math.floor
  const base = {
    second: 1000,
    min: 60 * 1000,
    hour: 60 * 60 * 1000,
    day: 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000,
    year: 12 * 30 * 24 * 60 * 60 * 1000
  }
  const end = {}
  Object.keys(base).forEach((key) => {
    end[key] = fl(diff / base[key])
  })
  if (end.year > 0) {
    return `${end.year}年前`
  } else if (end.month > 0) {
    return `${end.month}月前`
  } else if (end.day) {
    return `${end.day}天前`
  } else if (end.hour) {
    return `${end.hour}小时前`
  } else if (end.min) {
    return `${end.min}分钟前`
  } else if (end.second) {
    return `${end.second}秒前`
  } else {
    return '刚刚'
  }
}
```

```js
timeAgo()[
  // 刚刚
  (1672761496444, 1672760496444, 1672701496444, 1672061496444, 1670761496444, 1660761496444, 1602761496444)
].map(timeAgo)
// ['2分钟前', '19分钟前', '16小时前', '8天前', '23天前', '4月前', '2年前']
```

## formatTime

作用：秒数转换天时分秒

```js
function formatTime(v, isMs = false) {
  const unit = isMs ? 1000 : 1
  const base = {
    second: unit,
    min: 60 * unit,
    hour: 60 * 60 * unit,
    day: 24 * 60 * 60 * unit
  }
  const fl = Math.floor
  const s = fl((v % base.min) / base.second)
  const m = fl((v % base.hour) / base.min)
  const h = fl((v % base.day) / base.hour)
  const d = fl(v / base.day)
  console.log(s, m, h, d)
  let str = ''
  d && (str += d + '天')
  h && (str += h + '小时')
  m && (str += m + '分')
  s && (str += s + '秒')
  return str
}
```

```js
;[1000, 2000, 5000, 6000, 10000, 100000]
  .map((v) => formatTime(v))
  [
    // ['16分40秒', '33分20秒', '1小时23分20秒', '1小时40分', '2小时46分40秒', '1天3小时46分40秒']
    (1000, 2000, 5000, 6000, 10000, 100000)
  ].map((v) => formatTime(v, true))
// ['1秒', '2秒', '5秒', '6秒', '10秒', '1分40秒']
```

## thousandsNumber

作用：数字转千分位

```js
function thousandsNumber(num) {
  return (num || 0).toLocaleString()
}
```

```js
;[1, 11, 111, 1111, 11111, 111111].map(thousands)
// ['1', '11', '111', '1,111', '11,111', '111,111']
```

## hashId

作用：随机生成 hash 串

```js
function hashId(length = 32) {
  return Array.from({ length }, () => Math.floor(Math.random() * 36).toString(36)).join('')
}
```

```js
;[1, 3, 5, 7, 20, 36].map(hashId)
// ['a', 'yp5', '5czvz', 'plled1n', '68rrks04yewxb93upncj', 'azhbqbdf7rff69ehcbb4ny92mcmf6unx1g08']
```

## getCharLength

作用：获取字符串长度

> 汉字占两个，英文字符占一个

```js
function getCharLength(value) {
  let cnReg = /([\u4e00-\u9fa5]|[\u3000-\u303F]|[\uFF00-\uFF60])/g
  let mat = value.match(cnReg)
  if (mat) {
    return mat.length * 2 + (value.length - mat.length)
  } else {
    return value.length
  }
}
```

```js
;['n', '哈', '哈n'].map(getCharLength)
// [1, 2, 3]
```

## 其他

### 异步封装

query 是一个 promise 对象。可以搭配 promise.all 实现异步函数循环

```javascript
function handlePromise(promise) {
  return new Promise((resolve, reject) => {
    promise.then((res) => resolve(res)).catch((err) => reject(err))
  })
}
```

```js
let arr = []
api.forEach((v)=>{
  const promise = ajax(...)
  arr.push(promise)
})

const res = Promise.all(arr)
```

### ？直接返回函数和闭包函数

直接返回函数和闭包函数的区别

```js
let cl = {
  add: function (a, b) {
    console.log(a, b)
    return a + b + 2
  }
}
function test1() {
  const { add } = cl
  return add
}
function test2() {
  const { add } = cl
  return function (query) {
    return add(query)
  }
}
const add1 = test1
const add2 = test2
console.log(add1()(1, 2))
// 1 2
// 5
console.log(add2()(1, 2))
// 1 undefined
// NaN
```

### 匹配标点

```javascript
// 匹配标点 - 存在兼容性问题
/p{P}/u
/[\u0021|\u0022|\u0027|\u002C|\u002E|\u003A|\u003B|\u003F|\u0060|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]+/u
```

```shell
\u0021  => !
\u0022  => "
\u0027  => '
\u002C  => ,
\u002E  => .
\u003A  => :
\u003B  => ;
\u003F  => ?
\u0060  => `
\u3002 => 。
\uff1f => ？
\uff01 => ！
\uff0c => ，
\u3001 => 、
\uff1b => ；
\uff1a => ：
\u201c => “
\u201d => ”
\u2018 => ‘
\u2019 => '
\uff08 => （
\uff09 => ）
\u300a => 《
\u300b => 》
\u3008 => 〈
\u3009 => 〉
\u3010 => 【
\u3011 => 】
\u300e => 『
\u300f => 』
\u300c => 「
\u300d => 」
\ufe43 => ﹃
\ufe44 => ﹄
\u3014 => 〔
\u3015 => 〕
\u2026 => …
\u2014 => —
\uff5e => ～
\ufe4f => ﹏
\uffe5 => ￥
```

[https://unicode-table.com/en/blocks/basic-latin/](https://unicode-table.com/en/blocks/basic-latin/)
