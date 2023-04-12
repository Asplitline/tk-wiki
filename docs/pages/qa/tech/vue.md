---
title: vue
order: 5
---

# Vue

## 高频

### 01-组件间通讯方式

思路

1. 总述知道的所有方式

2. 按组件关系阐述使用场景

<details><summary>答案</summary>
组件间通讯分类

- 父子组件
- 兄弟组件
- 祖孙组件
- 非关系组件

常见通讯方式

1. props 传递 - 父子
2. $emits 触发 - 子父
3. ref - 父子
4. eventBus - 兄弟
5. $parent 和 $root - 兄弟
6. $attrs 与 $listeners - 祖先传给子孙
7. provide 和 inject - 祖先传给子孙
8. vuex - 任意组件传值

> $parent 和 $root:通过共同 $parent 或 $root

</details>

### 03-Vue 生命周期及每个阶段做的事

思路

1. 给出概念
2. 列举生命周期各阶段
3. 阐述整体流程
4. 结合实践
5. 扩展：vue3 变化

<details><summary>答案</summary>


1. 每个 Vue 组件实例被创建后都会经过一系列初始化步骤，比如，数据观测，模板编译，挂载实例到 dom 上，以及数据变化时更新 dom。这个过程会运行叫做生命周期钩子的函数，以便开发者在特定的阶段做特定的事情。
2. 生命周期总共可以分为 8 个阶段：**创建前后, 载入前后, 更新前后, 销毁前后**。

3. 具体描述

| 生命周期 v2   | 生命周期 v3         | 描述                                                                             |
| ------------- | ------------------- | -------------------------------------------------------------------------------- |
| beforeCreate  | -                   | 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。 |
| created       | -                   | 实例创建完成后被立即调用。                                                       |
| beforeMount   | -                   | 挂载开始之前被调用，相关的 render 函数首次被调用。                               |
| mounted       | -                   | 挂载完成后被调用，这时组件已经被挂载到了 DOM 上。                                |
| beforeUpdate  | -                   | 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。                            |
| updated       | -                   | 数据更新之后调用，发生在虚拟 DOM 重新渲染和打补丁之后。                          |
| beforeDestroy | **beforeUnmount**   | 组件实例销毁之前                                                                 |
| destroyed     | **unmounted**       | 组件实例销毁之后                                                                 |
| activated     | -                   | keep-alive 缓存的组件激活时                                                      |
| deactivated   | -                   | keep-alive 缓存的组件停用时调用                                                  |
| errorCaptured | -                   | 捕获一个来自子孙组件的错误时被调用                                               |
| -             | **renderTracked**   | 调试钩子，响应式依赖被收集时调用                                                 |
| -             | **renderTriggered** | 调试钩子，响应式依赖被触发时调用                                                 |
| -             | **serverPrefetch**  | ssr only，组件实例在服务器上被渲染前调用                                         |

vue3 差异详解：

1. `beforeDestroy -> beforeUnmount` , `Destoryed -> Unmounted`
2. 新增了三个用于调试和服务端渲染场景 （`renderTracked、renderTriggered、serverPrefetch`）
3. composition 下新增 setup 函数在 `beforeCreate` 和 `created` 之前执行。`setupStatefulComponent`进行 setup 函数调用，之后在 `finishComponentSetup` 中 `applyOptions`中进行 `beforeCreate` 和 `created` 钩子函数调用

相关代码：

[setupStatefulComponent](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/componentOptions.ts)

