---
title: NextJs
order: 1
parentOrder: 1
---




# Pre-rendering and Data Fetching

## Pre-rendering

每个页面预渲染 html，取代所有页面都有js生成

- 更好的性能 和 seo

## Two Forms of Pre-rendering

两种预渲染方式：静态生成（推荐）、服务端渲染

静态生成：在构建阶段生成html，请求数据后重用html
服务端渲染：每次请求产生 html

> 静态生成，构建一次，可服务cdn，更快

yarn dev ，开发模式下，固定为服务端渲染。
两种渲染方式可以混合使用

频繁更新数据，用服务端渲染

## Static Generation with and without Data

`getStaticProps`：构建时运行，上下文不包含请求参数。

场景：预渲染一个在构建时获取数据的页面

### 运行时机

- 开发环境：运行在每个请求
- 生产环境：运行在构建阶段

### 注意

- 只运行在服务端，不在客户端
- 只能从含有页面的文件导出，不能从没有页面的文件导出。因为需要在显示前，拥有所需数据。

### 使用

#### 本地文件

```javascript
export default function Home(props) { ... }

export async function getStaticProps() {
  // Get external data from the file system, API, DB, etc.
  const data = ...

  // The value of the `props` key will be
  //  passed to the `Home` component
  return {
    props: ...
  }
}
```

#### 接口数据

```javascript
export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  const res = await fetch('..')
  return res.json()
}
```

> nextjs 自带 fetch，无需引入

#### 数据库查询

```javascript
import someDatabaseSDK from 'someDatabaseSDK'

const databaseClient = someDatabaseSDK.createClient(...)

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from a database
  return databaseClient.query('SELECT posts...')
}
```

## Fetching Data at Request Time

### Using getServerSideProps

`getStaticProps`:在请求时运行，上下文包含请求参数（`context`）
场景：预渲染一个在请求时获取数据的页面
首字节时间 （TTFB）比 `getStaticProps`慢。原因如下

1. 要在每次请求后计算结果。
2. 没有额外配置的情况下，不能被CDN缓存

```javascript
export async function getServerSideProps(context) {
  return {
    props: {
      // props for your component
    }
  }
}
```

### Client-side Rendering

不需要预渲染数据，使用以下策略（服务端渲染）

- 静态生成（预渲染）的页面不需要外部的数据
- 页面加载时，通过 客户端 js 填充剩余部分

### SWR

React hook，用于获取数据

```javascript
import useSWR from 'swr'

function Profile() {
  const { data, error } = useSWR('/api/user', fetch)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return <div>hello {data.name}!</div>
}
```

# Dynamic Routes

## Page Path Depends on External Data

每个页面都依赖外部数据，使用动态路由

动态路由文件格式：`pages/posts/[id].js`

### `getStaticPaths`

- 开发环境：运行在每个请求
- 生产环境：运行在构建阶段

paths 是一个 Array<Object> ，必须包含 key：id，对应 [id]

```json
 [
   {
     params: {
       id: 'ssg-ssr'
     }
   },
   {
     params: {
       id: 'pre-rendering'
     }
   }
 ]
```

```javascript
// 添加动态路由
export async function getStaticPaths () {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
// 根据路由参数获取数据
export async function getStaticProps ({ params }) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}
```

## Dynamic Routes Details

### fallback

- false ：没有被 getStaticPaths 返回的路径，显示404页面
- true
  - 页面在构建时渲染
  - 没有的路径，不会显示404。第一次访问，提供后备版本
  - 在后台，nextjs生成 静态请求路由。随后的相同路径将服务于生成的页面

### catch-all Routes

`pages/posts/[...id].js`

- /post/a
- /post/a/b
- /post/a/b/c

捕获全部路由，必须换回一个数组 array

```javascript
return [
  {
    params: {
      // Statically Generates /posts/a/b/c
      id: ['a', 'b', 'c']
    }
  }
  //...
]
```

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

访问 http://localhost:3000/api

## API Routes Details

不能从 `getStaticProps `or `getStaticPaths` 获取 API route 。应该直接写在 `getStaticProps `or `getStaticPaths`

> `getStaticProps `or `getStaticPaths`跑在服务端，不会包含浏览器js bundle，能直接在里面写数据库查询。


# other Options

1. build ：生成 .next 文件
2. start：开启 nodejs服务器，包含静态生成、服务端渲染、API Routes混合页面

```json
{
  "scripts": {
    "dev": "next",
    "build": "next build",
    "start": "next start"
  }
}
```

# TypeScript Support