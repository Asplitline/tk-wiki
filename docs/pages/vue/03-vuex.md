---
title : Vuex
---



# Vuex

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。

- 采用**集中式**存储管理应用的所有组件的状态
- 以相应的规则保证状态以一种**可预测**的方式发生变化

## 介绍

### 状态管理模式

- **state**，驱动应用的数据源
- **view**，以声明方式将 **state** 映射到视图
- **actions**，响应在 **view** 上的用户输入导致的状态变化

多个组件共享状态，单项数据流简洁性容易破坏

- 多个视图*依赖于同一状态*，多层嵌套组件将会更麻烦
- 不同视图的行为需要*变更同一状态*，采用*父子组件直接引用*或*通过事件变更和同步状态多份拷贝*

### 安装

*cdn*

```shell
# 最新版
https://unpkg.com/vuex
# 指定版本
https://unpkg.com/vuex@2.0.0
```

*npm*

```shell
npm install vuex --save
```

### 使用

*store/index.js*

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    ...
})
```

*main.js*

```js
import Vue from 'vue'
import store from '@/store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
```

### 开始

*Vuex* 和 *全局对象* 不同点

- `Vuex` 状态存储是*响应式*
- **不推荐直接**改变`state`
- 推荐：显式提交 `(commit) mutation`，*方便跟踪每一个状态变化*

## 核心概念

### State

*Vuex使用单一状态树*，用一个对象就包含了全部的应用层级状态

*根实例*中注册 `store` ，该store 实例会注入到根组件下的所有子组件中，且子组件能通过 `this.$store` 访问到

```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会*有些重复和冗余*。

解决： 使用 `mapState` 辅助函数

```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    },
    
    // 映射 this.count 为 store.state.count
    'count'
  })
}
```

`mapState`： 函数**返回一个对象**，可使用对象展开符

```js
computed: {
  ...mapState({
    // ...
  })
}
```

### Getter

从 store 中的 state 中派生出一些状态（`state`的计算属性）

- *第一参数*：`state`
- *第二参数*：`getters`

> 值会被缓存，变化时重新计算

#### 通过属性访问

Getter 会暴露为 `store.getters` 对象，可以以属性的形式访问这些值

```js
getters: {
  // ...
  doneTodosCount: (state, getters) => {
    return getters.doneTodos.length
  }
}
```

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

#### 通过方法访问

让 getter 返回一个函数，来实现给 getter **传参**

> 方法访问时，不会缓存结果

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
```

```js
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

#### `mapGetters` 辅助函数

`mapGetters` 辅助函数是将 store 中的 `getter` **映射到局部计算**属性

```js
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
```

通过*对象*方式，可取 别名

```js
...mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```

### Mutation

更改 Vuex 的 store 中的状态的*唯一方法*：**提交 mutation**

每个 `mutation` 都有一个字符串的 **事件类型** (`type`) 和 一个 **回调函数** (`handler`)

> type - 函数名

```js
mutations: {
   increment (state) {
   	// 变更状态
   	state.count++
   }
}
```

调用 `store.commit` 唤醒相应的 `mutation handler`

```js
store.commit('increment')
```

####  提交载荷 （`Payload`）

`store.commit` 传入额外的参数（*载荷*）

> 大部分时间 `payload` 为对象

```js
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```

```js
store.commit('increment', 10)
```

#### 对象风格提交方式

`type`属性为`mutation handler` 名称

```js
store.commit({
  type: 'increment',
  amount: 10
})
```

#### `Mutation` 遵守规则

- 在store中*初始化所有所需属性*

- 添加新属性

  - 使用 `Vue.set(obj, 'newProp', 123)`
  - *新*对象替换*老*对象，如下

  ```js
  state.obj = { ...state.obj, newProp: 123 }
  ```

#### 用常量替代 `Mutation` 事件类型

用常量替代 `mutation` 事件类型在各种 Flux 实现中是很常见的模式。*可以使 linter 之类的工具发挥作用*

```js
// mutation-types.js
export const SOME_MUTATION = 'SOME_MUTATION'
```

```js
// store.js
import Vuex from 'vuex'
import { SOME_MUTATION } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [SOME_MUTATION] (state) {
      // mutate state
    }
  }
})
```

#### `Mutation`必须是同步函数

异步函数，`devtools` 无法追踪状态

```js
mutations: {
  someMutation (state) {
    api.callAsyncMethod(() => {
      state.count++
    })
  }
}
```

每一条 `mutation` 被记录，`devtools` 都需要捕捉到*前一状态*和*后一状态*的快照

#### 组件中提交`mutation`

- 使用 `this.$store.commit('xxx')` 提交 `mutation`
- 使用 `mapMutations` 辅助函数将组件中的 `methods` 映射为 `store.commit` 调用（需在根节点注入 `store`）。

