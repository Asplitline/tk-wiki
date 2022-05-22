---
title: vue2文档笔记
sidebar: hidden
---

# Vue 实例

## 数据与方法

Vue 实例创建时，将 `data` 对象中的所有的 property 加入到 Vue 的**响应式系统**。

```js
// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的 property
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置 property 也会影响到原始数据
vm.a = 2
data.a // => 2
```

**只有当实例被创建时就已经存在于 `data` 中的 property 才是响应式的**

`Object.freeze()`：**阻止修改现有 property**，禁用响应式。

**实例 property 与方法**：前缀 `$`，以便与用户定义的 property 区分开来

> 选择根元素，可用`$0.__vue__` 浏览器获取 vue

## 实例生命周期钩子

<img src="https://cn.vuejs.org/images/lifecycle.png" alt="Vue 实例生命周期" style="zoom: 50%;" />

| 周期函数      | 执行时机                           | 补充                                                                                      |
| ------------- | ---------------------------------- | ----------------------------------------------------------------------------------------- |
| beforeCreate  | 实例初始化之前                     | 数据侦听和事件/侦听器的配置之前                                                           |
| created       | 实例被创建之后                     | 实例已完成对选项的处理（数据侦听、计算属性、方法、事件/侦听器的回调函数）                 |
| beforeMounted | 挂载开始之前                       | `render` 函数首次被调用                                                                   |
| mounted       | 实例被挂载后                       | `el` 被新创建的 `vm.$el` 替换                                                             |
| beforeUpdate  | 数据改变后，DOM 更新前             | 适合在现有 DOM 将要被更新之前访问                                                         |
| updated       | 虚拟 DOM 重新渲染和更新完毕之后    | 执行依赖于 DOM 的操作                                                                     |
| activated     | 被 keep-alive 缓存的组件**激活**时 |                                                                                           |
| deactivated   | 被 keep-alive 缓存的组件**失活**时 |                                                                                           |
| beforeDestroy | 实例销毁前                         |                                                                                           |
| destroyed     | 实例销毁后调用                     | 调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。 |
| errorCaptured | 捕获一个来自后代组件的错误时被调用 |                                                                                           |

### created

- `$el` property 目前尚不可用

### mounted

- 服务器渲染期间不被调用
- **不会**保证所有的**子组件**也都被挂载完成。在 `mounted` 内部使用 `vm.$nextTick`，可等到整个视图渲染完成。

```js
mounted: function () {
  this.$nextTick(function () {
    // 仅在整个视图都被渲染之后才会运行的代码
  })
}
```

### beforeUpdate

==？在服务器端渲染期间不被调用，因为只有初次渲染会在服务器端进行==

### updated

- 服务器渲染期间不被调用

- `updated` **不会**保证所有的子组件也都被重新渲染完毕。解决方法： `vm.$nextTick`

生命周期钩子的 `this` 上下文指向调用它的 Vue 实例

### activated，deactivated，beforeDestroy，destroyed

服务器渲染期间不调用

### errorCaptured

`(err: Error, vm: Component, info: string) => ?boolean`

三个参数

- err：错误对象
- vm：发生错误的组件实例
- info：错误来源信息的字符串

> 返回 `false` 以阻止该错误继续向上传播

## 模板语法

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。Vue 能计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

### 插值

```html
<span>Message: {{ msg }}</span>
<span v-once>这个将不会改变: {{ msg }}</span>
<span v-html="rawHtml"></span>
```

## 指令

指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。

### 参数

一些指令能够接收一个“参数”，在指令名称之后**以冒号表示**

```html
<a v-bind:href="url">...</a>
```

### 动态参数

可以用**方括号**括起来的 JavaScript 表达式作为一个指令的参数

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

#### 对值的约束

- 动态参数预期会求出一个**字符串**，异常情况下值为 `null`。
- `null` ：**可以显性地用于移除绑定**。

#### 表达式约束

某些字符，如**空格和引号**，放在 HTML attribute 名里是**无效的**

推荐：不使用引号或空格，用计算属性代替

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

**大小写不敏感**，浏览器会把 attribute 名全部强制转为小写

### 修饰符

以半角句号 `.` 指明的特殊后缀

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

## 计算属性和侦听器

### 计算属性

**计算属性是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。

> `Date.now()` 失效，因为不是响应式依赖

计算属性默认只有 **getter**，不过在需要时你也可以提供一个 **setter**

```js
computed: {
  fullName: {
    get: function () {    // getter
     return ...
    },
    set: function (newValue) {    // setter
      ...
    }
  }
}
```

### 侦听器

在数据变化时执行**异步或开销较大**的操作时，侦听器最有效

- 执行异步操作
- 限制频率
- 设置中间状态

```js
var vm = new Vue({
  watch: {}
})
```

## Class 与 Style 绑定

### 绑定 HTML Class

`v-bind:class`

#### 对象语法

```html
<!-- isActive:true -->
<div v-bind:class="{ active: isActive }"></div>

<!-- classObject:{isActive: true} -->
<div v-bind:class="classObject"></div>
```

#### 数组语法

```html
<!-- {
  activeClass: 'active',
  errorClass: 'text-danger'
} -->
<div v-bind:class="[activeClass, errorClass]"></div>
```

#### 组合写法

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

> **Truthy 真值** ： 转换后的值为真值
>
> 除 `false、0、""、null、undefined`以外都是**真值**

在**自定义组件**上使用，会自动绑定到**组件根元素**上（合并的形式）

### 绑定内联样式

`v-bind:style`

> 会自动添加[DOC-浏览器前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)

#### 对象语法

**css property**：可用**驼峰式**(`camelCase`) 或者 **短横线**(`kebab-case`，用引号括起来)

```html
<!-- styleObject: {
  activeColor: 'red',
  fontSize: 30
}-->
<div v-bind:style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>

<div v-bind:style="styleObject"></div>
```

#### 数组语法

```html
<div v-bind:style="[baseStyles, overridingStyles]"></div>
```

#### 多重值 2.3+

`style` 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值

只会渲染数组中**最后一个被浏览器支持的值**

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

## 条件渲染

### v-if

条件性渲染**一块**内容。指令表达式返回`truthy`

将`template` 当作不可见包裹元素进行**条件渲染**分组

```html
<template v-if="">
  <p v-if="">1</p>
  <p v-else-if="">2</p>
  <p v-else>3</p>
</template>
```

vue 尽可能高效渲染元素，会尽量复用元素

> `key`：**元素独立**，不复用

### v-show

元素始终被渲染在 DOM 中，只是单纯切换`display`

> 不支持**template**和**v-else**

### v-if vs v-show

`v-if`

- **事件和子组件适当的销毁重建**
- **惰性**，条件为真，才会渲染
- 更高的**切换开销**

`v-show`

- 不管条件，**总会渲染**
- 更高的**初始渲染开销**

## 列表渲染

### v-for

`(item , index | name ) in items`

- 第一参数
  - `item` - 被迭代元素别名
- 第二参数
  - `index` - 当前项索引（数组）
  - `name` - 键名（对象）
- 第三参数（对象）
  - `index` - 当前项索引

对象可有三个参数

```html
<div v-for="(value, name, index) in object"></div>
```

