---
title: JavaScript - 三方库
order: 4
---

# JavaScript 三方库

## axios

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

补充：

axios 在 ts 中