---
outline: deep
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



## 为 number 类型设置初值

场景：ui库中下拉选择器，一般为number或string。string类型设置初值，使用 `''`,number类型设置初始？

解决：设置为可选number，并且不进行初始化

```ts
interface IOption {
    selected?: number
}

const defOption: IOption = {}
```

