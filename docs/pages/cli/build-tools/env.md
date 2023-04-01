---
title: 三方库
order: 3
---

# 三方库

## cross-env

命令行中自定义 process.env 中变量（全平台兼容）

文档：https://www.npmjs.com/package/cross-env

```javascript
"scripts": {
    "start": "react-scripts start",
    "start:stage": "cross-env REACT_APP_ENV=stage react-scripts start",
    "build": "react-scripts build",
    "build:stage": "cross-env REACT_APP_ENV=stage react-app-rewired build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
}
```

## dotenv

加载 .env 文件，获取 .env 中内容

文档：https://www.npmjs.com/package/dotenv

```javascript
import dotenv from 'dotenv'

// https://github.com/motdotla/dotenv#options
dotenv.config()

// 自定义文件
// require('dotenv').config({ path: '/custom/path/to/.env' })

console.log(process.env)
```

## dotenv-cli

在命令行中指定加载的 env 文件

文档：https://www.npmjs.com/package/dotenv-cli

```json
"scripts": {
    "start": "react-app-rewired start",
    "build:dev": "dotenv -e .env.development react-app-rewired build",
    "build:prod": "dotenv -e .env.production react-app-rewired build",
    "build:test": "dotenv -e .env.test react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
},
```
