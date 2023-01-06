---
title: JavaScript
order: 3
---

# JavaScript 实战

## 异步封装

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

## 匹配标点

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

## 筛选字符串中数组

`'1,2,3,4,[7,8,9],4,5,7,[111,22,44]'` =>` ["1", "2", "3", "4", "[7,8,9]", "4", "5", "7", "[111,22,44]"]`

```javascript
const str = '1,2,3,4,[7,8,9],4,5,7,[111,22,44,a]';
const reg = /(\[.*?\])|,/g;
const arr = str.split(reg).filter(Boolean);
console.log(arr);
```



## ？直接返回函数和闭包函数

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

## 
