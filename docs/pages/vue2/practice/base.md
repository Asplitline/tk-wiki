---
title: 基础
order: 1
---

# Vue2 实践

## 全局混入

1. 定义混入

```javascript
// mixin/index.js
export default {
  data () {
  }，
  methods:{
	}
}
```

2. 使用混入

```vue
<template></template>

<script>
import baseMixin from '@/mixin/index.js'
export default {
  mixins: [baseMixin]
}
</script>
```

## 自定义插件

1. 自定义插件实现

```javascript
// plugin/index.js
const myPlugin = {}

myPlugin.install = function (Vue) {}

export default myPlugin
```

2. 自定义插件使用

```javascript
// main.js
import MyPlugins from '@/plugin'
Vue.use(MyPlugins)
```

## 组件二次封装

### 概述

实现以下 5 个方面封装，以 el-input 为例

1.  $attrs - 属性
2.  $listeners - 事件
3.  $slots 和 $scopeSlot - 插槽
4.  validator 值校验
5.  暴露 子组件 方法

### 实现

MyInput.vue - 对 el-input 进行封装
App.vue - 项目根组件，调用 MyInput.vue

#### $attrs

`MyInput.vue `

```html
<template>
  <el-input v-bind="$attrs"></el-input>
</template>
<script>
  export default {
    inheritAttrs: false
  }
</script>
```

inheritAttrs：[https://cn.vuejs.org/v2/api/#inheritAttrs](https://cn.vuejs.org/v2/api/#inheritAttrs)
默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings) 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。

```html
<!-- 默认 -->
<div class="el-input el-input--suffix" clearable="">...</div>
<!-- inheritAttrs: false -->
<div class="el-input el-input--suffix">...</div>
```

`App.vue `

```html
<template>
  <div id="app">
    <MyInput clearable></MyInput>
  </div>
</template>
```

#### $listeners

`MyInput.vue`

```html
<el-input v-bind="$attrs" v-on="$listeners"></el-input>
```

注意：以下写法会 触发两次 test

```jsx
<el-input v-bind="$attrs" @clear="$emit('clear')" v-on="$listeners"></el-input>
```

`App.vue`

```html
<MyInput v-model="myData" clearable @clear="test"></MyInput>
```

#### $slots 和 $scopeSlot

$slots - 具名插槽

`MyInput.vue`

```html
<el-input v-bind="$attrs" @clear="$emit('clear')" v-on="$listeners">
  <template v-slot:[slotName] v-for="(_,slotName) in $slots">
    <slot :name="slotName"></slot>
  </template>
</el-input>
```

`App.vue`

```html
<MyInput v-model="myData" clearable @clear="test">
  <template #prepend>prepend</template>
  <template #append>append</template>
</MyInput>
```

> 其中 el-input 中不含 作用域插槽，通过自定义组件进行测试

$scopedSlots - 作用域插槽

自定义组件

- App.vue - 项目
- TplSlot.vue - 类似 el-input
- MySlot.vue - 类似 MyInput，对 TplSlot 进行封装

`TplSlot.vue`

```html
<div class="tplSlot">
  <slot name="demo" :text="'demo'"></slot>
  <slot name="prepend" :text="' scopeSlot-'"></slot>
  <slot name="append">TplSlot-append</slot>
</div>
```

`MySlot.vue`

写法 1：v-slot (v2.6+)

```html
<TplSlot>
  <slot v-slot:[slotName]="slotName" :name="slotName" v-for="(_,slotName) in $slots"> </slot>
  <template v-slot:[slotName]="slotProps" v-for="(_,slotName) in $scopedSlots">
    <slot :name="slotName" v-bind="slotProps"></slot>
  </template>
</TplSlot>
```

注意 1：此处具名插槽不能使用 template 写法（如下）
因为会和 作用域插槽 template 冲突，谁写在后面，谁生效

```html
<template v-slot:[slotName] v-for="(_,slotName) in $slots">
  <slot :name="slotName"></slot>
</template>
```

作用插槽生效

```html
<template v-slot:[slotName] v-for="(_,slotName) in $slots">
  <slot :name="slotName"></slot>
</template>

<template v-slot:[slotName]="slotProps" v-for="(_,slotName) in $scopedSlots">
  <slot :name="slotName" v-bind="slotProps"></slot>
</template>
```

具名插槽生效

```html
<template v-slot:[slotName]="slotProps" v-for="(_,slotName) in $scopedSlots">
  <slot :name="slotName" v-bind="slotProps"></slot>
</template>

<template v-slot:[slotName] v-for="(_,slotName) in $slots">
  <slot :name="slotName"></slot>
</template>
```

写法 2：slot-scope
待续。。。

## v-html 中修改样式

修改 v-html 生成的元素样式

方案 1：全局样式

方案 2：scoped 下，需进行样式穿透