```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

### Action

类似`Mutation`

- `Action` 提交的是 mutation，而**不是直接变更状态**
- `Action` 可以包含任意**异步**操作

`context.commit` 提交一个 `mutation`， `context.state` 和 `context.getters` 来获取 `state` 和 `getters`

```js
mutations: {
 increment (state) {
   state.count++
 }
},
actions: {
 increment (context) {
   context.commit('increment')
 }
}
```

#### 分发`dispatch`

```js
store.dispatch('increment')
```

支持*载荷方式* 和 *对象方式*

```js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```

#### 组件中分发 `Action`

- 使用 `this.$store.dispatch('xxx')` 分发 `action`
- 使用 `mapActions` 辅助函数将组件的 `methods` 映射为 `store.dispatch` 调用（需注入 `store`）

```js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

#### 组合`Action`

`store.dispatch` 可以处理被触发的 `action` 的*处理函数返回的 Promise*，并且 `store.dispatch` *仍旧返回 Promise*

```js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```

```js
store.dispatch('actionA').then(() => {
  // ...
})
```

利用 `async` 和 `await`

```js
// 假设 getData() 和 getOtherData() 返回的是 Promise
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```

> 一个 `store.dispatch` 在不同模块中可以触发多个 action 函数。
>
> 在这种情况下，只有当*所有触发函数后*，返回的 Promise 才会执行。

### Module

由于使用*单一状态树*，应用的*所有状态会集中到一个比较大的对象*。

`Vuex` 允许我们将 `store` 分割成*模块（module）*，每个模块拥有自己的 `state`、`mutation`、`action`、`getter`、甚至是`嵌套子模块`

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

#### 模块局部状态

模块内部 `mutation`  和 `getter`，*第一个参数*：**模块局部对象（`state`）**

模块内部 `getter`，*第三参数*：**根节点状态（`rootState`）** 

模块内部 `action`，**局部状态（`state`）**通过 `context.state` 暴露，**根节点状态**为`context.rootState`

#### 命名空间

默认情况下，模块内部的 `action`、`mutation` 和 `getter` 是注册在**全局命名空间**

通过 `namespaced: true` 的方式使其成为带命名空间的模块。

启用了命名空间的 `getter` 和 `action` 会收到*局部化*的 `getter`，`dispatch` 和 `commit`

```js
const store = new Vuex.Store({
  modules: {
    account: {
      namespaced: true,
      // 模块内容（module assets）
      state: () => ({ ... }), // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
      getters: {
        isAdmin () { ... } // -> getters['account/isAdmin']
      },
      actions: {
        login () { ... } // -> dispatch('account/login')
      },
      mutations: {
        login () { ... } // -> commit('account/login')
      },
      // 嵌套模块
      modules: {
        // 继承父模块的命名空间
        myPage: {
          state: () => ({ ... }),
          getters: {
            profile () { ... } // -> getters['account/profile']
          }
        },
        // 进一步嵌套命名空间
        posts: {
          namespaced: true,
          state: () => ({ ... }),
          getters: {
            popular () { ... } // -> getters['account/posts/popular']
          }
        }
      }
    }
  }
})
```

##### 命名空间中访问全局内容

使用全局 `state` 和 `getter`，*第三参数*：`rootState` ，*第四参数*： `rootGetters` 。通过 `context` 对象的属性传入 `action`

分发全局 `action` 和 `mutation`，将 `{ root: true }` 作为*第三参数*传给 `dispatch` 或 `commit`

```js
modules: {
  foo: {
    namespaced: true,
    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

##### 带命名空间的模块注册全局 `action`

带命名空间的模块**注册全局** `action`，你可添加 `root: true`，并将这个 `action` 的定义放在函数 `handler` 

```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

##### 带命名空间的绑定函数

`mapState`, `mapGetters`, `mapActions` 和 `mapMutations` 这些函数来绑定带命名空间的模块

```js
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  })
   ...mapState('some',['a','b'])
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

将模块的*空间名称字符串*作为*第一个参数*传递给上述函数

```js
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  })
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

利用 `createNamespacedHelpers` 创建基于某个*命名空间辅助函数*

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```

##### 插件开发者的注意事项

通过插件的参数对象来*允许用户指定空间名称*

```js
// 通过插件的参数对象得到空间名称
// 然后返回 Vuex 插件函数
export function createPlugin (options = {}) {
  return function (store) {
    // 把空间名字添加到插件模块的类型（type）中去
    const namespace = options.namespace || ''
    store.dispatch(namespace + 'pluginAction')
  }
}
```

####  模块动态注册

`store.registerModule` ：*注册*模块

`store.unregisterModule(moduleName)`：动态*卸载*模块，*不能卸载静态模块*

`store.hasModule(moduleName)` ：*检查*该模块是否已经被注册到 store

```js
import Vuex from 'vuex'

