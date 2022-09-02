---
title: 可复用性 & 组合
order: 4
---

# 可复用性 & 组合

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

| 修饰符                                      | 处理函数中的等价操作                                         |
| :------------------------------------------ | :----------------------------------------------------------- |
| `.stop`                                     | `event.stopPropagation()`                                    |
| `.prevent`                                  | `event.preventDefault()`                                     |
| `.self`                                     | `if (event.target !== event.currentTarget) return`           |
| 按键： `.enter`, `.13`                      | `if (event.keyCode !== 13) return` (对于别的按键修饰符来说，可将 `13` 改为[另一个按键码](http://keycode.info/)) |
| 修饰键： `.ctrl`, `.alt`, `.shift`, `.meta` | `if (!event.ctrlKey) return` (将 `ctrlKey` 分别修改为 `altKey`、`shiftKey` 或者 `metaKey`) |

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