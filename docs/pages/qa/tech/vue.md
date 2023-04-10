---
title: vue
order: 4
---

# Vue

## 高频

### 01-组件间通讯方式

思路

1. 总述知道的所有方式

2. 按组件关系阐述使用场景

<details><summary>答案</summary>
</details>

### 03-Vue 生命周期及每个阶段做的事

思路

1. 给出概念
2. 列举生命周期各阶段
3. 阐述整体流程
4. 结合实践
5. 扩展：vue3变化

### 04-双向绑定使用和原理

思路

1. 给出双绑定义
2. 双绑带来的好处
3. 在哪使用双绑
4. 使用方式、使用细节、vue3变化
5. 原理实现描述

### 08-vue响应式的理解

### 09-虚拟DOM的理解？

### 10-diff算法

### 11-vue3新特性

### 14-key作用

### 15-nextTick使用和原理？

### 17-Vue 子组件和父组件创建和挂载顺序

### 18-怎么缓存当前的组件？缓存后怎么更新？

### 22-从 template 到 render 处理过程

### 23-Vue实例挂载的过程中发生了什么?

### 24-Vue 3的设计目标是什么？做了哪些优化?

### 25-你了解哪些Vue性能优化方法？

### 26-Vue组件为什么只能有一个根元素?

### 35-什么是递归组件？举个例子说明下？

### 36-异步组件是什么？使用场景有哪些？

### 40-使用vue渲染大量数据时应该怎么优化？说下你的思路！

### 44-Vue3.0 性能提升体现在哪些方面？

### 45-Vue3.0里为什么要用 Proxy 替代 defineProperty ？

### 49-你觉得vuex有什么缺点？

### 介绍 render 函数，描述虚拟 dom 到真实 dom 的过程

### vue 中如何做 seo 优化

## 对比

### 02-v-if和v-for哪个优先级更高？

思路

1. 先给出结论
2. 为什么是这样的，说出细节
3. 哪些场景可能导致我们这样做，该怎么处理
4. 总结，拔高

### 16-watch和computed的区别以及选择?

### 29-ref和reactive异同

### 30-watch和watchEffect异同

### 31-SPA、SSR的区别是什么

### 39-vuex中actions和mutations有什么区别？

### 46-History模式和Hash模式有何区别？

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

### vue2 和 vue3 区别

### vue 和 React 区别

### composition api 和 option api 区别

### vuex 和 pinia 区别

### react diff 和 vue diff 区别



## 低频

### 05-Vue中如何扩展一个组件

思路：

1. 按照逻辑扩展和内容扩展

- 逻辑扩展有：mixins、extends、composition api；
- 内容扩展有slots；

2. 分别说使用方法、场景差异和问题。

3. 作为扩展，还可以说说vue3中新引入的composition api带来的变化

### 06-子组件能否直接改变父组件的数据？

### 07-Vue权限管理

### 12-怎么定义动态路由？怎么获取传过来的动态参数？

### 13-如果让你从零开始写一个vue路由？

### 19-构架一个vue项目流程

### 20-实际工作中，总结的vue最佳实践有哪些？

### 21-简单说一说你对vuex理解？

### 27-使用过vuex的module吗？

### 28-怎么实现路由懒加载呢？

### 32-vue-loader是什么？它有什么作用？

### 33-你写过自定义指令吗？使用场景有哪些？

### 34-说下$attrs和$listeners的使用场景

### 34-v-once的使用场景有哪些？

### 37-你是怎么处理vue项目中的错误的？

### 38-如果让你从零开始写一个vuex，说说你的思路

### 41-怎么监听vuex数据的变化？

### 42-router-link和router-view是如何起作用的？

### 43-Vue-router 除了 router-link 怎么实现跳转

### 47-在什么场景下会用到嵌套路由？

### 48-页面刷新后vuex的state数据丢失怎么解决？

### 51-vue-router中如何保护路由？





## 参考链接

https://juejin.cn/post/7097067108663558151

https://juejin.cn/post/7115055320913117220