const store = new Vuex.Store({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```

通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态

> [vuex-router-sync ](https://github.com/vuejs/vuex-router-sync)插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理

##### 保留state

注册一个**新** `module` 时，你很有可能想保留**过去的** `state`

`store.registerModule('a', module, { preserveState: true })`

- 设置 `preserveState: true` 时，该模块会被注册。`action`、`mutation` 和 `getter` 会被添加到 `store` 中，但是 state 不会。它会假设 `store` 的 `state` 已经包含了这个 `module` 的 `state` 并且*你不希望将其覆写*

### 模块重用

创建*一个模块*的*多个实例*

- *多个 store*公用*同一个模块*
- *一个 store*多次注册*同一个模块*

同`data`，解决办法也是相同的——*使用一个函数来声明模块状态*

```js
const MyReusableModule = {
  state: () => ({
    foo: 'bar'
  }),
  // mutation, action 和 getter 等等...
}
```

## 进阶

### 项目结构

规定了一些需要遵守的规则

1. 应用层级的状态应该集中到单个 store 对象中
2. 提交 **mutation** 是**更改状态**的**唯一方法**，并且这个过程是同步的
3. **异步逻辑**都应该封装到 **action** 里面

```bash
├── index.html
├── main.js
├── api
│   └── ... # 抽取出API请求
├── components
│   ├── App.vue
│   └── ...
└── store
    ├── index.js          # 我们组装模块并导出 store 的地方
    ├── actions.js        # 根级别的 action
    ├── mutations.js      # 根级别的 mutation
    └── modules
        ├── cart.js       # 购物车模块
        └── products.js   # 产品模块
```

### 插件

`Vuex` 的 `store` 接受 `plugins` 选项，暴露出每次 mutation 的钩子

```js
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  })
}
```

```js
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
})
```

#### 插件中提交`mutation`

通过*提交* `mutation`，插件可以用来*同步数据源到 `store`*

```js
export default function createWebSocketPlugin (socket) {
  return store => {
    socket.on('data', data => {
      store.commit('receiveData', data)
    })
     // 每次mutation后调用
    store.subscribe(mutation => {
      if (mutation.type === 'UPDATE_DATA') {
        socket.emit('update', mutation.payload)
      }
    })
  }
}
```

```js
const plugin = createWebSocketPlugin(socket)
const store = new Vuex.Store({
  state,
  mutations,
  plugins: [plugin]
})
```

#### State快照

*比较改变的前后状态*

```js
const myPluginWithSnapshot = store => {
  let prevState = _.cloneDeep(store.state)
  store.subscribe((mutation, state) => {
    let nextState = _.cloneDeep(state)

    // 比较 prevState 和 nextState...

    // 保存状态，用于下一次 mutation
    prevState = nextState
  })
}
```

**生成状态快照的插件应该只在开发阶段使用**，使用 `webpack` 或 `Browserify`，让构建工具帮我们处理

```js
const store = new Vuex.Store({
  // ...
  plugins: process.env.NODE_ENV !== 'production'
    ? [myPluginWithSnapshot]
    : []
})
```

#### [？内置 Logger 插件](https://vuex.vuejs.org/zh/guide/plugins.html#%E5%86%85%E7%BD%AE-logger-%E6%8F%92%E4%BB%B6)

> `mutation` 和 `action` 记录

## 严格模式

*开启严格模式*，仅需在创建 store 的时候传入 `strict: true`

**状态变更且不是由 `mutation` 函数引起的，将会抛出错误**

```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```

**不要在发布环境下启用严格模式**！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失。*让构建工具来处理这种情况*

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```

## 表单处理

严格模式中使用 `Vuex` 时，在属于 Vuex 的 state 上使用 `v-model`

```js
<input v-model="obj.message">
```

在用户输入时，`v-model` 会试图直接修改 `obj.message`。在严格模式中，由于这个修改不是在 `mutation` 函数中执行的, 这里会抛出一个错误。

**事件回调处理**：给 `<input>` 中绑定 value，然后侦听 `input` 或者 `change` 事件，在事件回调中调用一个方法

```html
<input :value="message" @input="updateMessage">
```

```js
// ...
computed: {
  ...mapState({
    message: state => state.obj.message
  })
},
methods: {
  updateMessage (e) {
    this.$store.commit('updateMessage', e.target.value)
  }
}
```

**双向绑定计算属性**

```html
<input v-model="message">
```

```js
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```

## [？测试](https://vuex.vuejs.org/zh/guide/testing.html)

## [？热重载](https://vuex.vuejs.org/zh/guide/hot-reload.html#%E7%83%AD%E9%87%8D%E8%BD%BD)