[applyOptions](https://github1s.com/vuejs/core/blob/HEAD/packages/runtime-core/src/componentOptions.ts#L610)

</details>

### 04-能说一说双向绑定使用和原理吗？

思路

1. 给出双绑定义
2. 双绑带来的好处
3. 在哪使用双绑
4. 使用方式、使用细节、vue3 变化
5. 原理实现描述

<details><summary>答案</summary>
</details>

### 08-vue 响应式的理解

### 09-虚拟 DOM 的理解？

### 10-diff 算法

### 11-vue3 新特性

### 14-key 作用

### 15-nextTick 使用和原理？

### 17-Vue 子组件和父组件创建和挂载顺序

### 18-怎么缓存当前的组件？缓存后怎么更新？

### 22-从 template 到 render 处理过程

### 23-Vue 实例挂载的过程中发生了什么?

### 24-Vue 3 的设计目标是什么？做了哪些优化?

### 25-你了解哪些 Vue 性能优化方法？

### 26-Vue 组件为什么只能有一个根元素?

### 35-什么是递归组件？举个例子说明下？

### 36-异步组件是什么？使用场景有哪些？

### 40-使用 vue 渲染大量数据时应该怎么优化？说下你的思路！

### 44-Vue3.0 性能提升体现在哪些方面？

### 45-Vue3.0 里为什么要用 Proxy 替代 defineProperty ？

### 49-你觉得 vuex 有什么缺点？

### 介绍 render 函数，描述虚拟 dom 到真实 dom 的过程

### vue 中如何做 seo 优化

### 单页应用和多页应用的区别

## 对比

### 02-v-if 和 v-for 哪个优先级更高？

思路

1. 先给出结论
2. 为什么是这样的，说出细节
3. 哪些场景可能导致我们这样做，该怎么处理
4. 总结，拔高

### 16-watch 和 computed 的区别以及选择?

### 29-ref 和 reactive 异同

### 30-watch 和 watchEffect 异同

### 31-SPA、SSR 的区别是什么

### 39-vuex 中 actions 和 mutations 有什么区别？

### 46-History 模式和 Hash 模式有何区别？

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

### 50-Composition API 与 Options API 有什么不同

### .sync 和 v-model 区别

### Vue 和 React 区别

### composition api 和 option api 区别

### vuex 和 pinia 区别

### react diff 和 vue diff 区别

## 低频

### 05-Vue 中如何扩展一个组件

思路：

1. 按照逻辑扩展和内容扩展

- 逻辑扩展有：mixins、extends、composition api；
- 内容扩展有 slots；

2. 分别说使用方法、场景差异和问题。

3. 作为扩展，还可以说说 vue3 中新引入的 composition api 带来的变化

### 06-子组件能否直接改变父组件的数据？

### 07-Vue 权限管理

### 12-怎么定义动态路由？怎么获取传过来的动态参数？

### 13-如果让你从零开始写一个 vue 路由？

### 19-构架一个 vue 项目流程

### 20-实际工作中，总结的 vue 最佳实践有哪些？

### 21-简单说一说你对 vuex 理解？

### 27-使用过 vuex 的 module 吗？

### 28-怎么实现路由懒加载呢？

### 32-vue-loader 是什么？它有什么作用？

### 33-你写过自定义指令吗？使用场景有哪些？

### 34-说下$attrs和$listeners 的使用场景

### 34-v-once 的使用场景有哪些？

### 37-你是怎么处理 vue 项目中的错误的？

### 38-如果让你从零开始写一个 vuex，说说你的思路

### 41-怎么监听 vuex 数据的变化？

### 42-router-link 和 router-view 是如何起作用的？

### 43-Vue-router 除了 router-link 怎么实现跳转

### 47-在什么场景下会用到嵌套路由？

### 48-页面刷新后 vuex 的 state 数据丢失怎么解决？

### 51-vue-router 中如何保护路由？

## 实战篇

### 实现 el-table

## 收集篇

uni-app 怎么实现一套代码可以生成多端小程序的包参考链接

nextTick 除了解决异步导致页面显示错误的问题，还有什么用？

小程序和 uniapp 的渲染机制

小程序的架构有什么优点

前端和原生 native 的通信是怎么实现的

### 参考链接

https://juejin.cn/post/7097067108663558151

https://juejin.cn/post/7115055320913117220
