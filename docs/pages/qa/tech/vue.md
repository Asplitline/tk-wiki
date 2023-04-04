---
title: vue
order: 4
---

# Vue

## 常规

### 组件间通讯

### 介绍 render 函数，描述虚拟 dom 到真实 dom 的过程

### .sync 和 v-model 区别

### diff 算法

### vue 中如何做 seo 优化

## 对比

### hash 路由和 history 路由区别

<details><summary>答案</summary>

hash 路由: https://example.com/#/user/id

机制：使用哈希字符（#）进行路由切换，实际 URL 并未发送到服务器，不需要在服务器层做处理

history 路由: https://example.com/user/id

问题：应用是一个单页的客户端应用，如果没有适当的服务器配置，用户在浏览器中直接访问 https://example.com/user/id，就会得到一个 404 错误。

解决：如果 URL 不匹配任何静态资源，它应提供与你的应用程序中的 index.html 相同的页面

```
location / {
  try_files $uri $uri/ /index.html;
}
```

</details>

### vue2 和 vue3 区别

### vue 和 React 区别

### composition api 和 option api 区别

### vuex 和 pinia 区别

### react diff 和 vue diff 区别
