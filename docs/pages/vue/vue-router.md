---
title : Vue Router
order : 3
---

# Vue Router

## 基础

### 安装

#### cdn 

```shell
# 最新版
https://unpkg.com/vue-router/dist/vue-router.js
# 指定版本
https://unpkg.com/vue-router@2.0.0/dist/vue-router.js
```

#### npm

```shell
npm install vue-router
```

#### vue cli

```shell
vue add router
```

### 开发版

```bash
git clone https://github.com/vuejs/vue-router.git node_modules/vue-router
cd node_modules/vue-router
npm install
npm run build
```

### 起步

组件 (`components`) 映射到路由 (`routes`)

#### HTML

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

#### JS

路由引入步骤

1. 定义组件
2. 定义路由
3. 创建router实例
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

### 动态路由匹配

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

#### 响应路由参数变化

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

#### 捕获路由 或 404 not found

匹配任意路由，通配符 `*`

```js
path: '*'  // 匹配所有路径
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

### 嵌套路由

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
        { path: 'profile',component: UserProfile},
        { path: 'posts', component: UserPosts},
        { path: '*', component: UserHome }, // 捕获子路由 /user/:id/*
        { path: '', component: UserHome }  // 设定默认子路由 /user/:id
      ]
    }
  ]
})
```

> `/`视为 根路径

### 编程式导航

#### router.push

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

> 支持promise，返回promise

```js
// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})
```

**有`path`，`params`会忽略**，也适用于 `router-link`中 `to`属性

```js
const userId = 123
router.push({ name: 'user', params: { userId }}) // -> /user/123
router.push({ path: `/user/${userId}` }) // -> /user/123
// 这里的 params 不生效
router.push({ path: '/user', params: { userId }}) // -> /user
```

#### router.replace

`router.replace(location, onComplete?, onAbort?)`

与`router.push`区别，不会向`history`添加新纪录

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

#### router.go(n)

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

### 命名路由

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

### 命名视图

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
  routes: [{
      path: '/',
      // component => components
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }]
})
```

> 命名视图也可搭配嵌套视图显示

### 重定向、别名

#### 重定向

**重定向**：用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`

```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }, // 字符串路径
    { path: '/b', redirect: { name: 'foo' }}, // 命名路由
    { path: '/c', redirect: to => {}} // 方法：返回重定向 字符串路径/路径对象
  ]
})
```

> 导航守卫应用到 **目标路由**，而非跳转路由。所以 `/a /b /c`'不会触发 `beforeEnter`

#### 别名

**别名**：用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```

**别名作用**：自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构

### 路由组件传参

组件中使用 `$route` 会使其对应路由形成**高度耦合**

通过`props`解耦

#### 布尔模式

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

>含**命名视图路由**，必须分别添加 `props` 

#### 对象模式

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

#### 函数模式

创建一个函数返回 `props`（适用路由值和静态值）

URL `/search?q=vue` 会将 `{query: 'vue'}` 作为属性传递给 `SearchUser` 组件

```js
const router = new VueRouter({
  routes: [
    {
      path: '/search',
      component: SearchUser,
      props: route => ({ query: route.query.q })
    }
  ]
})
```

> 保持 props函数为无状态，它只会在路由发生变化时起作用

## 进阶

### 导航守卫

*导航守卫*：主要用来通过*跳转或取消*的方式守卫导航

**参数或查询的改变**并**不会触发**进入/离开的**导航守卫**

#### 全局前置守卫

当导航触发时，全局前置守卫按照*创建顺序调用*。守卫是*异步解析*执行，导航在*所有守卫* `resolve` 完之前一直处于 等待中(`pending`)。

 `router.beforeEach(to,from,next)` 

- **`to: Route`**: 将进入*目标*[路由对象](https://router.vuejs.org/zh/api/#路由对象)

- **`from: Route`**: 当前导航*正要离开的路由*

- **`next: Function`**: **必须调用**该方法来 `resolve` 这个钩子

`next` 说明

**`next()`**: 进行管道中的*下一个钩子*。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。

**`next(false)`**: *中断当前的导航*。如果浏览器 URL 改变 (用户手动或者浏览器后退)， URL 地址会重置到 `from` 路由对应的地址。

**`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个*不同地址*。当前的导航被中断，然后进行一个新的导航。

**`next(error)`**^2.4.0+^: 传入 `next` 参数是 `Error` 实例，则*导航会被终止且该错误会被传递*给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册回调

#### 全局解析守卫 ^2.5.0^

`router.beforeResolve`

在*导航被确认(`confirmed`)之前*，在所有组件内守卫和异步路由组件*被解析(`resolved`)之后*，解析守卫就被调用。

####  全局后置钩子

`router.afterEach(to,from)`

>和守卫不同，钩子不会接受 *`next` 函数*也不会改变*导航本身*

####  路由独享的守卫

 `beforeEnter`

路由配置上定义

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {
      }
    }
  ]
})
```

#### 组件内的守卫

- `beforeRouteEnter`
  -  在渲染该组件的对应路由*被 `confirm` 前调用*
  - 当守卫执行前，*组件实例还没被创建*，所以不能获取组件实例 `this`
- `beforeRouteUpdate` ^2.2^
  -  在当前*路由改变*，*但该组件被复用时*调用。如`/foo/:id`，在 /foo/1 和 /foo/2 之间跳转的时候，会渲染同样的 Foo 组件。
  - 可以访问组件实例 `this`
- `beforeRouteLeave`
  -  导航*离开组件对应路由*时调用
  - 可以访问组件实例 `this`
  - 通过 `next(false)` 禁止用户离开

```js
const Foo = {
  template: `...`,
  beforeRouteEnter(to, from, next) {},
  beforeRouteUpdate(to, from, next) {},
  beforeRouteLeave(to, from, next) {}
}
```

`beforeRouteEnter`间距调用 `this`

```js
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