`of` 可以替换 `in`

> 遍历顺序 按 `Object.keys()`

### 维护状态

`v-for`**默认渲染**时，数据项**顺序改变**，**不会移动 DOM 匹配数据项**，就地更新元素，确保每个索引都正确显示，只**适用于不依赖子组件状态或临时 DOM 状态**的列表渲染输出

总结：==数据改变，就地更新，DOM 不变==。

为了给 Vue 一个提示，以便它能跟踪每个节点的身份，从而重用和重新排序现有元素，你需要为每项提供一个唯一 `key` attribute

### 数组更新检测

#### 变更方法

Vue 封装的响应式数组方法

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`
- `sort()`
- `reverse()`

#### 替换数组

均返回新数组

- `filter()`
- `concat()`
- `slice()` - (start,end)

==? 如何实现这种高效==

> Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的**启发式方法**，所以用一个含有**相同元素的数组**去替换**原来的数组**是非常高效的操作。

#### 注意事项

Vue **不能检测**数组和对象的变化

### 显示过滤/排序后结果

**计算属性**不适用 - **传参**。使用**method**代替

```html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>
```

### v-if vs v-for

当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中

解决方案：template 包裹

```html
<template v-if="todos.length">
  <li v-for="todo in todos">{{ todo }}</li>
</template>
```

props：组件上通过 props 传递数据

is：使用 DOM 模板时，在 `<ul>` 元素内只有 `<li>` 元素会被看作有效内容，通过`is`设置

```html
<ul>
  <my-component></my-component>
</ul>
-----
<ul>
  <li is="my-component"></li>
</ul>
```

## 事件处理

### 事件方法

`v-on` 指令监听 DOM 事件，在触发时运行 JavaScript 代码

```html
<div id="example-2">
  <button v-on:click="greet">Greet</button>
</div>
```

```js
var vm = new Vue({
  ...
  methods: {
    greet: function (event) {
      // this -> vue实例
      ...
    }
  }
})
vm.greet() // 通过实例调用
```

`$event`：事件对象

```html
<button v-on:click="greet(1,$event)">Greet</button>
```

### 事件修饰符

- `.stop`
- `.prevent`

- `.capture` - 捕获模式，从外部到内部触发事件。
- `.self` - 在 `event.target` 是当前元素自身时触发处理函数
- `.once`^2.1.4+^ - 事件触发一次，可在组件使用
- `.passive`^2.3.0+^ - 直接触发默认行为，优化移动端的，如 `onScroll`

```html
<!-- 阻止单击事件继续传播 - stopPropagation -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 - preventDedault -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
```

注意：

- [顺序会影响结果](https://blog.csdn.net/catascdd/article/details/108264406)

  - 阻止所有点击 `v-on:click.prevent.self`
  - 阻止自身点击 `v-on:click.self.prevent`

- 不要让 `passive` 和 `prevent` 一起使用，`prevent`会被忽略，因为`passive`不阻止默认行为

### 按键修饰符

~~`keyCode`~~废弃

`keyup` 现在

处理函数只会在 `$event.key` 等于 `13` 时被调用

```html
<input v-on:keyup.13="submit" />
```

- `.enter`
- `.tab`
- `.delete` (捕获“删除”和“退格”键)
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

通过全局 `config.keyCodes` 对象**自定义按键修饰符别名**

```js
Vue.config.keyCodes = {
  f1: 112,
  // camelCase 不可用
  mediaPlayPause: 179,
  // 取而代之的是 kebab-case 且用双引号括起来
  'media-play-pause': 179,
  up: [38, 87]
}
```

### 系统修饰键

- `.ctrl`
- `.alt`
- `.shift`
- `.meta` - windows | command
- `.exact`^2.5.0+^ - 控制由精确的系统**修饰符组合**触发的事件，严格按照修饰符执行。
  - `v-on:click.ctrl` - Ctrl 组合其他键也能触发
  - `v-on:click.ctrl.exact` - 仅有 Ctrl 被按下才能触发
  - `v-on:click.exact` - 单纯的点击

> 系统修饰符和 `keyup` 事件一起用时，事件触发时修饰键必须处于按下状态。
>
> 例：按住 `ctrl` 的情况下释放其它按键，才能触发 `keyup.ctrl`

限制处理函数仅响应特定的鼠标按钮

- `.left`
- `.right`
- `.middle`

### prop 修饰符

1. 避免暴露数据
2. 防止污染 HTML 结构

```html
<template>
  <div class="prop">
    <div class="prop-item" :my-name="prop"></div>
    <!-- <div my-name="hello prop" class="prop-item"></div>  -->
    <div class="prop-item" :my-name.prop="prop2"></div>
    <!-- <div class="prop-item"></div> -->
    <button @click="onGetResult">获取结果</button>
  </div>
</template>
```

### QA - HTML 中监听事件

- 轻松**定位**JavaScript 中对应方法
- **JavaScript 无需绑定事件**，与 DOM 解耦，纯粹的逻辑
- 事件随 ViewModel 销毁**自动销毁**

## 表单绑定

### 基础用法

> `v-model` 忽略表单的 `value`、`checked`、`selected` attribute 的初始值，总是将 Vue 实例数据作为数据来源，应该在**data 中初始化**

- `text textarea` ： `value + input`
- `checkbox radio` ： `checked + change`
- `select` ： `value + change`

#### 多行文本

```html
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

> 在文本区域插值 (`<textarea>{{text}}</textarea>`) 并不会生效

#### 复选框

```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

`v-model` 未能匹配任何选项，`<select>` 元素将被渲染为“未选中”状态。

在 iOS 中，这会使用户无法选择第一个选项。因为这样不会触发 change 事件。

```html
<!-- 提供控制禁用选项 -->
<option disabled value="">请选择</option>
```

### 值绑定

#### 单选

```html
<input type="radio" v-model="pick" v-bind:value="a" />
```

```js
vm.pick === vm.a // 选中
```

#### 复选

```html
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
```

```js
vm.toggle === 'yes' // 选中
vm.toggle === 'no' // 没有选中
```

#### 选择框

```html
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option v-bind:value="{ number: 123 }">123</option>
</select>
```

```js
typeof vm.selected // => 'object' 选中时
vm.selected.number // => 123
```

### 修饰符

`.lazy` - v-model 默认为`input`事件，使用后转为 `change`事件

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" />
```

`.number` - 输入值转为**数值**类型。

规则：

1. `type="number"` 时，HTML 值也总会返回字符串。
2. 值无法被`parseFloat()` 解析，则会返回原始的值。

```html
<input v-model.number="age" type="number" />
```

`.trim` - 自动过滤**首尾空白**

```html
<input v-model.trim="msg" />
```

