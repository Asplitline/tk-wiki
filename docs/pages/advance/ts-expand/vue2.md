---
title: TS 在 Vue2 中应用
order: 2
---

# TS 在 Vue2 中应用

## 推荐配置

```js
// tsconfig.json
{
  "compilerOptions": {
    // 与 Vue 的浏览器支持保持一致
    "target": "es5",
    // 这可以对 `this` 上的数据 property 进行更严格的推断
    "strict": true,
    // 如果使用 webpack 2+ 或 rollup，可以利用 tree-shake:
    "module": "es2015",
    "moduleResolution": "node"
  }
}
```

> [[1] ts cli 配置](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

## 基本用法

要让 TypeScript 正确推断 Vue 组件选项中的类型，您需要使用 `Vue.component` 或 `Vue.extend` 定义组件

```js
import Vue from 'vue'
const Component = Vue.extend({
  // 类型推断已启用
})

const Component = {
  // 这里不会有类型推断，
  // 因为 TypeScript 不能确认这是 Vue 组件的选项
}
```

## 基于类的 Vue 组件

使用官方维护 [[2] vue-class-component](https://github.com/vuejs/vue-class-component) 装饰器，实现基于类的 API

```js
import Vue from 'vue'
import Component from 'vue-class-component'

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  // 所有的组件选项都可以放在这里
  template: '<button @click="onClick">Click!</button>'
})
export default class MyComponent extends Vue {
  // 初始数据可以直接声明为实例的 property
  message: string = 'Hello!'

  // 组件方法也可以直接声明为实例的方法
  onClick(): void {
    window.alert(this.message)
  }
}
```

## 增强类型以配合插件

插件可以增加 Vue 的全局/实例 property 和组件选项，在 TypeScript 中制作插件需要类型声明。TypeScript 有一个特性来补充现有的类型，叫做 [[3] 模块补充 (module augmentation)](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)

声明一个 string 类型 实例 property

```js
// 1. 确保在声明补充的类型之前导入 'vue'
import Vue from 'vue'

// 2. 定制一个文件，设置你想要补充的类型
//    在 types/vue.d.ts 里 Vue 有构造函数类型
declare module 'vue/types/vue' {
// 3. 声明为 Vue 补充的东西
  interface Vue {
    $myProperty: string
  }
}
```

```js
var vm = new Vue()
console.log(vm.$myProperty) // 将会顺利编译通过
```

声明额外的 property 和组件选项

```js
import Vue from 'vue'

declare module 'vue/types/vue' {
  // 可以使用 `VueConstructor` 接口
  // 来声明全局 property
  interface VueConstructor {
    $myGlobal: string
  }
}

// ComponentOptions 声明于 types/options.d.ts 之中
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    myOption?: string
  }
}
```

```js
// 全局 property
console.log(Vue.$myGlobal)

// 额外的组件选项
var vm = new Vue({
  myOption: 'Hello'
})
```

## 标注返回值

Vue 的声明文件天生就具有循环性，TypeScript 可能在推断某个方法的类型的时候存在困难。因此，你可能需要在 `render` 或 `computed` 里的方法上标注返回值

```js
import Vue, { VNode } from 'vue'

const Component = Vue.extend({
  data() {
    return {
      msg: 'Hello'
    }
  },
  methods: {
    // 需要标注有 `this` 参与运算的返回值类型
    greet(): string {
      return this.msg + ' world'
    }
  },
  computed: {
    // 需要标注
    greeting(): string {
      return this.greet() + '!'
    }
  },
  // `createElement` 是可推导的，但是 `render` 需要返回值类型
  render(createElement): VNode {
    return createElement('div', this.greeting)
  }
})
```

## 标注 prop

```js
import Vue, { PropType } from 'vue'

interface ComplexMessage {

title: string,
  okMessage: string,
  cancelMessage: string
}
const Component = Vue.extend({
  props: {
    name: String,
    success: { type: String },
    callback: {
      type: Function as PropType<() => void>
    },
    message: {
      type: Object as PropType<ComplexMessage>,
      required: true,
      validator (message: ComplexMessage) {
        return !!message.title;
      }
    }
  }
})
```

## 相关链接

[[1] ts Cli 配置](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

[[2] vue-class-component](https://github.com/vuejs/vue-class-component)

[[3] 模块补充 (module augmentation)](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation)
