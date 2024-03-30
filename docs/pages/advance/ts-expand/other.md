---
title: TS 其他应用
order: 5
---

# TS 其他应用

## TS 与 Axios

```js
// axios.d.ts

import axios from 'axios'

declare module 'axios' {
  export interface AxiosInstance {
    (config: AxiosRequestConfig): AxiosPromise
    (url: string, config?: AxiosRequestConfig): AxiosPromise
    defaults: AxiosRequestConfig
    interceptors: {
      request: AxiosInterceptorManager<AxiosRequestConfig>
      response: AxiosInterceptorManager<AxiosResponse>
    }
    request<T = any, R = AxiosResponse<T>>(config: AxiosRequestConfig): Promise<R>
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
    head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>
    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
    patch<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>
  }
}

```

参考：https://docs.shanyuhai.top/frontend/typescript/change-axios-response-type.html

## nodemon Unknown file extension ".ts"

1- Add "type": "module" to package.json

2- Install ts-node npm i -g ts-node

3- Go to tsconfig.json and add the following:

```json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "Node"
    /* ... your props ... */
  },
  "ts-node": {
    "esm": true
  }
}
```

参考：https://stackoverflow.com/a/71389363/19747672

## number 值赋空

场景：下拉选项中 value 为 string 或 number。

- value 是 string 类型，赋值 `''`。

- value 是 number 类型，赋值为 0，会影响初始值显示，赋值为 null，后面无法赋值 number，因为已被解析为 null 类型。

解决：赋值为可选类型

```tsx
interface option {
  optionId?: number
}
```

## 可选和函数默认值冲突

问题：可选符和默认值同时存在产生冲突

```tsx
useTable(
  options?: TableOptions = {}
) => {}
// error: Parameter cannot have question mark and initializer.ts(1015)
```

解决：去掉可选符

```
useTable(
  options: TableOptions = {}
) => {}
```
