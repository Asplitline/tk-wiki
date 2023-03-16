---
outline: deep
title: 基础
order: 1
---

# 基础

## 安装

### cdn

```shell
# 最新版
https://unpkg.com/vue-router/dist/vue-router.js
# 指定版本
https://unpkg.com/vue-router@2.0.0/dist/vue-router.js
```

### npm

```shell
npm install vue-router
```

### vue cli

```shell
vue add router
```

## 开发版

```bash
git clone https://github.com/vuejs/vue-router.git node_modules/vue-router
cd node_modules/vue-router
npm install
npm run build
```

## 起步

组件 (`components`) 映射到路由 (`routes`)

### HTML

- `router-link` 匹配成功，自动设置 class 属性值 `.router-link-active`
- `<router-link>` 默认会被渲染成一个 `<a>` 标签

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>

<div id="app">
  <p>
    <!-- 通过传入 `to` 属性指定链接. -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口：路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```

### JS

路由引入步骤

1. 定义组件
2. 定义路由
3. 创建 router 实例
4. 创建根实例，注入路由，挂载根实例

```js
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
// 1. 定义 (路由) 组件。也可从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. 定义路由：每个路由应该映射一个组件。
// 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或是一个组件配置对象。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes
})

// 4. 创建和挂载根实例。通过 router 配置参数注入路由，让整个应用都有路由功能
const app = new Vue({
  router
}).$mount('#app')
```

`$router`：访问路由器

`$route`：访问当前路由

## 动态路由匹配

`:`标记*路径参数*。匹配路径时，通过 `this.$route.params`获取值

```js
const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}
```

| 模式                          | 匹配路径            | $route.params                          |
| ----------------------------- | ------------------- | -------------------------------------- |
| /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
| /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

### 响应路由参数变化

动态路由切换，**组件实例会复用**，**不会触发钩子函数**

> exp：`/user/lisi` 切换到 `/user/zhangsan`

动态路由 可选 `path: '/user/:id?'`

通过以下方法响应 路由参数变化

`watch`监听

```js
const User = {
  template: '...',
  watch: {
    $route(to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

`beforeRouteUpdate` 钩子函数

```js
const User = {
  template: '...',
  beforeRouteUpdate(to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

### 捕获路由 或 404 not found

匹配任意路由，通配符 `*`

```js
path: '*' // 匹配所有路径
path: '/user-*' // 匹配 user- 开头路由
```

使用通配符，`$route.params` 内会自动添加一个名为 `pathMatch` 参数。

```js
//  { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
//  { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

> 路由定义越早，优先级越高。通配符路由应放最后

## 嵌套路由

通过 `children` + `router-view`实现嵌套路由

```js
const User = {
  template: `
    <div class="user">
      <h2>User {{ $route.params.id }}</h2>
      <router-view></router-view>
    </div>
  `
}
```

`/user/:id/profile` 匹配，渲染`UserProfile`，`/user/:id/posts` 匹配，渲染`UserPosts`

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: User,
      children: [
        { path: 'profile', component: UserProfile },
        { path: 'posts', component: UserPosts },
        { path: '*', component: UserHome }, // 捕获子路由 /user/:id/*
        { path: '', component: UserHome } // 设定默认子路由 /user/:id
      ]
    }
  ]
})
```

> `/`视为 根路径

## 编程式导航

### router.push

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

`router.push(location, onComplete?, onAbort?)`

- `location` - 路径
- `onComplete` - 完成

  - 所有异步钩子被解析之后

- `onAbort` - 终止
  - 导航到相同的路由
  - 导航完成之前导航到另一个不同的路由

> 支持 promise，返回 promise

```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' } })
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' } })
```

**有`path`，`params`会忽略**，也适用于 `router-link`中 `to`属性

```js
const userId = 123
router.push({ name: 'user', params: { userId } }) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId } }) // -> /user
```

### router.replace

`router.replace(location, onComplete?, onAbort?)`

与`router.push`区别，不会向`history`添加新纪录

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

### router.go(n)

在`history`记录中，退`n`步

```js
// 前进一步，等同 history.forward()
router.go(1)

// 后退一步，等同 history.back()
router.go(-1)

// 前进 3 步
router.go(3)

// history 记录不够用，失败
router.go(-100)
router.go(100)
```

## 命名路由

通过一个名称来标识一个路由

```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})
```

## 命名视图

展示多个**同级视图**

默认 `name` 为 `default`

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```

同个路由，多个视图就需要多个组件。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      // component => components
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

> 命名视图也可搭配嵌套视图显示

## 重定向、别名

### 重定向

**重定向**：用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }, // 字符串路径
    { path: '/b', redirect: { name: 'foo' } }, // 命名路由
    { path: '/c', redirect: (to) => {} } // 方法：返回重定向 字符串路径/路径对象
  ]
})
```

> 导航守卫应用到 **目标路由**，而非跳转路由。所以 `/a /b /c`'不会触发 `beforeEnter`

### 别名

**别名**：用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`

```js
const router = new VueRouter({
  routes: [{ path: '/a', component: A, alias: '/b' }]
})
```

**别名作用**：自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构

## 路由组件传参

组件中使用 `$route` 会使其对应路由形成**高度耦合**

通过`props`解耦

### 布尔模式

`props` 被设置为 `true`，`route.params` 将会被设置为组件属性（适用路由值）

```js
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true },
    {
      path: '/user/:id',
      components: { default: User, sidebar: Sidebar },
      props: { default: true, sidebar: false }
    }
  ]
})
```

> 含**命名视图路由**，必须分别添加 `props`

### 对象模式

`props` 是一个对象，会被按原样设置为组件属性。（适用静态值）

```js
const router = new VueRouter({
  routes: [
    {
      path: '/promotion/from-newsletter',
      component: Promotion,
      props: { newsletterPopup: false }
    }
  ]
})
```

### 函数模式

创建一个函数返回 `props`（适用路由值和静态值）

URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 `SearchUser` 组件

```js
const router = new VueRouter({
  routes: [
    {
      path: '/search',
      component: SearchUser,
      props: (route) => ({ query: route.query.q })
    }
  ]
})
```

> 保持 props 函数为无状态，它只会在路由发生变化时起作用

##
