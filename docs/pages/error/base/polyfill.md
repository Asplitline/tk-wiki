---
outline: deep
title: 兼容性处理
order: 1
---

# 兼容性处理

## async 和 await 无法识别

```shell
Uncaught ReferenceError: regeneratorRuntime is not defined
```

原因：使用 ES7 async/await 报错，浏览器不能识别
解决方法：

1. 安装 babel-plugin-transform-runtime

```shell
yarn add --dev babel-plugin-transform-runtime
```

2. `.babelsrc` 添加 配置

```javascript
"plugins": [
  [
    "transform-runtime",
    {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }
  ]
]
```
