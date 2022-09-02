---
title: Vue 基础
order: 1
---



# Vue 基础

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

| 周期函数      | 执行时机                           | 补充                                                         |
| ------------- | ---------------------------------- | ------------------------------------------------------------ |
| beforeCreate  | 实例初始化之前                     | 数据侦听和事件/侦听器的配置之前                              |
| created       | 实例被创建之后                     | 实例已完成对选项的处理（数据侦听、计算属性、方法、事件/侦听器的回调函数） |
| beforeMounted | 挂载开始之前                       | `render` 函数首次被调用                                      |
| mounted       | 实例被挂载后                       | `el` 被新创建的 `vm.$el` 替换                                |
| beforeUpdate  | 数据改变后，DOM 更新前             | 适合在现有 DOM 将要被更新之前访问                            |
| updated       | 虚拟 DOM 重新渲染和更新完毕之后    | 执行依赖于 DOM 的操作                                        |
| activated     | 被 keep-alive 缓存的组件**激活**时 |                                                              |
| deactivated   | 被 keep-alive 缓存的组件**失活**时 |                                                              |
| beforeDestroy | 实例销毁前                         |                                                              |
| destroyed     | 实例销毁后调用                     | 调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。 |
| errorCaptured | 捕获一个来自后代组件的错误时被调用 |                                                              |

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