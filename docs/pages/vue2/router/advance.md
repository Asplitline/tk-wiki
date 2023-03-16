---
outline: deep
title: 进阶
order: 2
---

# 进阶

## 导航守卫

_导航守卫_：主要用来通过*跳转或取消*的方式守卫导航

**参数或查询的改变**并**不会触发**进入/离开的**导航守卫**

### 全局前置守卫

当导航触发时，全局前置守卫按照*创建顺序调用*。守卫是*异步解析*执行，导航在*所有守卫* `resolve` 完之前一直处于 等待中(`pending`)。

`router.beforeEach(to,from,next)`

- **`to: Route`**: 将进入*目标*[路由对象](https://router.vuejs.org/zh/api/#路由对象)

- **`from: Route`**: 当前导航*正要离开的路由*

- **`next: Function`**: **必须调用**该方法来 `resolve` 这个钩子

`next` 说明

**`next()`**: 进行管道中的*下一个钩子*。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。

**`next(false)`**: _中断当前的导航_。如果浏览器 URL 改变 (用户手动或者浏览器后退)， URL 地址会重置到 `from` 路由对应的地址。

**`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个*不同地址*。当前的导航被中断，然后进行一个新的导航。

**`next(error)`**^2.4.0+^: 传入 `next` 参数是 `Error` 实例，则*导航会被终止且该错误会被传递*给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册回调

### 全局解析守卫 ^2.5.0^

`router.beforeResolve`

在*导航被确认(`confirmed`)之前*，在所有组件内守卫和异步路由组件*被解析(`resolved`)之后*，解析守卫就被调用。

### 全局后置钩子

`router.afterEach(to,from)`

> 和守卫不同，钩子不会接受 *`next` 函数*也不会改变*导航本身*

### 路由独享的守卫

`beforeEnter`

路由配置上定义

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) => {}
    }
  ]
})
```

### 组件内的守卫

- `beforeRouteEnter`
  - 在渲染该组件的对应路由*被 `confirm` 前调用*
  - 当守卫执行前，_组件实例还没被创建_，所以不能获取组件实例 `this`
- `beforeRouteUpdate` ^2.2^
  - 在当前*路由改变*，*但该组件被复用时*调用。如`/foo/:id`，在 /foo/1 和 /foo/2 之间跳转的时候，会渲染同样的 Foo 组件。
  - 可以访问组件实例 `this`
- `beforeRouteLeave`
  - 导航*离开组件对应路由*时调用
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

### 完整的导航解析流程

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

## 路由元信息

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

_路由记录_：`routes` 配置中的每个路由对象

```js
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
  } else {
    next() // 确保一定要调用 next()
  }
})
```

## 过渡动效

```html
<transition>
  <router-view></router-view>
</transition>
```

### 单个路由过渡

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

### 路由动态过渡

```html
<!-- 使用动态的 transition name -->
<transition :name="transitionName">
  <router-view></router-view>
</transition>
```

## 数据获取

**导航完成之后获取**：_先完成导航_，然后在接下来的组件*生命周期钩子中获取数据*。

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

**导航完成之前获取**：_导航完成前_，在*路由进入守卫中获取数据*。

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

## 滚动行为

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

`savedPosition` 当且仅当 `popstate` 导航 (_通过浏览器的 前进/后退 按钮触发_) 时才可用。

_`scrollBehavior `返回值_

- `{ x: number, y: number }`
- `{ selector: string, offset? : { x: number, y: number }}` (offset 只在 2.6.0+ 支持)

当`scrollBehavior`返回一个 _[falsy](https://developer.mozilla.org/zh-CN/docs/Glossary/Falsy)_，或者是一个*空对象*，那么*不会发生滚动*。

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

### 异步滚动 ^2.8.0^

```js
scrollBehavior (to, from, savedPosition) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ x: 0, y: 0 })
    }, 500)
  })
}
```

### 平滑滚动

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

## 路由懒加载

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

结合。可使用使用 [_命名 chunk_](https://webpack.js.org/guides/code-splitting-require/#chunkname)，将任何一个*异步模块与相同的块*名称*组合*到相同的异步块中

```js
const Foo = () => import('./Foo.vue')
// chunk 命名
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
```

## 导航故障^3.4.0^

一次失败的导航

大多数链接的预期行为是*将用户导航到一个新页面*，但也有少数情况下*用户将留在同一页面上*

- 用户*已经位于*他们正在尝试导航到的页面
- 导航守卫通过 `next(false)` *中断*这次导航
- 导航守卫*抛出了一个错误*，或者调用了 `next(new Error())`

> `router.push` 的两个可选的回调函数：`onComplete` 和 `onAbort` 来暴露导航故障

### 检测导航故障

检查一个错误是否来自于路由器，可以使用 `isNavigationFailure` 函数

```js
import VueRouter from 'vue-router'
const { isNavigationFailure, NavigationFailureType } = VueRouter

// 正在尝试访问 admin 页面
router.push('/admin').catch((failure) => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    // 向用户显示一个小通知
    showToast('Login in order to access the admin panel')
  }
})
```

> 忽略第二个参数：`isNavigationFailure(failure)`，就只会检查错误是不是*导航故障*。

### NavigationFailureType

`NavigationFailureType` 可有四种不同的类型：

- `redirected`：导航守卫中调用了 `next(newLocation)` *重定向*到其他地方。
- `aborted`：导航守卫中调用了 `next(false)` *中断*本次导航。
- `cancelled`：当前导航还*没有完成之前*又有了*一个新导航*。
- `duplicated`：导航*被阻止*，因为我们*已经在目标位置*。

### \*导航故障的属性

所有导航故障都会有 `to` 和 `from` 属性，分别用来表达这次*失败的导航*的*目标位置*和*当前位置*。

```js
// 正在尝试访问 admin 页面
router.push('/admin').catch((failure) => {
  if (isNavigationFailure(failure, NavigationFailureType.redirected)) {
    failure.to.path // '/admin'
    failure.from.path // '/'
  }
})
```

#