[自定义事件](#自定义事件)

## 组件基础

组件是**可复用的 vue 实例**。

- **data 选项必须为函数**。 已便每个实例维护一个**独立拷贝**。否则，实例间将共享数据。

- **每个组件必须只有一个根元素**

### prop 传值

```vue
Vue.component('blog-post', { props: ['title'], template: '
<h3>{{ title }}</h3>
' })
```

传递值比较多时，以对象形式

```html
<blog-post
  v-for="post in posts"
  v-bind:key="post.id"
  v-bind:title="post.title"
  v-bind:content="post.content"
  v-bind:publishedAt="post.publishedAt"
  v-bind:comments="post.comments"
></blog-post>
```

```html
<blog-post v-for="post in posts" v-bind:key="post.id" v-bind:post="post"></blog-post>
```

### 监听子组件事件

组件中`$emit` 触发

#### 不传值

```html
<blog-post ... v-on:enlarge-text="postFontSize += 0.1"></blog-post>
<!-- blog-post -->
<button v-on:click="$emit('enlarge-text')">Enlarge text</button>
```

#### 传值

通过`$event`获取值

```html
<blog-post ... v-on:enlarge-text="postFontSize += $event"></blog-post>
<!-- blog-post -->
<button v-on:click="$emit('enlarge-text', 0.1)">Enlarge text</button>
```

#### v-model

`v-model` 等价写法(语法糖)

```html
<input v-model="searchText" /> <input :value="searchText" @input="searchText=$event.target.value" />
```

组件中使用 v-model

```html
<!-- 实现 -->
<my-input :value="searchText" @input="searchText = $event"></my-input>
<!-- 语法糖 -->
<my-input v-model="searchText"></my-input>
```

`my-input.vue`

```html
<!-- 通过props接收值，$emit发送值-->
<input :value="value" @input="$emit('input',$event.target.value)" />
```

### 动态组件

不同组件之间进行**动态切换**，`<component>`元素加一个特殊的 `is` attribute 来实现

```html
<component v-bind:is="currentTabComponent"></component>
```

`currentTabComponent` 代表当前组件名称，取值如下

- 组件名称（已注册）
- 组件选项对象

组件选项对象

```vue
<component v-bind:is="currentTab.component" class="tab"></component>
```

```js
;[
  {
    name: 'Home',
    component: {
      template: '<div>Home component</div>'
    }
  }
]
```

==@DIF-难点==：未能复现

这个*attribute*[^1]可以用于常规 HTML 元素，但这些元素将被视为组件，这意味着所有的 attribute 都会*作为 DOM attribute 被绑定*[^2]。对于像 `value` 这样的 property，若想让其如预期般工作，你需要使用 _`.prop` 修饰器_。

总结：**HTML 属性** (attribute)和 **DOM 属性**(property)，是相互关联的。多数情况`attribute`值仅用作初始 DOM 节点对象使用，而`property`更多用于页面交互

[^1]: is 属性
[^2]: html 元素属性

### 解析-DOM-模板注意事项

`<ul>`、`<ol>`、`<table>` 和 `<select>`，对哪些元素（`<li>`、`<tr>` 和 `<option>`）可以出现在其内部是有严格限制的。

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

自定义组件 `<blog-post-row>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。通过`is`解决

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

以下条件不存在限制

- `字符串` (`template: '...'`)
- `单文件`组件 (`.vue`)
- `<script type="text/x-template">`

# 深入了解组件

## 组件注册

```js
// kebab-case - 引用时必须使用 kebab-case
Vue.component('my-component-name',{ /* ... */ })
// PascalCase - 引用时两者都行
Vue.component('MyComponentName', { /* ... */ }
```

> 命名规则：建议字母小写，含连字符。避免和当前以及未来的 HTML 元素相冲突

### 全局注册

注册后可以在任何新创建的 Vue 根实例 (`new Vue`) 的模板

```js
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

### 局部注册

局部注册的组件在其子组件中不可用，需手动引入才能使用

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

## 模块系统

### 模块系统- 局部注册

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

### 模块系统 - 自动化全局注册

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

> 驼峰法和短横线会自动转换。

```js
Vue.component('blog-post', {
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```

```html
<blog-post post-title="hello!"></blog-post>
```

### prop 类型

以**对象**形式列出 prop

```js
props: {
  title: String,
  // ...
  contactsPromise: Promise // or any other constructor
}
```

### 静态/动态 Prop

#### 静态 prop

```html
<blog-post title="My journey with Vue"></blog-post>
```

#### 动态 prop

用 `v-bind`传入动态 prop

```html
<blog-post v-bind:title="post.title"></blog-post>
```

传入所有 property，使用**不带参数**的`v-bind`

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

**父 prop 会更新子组件**，**反之不行**。防止子组件意外变更父级。

场景：**子组件不应该在组件中改变 prop**，应该由父组件刷新。

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

> **对象和数组**是通过引用传入的，子组件中改变变更这个对象或数组本身**将会影响到父组件**的状态

### prop 验证

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

prop 会在一**个组件实例创建之前进行验证**，所以实例的 property (如 `data`、`computed` 等) 在 `default` 或 `validator` 函数中是不可用的

#### 类型检验

**type**包含以下类型

`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`、自定义构造函数

### 非 prop 的 Attribute

传了 prop，但没有接收？

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

`v-model = @input + value` - 默认

#### model 选项 ^2.2.0+^

手动设置`value`和`event`

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

### 原生事件绑定到组件

#### native 修饰符

场景：自定义组件只能监听自定义事件，原生事件无法直接触发。

解决：通过 native 修饰符

**native.vue**

```vue
<template>
  <div class="native-custom">
    <input type="text" @keydown="onKeydown" />
  </div>
</template>

export default { name: 'nativeCustom', methods: { onKeydown () { this.$emit('onKeydown') } } }
```

**custom.vue**

```html
<template>
  <div class="native">
    <!-- 加上.native之后原生事件才得以监听成功 -->
    <NativeCustom @onKeydown="onKeydown" @click.native="onClick" />
  </div>
</template>
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

### .sync 修饰符 ^2.3.0+^

推荐以 `update:myPropName`方式变更父组件，实现对`prop`的双向绑定。

`.sync`和`v-bind`不能使用表达式，`v-bind:title.sync="doc.title + '!'"`不合法

```html
<text-document v-bind:title="doc.title" v-on:update:title="doc.title = $event"></text-document>
<!-- 等效写法 -->
<text-document v-bind:title.sync="doc.title"></text-document>
```

`text-document.vue`

```js
this.$emit('update:title', newTitle)
```

设置多个 prop，直接配合`v-bind`和`sync`

这样会把 `doc` 对象中的每一个 property (如 `title`) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 `v-on` 监听器

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

## 插槽

### 插槽内容

组件内没有插槽`<slot>`，**标签之间的元素会忽略**

`navigation-link.vue`

```html
<a v-bind:href="url" class="nav-link">
  <slot></slot>
</a>
```

### 编译作用域

插槽不能访问`<navigation-link>`作用域

插槽内容是传递给`<navigation-link>` ，而不是在 `<navigation-link>` 组件内部定义的。

插槽是传递父组件内容到子组件，作用域还在父组件。所以插槽中不能访问子组件数据。

```html
<navigation-link url="/profile">
  Clicking here will send you to: {{ url }}
  <!-- `url` 会是 undefined-->
</navigation-link>
```

> **父模板**所有内容都是在父级作用域中编译，**子模板**所有内容都是在子作用域中编译

### 后备（默认）内容

`<slot>content</slot>` 默认显示 content（后备内容），提供内容，只会取代后备内容

### 具名插槽

`<slot>` ： `name` attribute，定义额外插槽

父级组件

```html
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

> 不带 name，name 默认为 default

子级组件

通过`template` + `v-slot:name`向 模板中填充内容 ^2.6.0+^

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

旧版写法：3.0 废弃

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

**父级组件只有默认插槽**，`v-slot`可以**放到组件**上，_正常情况 `v-slot` 都是放在 `template` 上_

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

### 动态插槽名 ^2.6.0+^

`v-slot:[dynamicSlotName]`

缩写：`v-slot:header` 可以被重写为 `#header`

**注意**：无效写法`#="{user}"`，有效写法`#default="{user}"`

## 动态组件 & 异步组件

通过`is` attribute 切换动态组件，每次切换时都会**新建组件实例**

```html
<component v-bind:is="currentTabComponent"></component>
```

### keep-alive

通过`keep-alive`包裹，缓存不活动组件（缓存组件），避免重新渲染。自身不会渲染 DOM，是*抽象组件*

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

`include ` ^2.1.0+^ ： 名称匹配的组件被缓存

- `string | RegExp | Array`
- 匹配规则
  - 匹配组件**自身** `name`
  - name 不可用，**匹配局部注册名称**（父组件 `components` 选项的键值）
  - 匿名组件不能匹配

```html
<keep-alive include="a,b">
  <keep-alive :include="/a|b/"> <keep-alive :include="['a', 'b']"></keep-alive></keep-alive
></keep-alive>
```

`exclude ` ^2.1.0+^ ： 名称匹配的组件都**不会**被缓存

- `string | RegExp | Array`
- 匿名组件不能匹配

`max` ^2.5.0+^：最多可缓存组件实例数量

- `number`
- 数量达到，清除**最久**没有访问的实例

> `<keep-alive>` 不会在函数式组件中正常工作，因为它们没有缓存实例。

### 异步组件

**工厂函数的方式定义你的组件**，会**异步解析**你的组件定义。

- 组件渲染时触发
- 渲染结果缓存，方便重新渲染

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

#### 处理加载状态 ^2.3.0+^

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

**访问根实例**：根实例可以通过 `$root` property 进行访问

**访问父级组件实例**：`$parent` property 可以用来从一个子组件访问父组件的实例

**访问子组件或子元素**：除了 prop 和事件，还可以通过 `ref` 这个 attribute 为子组件赋予一个 ID 引用

```html
<base-input ref="usernameInput"></base-input>
```

```js
this.$refs.usernameInput
```

当 `ref` 和 `v-for` 一起使用的时候，你得到的 ref 将会是一个包含了对应数据源的这些子组件的数组。

> `$ref` 组件**渲染完成之后生效**，并且**不是响应式**，避免在模板或计算属性中使用

ref 补充

1. 普通元素中：$refs 获取的是 dom 元素
2. 组件中：$refs 获取的是组件实例，通过 \$el 获取组件元素

```vue
<div ref="testRef">testRef</div>
<example-ref-cmp ref="refCmp"></example-ref-cmp>
```

exampleRefCmp.vue

```html
<div class="child-cmp">childCmp</div>
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

> refs:[provide/inject](https://cn.vuejs.org/v2/api/#provide-inject)

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

- 祖先不需要知道哪些后代组件使用
- 后代组件也不需要直到 property 来自哪里

缺陷

- **耦合度高**，重构困难
- property**非响应式**

### 程序化的事件侦听器

#### 正常写法

缺陷：

- 需要在组件实例中**保存变量**
- 清理代码独立于创建代码

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

#### 程序化侦听

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

场景：两个组件称为 A 和 B， A 依赖 B，但是 B 又依赖 A。形成一个循环，不知道如何不经过一个组件完全解析出另一个组件。

> 使用 Vue.component 不会出现这个问题

解决方案：需要给模块系统一个点，“A *反正*是需要 B 的，但是我们不需要先解析 B。”

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

仅影响**实例本身**和**插入插槽内容的子组件**，并非所有子组件

#### v-once

组件包含了**大量静态内容**

在根元素上添加 `v-once` attribute 以确保这些内容**只计算一次然后缓存起来**

# 过渡 & 动画

## 单元素/组件过度

`transition` ：在下列情形中，可以给任何元素和组件添加进入/离开过渡

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

==只是过渡效果，不会影响元素的初始和最终状态==

过渡案例

```html
<div id="demo">
  <button v-on:click="show = !show">Toggle</button>
  <transition name="fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```js
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
```

```css
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
```

`transition`会对里面元素做以下处理

- 自动嗅探目标元素是否应用了 CSS 过渡或动画
- 给过渡组件提供 钩子函数
- 没有钩子函数也没检测到过渡，在下一帧立即执行 DOM 操作

`<transition name="my-transition">`，那么 `v-enter` 会替换为 `my-transition-enter`

### 过渡的类名

<img src="https://cn.vuejs.org/images/transition.png" alt="过渡" style="zoom: 50%;" />

| 类名           | 生效           | 移除              | 说明               |
| -------------- | -------------- | ----------------- | ------------------ |
| v-enter        | 插入之前       | 插入之后下一帧    | 进入过渡的开始状态 |
| v-enter-active | 插入之前       | 过渡/动画完成之后 | 进入过渡生效状态   |
| v-enter-to     | 插入之后下一帧 | 过渡/动画完成之后 | 进入过渡结束状态   |
|                |                |                   |                    |
| v-leave        | 离开过渡       | 离开过渡下一帧    | 离开过渡开始状态   |
| v-leave-active | 离开过渡       | 过渡/动画完成之后 | 离开过渡生效状态   |
| v-leave-to     | 离开过渡下一帧 | 过渡/动画完成之后 | 离开过渡结束状态   |

#### CSS 过渡

```html
<div id="example-1">
  <button @click="show = !show">Toggle render</button>
  <transition name="slide-fade">
    <p v-if="show">hello</p>
  </transition>
</div>
```

```css
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
```

#### CSS 动画

同 CSS 过渡，动画中 `v-enter` 类名在节点插入后不会立即删除，**在`animationed` 触发时删除**。

```html
<div id="example-2">
  <button @click="show = !show">Toggle show</button>
  <transition name="bounce">
    <p v-if="show">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris facilisis enim libero, at lacinia diam fermentum id. Pellentesque
      habitant morbi tristique senectus et netus.
    </p>
  </transition>
</div>
```

```css
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

#### 自定义过渡切换类名

**通过 attribute 自定义过渡类名 优先级 高于 普通类名**

- `enter-class`
- `enter-active-class`
- `enter-to-class` (2.1.8+)
- `leave-class`
- `leave-active-class`
- `leave-to-class` (2.1.8+)

#### 同时使用动画和过渡

Vue 设置相应事件来监听过渡完成状态，`transitionend` 或 `animationend`，取决于元素 CSS 规则。

- 只使用*一种*，Vue 会*自动识别类型并设置监听*
- 同时使用，在 `type` attribute 并设置 `animation` 或 `transition` 来明确声明你需要 Vue 监听的类型。

#### 显性的过渡持续时间^2.2.0+^

Vue 自动得出过渡效果的完成时机。默认情况下，Vue 会等待其在过渡效果的根元素的第一个 `transitionend` 或 `animationend` 事件。

场景：内部元素相比于根元素，延迟过渡。

解决：`<transition>` 组件上 duration prop 定制显式过渡（ms）。

```html
<transition :duration="1000">...</transition> <transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

#### JavaScript 钩子

attribute 中 声明 Javascript 钩子

(el,done)

- el ：触发元素
- done：done 回调

```html
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"
  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>
```

```js
methods: {
  // 进入中
  beforeEnter: function (el) {},
  // 当与 CSS 结合使用时,回调函数 done 是可选的
  enter: function (el, done) {
    done()
  },
  afterEnter: function (el) {},
  enterCancelled: function (el) {},
  // 离开时
  beforeLeave: function (el) {},
  // 当与 CSS 结合使用时,回调函数 done 是可选的
  leave: function (el, done) {
    done()
  },
  afterLeave: function (el) {},
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {}
}
```

注意事项:

- 只有 JavaScript 过渡的时候。**在 `enter` 和 `leave` 中必须使用 `done` 进行回调**。否则会被同步调用，过渡立即完成。

- 只有 JavaScript 过渡的元素添加 `v-bind:css="false"`。可以跳过 css 检查。

### 初始渲染的过渡

`appear` attribute 设置节点在初始渲染的过渡

```html
<transition appear>
  <!-- ... -->
</transition>
```

#### 自定义类名

```html
<transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class"
  (2.1.8+)
  appear-active-class="custom-appear-active-class"
>
  <!-- ... -->
</transition>
```

#### 自定义钩子

```html
<transition
  appear
  v-on:before-appear="customBeforeAppearHook"
  v-on:appear="customAppearHook"
  v-on:after-appear="customAfterAppearHook"
  v-on:appear-cancelled="customAppearCancelledHook"
>
  <!-- ... -->
</transition>
```

### 多元素过渡

相同标签名切换时，通过 key attribut 设置唯一值标记来区分，否则 Vue 为了效率只会替换相同标签内部的内容。

```html
<transition>
  <button v-if="isEditing" key="save">Save</button>
  <button v-else key="edit">Edit</button>
</transition>
```

使用多个 `v-if` 的多个元素的过渡可以重写为绑定了动态 property 的单个元素过渡

```html
<transition>
  <button v-if="docState === 'saved'" key="saved">Edit</button>
  <button v-if="docState === 'edited'" key="edited">Save</button>
  <button v-if="docState === 'editing'" key="editing">Cancel</button>
</transition>
```

通过 key 代替 `v-if` 和 `v-else`

```html
<transition>
  <button v-bind:key="docState">{{ buttonMessage }}</button>
</transition>
```

#### 过渡模式

过渡模式

- 默认模式：过渡和离开同时发生
- `in-out` ：新元素先过渡，完成后，当前元素过渡离开
- `out-in`：当前元素先过渡，完成后，新元素过渡进入

```html
<div id="example-2">
  <transition name="toggle">
    <button key="on" @click="toggle" v-if="active">on</button>
    <button key="off" @click="toggle" v-else>off</button>
  </transition>
</div>
```

```css
#example-2 {
  position: relative;
}
button {
  position: absolute;
}
.toggle-enter-active,
.toggle-leave-active {
  transition: all 0.5s linear;
}
.toggle-enter,
.toggle-leave-to {
  opacity: 0;
}
.toggle-enter {
  transform: translateX(100%);
}
.toggle-leave-to {
  transform: translateX(-100%);
}
```

### 多组件过渡

```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```

```css
.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active for below version 2.1.8 */ {
  opacity: 0;
}
```

### 列表过渡

`<transition-group>` 组件渲染整个 列表

- 非虚拟元素，是**真实元素**。默认 span，可通过 tag 更换
- 过渡模式不可用
- 内部元素总需要 唯一 `key`
- css 过渡的类**应用在内部**，而不是 组件/容器 本身。

#### 列表的进入/离开过渡

```html
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p">
    <span v-for="item in items" v-bind:key="item" class="list-item"> {{ item }} </span>
  </transition-group>
</div>
```

```css
.list-item {
  display: inline-block;
  margin: 0 4px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.2s linear;
}

.list-leave-to,
.list-enter {
  transform: translateY(100%);
}
```

> inline 元素不是 [transformable elements](https://drafts.csswg.org/css-transforms-1/#transformable-element)，不支持 transform

过渡模式案例

```html
<div id="list-demo" class="demo">
  <button v-on:click="add">Add</button>
  <button v-on:click="remove">Remove</button>
  <transition-group name="list" tag="p" key="test1" mode="in-out">
    <span v-for="item in items" v-bind:key="item" class="list-item"> {{ item }} </span>
  </transition-group>
</div>
```

```js
data() {
	return {
		items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
		nextNum: 10
	}
},
methods: {
	randomIndex: function () {
		return Math.floor(Math.random() * this.items.length)
	},
	add: function () {
		this.items.splice(this.randomIndex(), 0, this.nextNum++)
	},
	remove: function () {
		this.items.splice(this.randomIndex(), 1)
	}
}
```

```css
// inline 不是 transformable element
.list-item {
  display: inline-block;
  margin: 0 4px;
  transition: all 1s ease;
}

.list-leave-to,
.list-enter {
  opacity: 0;
  transform: translateY(100%);
}
// 设置移动的过渡效果 - 可选
/* .list-move {
	transition: all 1s;
} */
// 离开过渡，先让元素脱离标准流
.list-leave-active {
  position: absolute;
}
```

### 可复用的过渡

`<transition>` 或者 `<transition-group>` 作为根组件，然后将任何子组件放置在其中

#### template

```js
Vue.component('my-special-transition', {
  template:
    '\
    <transition\
      name="very-special-transition"\
      mode="out-in"\
      v-on:before-enter="beforeEnter"\
      v-on:after-enter="afterEnter"\
    >\
      <slot></slot>\
    </transition>\
  ',
  methods: {
    beforeEnter: function (el) {
      // ...
    },
    afterEnter: function (el) {
      // ...
    }
  }
})
```

#### 函数式组件 - 推荐

```js
Vue.component('my-special-transition', {
  functional: true,
  render: function (createElement, context) {
    var data = {
      props: {
        name: 'very-special-transition',
        mode: 'out-in'
      },
      on: {
        beforeEnter: function (el) {
          // ...
        },
        afterEnter: function (el) {
          // ...
        }
      }
    }
    return createElement('transition', data, context.children)
  }
})
```

### 动态过渡

所有过渡 attribute 都可以动态绑定

## 状态过渡

### 状态动画与侦听器

```html
<div class="">
  {{showNumToFix}}<br />
  <button @click="add">add</button>
</div>
```

```js
import gsap from 'gsap'
export default {
  data() {
    return {
      num: 0,
      showNum: 0
    }
  },
  methods: {
    add() {
      this.num += Math.floor(Math.random() * 100)
    }
  },
  computed: {
    showNumToFix() {
      return this.showNum?.toFixed(0)
    }
  },
  watch: {
    num(val) {
      gsap.to(this, { duration: 0.5, showNum: val })
    }
  }
}
```

# 可复用性&组合

## 混入

```js
// 定义一个混入对象
var myMixin = {
  created() {
    // ...
  },
  methods: {
    hello() {
      // ...
    }
  }
}

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [myMixin]
})

