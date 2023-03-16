---
outline: deep
title: 路由API
order: 4
---

# API Routes

## Creating API Routes

在 `pages/api` 中创建一个函数，格式如下

req：

- 请求数据
- [http.IncomingMessage](https://nodejs.org/api/http.html#http_class_http_incomingmessage)实例
- 添加中间件等

res：

- 响应数据
- [http.ServerResponse](https://nodejs.org/api/http.html#http_class_http_serverresponse)实例
- 帮助函数

```javascript
// req = request data, res = response data
export default (req, res) => {
  // ...
  res.status(200).json({ text: 'Hello' })
}
```

访问 `http://localhost:3000/api`

## API Routes Details

不能从 `getStaticProps `or `getStaticPaths` 获取 API route 。应该直接写在 `getStaticProps `or `getStaticPaths`

> `getStaticProps `or `getStaticPaths`跑在服务端，不会包含浏览器 js bundle，能直接在里面写数据库查询。
