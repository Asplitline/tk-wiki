---
title: Vite
order: 2
---

# Vite Config - Base

## __dirname 替代方案

方案一：__dirname 在 ES module 中不存在，使用 import.meta.url 代替

```js
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
const rootDir = dirname(fileURLToPath(import.meta.url))
```

方案二：安装 @types/node (待验证)

```js
yarn add --dev @types/node
```



## 判断当前环境

在 vite.config.js 中，会将相关信息传到默认导出函数中。

```js
// vite.config.js
// payload => { mode: 'development', command: 'serve', ssrBuild: false }
export default (payload) => {
	return defineConfig()
}
```

非 vite.config.js 的其他位置，通过 import.meta.env 对象获取

```js
import.meta.env.mode
```



## 生产环境去除 console

```js
 {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          // 生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  }
```

## 配置解析别名

1. 在 vite 配置 别名

```javascript
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

2. 在 ts 配置文件中添加路径（自动补全，别名跳转）

```javascript
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## 配置proxy

参考：https://cn.vitejs.dev/config/server-options.html#server-proxy

```js
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8090/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