var component = new Component() // => "hello from mixin!"
```

### 选项合并

**数据对象**：在内部进行递归合并，**同名以组件数据优先**

**钩子函数**：将合并为数组，**都被调用**，**混入钩子函数 先于 组件钩子函数**。

**值为对象的选项**：（`methods`、`components` 、`directives`）合并为同一个对象。**对象键名冲突，优先取组件数据。**

> `Vue.extend()`使用同样策略合并

### 全局混入

一旦使用全局混入，它将影响**每一个**之后创建的 Vue 实例，可以用来为**自定义选项注入处理逻辑**

```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
// => "hello!"
```

> 慎用混入，会影响 单独创建的 Vue 实例

### 自定义选项合并策略

自定义选项默认策略，**简单地覆盖已有值**。

使用 `optionMergeStrategies` 自定义合并逻辑

```js
Vue.config.optionMergeStrategies.myOption = function (toVal, fromVal) {
  // 返回合并后的值
}
```

## 自定义指令

自定义指令：对普通 DOM 进行底层操作

### 指令

**全局指令**

```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```

**局部指令**：接受一个 `directives` 的选项

```js
directives: {
  focus: {
    // 指令的定义
    inserted: function (el) {
      el.focus()
    }
  }
}
```

**使用**

```html
<input v-focus />
```

### 钩子函数

| 函数名称         | 调用时机                            | 说明                             |
| ---------------- | ----------------------------------- | -------------------------------- |
| bind             | 指令**第一次绑定到元素时**（一次）  | 初始化设置                       |
| inserted         | 被绑定元素**插入父节点时**          | 只保证父节点存在，不保证已被插入 |
| update           | 所有组件 **VNode 更新时**           | 可能发生在子 VNode 更新之前      |
| componentUpdated | 组件 VNode 及子 VNode**全部更新后** |                                  |
| unbind           | 指令**与元素解绑时**（一次性）      |                                  |

### 钩子函数参数

- `el`：指令所绑定的元素，可以用来*直接操作 DOM*。
- `binding`：一个对象，包含以下 property：
  - `name`：指令名，不包括 `v-` 前缀。
  - `value`：指令的绑定值。
  - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
  - `expression`：字符串形式的指令表达式。
  - `arg`：传给指令的参数，可选。
  - `modifiers`：一个包含修饰符的对象。
- `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。
- `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

```html
<div id="hook-arguments-example" v-demo:foo.a.b="message"></div>
```

```js
// name  - demo
// value - hello!
// expression - message
// arg - foo
// modifiers - {"a":true,"b":true}
new Vue({
  el: '#hook-arguments-example',
  data: {
    message: 'hello!'
  }
})
```

> 除了 `el` 之外，其它参数*都应该是只读的*，切勿进行修改。
>
> 需要在钩子之间共享数据，建议通过元素的 [`dataset`](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLElement/dataset) 来进行。

**动态参数指令**：指令的参数可以是动态的。

`v-mydirective:[argument]="value"` 中，`argument` 参数可以根据组件实例数据进行更新

**函数简写**：在`bind`和`update`触发相同行为，不关心其他钩子

```js
Vue.directive('color-swatch', function (el, binding) {
  el.style.backgroundColor = binding.value
})
```

**对象字面量**：指令需要多个值，传入 Js 对象字面量

```js
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```

## 渲染函数 & JSX

### 动态标题

```html
<anchored-heading :level="1">Hello world!</anchored-heading>
```

#### template 方式

```html
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  ...
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>
```

#### render 函数方式

```js
export default {
  render(h) {
    return h('h' + this.level, this.$slots.default)
  },
  props: {
    level: {
      type: Number,
      require: true
    }
  }
}
```

### 节点、树以及虚拟 DOM

每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。

```html
<div>
  <h1>My title</h1>
  Some text content
  <!-- TODO: Add tagline -->
