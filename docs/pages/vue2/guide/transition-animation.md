---
outline: deep
title: 过渡 & 动画
order: 3
---

# 过渡 & 动画

## 单元素/组件过度

`transition` ：在下列情形中，可以给任何元素和组件添加进入/离开过渡

transition 生效场景

- 条件渲染 (使用 `v-if`)
- 条件展示 (使用 `v-show`)
- 动态组件
- 组件根节点

注意：只是过渡效果，不会影响元素的初始和最终状态

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

插入或删除包含在 `transition` 组件中的元素时，Vue 将会做以下处理

- 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
- 过渡组件提供钩子函数，恰当实际调用钩子函数
- 没有钩子函数也没检测到过渡或动画，DOM 操作在下一帧执行（此处帧指浏览器逐帧动画机制，不同于 nextTick）

### 过渡的类名

![Transition Diagram](https://v2.cn.vuejs.org/images/transition.png)

| 类名           | 生效           | 移除              | 说明             |
| -------------- | -------------- | ----------------- | ---------------- |
| v-enter        | 插入之前       | 插入之后下一帧    | 进入过渡开始状态 |
| v-enter-active | 插入之前       | 过渡/动画完成之后 | 进入过渡生效状态 |
| v-enter-to     | 插入之后下一帧 | 过渡/动画完成之后 | 进入过渡结束状态 |
|                |                |                   |                  |
| v-leave        | 离开过渡       | 离开过渡下一帧    | 离开过渡开始状态 |
| v-leave-active | 离开过渡       | 过渡/动画完成之后 | 离开过渡生效状态 |
| v-leave-to     | 离开过渡下一帧 | 过渡/动画完成之后 | 离开过渡结束状态 |

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

同 CSS 过渡，动画中 `v-enter` 类名在节点插入后不会立即删除，**在`animationed` 事件触发时删除**。

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

通过 attribute 自定义过渡类名，自定义类名优先级高于普通类名

- `enter-class`
- `enter-active-class`
- `enter-to-class` (2.1.8+)
- `leave-class`
- `leave-active-class`
- `leave-to-class` (2.1.8+)

自定义类名优先级高于普通类名，有利于 Vue 过渡系统和其他 CSS 动画库结合。如 [[1] Animate.css](#相关链接)

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css" />

<div id="example-3">
  <button @click="show = !show">Toggle render</button>
  <transition name="custom-classes-transition" enter-active-class="animated tada" leave-active-class="animated bounceOutRight">
    <p v-if="show">hello</p>
  </transition>
</div>
```

#### 同时使用动画和过渡

Vue 设置相应事件来监听过渡完成状态，`transitionend` 或 `animationend`，取决于元素 CSS 规则。

只使用一种：Vue 会自动识别类型并设置监听

同时使用：在 `type` attribute 并设置 `animation` 或 `transition` 来明确声明你需要 Vue 监听的类型。

#### 显性的过渡持续时间

> 2.2.0+

Vue 自动得出过渡效果的完成时机。默认情况下，Vue 会等待其在过渡效果的根元素的第一个 `transitionend` 或 `animationend` 事件。

场景：内部元素相比于根元素，延迟过渡。

解决：`<transition>` 组件上 duration prop 定制显式过渡（ms）。

```html
<transition :duration="1000">...</transition> <transition :duration="{ enter: 500, leave: 800 }">...</transition>
```

#### JavaScript 钩子

attribute 中 声明 Javascript 钩子函数

`(el,done)`

- el ：触发元素
- done：done 回调。当与 CSS 结合使用时,回调函数 done 是可选的

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
  enter: function (el, done) {
    done()
  },
  afterEnter: function (el) {},
  enterCancelled: function (el) {},
  // 离开时
  beforeLeave: function (el) {},
  leave: function (el, done) {
    done()
  },
  afterLeave: function (el) {},
  // leaveCancelled 只用于 v-show 中
  leaveCancelled: function (el) {}
}
```

钩子函数可以结合 CSS `transitions/animations` 使用，也可以单独使用

只有 JavaScript 过渡的时候：在 `enter` 和 `leave` 中必须使用 `done` 进行回调。否则会被同步调用，过渡立即完成

只有 JavaScript 过渡的元素添加 `v-bind:css="false"`。可以跳过 css 检查，避免 css 对过渡的影响

使用 Velocity.js 的简单例子

> [[2] VelocityJs](#相关链接)

```html
<!--
Velocity 和 jQuery.animate 的工作方式类似，也是用来实现 JavaScript 动画的一个很棒的选择
-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js"></script>

<div id="example-4">
  <button @click="show = !show">Toggle</button>
  <transition v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave" v-bind:css="false">
    <p v-if="show">Demo</p>
  </transition>
</div>
```

```js
new Vue({
  el: '#example-4',
  data: {
    show: false
  },
  methods: {
    beforeEnter: function (el) {
      el.style.opacity = 0
      el.style.transformOrigin = 'left'
    },
    enter: function (el, done) {
      Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
      Velocity(el, { fontSize: '1em' }, { complete: done })
    },
    leave: function (el, done) {
      Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
      Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
      Velocity(
        el,
        {
          rotateZ: '45deg',
          translateY: '30px',
          translateX: '30px',
          opacity: 0
        },
        { complete: done }
      )
    }
  }
})
```

### 初始渲染的过渡

`appear` attribute： 节点在首次渲染是否应用过渡

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

通常使用 v-if / v-else

常见多标签过渡：一个列表和描述这个列表为空消息的元素

```html
<transition>
  <table v-if="items.length > 0">
    <!-- ... -->
  </table>
  <p v-else>Sorry, no items found.</p>
</transition>
```

同名标签切换时，通过 key attribute 设置唯一值标记来区分，否则 Vue 只会替换相同标签内部的内容。

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

默认模式：过渡和离开同时发生

滑动过渡案例

```html
<transition name="no-mode-fade">
  <button v-if="isEditing" key="save" @click="toggle">On</button>
  <button v-else key="edit" @click="toggle">Off</button>
</transition>
```

```css
button {
  position: absolute;
}

.no-mode-fade-enter-active,
.no-mode-fade-leave-active {
  transition: all 1s;
}
.no-mode-fade-enter,
.no-mode-fade-leave-active {
  opacity: 0;
}
.no-mode-fade-enter {
  transform: translateX(34px);
}
.no-mode-fade-leave-to {
  transform: translateX(-34px);
}
```

`in-out`：新元素先进入，当前元素再离开

`out-in`：当前元素先离开，新元素再进入

### 多组件过渡

无需使用 key attribute，只需要使用动态组件

```html
<transition name="component-fade" mode="out-in">
  <component v-bind:is="view"></component>
</transition>
```

```js
new Vue({
  el: '#transition-components-demo',
  data: {
    view: 'v-a'
  },
  components: {
    'v-a': {
      template: '<div>Component A</div>'
    },
    'v-b': {
      template: '<div>Component B</div>'
    }
  }
})
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

`<transition-group>` 组件渲染整个列表

列表过渡具有以下特点

1. 非虚拟元素，是**真实元素**。默认 span，可通过 tag 更换

2. `<transition>` 中过渡模式不可用

3. 内部元素总需要 唯一 `key`

4. css 过渡的类**应用在内部**，而不是 组件/容器 本身。

#### 列表的进入/离开过渡

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
/* inline 不是 transformable element */
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
/* 离开过渡，先让元素脱离标准流 */
.list-leave-active {
  position: absolute;
}
```

#### 列表排序过渡

`<transition-group>` 不仅可以进入和离开动画，还可以改变定位。需新增 `v-move` class，同之前的类名，可以通过 `name` attribute 来自定义前缀，也可以通过 `move-class` attribute 手动设置

`v-move` 对于设置过渡的切换时机和过渡曲线非常有用

```html
<transition-group name="list" tag="ul">
  <li v-for="item in items" v-bind:key="item">{{ item }}</li>
</transition-group>
```

```css
/* 设置移动的过渡效果 - 可选 */
.list-move {
  transition: all 1s;
}
```

> 注意：inline 元素不是 [[3] transformable elements](#相关链接)，不支持 transform

#### 列表交错过渡

通过 data attribute 与 JavaScript 通信，就可以实现列表的交错过渡

### 可复用的过渡

`<transition>` 或者 `<transition-group>` 作为根组件，然后将任何子组件放置在其中

简单例子

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

函数式组件 (推荐)，funtional 属性为 true

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

```html
<transition v-bind:name="transitionName">
  <!-- ... -->
</transition>
```

不仅仅只有 attribute 可以利用，还可以通过事件钩子获取上下文中的所有数据

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

> [[4] gasp](#相关链接)

### 动态状态过渡

像 Vue 的过渡组件一样，数据背后状态过渡会实时更新

### 过渡放到组件里

管理太多的状态过渡会增加 Vue 实例和组件的复杂性，可以提取到子组件管理

```html
<script src="https://cdn.jsdelivr.net/npm/tween.js@16.3.4"></script>

<div id="example-8">
  <input v-model.number="firstNumber" type="number" step="20" /> + <input v-model.number="secondNumber" type="number" step="20" /> = {{
  result }}
  <p>
    <animated-integer v-bind:value="firstNumber"></animated-integer> + <animated-integer v-bind:value="secondNumber"></animated-integer> =
    <animated-integer v-bind:value="result"></animated-integer>
  </p>
</div>
```

```js
Vue.component('animated-integer', {
  template: '<span>{{ tweeningValue }}</span>',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function () {
    return {
      tweeningValue: 0
    }
  },
  watch: {
    value: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.value)
  },
  methods: {
    tween: function (startValue, endValue) {
      var vm = this
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 500)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0)
        })
        .start()

      animate()
    }
  }
})
```

> [tween.js](https://github.com/tweenjs/tween.js)

## 相关链接

[[1] Animate.css](https://daneden.github.io/animate.css/)

[[2] Velocity.js](http://velocityjs.org/)

[[3] transformable elements](https://drafts.csswg.org/css-transforms-1/#transformable-element)

[[4] gasp](https://www.npmjs.com/package/gsap)
