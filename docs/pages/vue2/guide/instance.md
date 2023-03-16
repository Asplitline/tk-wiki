---
outline: deep
title: Vue 基础
order: 1
---

# Vue 基础

## Vue 实例

### 数据与方法

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

注意：**只有当实例被创建时就已经存在于 `data` 中的 property 才是响应式的**

`Object.freeze()`：冻结一个对象，**阻止修改现有 property**，禁用响应式。

补充：冻结对象后

1. 不能新增属性
2. 不能删除属性
3. 不能修改属性值和修改属性可枚举性、可配置性、可写性
4. 不能修改原型

**实例 property 与方法**：前缀 `$`，以便与用户定义的 property 区分开来

> 选择根元素，可用`$0.__vue__` 浏览器获取 vue

### 生命周期钩子

<img src="https://v2.cn.vuejs.org/images/lifecycle.png" alt="Vue 实例生命周期" style="zoom: 67%;" />

| 周期函数      | 执行时机                           | 补充                                                                                               |
| ------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------- |
| beforeCreate  | 实例初始化之前                     | 初始化空对象实例，只有默认生命周期函数和默认事件                                                   |
| created       | 实例被创建之后                     | 实例已完成对选项的处理（数据侦听、计算属性、方法、事件/侦听器的回调函数）- data 和 method 已初始化 |
| beforeMounted | 挂载开始之前                       | `render` 函数首次被调用，但 dom 还未挂载                                                           |
| mounted       | 实例被挂载后                       | `el` 被新创建的 `vm.$el` 替换                                                                      |
| beforeUpdate  | 数据改变后，DOM 更新前             | 适合在现有 DOM 将要被更新之前访问                                                                  |
| updated       | 虚拟 DOM 重新渲染和更新完毕之后    | 执行依赖于 DOM 的操作，此时页面和数据保持同步                                                      |
| activated     | 被 keep-alive 缓存的组件**激活**时 |                                                                                                    |
| deactivated   | 被 keep-alive 缓存的组件**失活**时 |                                                                                                    |
| beforeDestroy | 实例销毁前                         | 准备进入销毁状态，所有操作还可用                                                                   |
| destroyed     | 实例销毁后调用                     | 调用后，对应 Vue 实例的所有指令都被解绑，所有的事件监听器被移除，所有的子实例也都被销毁。          |
| errorCaptured | 捕获一个来自后代组件的错误时被调用 |                                                                                                    |

#### created

`$el` property 目前尚不可用

#### mounted

**不会**保证所有的**子组件**也都被挂载完成。在 `mounted` 内部使用 `vm.$nextTick`，可等到整个视图渲染完成。

```js
mounted: function () {
  this.$nextTick(function () {
    // 仅在整个视图都被渲染之后才会运行的代码
  })
}
```

注意：服务器渲染期间不被调用

#### beforeUpdate

在服务器端渲染期间不被调用，因为只有初次渲染（created）会在服务器端进行

#### updated

`updated` **不会**保证所有的子组件也都被重新渲染完毕。

解决方法：`vm.$nextTick`

生命周期钩子的 `this` 上下文指向调用它的 Vue 实例

注意：服务器渲染期间不被调用

#### activated，deactivated，beforeDestroy，destroyed

服务器渲染期间不调用

#### errorCaptured

`(err: Error, vm: Component, info: string) => ?boolean`

参数说明：

err：错误对象

vm：发生错误的组件实例

info：错误来源信息的字符串

> 返回 `false` 以阻止该错误继续向上传播

## 模板语法

在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。Vue 能计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少。

### 插值

文本：使用双大括号语法 （ Mustache 语法 ）

```html
<span>Message: {{ msg }}</span>
```

一次性插值

```html
<span v-once>这个将不会改变: {{ msg }}</span>
```

双大括号插值会将文本解释为普通文本，无法输出 html

v-html：解析 html

```html
<span v-html="rawHtml"></span>
```

### 指令

指令 (Directives) 是带有 `v-` 前缀的特殊 attribute。

指令预期值是 JavaScript 表达式（v-for 是例外）

作用：表达式值改变，响应式作用于 DOM

#### 参数

一些指令能够接收一个“参数”，在指令名称之后**以冒号表示**

```html
<a v-bind:href="url">...</a>
```

#### 动态参数

> 2.6.0+

用**方括号**括起来的 JavaScript 表达式作为一个指令的参数

```html
<a v-on:[eventName]="doSomething"> ... </a>
```

##### 对值的约束

动态参数预期会求出一个**字符串**，异常情况下值为 `null`。

可以通过显示设置 null 来移除动态属性

##### 对表达式约束

某些字符，如**空格和引号**，放在 HTML attribute 名里是**无效的**

推荐：不使用引号或空格，用计算属性代替