</div>
```

<img src="https://cn.vuejs.org/images/dom-tree.png" style="zoom: 50%;" />

#### 虚拟 DOM

Vue 通过建立一个**虚拟 DOM** 来追踪自己要如何改变真实 DOM。

```js
return createElement('h1', this.blogTitle)
```

`createElement`：返回节点描述（createNodeDescription），又叫**虚拟节点**

节点描述：包含页面上需要渲染什么样的节点，包括及其子节点的描述信息。

### createElement 参数

```js
// @returns {VNode}
createElement(
  // {String | Object | Function}  必填项
  // 一个 HTML 标签名、组件选项对象，或者
  // resolve 了上述任何一种的一个 async 函数。
  'div',

  // {Object} 可选
  // 一个与模板中 attribute 对应的数据对象。
  {
    // (详情见下一节)
  },

  // {String | Array} 可选
  // 子级虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  // 也可以使用字符串来生成“文本虚拟节点”。
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    createElement(MyComponent, {
      props: {
        someProp: 'foobar'
      }
    })
  ]
)
```

#### 深入数据对象

```js
{
  // 与 `v-bind:class` 的 API 相同，
  // 接受一个字符串、对象或字符串和对象组成的数组
  'class': {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，
  // 接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px'
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo'
  },
  // 组件 prop
  props: {
    myProp: 'bar'
  },
  // DOM property
  domProps: {
    innerHTML: 'baz'
  },
  // 事件监听器在 `on` 内，
  // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
  // 需要在处理函数中手动检查 keyCode。
  on: {
    click: this.clickHandler
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用
  // `vm.$emit` 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
  // 赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 作用域插槽的格式为
  // { name: props => VNode | Array<VNode> }
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  // 其它特殊顶层 property
  key: 'myKey',
  ref: 'myRef',
  // 如果你在渲染函数中给多个元素都应用了相同的 ref 名，
  // 那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
}
```

#### Demo

```js
export default {
  methods: {
    // 获取所有子节点文本并拼接（拼接）
    getChildrenTextContent(children) {
      return children
        .map((node) => {
          return node.children ? this.getChildrenTextContent(node.children) : node.text
        })
        .join('')
    }
  },
  render(h) {
    const headerId = this.headerId
      ? this.headerId
      : this.getChildrenTextContent(this.$slots.default)
          .toLowerCase()
          .replace(/\W+/g, '-') // 特殊符号转 -
          .replace(/(^-|-$)/g, '') // 去掉首尾 -
    return h('h' + this.level, [
      h(
        'a',
        {
          attrs: {
            name: headerId,
            href: '#' + headerId
          }
        },
        this.$slots.default
      )
    ])
  },
  props: {
    level: {
      type: Number,
      require: true
    },
    headerId: {
      type: String
    }
  }
}
```

#### 约束

~~VNode 唯一~~ ，在 2.5.18 后 VNode 支持复用

```js
return createElement('div', [
  // 错误 - 重复的 VNode
  myParagraphVNode,
  myParagraphVNode
])
```

#### Javascript 替代功能

v-if 和 v-for：通过 if / else 和 map 重写

##### v-model

value，input + $emit

```js
export default {
  props: ['value'],
  render(h) {
    return h('input', {
      domProps: {
        value: this.value
      },
      on: {
        input: (e) => {
          this.$emit('input', e.target.value)
        }
      }
    })
  }
}
```

##### 事件 & 按键修饰符

| 修饰符                             | 前缀 |
| :--------------------------------- | :--- |
| `.passive`                         | `&`  |
| `.capture`                         | `!`  |
| `.once`                            | `~`  |
| `.capture.once` 或 `.once.capture` | `~!` |

| 修饰符                                      | 处理函数中的等价操作                                                                                            |
| :------------------------------------------ | :-------------------------------------------------------------------------------------------------------------- |
| `.stop`                                     | `event.stopPropagation()`                                                                                       |
| `.prevent`                                  | `event.preventDefault()`                                                                                        |
| `.self`                                     | `if (event.target !== event.currentTarget) return`                                                              |
| 按键： `.enter`, `.13`                      | `if (event.keyCode !== 13) return` (对于别的按键修饰符来说，可将 `13` 改为[另一个按键码](http://keycode.info/)) |
| 修饰键： `.ctrl`, `.alt`, `.shift`, `.meta` | `if (!event.ctrlKey) return` (将 `ctrlKey` 分别修改为 `altKey`、`shiftKey` 或者 `metaKey`)                      |

```js
on: {
  keyup: function (event) {
    // 如果触发事件的元素不是事件绑定的元素
    // 则返回
    if (event.target !== event.currentTarget) return
    // 如果按下去的不是 enter 键 或 没有同时按下 shift 键
    if (!event.shiftKey || event.keyCode !== 13) return
    // 阻止 事件冒泡
    event.stopPropagation()
    // 阻止该元素默认的 keyup 事件
    event.preventDefault()
    // ...
  }
}
```

##### 插槽

`this.$slots` ：静态插槽内容 - 一个 VNode 数组

```js
render: function (createElement) {
  // `<div><slot></slot></div>`
  return createElement('div', this.$slots.default)
}
```

`this.$scopedSlots`：作用域插槽 - 返回若干 VNode 的函数

```js
render: function (createElement) {
  return createElement('div', [
    createElement('child', {
      // 在数据对象中传递 `scopedSlots`
      // 格式为 { name: props => VNode | Array<VNode> }
      scopedSlots: {
        default: function (props) {
          return createElement('span', props.text)
        }
      }
    })
  ])
}
// `<div><child v-slot="props"><span>{{ props.text }}</span></child></div>`
```

```js
// children
props: ['message'],
render: function (createElement) {
  // `<div><slot :text="message"></slot></div>`
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.message
    })
  ])
}
```

#### JSX

[Babel 插件](https://github.com/vuejs/jsx)，在 Vue 中使用 JSX 语法

```js
import AnchoredHeading from './AnchoredHeading.vue'

