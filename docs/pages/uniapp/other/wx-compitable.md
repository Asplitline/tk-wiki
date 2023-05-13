---
title: 微信小程序兼容性
order: 4
---

# 微信小程序兼容性

## 自定义组件不支持动态 class

解决：新增 props className 来接收 class

```vue
<template>
  <view :class="className">
    <slot></slot>
  </view>
</template>

<script>
export default {
  props: {
    className: String
  }
}
</script>
```

## 动态 style 只能为 string

问题：微信小程序不支持 style 对象

解决：通过正则转换

```js
const style = { color: 'red', 'font-size': '12px' }

function styleObj2StyleStr(obj) {
  return JSON.stringify(obj).replace(/"(,)"/, ';').replace(/"|{|}/g, '')
}

styleObj2StyleStr(style)
```

> todo: style 属性支持 fontSize

## 不支持作用域插槽

解决：传值到父组件 or 组件内部处理好，不支持作用域插槽

## 不支持自定义 v-model

解决：通过 .sync 修饰符代替

## 不支持 $attrs 和 $listeners

解决：通过 props 手动传值

## 样式穿透问题

在 `App` 和 `H5`中通过 `v-deep` 或 `/deep/` 进行样式穿透

```html
<template>
  <item></item>
</template>

<style scoped>
  ::v-deep .item {
    border: 1px solid blue;
  }
</style>
```

但是在微信小程序无效。要求`::v-deep`或`/deep/`前面必须还要有父元素的类名存在

```html
<template>
  <view class="wrap">
    <item></item>
  </view>
</template>

<style scoped>
  .wrap ::v-deep .item {
    border: 1px solid blue;
  }
</style>
```

> 参考：https://www.uviewui.com/components/feature.html

## 自定义组件 dom 解构问题

问题：微信小程序自定义组件外面会多一层解构，影响 flex 布局

解决：设置 virtualHost 为 true

```js
options: {
  // 微信小程序中 options 选项
  multipleSlots: true, //  在组件定义时的选项中启动多slot支持，默认启用
    // styleIsolation: '​apply-shared​',
    // styleIsolation: "isolated", //  启动样式隔离。当使用页面自定义组件，希望父组件影响子组件样式时可能需要配置。具体配置选项参见：微信小程序自定义组件的样式
    addGlobalClass: true, //  表示页面样式将影响到自定义组件，但自定义组件中指定的样式不会影响页面。这个选项等价于设置 styleIsolation: apply-shared
    virtualHost: true, //  将自定义节点设置成虚拟的，更加接近Vue组件的表现。我们不希望自定义组件的这个节点本身可以设置样式、响应 flex 布局等，而是希望自定义组件内部的第一层节点能够响应 flex 布局或者样式由自定义组件本身完全决定
}
```

参考：https://uniapp.dcloud.net.cn/tutorial/vue-api.html#%E5%85%B6%E4%BB%96%E9%85%8D%E7%BD%AE

## scroll-view 横向滚动问题

问题：小程序使用 scroll-view 横向滑动时，flex 布局失效问题

解决：里面多加一层

```html
<scroll-view scroll-x="true">
  <view class="flex">
    <view v-for="item in 4"> {{item}} </view>
  </view>
</scroll-view>
```

参考：[小程序使用 scroll-view 横向滑动时，flex 布局失效问题](https://www.cnblogs.com/dongzhi1111/p/11884000.html)

## text 下 slot 失效

解决：text 改为 view