```html
<!-- 这会触发一个编译警告 -->
<a v-bind:['foo' + bar]="value"> ... </a>
```

**大小写不敏感**，浏览器会把 attribute 名全部强制转为小写

#### 修饰符

以半角句号 `.` 指明的特殊后缀，指出指令以特殊方式绑定

```html
<form v-on:submit.prevent="onSubmit">...</form>
```

### 缩写

v-bind 缩写

```html
<!-- 完整语法 -->
<a v-bind:href="url">...</a>

<!-- 缩写 -->
<a :href="url">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a :[key]="url"> ... </a>
```

v-on 缩写

```html
<!-- 完整语法 -->
<a v-on:click="doSomething">...</a>

<!-- 缩写 -->
<a @click="doSomething">...</a>

<!-- 动态参数的缩写 (2.6.0+) -->
<a @[event]="doSomething"> ... </a>
```

## 计算属性和侦听器

### 计算属性

**计算属性是基于它们的响应式依赖进行缓存的**。

只在相关响应式依赖发生改变时它们才会重新求值。

例子：下面计算属性不再更新

```js
computed: {
  now: function () {
    return Date.now()
  }
}
```

分析：Date.now() 不是响应式依赖

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

### 计算属性 vs 方法 vs 侦听器

计算属性：带缓存，根据缓存响应式更新

方法：没有缓存，每次调用都会重新执行

侦听器：随数据变化而更新。可以进行异步处理，并且再得到最终结果前设置中间状态（计算属性无法做到）

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

active 这个类是否存在，取决于 isActive 的 Truthy [[1] Truthy](#相关链接)

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

#### 用在组件上

class 在**自定义组件**上使用，会自动绑定到**组件根元素**上（合并的形式）

```js
Vue.component('my-component', {
  template: '<p class="foo bar">Hi</p>'
})
```

```html
<my-component class="baz boo"></my-component>
```

```html
<p class="foo bar baz boo">Hi</p>
```

### 绑定内联样式

`v-bind:style`

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

注意：Vue.js 自动侦测并添加[[2] 浏览器前缀](#相关链接)

#### 多重值 2.3+

`style` 绑定中的 property 提供一个包含多个值的数组，常用于提供多个带前缀的值

只会渲染数组中**最后一个被浏览器支持的值**

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

## 条件渲染

### v-if

v-if：指令表达式返回`truthy`时条件性渲染一块内容。

```js
<h1 v-if="awesome">Vue is awesome!</h1>
```

切换多个元素，通常将`template` 当作不可见包裹元素进行**条件渲染**分组

```html
<template v-if="">
  <p v-if="">1</p>
  <p v-else-if="">2</p>
  <p v-else>3</p>
</template>
```

默认情况下：vue 尽可能高效渲染元素，会尽量复用元素

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" />
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" />
</template>
```

问题：不会清除 input 里面的的内容。因为 Vue 尽可能复用， input 不会被替换，只替换 placeholder。

解决：添加 `key` attribute，使元素独立，不复用

```html
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input" />
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input" />
</template>
```

### v-show

v-show：同 v-if 为条件渲染，但元素始终被渲染在 DOM 中，只是单纯切换`display`

> 不支持**template**和**v-else**

### v-if vs v-show

`v-if`

- 事件和子组件适当的销毁重建
- 惰性，条件为真，才会渲染
- 更高的切换开销

`v-show`

- 不管条件，总会渲染
- 更高的初始渲染开销

> 还需要考虑对生命周期的影响

## 列表渲染

### v-for

`(item , index | name ) in items`

`(item, name | index , index) in items`

参数说明：

第一参数

`item` ： 被迭代元素别名

第二参数

`index`： 当前项索引（数组）

name：键名（对象）

第三参数

`index` - 当前项索引（对象）

```html
<div v-for="(value, name, index) in object"></div>
```

`of` 可以替换 `in`

遍历顺序：按 `Object.keys()`

### 维护状态

v-for 默认渲染策略：数据项**顺序改变**，**不会移动 DOM 匹配数据项**，就地更新元素。通常通过 key 来确保每个索引都正确显示

默认渲染策略是高效的，但只适用于不依赖组件状态或临时 DOM 状态的列表渲染输出。

总结：数据改变，就地更新，DOM 不变，通过 key 重用重排元素。

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

不会变更数组，总是均返回新数组

- `filter()`
- `concat()`
- `slice()` - (start,end)

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表

Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的**启发式方法**，所以用一个含有**相同元素的数组**去替换**原来的数组**是非常高效的操作

#### 注意事项

Vue **不能检测**数组和对象的变化

### 显示过滤/排序后结果

显示数组经过过滤或排序后的版本，而不实际变更或重置原始数据。通常通过 computed 实现。

```html
<li v-for="n in evenNumbers">{{ n }}</li>
```

```js
data: {
  numbers: [ 1, 2, 3, 4, 5 ]
},
computed: {
  evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

计算属性局限：无法传参

```html
<ul v-for="set in sets">
  <li v-for="n in even(set)">{{ n }}</li>
</ul>
```

```js
data: {
  sets: [[ 1, 2, 3, 4, 5 ], [6, 7, 8, 9, 10]]
},
methods: {
  even: function (numbers) {
    return numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
}
```

解决：使用 methods 代替

### v-for 使用范围值

可以接受整数

```html
<div>
  <span v-for="n in 10">{{ n }} </span>
</div>
```

### `<template>` 上使用 v-for

```html
<ul>
  <template v-for="item in items">
    <li>{{ item.msg }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>
```

### v-if 和 v-for

不推荐同时使用 v-if 和 v-for

当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。即会先循环完成后，在进行条件判断。

解决：template 包裹

```html
<template v-if="todos.length">
  <li v-for="todo in todos">{{ todo }}</li>
</template>
```

### 组件上使用 v-for

基本语法同普通元素，但是 2.2+ 版本后，组件上使用 v-for 需带上 key

```html
<my-component v-for="item in items" :key="item.id"></my-component>
```

任何数据都不会被自动传递到组件里，因为组件有独立作用域。

原因：减少代码耦合，手动通过 props 注入，这样能明确数据来源。

```html
<my-component v-for="(item, index) in items" v-bind:item="item" v-bind:index="index" v-bind:key="item.id"></my-component>
```

使用 DOM 模板时，在 `<ul>` 元素内只有 `<li>` 元素会被看作有效内容

解决：通过`is`设置组件，可以避开浏览器解析错误

```html
<ul>
  <my-component></my-component>
</ul>
<!-- is attr -->
<ul>
  <li is="my-component"></li>
</ul>
```

## 事件处理

### 事件处理方法

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
      ...
    }
  }
})
vm.greet() // 通过实例调用
```

### 内联事件处理方法

```html
<button v-on:click="greet(1,$event)">Greet</button>
```

`$event`：事件对象

### 事件修饰符

通过事件修饰符，代替在时间处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()`等等

