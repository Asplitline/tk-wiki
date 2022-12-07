---
title: 兼容性问题
order: 4
---

# 兼容性问题

## 微信兼容性

目前发现

1. 自定义组件不支持动态 class
2. 动态 style 只能为 string
3. 不支持作用域插槽
4. 不支持自定义 v-model
5. 不支持 $attrs 和 $listeners
6. ...

### 自定义组件不支持动态 class

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

### 动态 style 只能为 string

解决：通过正则转换

```js
const style = { color: 'red', 'font-size': '12px' }

function styleObj2StyleStr(obj) {
  return JSON.stringify(obj).replace(/"(,)"/, ';').replace(/"|{|}/g, '')
}

styleObj2StyleStr(style)
```

> todo: style 属性支持 fontSize

### 不支持作用域插槽

解决：传值到父组件 or 组件内部处理好，不支持作用域插槽

### 不支持自定义 v-model

解决：通过 .sync 修饰符代替

### 不支持 $attrs 和 $listeners

解决：通过 props 手动传值
