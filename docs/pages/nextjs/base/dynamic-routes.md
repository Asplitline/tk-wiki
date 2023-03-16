---
outline: deep
title: 动态路由
order: 3
---

# Dynamic Routes

## Page Path Depends on External Data

每个页面都依赖外部数据，使用动态路由

动态路由文件格式：`pages/posts/[id].js`

### getStaticPaths

- 开发环境：运行在每个请求
- 生产环境：运行在构建阶段

paths 是一个 `Array<Object>` ，必须包含 key：id，对应 [id]

```json
[
  {
    "params": {
      "id": "ssg-ssr"
    }
  },
  {
    "params": {
      "id": "pre-rendering"
    }
  }
]
```

```javascript
// 添加动态路由
export async function getStaticPaths() {
  // Return a list of possible value for id
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
// 根据路由参数获取数据
export async function getStaticProps({ params }) {
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

- false ：没有被 getStaticPaths 返回的路径，显示 404 页面
- true
  - 页面在构建时渲染
  - 没有的路径，不会显示 404。第一次访问，提供后备版本
  - 在后台，nextjs 生成 静态请求路由。随后的相同路径将服务于生成的页面

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