new Vue({
  el: '#demo',
  render: function (h) {
    return (
      <AnchoredHeading level={1}>
        <span>Hello</span> world!
      </AnchoredHeading>
    )
  }
})
```

babel ^3.4.0+^，自动注入 `const h = this.$createElement`

#### 函数式组件

函数式组件 ^2.3.0+^后，组件 attribute 隐式解析成 prop

- 只是函数，渲染开销更低

```js
Vue.component('my-component', {
  functional: true,
  // Props 是可选的
  props: {
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    // ...
  }
})
```

##### context 参数说明

- `props`：提供所有 prop 的对象
- `children`：VNode 子节点的数组
- `slots`：一个函数，返回了包含所有插槽的对象
- `scopedSlots`^2.6.0+^：传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- `data`：传递给组件的整个[数据对象](https://cn.vuejs.org/v2/guide/render-function.html#深入数据对象)，作为 `createElement` 的第二个参数传入组件
  - attr：attribute
  - on：事件处理函数
- `parent`：对父组件的引用
- `listeners`^2.3.0+^：所有父组件为当前组件注册的事件监听器的对象。 **`data.on` 的一个别名**。
- `injections`^2.3.0+^：包含了应当被注入（inject）的 property

##### 单文件组件

```html
<template functional> </template>
```

##### 向子元素或子组件传递 attribute 和 事件

普通组件，没有定义为 prop 的 attribute 会自动添加到根元素，同名 attribute 自动合并（传入优先）。

函数组件，不包含上述行为，需要智能合并

```js
Vue.component('my-functional-button', {
  functional: true,
  render: function (createElement, context) {
    // 完全透传任何 attribute、事件监听器、子节点等。
    return createElement('button', context.data, context.children)
  }
})
```

通过传递 context.data，会将里面的 on 和 attr 传递下去，在组件上不需要 .native 也能触发事件。

##### slots() 和 children

```html
<my-functional-component>
  <p v-slot:foo>first</p>
  <p>second</p>