#### 完整的导航解析流程

1. 导航被触发。
2. 在失活的组件里调用 `beforeRouteLeave` 守卫。
3. 调用全局的 `beforeEach` 守卫。
4. 在重用的组件里调用 `beforeRouteUpdate` 守卫^2.2+^
5. 在路由配置里调用 `beforeEnter`。
6. 解析异步路由组件。
7. 在被激活的组件里调用 `beforeRouteEnter`。
8. 调用全局的 `beforeResolve` 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 `afterEach` 钩子。
11. 触发 DOM 更新。
12. 调用 `beforeRouteEnter` 守卫中传给 `next` 的回调函数，创建好的组件实例会作为回调函数的参数传入。

### 路由元信息

配置 `meta` 字段

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})
```

 `$route.matched` ：一个路由匹配到的所有路由记录

遍历 `$route.matched` 来检查路由记录中的 `meta` 字段

*路由记录*：`routes` 配置中的每个路由对象

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
  } else {
    next() // 确保一定要调用 next()
  }
})
```

### 过渡动效

```html
<transition>
  <router-view></router-view>
</transition>
```

#### 单个路由过渡

各路由组件内使用 `<transition>` 并设置不同的 name。

```js
const Foo = {
  template: `
    <transition name="slide">
      <div class="foo">...</div>
    </transition>
  `
}
```

#### 路由动态过渡

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

### 数据获取

**导航完成之后获取**：*先完成导航*，然后在接下来的组件*生命周期钩子中获取数据*。

```js
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
```

**导航完成之前获取**：*导航完成前*，在*路由进入守卫中获取数据*。

```js
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) => {
      next(vm => vm.setData(err, post))
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  beforeRouteUpdate (to, from, next) {
    this.post = null
    getPost(to.params.id, (err, post) => {
      this.setData(err, post)
      next()
    })
  },
```

### 滚动行为

当*切换到新路由*时，想要页面滚到顶部，或者是保持原先的滚动位置

> 功能只在支持 `history.pushState` 的浏览器中可用

```js
const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
```

`savedPosition` 当且仅当 `popstate` 导航 (*通过浏览器的 前进/后退 按钮触发*) 时才可用。

*`scrollBehavior `返回值*

- `{ x: number, y: number }`
- `{ selector: string, offset? : { x: number, y: number }}` (offset 只在 2.6.0+ 支持)

当`scrollBehavior`返回一个 *[falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)*，或者是一个*空对象*，那么*不会发生滚动*。

```js
scrollBehavior (to, from, savedPosition) {
  if (savedPosition) { // 保持默认行为
    return savedPosition
  } else if(to.hash){ // 滚动到瞄点
    return {
      selector: to.hash
    }   
  }else { // 滚到顶部
    return { x: 0, y: 0 }
  }
}
```

#### 异步滚动 ^2.8.0^

```js
scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
}
```

#### 平滑滚动

```js
scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash,
      behavior: 'smooth',
    }
  }
}
```

### 路由懒加载

当路由*被访问*的时候*才加载*对应组件，且会把结果缓存起来供未来重渲染。

结合 Vue 的[异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#异步组件)和 Webpack 的[代码分割功能](https://doc.webpack-china.org/guides/code-splitting-async/#require-ensure-/)，轻松实现路由组件的懒加载。

将*异步组件定义为*返回一个 `Promise` 的*工厂函数*

```js
const Foo = () =>
  Promise.resolve({
    /* 组件定义对象 */
  })
```

使用[动态 import](https://github.com/tc39/proposal-dynamic-import)语法来定义*代码分块点*

```js
import('./Foo.vue') // 返回 Promise
```

结合。可使用使用 [*命名 chunk*](https://webpack.js.org/guides/code-splitting-require/#chunkname)，将任何一个*异步模块与相同的块*名称*组合*到相同的异步块中

```js
const Foo = () => import('./Foo.vue')
// chunk 命名
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
```

### 导航故障^3.4.0^

一次失败的导航

大多数链接的预期行为是*将用户导航到一个新页面*，但也有少数情况下*用户将留在同一页面上*

- 用户*已经位于*他们正在尝试导航到的页面
- 导航守卫通过 `next(false)` *中断*这次导航
- 导航守卫*抛出了一个错误*，或者调用了 `next(new Error())`

> `router.push` 的两个可选的回调函数：`onComplete` 和 `onAbort` 来暴露导航故障

#### 检测导航故障

检查一个错误是否来自于路由器，可以使用 `isNavigationFailure` 函数

```js
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter

// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // 向用户显示一个小通知
    showToast('Login in order to access the admin panel')
  }
})
```

> 忽略第二个参数：`isNavigationFailure(failure)`，就只会检查错误是不是*导航故障*。

#### NavigationFailureType

`NavigationFailureType` 可有四种不同的类型：

- `redirected`：导航守卫中调用了 `next(newLocation)` *重定向*到其他地方。
- `aborted`：导航守卫中调用了 `next(false)` *中断*本次导航。
- `cancelled`：当前导航还*没有完成之前*又有了*一个新导航*。
- `duplicated`：导航*被阻止*，因为我们*已经在目标位置*。

#### *导航故障的属性

所有导航故障都会有 `to` 和 `from` 属性，分别用来表达这次*失败的导航*的*目标位置*和*当前位置*。

```js
// 正在尝试访问 admin 页面
router.push('/admin').catch(failure => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
```

# code snippet

**路由返回**：有记录返回上级，无记录返回根目录

```js
window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/') 
```

