---
title: 深入了解组件
order: 2
---

# 深入了解组件

## 组件注册

有两种命名规范，kebab-case（短横线） 和 PascalCase（大驼峰）

```js
// kebab-case - 引用时必须使用 kebab-case
Vue.component('my-component-name',{ /* ... */ })
// PascalCase - 引用时 kebab-case 和 PascalCase 都可以
Vue.component('MyComponentName', { /* ... */ }
```

命名规则：遵循 [[1] W3C 规范](#相关链接)的自定义组件名（字母全小写且包含一个连字符）,避免和当前以及未来的 HTML 元素相冲突

### 全局注册

全局注册：注册后可以在任何新创建的 Vue 根实例 (`new Vue`) 的模板中使用

```js
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

### 局部注册

局部注册：组件需手动引入才能使用

```js
var ComponentA = {
  /* ... */
}
var ComponentB = {
  components: {
    'component-a': ComponentA
  }
  // ...
}
```

### 模块系统

#### 模块系统中局部注册

```js
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```

#### 自动化全局注册

```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

// components/BaseIcon.vue
const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

// ['./BaseIcon.vue']

requireComponent.keys().forEach((fileName) => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      // ./BaseIcon.vue => BaseIcon.vue => BaseIcon
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

## Prop

### prop 大小写

html 大小写不敏感，字符串模板不存在限制。

驼峰法（camelCase ）和短横线（kebab-case）会自动转换

```js
Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<!-- 在 HTML 中是 kebab-case -->
<blog-post post-title="hello!"></blog-post>
```

### prop 类型

字符串数组形式列出 prop

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

对象形式列出 prop，可以指定类型

```js
props: {
  title: String,
  // ...
  contactsPromise: Promise // or any other constructor
}
```

### 传递静态或动态 Prop

#### 传入字符串

```html
<blog-post title="My journey with Vue"></blog-post>
```

用 `v-bind`传入动态 prop

```html
<!-- 动态赋予一个变量的值 -->
<blog-post v-bind:title="post.title"></blog-post>

<!-- 动态赋予一个复杂表达式的值 -->
<blog-post v-bind:title="post.title + ' by ' + post.author.name"></blog-post>
```

#### 传入数字

```html
<!-- 即便 `42` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:likes="42"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:likes="post.likes"></blog-post>
```

#### 传入一个布尔值

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

#### 传入一个数组

```html
<blog-post v-bind:comment-ids="[234, 266, 273]"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:comment-ids="post.commentIds"></blog-post>
```

#### 传入一个对象

```html
<blog-post
  v-bind:author="{
    name: 'Veronica',
    company: 'Veridian Dynamics'
  }"
></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:author="post.author"></blog-post>
```

#### 传入对象所有 property

使用**不带参数**的`v-bind`

```html
<blog-post v-bind="post"></blog-post>
<!-- 
v-bind:id 
v-bind:title 
-->
```

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

### 单项数据流

父级 prop 的更新会向下流动到子组件中，但是反过来则不行。防止子组件意外改变父组件，导致数据流难以处理

问题：子组件不应该在组件中改变 prop，应该由父组件刷新。

解决：用以下方式代替。

1. data 定义本地值，并将 prop 设为初始值

```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

2. 为 prop 定义计算属性

```js
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

> **对象和数组**是通过引用传入的，子组件中改变这个对象或数组本身**将会影响到父组件**的状态

### prop 验证

定义 prop 验证方式

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

**prop 会在组件实例创建之前进行验证**，所以实例 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的

#### 类型检验

**type**包含以下类型

`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`、自定义构造函数

自定义构造函数

```js
function Person(firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

```js
Vue.component('blog-post', {
  props: {
    author: Person
  }
})
```

### 非 prop 的 Attribute

非 prop 的 attribute：向组件传入 prop 属性，但是组件未进行接受

#### 组件上`Attribute`自动添加到根元素

```html
<base-input test="123"></base-input>
```

BaseInput.vue

```html
<div test="123">
  <input type="text" value="请输入..." />
  <div></div>
</div>
```

解决 1 - 添加.prop 修饰符

```html
<base-input :test.prop="123"></base-input>
```

解决 2 - 子组件通过 props 接收数据

```js
props: ['test']
```

解决 3 - 子组件添加 inheritAttrs

```js
inheritAttrs: false
```

#### 替换/合并已有的`Attribute`

```html
<bootstrap-date-input data-date-picker="activated" class="date-picker-theme-dark"></bootstrap-date-input>
```

#### 禁用 Attribute 继承

禁用 Attribute **根元素**继承，可手动决定 attribute 赋值

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
```

> inheritAttrs 不影响*class*，_style_

```html
<base-input label="Username:" v-model="username" required placeholder="Enter your username"></base-input>
```

## 自定义事件

### 事件名

不同于组件和 prop，事件名忽略大小写。但是需要完全匹配，没有自动转换。

推荐**短横线**(`kebab-case`)，因为 myEvent 换自动转换 myevent，导致 myEvent 无法被监听。

### 自定义 v-model

> 2.2.0+

`v-model = @input + value` - 默认

#### model 选项

手动设置`prop`和`event`下

```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean // 必须声明
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

```html
<base-checkbox v-model="lovingVue"></base-checkbox>
<!-- lovingVue传入checked，并且change事件触发更新-->
```

> 仍然需要在 props 里面声明

### 原生事件绑定到组件

#### native 修饰符

场景：自定义组件只能监听自定义事件，原生事件无法直接触发。

解决：通过 native 修饰符

```html
<base-input v-on:focus.native="onFocus"></base-input>
```

```html
<label>
  {{ label }}
  <input v-bind="$attrs" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
</label>
```

**`.native` 失效场景**

场景：input 外包裹了一层 label，native 无法生效

解决：使用 `$listenters`

> `$listenters` 里面包含组件上所有监听器

```html
<label>
  {{ label }}
  <input v-bind="$attrs" v-bind:value="value" v-on:input="$emit('input', $event.target.value)" />
</label>
```

重写 input 中处理函数

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    // 将组件所有监听器 添加到label下input中
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign(
        {},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

### .sync 修饰符

> 2.3.0+

推荐以 `update:myPropName`方式变更父组件，实现对`prop`的双向绑定。

```html
<text-document v-bind:title="doc.title" v-on:update:title="doc.title = $event"></text-document>
<!-- 等效写法 -->
<text-document v-bind:title.sync="doc.title"></text-document>
```

`text-document.vue`

```js
this.$emit('update:title', newTitle)
```

设置多个 prop，直接配合`v-bind`和`sync`。这样会把 `doc` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器

```html
<text-document v-bind.sync="doc"></text-document>
<!-- {a:1,b:2} -->
```

```js
props: ['a', 'b'],
methods: {
    // key - 'a' | 'b'
	changeVal(key) {
		this.$emit('update:' + key, this[key] + 1)
	}
}
```

`.sync`和`v-bind`不能使用表达式

```html
<!-- 不合法 -->
<div v-bind:title.sync="doc.title + '!'"></div>
```

## 插槽

### 插槽内容

组件内没有插槽`<slot>`，**标签之间的元素会忽略**

```html
<!-- navigation-link.vue -->
<a v-bind:href="url" class="nav-link">
  <slot></slot>
</a>
```

### 编译作用域

插槽不能访问`<navigation-link>`作用域

原因：插槽是传递父组件内容到子组件，但作用域还在父组件。所以插槽中不能访问子组件数据。

```html
<navigation-link url="/profile">
  Clicking here will send you to: {{ url }}
  <!-- `url` 会是 undefined-->
</navigation-link>
```

**父模板**所有内容都是在父级作用域中编译，**子模板**所有内容都是在子作用域中编译

### 后备（默认）内容

默认显示后备内容 (content)，提供内容，只会取代后备内容

```html
<slot>content</slot>
```

### 具名插槽

`<slot>` ： name attribute，定义额外插槽。不带 name，name 默认为 default，即默认插槽

```html
<!-- base-layout.vue --->
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <!-- name="default" -->
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

通过`template` + `v-slot:name`向 模板中填充内容 2.6.0+

```html
<base-layout>
  <template v-slot:header>
    <h1>Here might be a page title</h1>
  </template>
  <!-- 未被v-slot包裹视为默认插槽,v-slot:default -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <template v-slot:footer>
    <p>Here's some contact info</p>
  </template>
</base-layout>
```

注意： `v-slot` 只能添加在 `<template>` 上

旧版写法：vue 3.0 废弃

```html
<base-layout>
  <h1 slot="header">Here might be a page title</h1>
  <!-- 未被v-slot包裹视为默认插槽,v-slot:default -->
  <p>A paragraph for the main content.</p>
  <p>And another one.</p>

  <p slot="footer">Here's some contact info</p>
</base-layout>
```

### 作用域插槽

使插槽能**访问子组件数据**。

父级组件：通过`v-slot:default`获取值

```html
<current-user>
  <template v-slot:default="slotProps"> {{ slotProps.user.firstName }} </template>
</current-user>
```

子级组件：通过`v-bind`绑定值

```html
<span>
  <slot v-bind:user="user"> {{ user.lastName }} </slot>
</span>
```

**父级组件只有默认插槽**，`v-slot`可以**放到组件**上，正常情况 `v-slot` 都是放在 `template` 上

```html
<!-- default 可以省略-->
<current-user v-slot:default="slotProps"> {{ slotProps.user.firstName }} </current-user>
```

**默认插槽缩写和具名插槽不能混用**，会导致作用域不明确

```html
<!-- 无效，会导致警告 -->
<current-user v-slot="slotProps">
  {{ slotProps.user.firstName }}
  <template v-slot:other="otherSlotProps"> slotProps is NOT available here </template>
</current-user>
```

多个插槽，为**所有插槽**写**完整语法**

```html
<current-user>
  <template v-slot:default="slotProps"> {{ slotProps.user.firstName }} </template>
  <template v-slot:other="otherSlotProps"> ... </template>
</current-user>
```

作用域插槽原理：将你的插槽内容包裹在一个拥有单个参数的函数里。**支持解构和默认值**

```html
<current-user v-slot="{ user }" />
<current-user v-slot="{ user: person }" />
<current-user v-slot="{ user = { firstName: 'Guest' } }" />
```

旧版写法：vue 3.0 废弃

```html
<slot-example>
  <!-- slot 为 default，可以省略 -->
  <template slot="default" slot-scope="slotProps"> {{ slotProps.msg }} </template>
</slot-example>
```

### 动态插槽名

> 2.6.0+

`v-slot:[dynamicSlotName]`

```html
<base-layout>
  <template v-slot:[dynamicSlotName]> ... </template>
</base-layout>
```

### 具名插槽缩写

缩写:`v-slot:header` 可以被重写为 `#header`

**注意**：

无效写法：`#="{user}"`， 缩写需要明确插槽名称

有效写法：`#default="{user}"`

## 动态组件 & 异步组件

通过 `is` attribute 切换动态组件，每次切换时都会**新建组件实例**

```html
<component v-bind:is="currentTabComponent"></component>
```

### keep-alive

通过`keep-alive`包裹，缓存不活动组件（缓存组件），避免重新渲染。

`keep-alive` 自身不会渲染 DOM，是抽象组件

```html
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

组件切换时，触发 `activated` 和 `deactivated` 这两个生命周期钩子函数。

> 2.2.0+ , 这两个钩子函数会在**树内所有嵌套组件**中触发

#### 条件

- 要求被切换到的组件都有自己的名字，不论是通过组件的 `name` 选项还是局部/全局注册。

- **要求`keep-alive`同时只有一个子元素被渲染**

#### props

`include` 和 `exclude` prop 允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示

`include ` 2.1.0+ ： 名称匹配的组件被缓存

`exclude ` 2.1.0+ ： 名称匹配的组件都**不会**被缓存

参数说明

`string | RegExp | Array`

匹配规则

1. 匹配组件自身 `name`
2. name 不可用，匹配局部注册名称（父组件 `components` 选项的键值）

注意：匿名组件不能匹配

```html
<!-- 逗号分隔字符串 -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>

<!-- 正则表达式 (使用 `v-bind`) -->
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>

<!-- 数组 (使用 `v-bind`) -->
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

`max` 2.5.0+：最多可缓存组件实例数量。

参数说明

`number`：数量上限。数量达到上限，清除**最久**没有访问的实例

```html
<keep-alive :max="10">
  <component :is="view"></component>
</keep-alive>
```

> `<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。

### 异步组件

Vue 允许工厂函数方式定义组件，这个工厂函数会异步解析你定义的组件

特点：

1. 组件渲染时触发

2. 缓存渲染结果

#### 全局组件

require 写法：加载完成会执行 resolve，并将加载结果传入

```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```

import：加载完成返回 promise 对象

```js
Vue.component(
  'async-webpack-example',
  // 这个动态导入会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

#### 局部组件

```js
new Vue({
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

#### 处理加载状态

> 2.3.0+

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

## 处理边界情况

### 访问元素&组件

根实例：通过 `$root` property 进行访问

父级组件实例：`$parent` property 可以用来从一个子组件访问父组件的实例

访问子组件或子元素：除了 prop 和事件，还可以通过 `ref` 这个 attribute 为子组件赋予一个 ID 引用

```html
<base-input ref="usernameInput"></base-input>
```

```js
this.$refs.usernameInput
```

当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。

> `$ref` 只在组件渲染完成之后生效，并且**不是响应式**，避免在模板或计算属性中使用

ref 补充

1. 普通元素中：$refs 获取的是 dom 元素
2. 组件中：$refs 获取的是组件实例，通过 \$el 获取组件元素

exampleRefCmp.vue

```html
<div class="child-cmp">childCmp</div>
```

```html
<div ref="testRef">testRef</div>
<example-ref-cmp ref="refCmp"></example-ref-cmp>
```

```js
console.log(this.$refs.refCmp)
// VueComponent {_uid: 2, _isVue: true, $options: {…}, _renderProxy: Proxy, _self: VueComponent, …}
console.log(this.$refs.refCmp.$el)
// <div data-v-07216faf="" class="child-cmp"> childCmp </div>
console.log(this.$refs.divDemo)
// <div>testRef</div>
```

### 依赖注入

`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

在任何后代组件里，都可以使用 `inject` 选项来接收指定的数据/方法

```js
inject: ['getMap']
```

依赖注入：可理解为**大范围有效的 prop**

1. 祖先不需要知道哪些后代组件使用

2. 后代组件也不需要直到 property 来自哪里

缺陷

1. **耦合度高**，重构困难

2. property**非响应式**，单项数据流（同prop）

### 程序化的事件侦听器

`$on(eventName, eventHandler)` ：侦听一个事件

`$once(eventName, eventHandler)` ：一次性侦听一个事件

`$off(eventName, eventHandler)` ：停止侦听一个事件

#### 三方库模式

在一个组件实例上手动侦听事件

```js
// 一次性将这个日期选择器附加到一个输入框上
// 它会被挂载到 DOM 上。
mounted: function () {
  // Pikaday 是一个第三方日期选择器的库
  this.picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })
},
// 在组件被销毁之前，
// 也销毁这个日期选择器。
beforeDestroy: function () {
  this.picker.destroy()
}
```

缺陷：

1. 需要在组件实例中**保存变量**

2. 清理代码独立于创建代码

#### 程序化侦听器

`hook:beforeDestroy` 等效于 `beforeDestroy`

> beforeDestroy 比 hook:beforeDestroy 先调用

```js
mounted: function () {
  var picker = new Pikaday({
    field: this.$refs.input,
    format: 'YYYY-MM-DD'
  })

  this.$once('hook:beforeDestroy', function () {
    picker.destroy()
  })
}
```

### 循环引用

#### 递归组件

全局注册一个组件时，这个全局的 ID 会自动设置为该组件的 `name` 选项

组件可以在自**己模板中调用自身**，但只能通过 `name`选项来调用

无限循环案例

```js
name: 'stack-overflow',
template: '<div><stack-overflow></stack-overflow></div>'
```

#### 组件间循环引用

场景：两个组件称为 A 和 B， A 依赖 B，但是 B 又依赖 A，形成一个循环。

问题：不知道如何不经过一个组件完全解析出另一个组件。

> 使用 Vue.component 不会出现这个问题

解决方案：需要给模块系统一个点，“A 反正是需要 B 的，但是我们不需要先解析 B。”

**两种方案**

生命周期钩子 `beforeCreate` 时去注册它

```js
beforeCreate: function () {
  this.$options.components.TreeFolderContents = require('./tree-folder-contents.vue').default
}
```

本地注册组件的时候，你可以使用 webpack 的异步 `import`

```js
components: {
  TreeFolderContents: () => import('./tree-folder-contents.vue')
}
```

### 模板定义替代品

#### 内联模板

`inline-template` 这个特殊的 attribute 出现在一个子组件上时，这个组件将会使用其**里面的内容作为模板**，而不是将其作为被分发的内容。

```html
<my-component inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-component>
```

缺陷：作用域更难理解，建议使用`<template>`

#### X-Template

`<script>` 元素中，带上 `text/x-template` 的类型，通过一个 `id` 将模板引用过去

```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```

```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

缺陷：模板和定义分开

#### 控制更新

强制更新：通过 `$forceUpdate`强制渲染 Vue 实例。

更新范围：仅影响**实例本身**和**插入插槽内容的子组件**，并非所有子组件

#### v-once

组件包含了**大量静态内容**

在根元素上添加 `v-once` attribute 以确保这些内容**只计算一次然后缓存起来**

## 相关链接

[[1] W3C 规范](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name)

作用域插槽用法：[Vue Virtual Scroller](https://github.com/Akryum/vue-virtual-scroller)、[Vue Promised](https://github.com/posva/vue-promised) 和 [Portal Vue](https://github.com/LinusBorg/portal-vue)