- `.stop`
- `.prevent`

- `.capture` - 捕获模式，从外部到内部触发事件。
- `.self` - 在 `event.target` 是当前元素自身时，触发处理函数
- `.once` 2.1.4+ - 事件只触发一次 (可用在组件上面，而其他修饰符只能对原生 DOM 事件起作用)
- `.passive` 2.3.0+ - 直接触发默认行为，优化移动端的，如 `onScroll`

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

<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

注意：[[3] 顺序会影响结果](#相关链接)

- 阻止所有点击 `v-on:click.prevent.self`
- 阻止自身点击 `v-on:click.self.prevent`

不要让 `passive` 和 `prevent` 一起使用，`prevent`会被忽略，因为`passive`不阻止默认行为

### 按键修饰符

监听键盘事件时添加按键修饰符

```html
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit" />
```

直接将 [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名转换为 kebab-case 来作为修饰符

```html
<input v-on:keyup.page-down="onPageDown" />
```

按键码

处理函数只会在 `$event.key` 等于 `13` 时被调用

```html
<input v-on:keyup.13="submit" />
```

> ~~`keyCode`~~废弃

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

仅在按下相应按键时才触发鼠标或键盘事件的监听器

- `.ctrl`
- `.alt`
- `.shift`
- `.meta` - windows | command
- `.exact` 2.5.0+ - 控制由精确的系统**修饰符组合**触发的事件，严格按照修饰符执行。
  - `v-on:click.ctrl` - Ctrl 组合其他键也能触发
  - `v-on:click.ctrl.exact` - 仅有 Ctrl 被按下才能触发
  - `v-on:click.exact` - 单纯的点击

```html
<!-- Alt + C -->
<input v-on:keyup.alt.67="clear" />

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```

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

1. 轻松**定位**JavaScript 中对应方法
2. **JavaScript 无需绑定事件**，与 DOM 解耦，纯粹的逻辑
3. 事件随 ViewModel 销毁**自动销毁**

## 表单绑定

### 基础用法

`v-model` 会忽略表单的 `value`、`checked`、`selected` attribute 的初始值，总是将 Vue 实例数据作为数据来源，应该在**data 中初始化**

v-model 本质是语法糖

- text / textarea ： `value + @input`
- checkbox / radio ： `checked + @change`
- select ： `value + @change`

#### 文本

```html
<input v-model="message" placeholder="edit me" />
<p>Message is: {{ message }}</p>
```

#### 多行文本

```html
<textarea v-model="message" placeholder="add multiple lines"></textarea>
```

注：在文本区域插值 (`<textarea>{{text}}</textarea>`) 并不会生效

#### 复选框

```html
<input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
<label for="jack">Jack</label>
<input type="checkbox" id="john" value="John" v-model="checkedNames" />
<label for="john">John</label>
<input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
<label for="mike">Mike</label>
```

#### 单选按钮

```html
<div id="example-4">
  <input type="radio" id="one" value="One" v-model="picked" />
  <label for="one">One</label>
  <br />
  <input type="radio" id="two" value="Two" v-model="picked" />
  <label for="two">Two</label>
  <br />
  <span>Picked: {{ picked }}</span>
</div>
```

#### 选择框

```html
<div id="example-5">
  <select v-model="selected">
    <option disabled value="">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>Selected: {{ selected }}</span>
</div>
```

v-model 初始未匹配任何对象，通过 disabled + value 禁用

```html
<option disabled value="">请选择</option>
```

### 值绑定

v-model 绑定值通常为 静态字符串

```html
<!-- 当选中时，`picked` 为字符串 "a" -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` 为 true 或 false -->
<input type="checkbox" v-model="toggle" />

<!-- 当选中第一个选项时，`selected` 为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>
```

通过 v-bind 把值绑定到动态 property 上，并且 property 值可以不是字符串

#### 复选

```html
<input type="checkbox" v-model="toggle" true-value="yes" false-value="no" />
```

```js
vm.toggle === 'yes' // 选中
vm.toggle === 'no' // 没有选中
```

#### 单选按钮

```html
<input type="radio" v-model="pick" v-bind:value="a" />
```

```js
// 当选中时
vm.pick === vm.a
```

#### 选择框的选项

选择框选项支持对象字面量

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

`.lazy` - v-model 默认为`input`事件，使用后转为`change`事件

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" />
```

`.number` - 输入值转为**数值**类型

规则：

1. `type="number"` 时，HTML 值也总会返回字符串。
2. 值无法被 `parseFloat()` 解析，则会返回原始的值。

```html
<input v-model.number="age" type="number" />
```

`.trim` - 自动过滤**首尾空白**

```html
<input v-model.trim="msg" />
```

## 组件基础

### 组件的复用

组件是**可复用的 vue 实例**。

需遵守以下规则

1. **data 选项必须为函数**。用以保证每个实例维护一个**独立拷贝**。否则，实例间将共享数据。
2. 每个组件必须**只有一个根元素**

### prop 传值

父组件通过 prop 可以向子组件传值

```js
Vue.component('blog-post', {
  props: ['title'],
  template: '<h3>{{ title }}</h3>'
})
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

### 单个根元素

每个组件必须只有一个根元素

### 监听子组件事件

组件中`$emit` 触发

#### 使用事件抛出一个值

不传值

```html
<blog-post ... v-on:enlarge-text="postFontSize += 0.1"></blog-post>
<!-- blog-post -->
<button v-on:click="$emit('enlarge-text')">Enlarge text</button>
```

传值：通过`$event`获取值

```html
<blog-post ... v-on:enlarge-text="postFontSize += $event"></blog-post>
<!-- blog-post -->
<button v-on:click="$emit('enlarge-text', 0.1)">Enlarge text</button>
```

#### 组件上使用 v-model

自定义事件也可以用于创建支持 `v-model` 的自定义输入组件

```html
<input v-model="searchText" />
<!-- 等价写法 -->
<input :value="searchText" @input="searchText=$event.target.value" />
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

is 属性用于 常规 HTML 元素，这些元素将视为组件

这个*attribute*以用于常规 HTML 元素，但这些元素将被视为组件，这意味着所有的 attribute 都会*作为 DOM attribute 被绑定*。对于像 `value` 这样的 property，若想让其如预期般工作，你需要使用 _`.prop` 修饰器_。

HTML 属性 和 DOM 属性区别

**HTML 属性** (attribute)和 **DOM 属性**(property)，是相互关联的。

多数情况`attribute`值仅用作初始 DOM 节点对象使用，而`property`更多用于页面交互

### 解析-DOM-模板注意事项

`<ul>`、`<ol>`、`<table>` 和 `<select>`，对哪些元素（`<li>`、`<tr>` 和 `<option>`）可以出现在其内部是有严格限制的。

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

自定义组件 `<blog-post-row>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。

解决：使用常规元素，但通过 is 指定组件

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

以下条件不存在限制

- `字符串` (`template: '...'`)
- `单文件`组件 (`.vue`)
- `<script type="text/x-template">`

## 相关链接

[[1] Truthy](https://developer.mozilla.org/zh-CN/docs/Glossary/Truthy)

[[2] 浏览器前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)

[[3] 顺序会影响结果](https://blog.csdn.net/catascdd/article/details/108264406)
