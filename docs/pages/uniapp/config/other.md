---
title: 其他配置
order: 3
---

# 其他配置

## vue.config.js

`vue.config.js` 是一个可选的配置文件，**项目根目录**中存在这个文件，会被自动加载

> **仅 vue 页面生效**

## uni.scss

`uni.scss`是一个特殊文件，**无需 `import` 即可在`scss`代码中使用**

> `pages.json`不支持`scss`，原生导航栏和 tabbar 的动态修改只能使用 js api

## App.vue

`App.vue`是 uni-app 的主组件，所有页面都是在`App.vue`下进行切换

> `App.vue`本身不是页面，不能编写视图元素

**文件作用**

- 调用*应用生命周期函数*
- 配置*全局样式*
- 配置*全局存储`globalData`*

应用生命周期仅可在`App.vue`中监听，在**页面监听无效**

**globalData**

全局变量机制，全端通用。

```vue
<script>
export default {
  globalData: {
    text: 'text'
  }
}
</script>
```

**`js`方式**： `getApp().globalData.text = 'test'`

在应用 onLaunch 时，`getApp`对象还未获取，暂时可以使用`this.$scope.globalData`获取`globalData`。

`globalData`数据绑定到页面上，可在页面`onShow`进行变量重赋值

由于**weex 生命周期不支持 onShow**

- 可利用监听 webview 的`addEventListener` `show`事件实现`onShow`效果
- 或直接使用 weex 生命周期中`beforeCreate`

`globalData`是简单的全局变量

**全局样式**

同时有`vue`和`nvue`文件，全局样式的所有 css 会应用于所有文件，而 nvue 支持的 css 有限，编译器会在控制台报警，提示某些 css 无法在 nvue 中支持

需把 nvue 不支持的 css**写在单独的条件编译**

```css
<style>
    /* #ifndef APP-PLUS-NVUE */
    @import './common/uni.css';
    /* #endif*/
</style>
```

#