</my-functional-component>
```

`slots`：slots().default 和 slots().foo

`children`：等效 slots().default

## 插件

### 用途

- 全局方法 或 property
- 全局资源：指令、过滤器、过渡
- 全局混入
- Vue 实例方法，`Vue.prototype`
- 提供自己 API

### 使用

全局方法 `Vue.use()` 使用插件。在 `new Vue()`之前

- 可以传入可选对象
- 多次注册，只执行一次

```js
Vue.use(MyPlugin, { someOption: true })
```

> 官方插件会自动调用 Vue.use

### 开发插件

```js
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或 property
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
    ...
  })

  // 4. 添加实例方法
  Vue.prototype.$myMethod = function (methodOptions) {
    // 逻辑...
  }
}
```

## 过滤器

用于常见文本格式化。

### 使用

**双花括号插值** 和 `v-bind` 表达式^2.1.0+^

- 过滤器第一个参数为 **表达式的值**
- 过滤器可以**串联**

```html
<!-- 在双花括号中 -->
{{ message | capitalize }}

<!-- 在 `v-bind` 中 -->
<div v-bind:id="rawId | formatId"></div>

{{ message | filterA | filterB }} {{ message | filterA('arg1', arg2) }}
```

### 全局过滤器

```js
Vue.filter('capitalize', function (value) {
  return ...
})
```

### 局部过滤器

```js
filters: {
  capitalize(value) {
    return ...
  }
}
```

> 全局过滤器和局部过滤器同名，采用局部过滤器

## 安全

**永远不要将不可信任的内容作为模板内容使用**

### vue 的安全措施

#### HTML 内容

```html
<h1>{{ userProvidedString }}</h1>
```

```js
'<script>alert("hi")</script>' // userProvidedString
```

使用模板还是渲染函数，内容都会被自动转义。

```html
&lt;script&gt;alert(&quot;hi&quot;)&lt;/script&gt;
```

#### Attribute 绑定

```html
<h1 v-bind:title="userProvidedString">hello</h1>
```

```js
'" onclick="alert(\'hi\')'
```

动态 attribute 绑定也会自动被转义

```html
&quot; onclick=&quot;alert('hi')
```

### 潜在危险

#### 注入 HTML

==永远不要认为用户提供的 HTML 是 100% 安全的，除非它是在一个 iframe 沙盒里或者应用中只有编写该 HTML 的用户可以接触到它。==。

当你清楚 HTML 安全，可以通过以下方式显示渲染 HTML。

##### 模板

```html
<div v-html="userProvidedHtml"></div>
```

##### 渲染函数

```js
h('div', {
  domProps: {
    innerHTML: this.userProvidedHtml
  }
})
```

##### JSX 渲染函数

```jsx
<div domPropsInnerHTML={this.userProvidedHtml}></div>
```

#### 注入 URL

对 URL 进行“过滤”以防止通过 `javascript:` 来执行 JavaScript

```html
<a v-bind:href="userProvidedUrl"> click me </a>
```

> [sanitize-url](https://www.npmjs.com/package/@braintree/sanitize-url) 可以帮助过滤

#### 注入样式

通过注入样式，添加蒙层，伪造网页。

```html
<a v-bind:href="sanitizedUrl" v-bind:style="userProvidedStyles"> click me </a>
```

推荐使用对象语法，可以限定动态绑定值

```html
<a
  v-bind:href="sanitizedUrl"
  v-bind:style="{
    color: userProvidedColor,
    background: userProvidedBackground
  }"
