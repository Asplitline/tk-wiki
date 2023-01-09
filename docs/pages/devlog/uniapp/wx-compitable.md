---
title: 微信小程序兼容性
order: 3
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
