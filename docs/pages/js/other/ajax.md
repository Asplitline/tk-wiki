---
title: Ajax
order: 3
---

# Ajax

## 常见方式

1. 原生 ajax
2. 基于 jQuery 的 ajax
3. fetch
4. axios

## 异步

JavaScript 的执行环境是「单线程」。

JS 引擎中负责解释和执行 JavaScript 代码的线程只有一个，也就是一次只能完成一项任务，这个任务执行完后才能执行下一个，它会「阻塞」其他任务。这个任务可称为主线程

异步模式可以一起执行**多个任务**

JS 中常见的异步调用

- 定时任何
- ajax
- 事件函数

## Ajax 封装

封装 ajax：promise + xhr

```js
function queryData(url) {
  // 创建一个Promise实例
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) return
      if (xhr.readyState == 4 && xhr.status == 200) resolve(xhr.responseText) // 处理正常的情况
      else reject('服务器错误') // 处理异常情况
    }
    xhr.open('get', url)
    xhr.send(null)
  })
}
```

ajax 调用

```js
queryData('http://localhost:3000/data')
  .then(function (data) {
    console.log(data)
    return queryData('http://localhost:3000/data1') //  链式编程 需要return
  })
  .then(function (data) {
    console.log(data)
    return queryData('http://localhost:3000/data2')
  })
  .then(function (data) {
    console.log(data)
  })
```

## fetch

特点：

1. 新的 ajax 方案
2. 不是 ajax 进一步封装，没有使用 XMLHttpRequest 对象
3. 返回 Promise 对象

### fetch 使用

`fetch(url, options).then()`

url - 请求的路径

options - 请求

- method - 请求使用的方法 (默认 get)
- body - 请求体（数据）
- headers - 请求头

```js
fetch('http://localhost:3000/fdata')
  .then(function (data) {
    return data.text() // text()方法属于fetchAPI的一部分，它返回一个Promise实例对象，用于获取后台返回的数据
  })
  .then(function (data) {
    console.log(data) //   这个then里面我们能拿到最终的数据
  })
```

### fetch 请求参数

HTTP 协议，它给我们提供了很多的方法，如 POST，GET，DELETE，UPDATE，PATCH 和 PUT

- 默认 GET 请求
- 需要在 options 对象指定对应的 method
- **post 和普通请求**，需要在 options 中 设置 请求头 headers 和 body

GET 请求

```js
// GET
// 传统URL - http://localhost:3000/books?id=123
// restful - http://localhost:3000/books/123
fetch('http://localhost:3000/books?id=123', { method: 'get' })
  .then(function (data) {
    return data.text()
  })
  .then(function (data) {
    console.log(data)
  })
```

POST 请求

```js
// POST
// 默认请求类型
fetch('http://localhost:3000/books', {
  method: 'post',
  body: 'uname=lisi&pwd=123',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
})
  .then(function (data) {
    return data.text()
  })
  .then(function (data) {
    console.log(data)
  })

// json格式类型
fetch('http://localhost:3000/books', {
  method: 'post',
  body: JSON.stringify({ uname: '张三', pwd: '456' }), //必须传字符串
  headers: { 'Content-Type': 'application/json' }
})
  .then(function (data) {
    return data.text() // 可以用data.json() - parse后的text数据
  })
  .then(function (data) {
    console.log(data)
  })
```

DELETE 请求

```js
// DELETE
fetch('http://localhost:3000/books/789', { method: 'delete' })
  .then(function (data) {
    return data.text()
  })
  .then(function (data) {
    console.log(data)
  })
```

PUT 请求

```js
// PUT
fetch('http://localhost:3000/books/123', {
  method: 'put',
  body: JSON.stringify({ uname: '张三', pwd: '789' }),
  headers: { 'Content-Type': 'application/json' }
})
```

### fetch 响应格式

**response 方法**

`data.json()` - 将获取到的数据使 json 转换对象

`data.text() `- 将获取到的数据转换成字符串

## axios

特点：

1. 基于 promise 用于浏览器和 node.js 的 http 客户端
2. 支持浏览器和 node.js
3. 支持 promise
4. **能拦截请求和响应**
5. 自动转换 JSON 数据
6. 能转换请求和响应数据

### axios 使用

get 和 delete 传递请求参数

```js
// get 请求传递参数
// 1.传统url
axios.get('http://localhost:3000/axios?id=123')
// 2.restful形式传递参数
axios.get('http://localhost:3000/axios/123')
// 3.params形式传递参数
axios.get('http://localhost:3000/axios', { params: { id: 789 } })
```

post 和 put 传递请求参数

- 通过选项传递参数
- 通过 URLSearchParams 传递参数

```js
// post
// 1.通过选项传递参数
axios.post('http://localhost:3000/axios', { uname: 'lisi', pwd: 123 })

// 2.通过 URLSearchParams传递参数
var params = new URLSearchParams()
params.append('uname', 'zhangsan')
params.append('pwd', '111')
axios.post('http://localhost:3000/axios', params)

// put - 同post
axios.put('http://localhost:3000/axios/123', { uname: 'lisi', pwd: 123 })
```

### axios 全局配置

```js
//  配置公共的请求头
axios.defaults.baseURL = 'https://api.example.com'
//  配置超时时间
axios.defaults.timeout = 2500
//  配置公共的请求头
axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
// 配置公共的 post 的 Content-Type
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
```

### axios 拦截器

请求拦截器：在请求发送前进行一些操作

```js
// 请求拦截器
axios.interceptors.request.use(
  function (config) {
    console.log(config.url)
    // 1.1  任何请求都会经过这一步
    config.headers.mytoken = 'nihao'
    // 1.2  必须return,否则配置不成功
    return config
  },
  function (err) {
    // 1.3  对请求错误做点什么
    console.log(err)
  }
)
```

响应拦截器：在接收到响应后进行一些操作

```js
// 响应拦截器
axios.interceptors.response.use(
  function (res) {
    // 2.1  在接收响应做些什么
    var data = res.data
    return data
  },
  function (err) {
    // 2.2 对响应错误做点什么
    console.log(err)
  }
)
```

## axios 实战

1. 前置：重写 localStorage

```js
const store = window.localStorage
export default class Cache {
  static set(key: string, value: any) {
    if (typeof key !== 'string') return
    store.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
  }

  static get(key: string, def?: any) {
    try {
      const result = store.getItem(key)
      if (/^(true)|(false)|(\[.*\])|({.*})$/.test(result as string) && typeof result === 'string') {
        return JSON.parse(result)
      }
      return result || def
    } catch (error) {
      console.log('error: ', error)
      return def || ''
    }
  }

  static remove(key: string) {
    try {
      store.removeItem(key)
    } catch (error) {
      console.log('error: ', error)
    }
  }

  static clear() {
    try {
      store.clear()
    } catch (error) {
      console.log('error: ', error)
    }
  }
}

```

2. axios 二次封装

```js
import axios from 'axios'
import { Cache } from '.'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 1000,
  validateStatus() {
    return true
  },
})


// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = Cache.get('token')
    if (token && config.headers) {
      config.headers['access-auth-token'] = token
    }
    return config
  },
  (error) => {
    console.log('error: ', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    if (code) {
      console.error(message)
    }
    return response.data
  },
  (error) => {
    // 错误抛到业务代码
    if (error.message.indexOf('timeout') !== -1) {
      console.error('服务器繁忙')
    }
    return Promise.reject(error)
  }
)

export default service
```

3. 暴露接口

```js
// user.js
export function logout() {
  return service.post('/api/user/logout')
}
```