>
  click me
</a>
```

#### 注入 script

==永远不要认为用户提供的 JavaScript 是 100% 安全的，除非它是在一个 iframe 沙盒里或者应用中只有编写该 JavaScript 的用户可以接触到它。==。

## 深入响应式原理

遍历 data，使用 `Object.defineProperty` ^es5+^将 data 中属性 转为 getter/setter。

每个组件实例都对应一个 **watcher** 实例

1. 记录依赖：在组件渲染的过程中把“接触”过的数据 property 记录为依赖。
2. 监听依赖：当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。

![](https://cn.vuejs.org/images/data.png)

> ==不能检测数据和对象变化==

### 检测变化注意事项

#### 对于对象

问题：由于 Vue 会在初始实例时 执行 getter/setter 转换，所以**未在 data 对象中预先定义**的属性，**无法被监听**。

```js
var vm = new Vue({
  data: {
    a: 1
  }
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的
```

解决：通过 Vue.set 添加响应式 property 。

`Vue.set(object, propertyName, value)`

```js
Vue.set(vm.someObject, 'b', 2)
this.$set(this.someObject, 'b', 2)
```

说明：

1. 已创建的实例，无法添加根级 property。
2. 别名 vm.$set

##### 多值响应式

- #1 和 #2 都不能正确触发响应式
- #3 可以，创建了一个新对象

```js
export default {
  data() {
    return {
      obj: {
        a: 1,
        b: 2,
        c: 3
      }
    }
  },
  methods: {
    updateData() {
      Object.assign(this.obj, { a: 2 })
    },
    addData() {
      this.obj.a++
      this.obj.b++
      this.obj.c++
    }
  },
  mounted() {
    // #1
    this.obj = Object.assign(this.obj, {
      d: 4,
      e: 5
    })
    // #2
    Object.assign(this.obj, {
      d: 4,
      e: 5
    })
    // #3
    this.obj = Object.assign({}, this.obj, { d: 4, e: 5 })
  }
}
```

#### 对于数组

Vue 不能检测以下数组变动

1. 索引值访问
2. 修改数组长度

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

解决：

1. 索引值访问：通过 set 或 splice 解决

```js
Vue.set(vm.items, indexOfItem, newValue)
vm.$set(vm.items, indexOfItem, newValue)

vm.items.splice(indexOfItem, 1, newValue)
```

2. 修改数组长度：使用 splice 解决

```js
vm.items.splice(newLength)
```

#### 声明响应式 property

==Vue 不允许动态添加根级响应式 property，所以必须在初始化实例前声明所有根级响应式 property==

- 消除依赖项跟踪边界问题
- 代码可读性

#### 异步更新队列

Vue 更新 dom 是异步执行。

1. 监听到数据变化。Vue 开启一个队列，并缓冲同一事件循环内所有数据变更。同一 watcher 多次触发，只会推一次（自动去重）。

2. 下一次 事件循环 ‘tick’，Vue 刷新队列执行内容
3. Vue 在内部 对 异步队列尝试 原生 `Promise.then`、`MutationObserver` 和 `setImmediate`，环境不支持，采用 `setTimeout(fn, 0)`

例子：对 textContent 的设置不会立即更新，会在下一次事件循环 tick 更新

```js
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

通过 nextTick 保证数据更新

- nextTick 回调函数 this 会自动绑定到 Vue 上
- `$nextTick()` 返回一个 `Promise` 对象

# 补充

## ? DOM property 和 attribute

ref: [1](https://blog.csdn.net/rudy_zhou/article/details/104058741) [2](https://www.jb51.net/article/146813.htm) [3](https://stackoverflow.com/questions/6003819/properties-and-attributes-in-html#answer-6004028)

`attribute`：dom 元素在文档中作为 html 标签拥有的属性

`property`：dom 元素在 js 中作为对象拥有的属性

- 标准属性：`attribute`和`property`是同步的
- 自定义属性：不会自动添加到`property`

### 转换

通过**attributes**输出，结果为**attr 对象**

```html
<div class="divClass" id="divId"></div>
```

```js
var divId = document.getElementById('divId')
console.log(divId.attributes) // 获取attribute
console.log(divId.getAttribute('class')) // 获取attribute值
```

html**自带属性**会转为 **property**，而**自定义不会**

```html
<div class="divClass" id="divId" haha="nihao"></div>
```

```js
// ...
// 获取property
console.log(divId.class) //  divClass
console.log(divId.addUserDefine) // undefined
```

### 单向绑定

**修改 property**属性，**不改变 attribute**(value，class)

```html
<!-- 修改property -->
<input value="initValue" id="ipt" />
<!-- 修改后 value="changeValue" -->
```

```js
// ...
ipt.value = 'changeValue'
console.log(ipt.value) // changeValue
console.log(ipt.getAttribute('value')) // initValue
```

**修改 attribute**属性，**会改变 property**，**property 会自动同步**attribute

```js
ipt.setAttribute('value', 'changeValue')
console.log(ipt.value) // changeValue
console.log(ipt.getAttribute('value')) // changeValue
```

> 对属性`property`可以赋任何类型的值，而对`attribute`只能赋值字符串

### 双向绑定

`id`，property 与 attribute 更新会互相影响

`type`，但**值只能为已知值**（`text`，`submit`，`button`，`checkbox`等），如果值不正确，默认设置为`text`，

```js
var inputDom = document.querySelector('#inputId')
console.log(inputDom.getAttribute('type')) // text
console.log(inputDom.type) // text

inputDom.setAttribute('type', '007')
console.log(inputDom.getAttribute('type')) // 007
console.log(inputDom.type) // text

inputDom.type = '008'
console.log(inputDom.getAttribute('type')) //008
console.log(inputDom.type) // text

inputDom.setAttribute('type', 'password')
console.log(inputDom.getAttribute('type')) // password
console.log(inputDom.type) // password

inputDom.type = 'password'
console.log(inputDom.getAttribute('type')) // password
console.log(inputDom.type) // password
```

## 语法糖

### v-bind

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```

### v-on

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

# todo

[侦听器案例](https://cn.vuejs.org/v2/guide/computed.html#%E4%BE%A6%E5%90%AC%E5%99%A8)

[is](https://cn.vuejs.org/v2/api/#is)

[DOM 模板解析说明](https://cn.vuejs.org/v2/guide/components.html#解析-DOM-模板时的注意事项)

https://cn.vuejs.org/v2/api/#devtools)
