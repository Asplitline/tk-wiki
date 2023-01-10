---
title: 预渲染和数据获取
order: 2
---

# Pre-rendering and Data Fetching

## Pre-rendering

每个页面预渲染 html，取代所有页面都有 js 生成

- 更好的性能 和 seo

## Two Forms of Pre-rendering

两种预渲染方式：静态生成（推荐）、服务端渲染

静态生成：在构建阶段生成 html，请求数据后重用 html
服务端渲染：每次请求产生 html

> 静态生成，构建一次，可服务 cdn，更快

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
2. 没有额外配置的情况下，不能被 CDN 缓存

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

#
