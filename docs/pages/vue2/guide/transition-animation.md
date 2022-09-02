---
title: 过渡 & 动画
order: 3
---

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

# 