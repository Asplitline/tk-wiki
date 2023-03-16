---
outline: deep
title: React 核心
order: 2
---

# React

`React` 是一个用于构建用户界面的 `JAVASCRIPT` 库

## 特点

- **1.声明式设计** −React 采用声明范式，可以轻松描述应用。
- **2.高效** −React 通过对 DOM 的模拟，最大限度地减少与 DOM 的交互。
- **3.灵活** −React 可以与已知的库或框架很好地配合。
- **4.JSX** − JSX 是 JavaScript 语法的扩展。React 开发不一定使用 JSX ，但我们建议使用它。
- **5.组件** − 通过 React 构建组件，使得代码更加容易得到复用，能够很好的应用在大项目的开发中。
- **6.单向响应的数据流** − React 实现了*单向响应*的数据流，从而减少了重复代码，这也是它为什么比传统数据绑定更简单。

## 安装

- `react.min.js` - React 的核心库
- `react-dom.min.js` - 提供与 DOM 相关的功能

```html
<!-- 开发环境 -->
<script src="https://unpkg.com/react@16/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
<!-- 生产环境 -->
<script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
```

使用 `JSX`，则 `<script>` 标签的 `type` 属性需要设置为 `text/babel`

设置 [crossorigin](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_settings_attributes) 属性：有更好的错误处理体验。[参考](https://juejin.cn/post/6969825311361859598)

- 设置了`crossorigin`就相当于开启了`cors`校验。
- 开启 cors 校验之后，跨域的 script 资源在运行出错的时候，`window.onerror`可以捕获到完整的错误信息。
- `crossorigin=use-credentials`可以跨域带上 cookie

### [Create React App](https://create-react-app.dev/docs/getting-started)

*创建新的单页应用*的最佳方式

```shell
# 安装 create-react-app
cnpm install -g create-react-app

# 创建react
create-react-app my-app
npx create-react-app

cd my-app
npm start
```

### [Next.js](https://react.docschina.org/docs/create-a-new-react-app.html#nextjs)

一个流行的、轻量级的框架，用于配合 React 打造*静态化和服务端渲染应用*。它包括开箱即用的*样式和路由方案*

### [Gatsby](https://react.docschina.org/docs/create-a-new-react-app.html#gatsby)

创建*静态网站*的最佳方式

## React JSX

`jsx`：javascript + xml

```jsx
const element = <h1 className="greeting">Hello, world!</h1>
```

Babel 会把 JSX 转译成一个名为 `React.createElement()` 函数调用

```jsx
const element = React.createElement('h1', { className: 'greeting' }, 'Hello, world!')
```

_特点_

- JSX 执行*更快*，在编译为 JavaScript 代码后进行了优化
- _类型安全_，编译过程中发现错误
- 使用 JSX 编写模板更加*简单快速*

### JSX 引入

`babel.min.js` - Babel 可以将 ES6 代码转为 ES5 代码。Babel _内嵌了对 JSX 的支持_。

#### cdn

```html
<!-- 生产环境中不建议使用 -->
<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

<script type="text/babel"></script>
```

#### JSX 添加到项目

```shell
npm init -y
npm install babel-cli@6 babel-preset-react-app@3

mkdir src
npx babel --watch src --out-dir . --presets react-app/prod
```

### 嵌入表达式

- 遇到 `<>` 按 `HTML`解析
- `{}`按`JavaScript`解析
- 存在标签结构，且标签结构需要换行，用`（）`包裹

```jsx
ReactDOM.render(
  <div>
    <h1>菜鸟教程</h1>
    {/*注释...*/}
  </div>,
  document.getElementById('example')
)
```

> JSX 里的 `class` 变成了 `className`，而 `tabindex` 则变为 `tabIndex`。

_JSX 防止注入攻击_：React DOM 在渲染所有输入内容之前，_默认会进行转义_。

_样式_：`React` 推荐使用*内联样式*。使用 `camelCase` 语法来设置内联样式，会在指定元素数字后自动添加 `px`

`{{}}` ：外层`{}`为 变量解析，内层`{}`为 样式对象

```jsx
<ListItem style={{ color: red, fontSize: 12 }} />
```

_数组_：自动展开

```jsx
var arr = [<h1>菜鸟教程</h1>, <h2>学的不仅是技术，更是梦想！</h2>]
ReactDOM.render(<div>{arr}</div>, document.getElementById('example'))
```

_嵌入_：允许在大括号中嵌入任何表达式

```jsx
function NumberList(props) {
  const numbers = props.numbers
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem key={number.toString()} value={number} />
      ))}
    </ul>
  )
}
```

## 元素渲染 - render

React 构建的应用通常只有**单一的根 `DOM` 节点**

React 元素是*不可变对象*。一旦被创建，你就无法更改它的子元素或者属性。

据已学知识，更新 UI 唯一的方式是*创建一个全新的元素*，并将其传入 `ReactDOM.render()`

`ReactDOM.render()` ：首先会*比较*元素内容先后的不同，而在渲染过程中只会*更新改变了的部分*

```js
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  )
  ReactDOM.render(element, document.getElementById('root'))
}

setInterval(tick, 1000)
```

> ES6，`props` 变为 `this.props`

## components

### 组件定义

组件名称必须以大写字母开头。小写代表原生 DOM，大写代表 组件。

```jsx
// 函数组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
// ES6类写法
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

### 自定义组件

原生 HTML 元素名以小写字母开头，而*自定义的 `React` 类名*以*大写字母开头*

使用`props` 向组件传参

> 因为 `class` 和 `for` 是 `JavaScript` _保留字_。添加属性时， `class` 属性需要写成 `className` ，`for` 属性需要写成 `htmlFor`

### 组件 API

- 设置状态：`setState`
- 替换状态：`replaceState`
- 设置属性：`setProps`
- 替换属性：`replaceProps`
- 强制更新：`forceUpdate`
- 获取 DOM 节点：`findDOMNode`
- 判断组件挂载状态：`isMounted`

#### setState - 设置状态

`setState(object nextState[, function callback])`

- `nextState`：_设置新状态_，*新旧状态*会进行**合并**
- `callback`（可选）：回调函数。在*`setState`设置成功*，且*组件重新渲染*后*调用*。

#### replaceState - 替换状态

`replaceState(object nextState[, function callback])`

- `nextState`：_设置新状态_，新状态**替换**旧状态将要设置的新状态
- `callback`（可选）：回调函数。在*`setState`设置成功*，且*组件重新渲染*后*调用*

#### setProps - 设置属性

`setProps(object nextProps[, function callback])`

- `nextProps`：_设置新属性_，*新旧属性*会进行**合并**
- `callback`（可选）：回调函数。在*`setProps`设置成功*，且*组件重新渲染*后*调用*

`props`：从*父组件向下*传递至所有的子组件。

`setProps()`：*向组件传递数据*或*通知`setProps()`组件重新渲染*

更新组件

- 再次调用`React.render()`
- `setProps()`方法改变组件属性，触发组件重新渲染。

#### replaceProps - 替换属性

`replaceProps(object nextProps[, function callback])`

- `nextProps`，_设置的新属性_，该属性会**替换**当前的`props`。
- `callback`（可选）：回调函数。在*`replaceProps`设置成功*，且*组件重新渲染*后*调用*

#### forceUpdate - 强制更新

`forceUpdate([function callback])`

- `callback`（可选）：回调函数。会在组件`render()`方法**调用后调用**。

父组件和子组件**均会调用**自身 `render()`，组件重新渲染时，会读取`this.props`和`this.state`，没有改变，只更新 DOM。

应用：**`this.props`和`this.state`之外的组件重绘**（如：修改 this.state），用于通知`React`需要调用`render()`

> 避免使用 `forceUpdate`

#### findDOMNode - 获取 DOM 节点

`DOMElement findDOMNode()`

- 返回值：DOM 元素`DOMElement`

组件已挂载到 DOM 中，会返回对应的本地浏览器 DOM 元素。

`render`返回`null` 或 `false`，`findDOMNode`也返回`null`。

应用：从`DOM`中取值

#### isMounted - 判断组件挂载状态 ^已废弃？^

`bool isMounted()`

- 返回值：`true`或`false`，表示组件**是否** _已挂载到 DOM_

应用：保证了`setState()`和`forceUpdate()`在**异步调用不会出错**

`isMounted` 的方法在 ES6 中*？已经废除*。

原因：不足以检测组件是否挂载，对于异步的程序情况，以及逻辑上造成混乱。用以下方法代替：

```jsx
componentDidMount() {
    this.mounted = true;
}

componentWillUnmount() {
    this.mounted = false;
}
```

### 组件之间传值

_子传父_ ：通过 父元素传给 一个*能改变父元素`state`的回调*。

_父传子_：通过 `props`

_兄弟之间_：共同子元素，或共同父元素

## State

`React` 把组件看成一个*状态机*（`State Machine`s）。通过与用户的交互，实现不同状态，然后渲染 UI，让用户界面和数据保持一致。只需更新组件的 `state`，然后根据新的 `state` _重新渲染用户界面_（_不要操作 DOM_）

_不要直接更新状态_：直接更新不会重新渲染组件。

解决：`setState`

```jsx
// Wrong
this.state.comment = 'Hello'
// Correct
this.setState({ comment: 'Hello' })
```

_状态更新可能为异步_： `this.props` 和 `this.state` 可能是异步更新。

解决：*接受一个函数*而不是对象

```jsx
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment
})
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}))
```

> `setState`*总会*触发组件*重绘*，除非在`shouldComponentUpdate()`实现条件渲染逻辑

### 获取最新值

通过`setState`回调

```jsx
this.setState(
  {
    count: this.state.count + 1
  },
  () => {
    console.log(this.state.count)
  }
)
console.log(this.state.count) // 此处无法获取最新值
```

`Promise + async`

```jsx
setStateSync(res){
   return new Promise((resolve)=>{
      this.setState(state,resolve)
   })
}
```

### 钩子函数

`componentDidMount()` ：挂载

`componentWillUnmount()` ：卸载

```jsx
class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { date: new Date() }
  }
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timerID)
  }
  tick() {
    this.setState({ date: new Date() })
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>现在是 {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    )
  }
}

ReactDOM.render(<Clock />, document.getElementById('example'))
```

代码执行

1. 调用 `Clock` 组件的构造函数。 初始化 `this.state`
2. 调用 `Clock` 组件的 `render()` 方法。更新 DOM 以匹配 `Clock` 的渲染输出。
3. `Clock` 的输出插入到 DOM 中时，React 调用 `componentDidMount()` 生命周期钩子，触发定时器。
4. 浏览器每秒钟调用 `tick()` 方法。 调用 `setState()` ，React 知道状态已经改变，调度 UI 更新，并再次调用 `render()` 方法。
5. `Clock` 组件被从 DOM 中移除，React 会调用 `componentWillUnmount()` 这个钩子函数，定时器清除。

---

父组件或子组件都不能知道某个组件是有状态还是无状态，并且不应该关心某组件是被定义为一个函数还是一个类。 除了拥有并设置它的组件外，其它组件不可访问

**自顶向下或单向数据流**： 任何状态始终由某些特定组件所有，并且从该状态导出的任何数据或 UI 只能影响树中下方的组件。

## Props

_纯函数_：不会尝试更改入参，多次调用下相同的入参始终返回相同的结果

**所有 `React` 组件都必须像纯函数一样保护它们的 `props` 不被更改。**

用户自定义组件时，它会将 `JSX` 所接收的属性（`attributes`）以及子组件（`children`）转换为*单个对象（`props`）*传递给组件

> `state` 和 `props` 主要区别： **`props` 是不可变**.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>
}
const element = <Welcome name="Sara" />
ReactDOM.render(element, document.getElementById('root'))
```

### 默认 Props

组件类的 `defaultProps` 属性为 `props` 设置默认值

```jsx
class HelloMessage extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

HelloMessage.defaultProps = {
  name: 'Runoob'
}
```

通常在父组件中设置 `state`， 并通过在子组件上使用 `props` 将其传递到子组件上。

```jsx
class WebSite extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '菜鸟教程',
      site: 'https://www.runoob.com'
    }
  }
  render() {
    return (
      <div>
        <Name name={this.state.name} />
        <Link site={this.state.site} />
      </div>
    )
  }
}

class Name extends React.Component {
  render() {
    return <h1>{this.props.name}</h1>
  }
}

class Link extends React.Component {
  render() {
    return <a href={this.props.site}>{this.props.site}</a>
  }
}

ReactDOM.render(<WebSite />, document.getElementById('example'))
```

### Props 验证

Props 验证使用 `propTypes`：保证我们的应用*组件被正确使用*，类型错误会*警告*。

`React.PropTypes` 在 React v15.5 版本后已经移到了 `prop-types` 库。

```html
<script src="https://cdn.bootcss.com/prop-types/15.6.1/prop-types.js"></script>
```

```jsx
var title = '菜鸟教程'
// var title = 123;
class MyTitle extends React.Component {
  render() {
    return <h1>Hello, {this.props.title}</h1>
  }
}

MyTitle.propTypes = {
  outline: deep
title: PropTypes.string
}
ReactDOM.render(<MyTitle title={title} />, document.getElementById('example'))
```

## event

|                  | React                                                     | Html               |
| ---------------- | --------------------------------------------------------- | ------------------ |
| 事件绑定属性命名 | 驼峰式                                                    | 小写               |
| 阻止默认行为     | `e.preventDefault()`<br />React 不能用`false`阻止默认行为 | ` return false`    |
| 事件监听         |                                                           | `addEventListener` |

### 事件处理

React 元素事件处理和 DOM 元素相似，语法存在以下不同

- React _事件命名采用小驼峰式（_`camelCase`），而不是纯小写
- 使用 JSX 语法时你需要*传入一个函数作为事件处理函数*，而不是一个字符串。
- React *不能*通过*返回 `false` 方式阻止默认行为*。你*必须显式使用 `preventDefault`*
- React 无需使用 `addEventListener` 添加监听器

```jsx
<!-- 传统HTML -->
<button onclick="activateLasers()">
  Activate Lasers
</button>
<!-- React -->
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

```jsx
<!-- 传统HTML -->
<a href="#" onclick="console.log('The link was clicked.'); return false">
  Click me
</a>
<!-- React -->
function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }
  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```

JavaScript 中，class 的方法默认不会绑定 `this`。使用 `bind`函数绑定

```jsx
class Toggle extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isToggleOn: true }

    // 这边绑定是必要的，这样 `this` 才能在回调函数中使用
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  render() {
    return <button onClick={this.handleClick}>{this.state.isToggleOn ? 'ON' : 'OFF'}</button>
  }
}

ReactDOM.render(<Toggle />, document.getElementById('example'))
```

使用实验性的 [`public class fields`](https://babeljs.io/docs/plugins/transform-class-properties/)语法，可以直接添加*箭头函数*可以省略 `bind`

> `Create React App` 默认启用此语法

```jsx
class LoggingButton extends React.Component {
  // 确保了 `this` 绑定在  handleClick 中
  handleClick = () => {
    console.log('this is:', this)
  }
}
```

没有使用 `class fields` 语法，在*回调中*使用*箭头函数*

```jsx
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this)
  }
  render() {
    // 此语法确保 `handleClick` 内的 `this` 已被绑定。
    return <button onClick={() => this.handleClick()}>Click me</button>
  }
}
```

> 问回调函数作为一个属性值传入低阶组件，组件*可能会进行额外的重新渲染*。
>
> 建议构造函数中使用`bind`或`public class fields`语法

```jsx
class LoggingButton extends React.Component {
  render() {
    //  这个语法确保了 `this` 绑定在  handleClick 中
    return <button onClick={(e) => this.handleClick(e)}>Click me</button>
  }
}
```

### 事件传参

箭头函数：事件参数*必须显示传递。*

`bind`函数：事件对象是*隐式传递*。事件对象`e`排在所有参数之后

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

## 条件渲染

### if else

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <UserGreeting />
  }
  return <GuestGreeting />
}
ReactDOM.render(
  // Try changing to isLoggedIn={true}:
  <Greeting isLoggedIn={false} />,
  document.getElementById('example')
)
```

### 与运算符 &&

`true && expression` 总是会返回 `expression`, 而 `false && expression` 总是会返回 `false`。

```jsx
function Mailbox(props) {
  const unreadMessages = props.unreadMessages
  return (
    <div>
      <h1>Hello!</h1>
      {unreadMessages.length > 0 && <h2>You have {unreadMessages.length} unread messages.</h2>}
    </div>
  )
}
const messages = ['React', 'Re: React', 'Re:Re: React']
ReactDOM.render(<Mailbox unreadMessages={messages} />, document.getElementById('root'))
```

### 三目运算符

`condition ? true : false`

```jsx
render() {
  const isLoggedIn = this.state.isLoggedIn;
  return (
    <div>
      {isLoggedIn
        ? <LogoutButton onClick={this.handleLogoutClick} />
        : <LoginButton onClick={this.handleLoginClick} />
      }
    </div>
  );
}
```

\*更复杂情况，考虑**提取组件\***

> 不满足单根，使用`<React.Fragment></React.Fragment>`包裹，简写为 `<> </>`

### 隐藏组件

让 `render` 方法直接返回 `null`，而不进行任何渲染。但`componentWillUpdate` 和 `componentDidUpdate` 依然可以被调用

## 列表 & Keys

### 列表

通过使用 `{}` 在 JSX 内构建一个元素集合。

```jsx
const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map((numbers) => <li>{numbers}</li>)

ReactDOM.render(<ul>{listItems}</ul>, document.getElementById('example'))
```

### keys

`Keys` ：在 DOM 中某些元素被增加或删除，**帮助 `React` 识别哪些元素发生了变化**

选择*不指定显式 key* 值，将默认*使用索引*用作为列表项目的 _key 值_

**不建议使用索引来用作 `key` 值**，因为这样做会*导致性能变差*，还*可能引起组件状态的问题*

```jsx
const numbers = [1, 2, 3, 4, 5]
const listItems = numbers.map((number) => <li key={number.toString()}>{number}</li>)
```

key 只有*放在就近的数组上下文中*才有意义

```jsx
function ListItem(props) {
  // 正确！这里不需要指定 key：  return <li>{props.value}</li>;}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()} value={number} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('root')
);
```

**`key`在兄弟之间必须唯一**，_不需要全局唯一_。生成两个不同数组时，可以使用相同的 `key` 值

```jsx
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
  const content = props.posts.map((post) => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ))
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  )
}

const posts = [
  { id: 1, outline: deep
title: 'Hello World', content: 'Welcome to learning React!' },
  { id: 2, outline: deep
title: 'Installation', content: 'You can install React from npm.' }
]
ReactDOM.render(<Blog posts={posts} />, document.getElementById('root'))
```

`key`不会传给组件，也就是无法通过 `props.key`获取

## 表单

在 `React` 里，HTML 表单元素的工作方式和其他的 DOM 元素有些不同。

因为表单元素通常会保持一些内部 `state`。

表单具有默认的 _`HTML` 表单行为_，即在用户提交表单后浏览到新页面。在 React 中执行相同的代码，_依然有效_。

### 受控组件

`HTML`：单元素（如`<input>`、 `<textarea>` 和 `<select>`）之类的表单元素通常自己维护 `state`，并根据用户输入进行更新。

`React`：可变状态（`mutable state`）通常保存在组件的 `state` 属性中，并且只能通过使用 [`setState()`](https://react.docschina.org/docs/react-component.html#setstate)来更新

两者结合（**受控组件**），React 的 `state` 成为*“唯一数据源”*。渲染表单的 React 组件还*控制着用户输入过程中表单发生的操作*。

> _受控组件_：state 管理 value，_非受控组件_：通过操作 dom 管理组件

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }
  handleSubmit(event) {
    alert('提交的名字: ' + this.state.value)
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          名字:
          <input type="text" value={this.state.value} onChange={this.handleChange} />{' '}
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}
```

表单元素上设置了 `value` 属性，值始终为 `this.state.value`，使得 React 的 `state` 成为*唯一数据源*。

由 `handlechange` 在每次按键时都会执行并更新 `state`，因此*显示的值将随着用户输入而更新*。

### textarea

`HTML`：通过其子元素定义其文本

```jsx
<textarea>文本</textarea>
```

`React`：`<textarea>` 使用 `value` 属性代替

```jsx
class EssayForm extends React.Component {
  /*
  	...
  */
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          文章:
          <textarea value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}
```

### select

`HTML`：通过 `selected`属性选中元素

```jsx
<select>
  <option value="grapefruit">葡萄柚</option>
  <option value="lime">酸橙</option>
  <option selected value="coconut">
    椰子
  </option>
  <option value="mango">芒果</option>
</select>
```

`React`：根 `select` 标签上使用 `value` 属性

```jsx
class FlavorForm extends React.Component {
  /*
  	...
  */
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          选择你喜欢的风味:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">葡萄柚</option>
            <option value="lime">酸橙</option>
            <option value="coconut">椰子</option>
            <option value="mango">芒果</option>
          </select>
        </label>
        <input type="submit" value="提交" />
      </form>
    )
  }
}
```

> 多选：`<select multiple={true} value={['B', 'C']}>`

### 文件 input

`HTML`：`<input type="file">` 允许用户从存储设备*中选择一个或多个文件*，将其上传到服务器，或通过使用 JavaScript 的 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行控制。

### 处理多个输入

处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，根据 `event.target.name` 的值选择要执行的操作

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.name === 'isGoing' ? target.checked : target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input name="isGoing" type="checkbox" checked={this.state.isGoing} onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleInputChange} />
        </label>
      </form>
    )
  }
}
```

### 受控输入空值

在受控组件上指定 `value` 的 `prop` _会阻止用户更改输入_。你指定了 `value`，但输入仍可编辑，则可能是你意外地将`value` 设置为 `undefined` 或 `null`。

代码：输入最初被锁定（_只读_），但在短时间延迟后变为可编辑（_可写_）

```jsx
ReactDOM.render(<input value="hi" />, mountNode)

setTimeout(function () {
  ReactDOM.render(<input value={null} />, mountNode)
}, 1000)
```

## 状态提升

*多个组件*需要*反映相同的变化数据*，*将共享状态提升*到最近的*共同父组件*中去

```jsx
import MyInput from './myInput'
function tryConvert(number, mode) {
  if (mode === 'default') {
    return number * 10
  } else if (mode === 'multiply') {
    return number / 10
  }
}
class ShowInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      number: '',
      mode: ''
    }
  }

  onDefaultChange = (number) => {
    this.setState({
      mode: 'default',
      number
    })
  }
  onMultiplyChange = (number) => {
    this.setState({
      mode: 'multiply',
      number
    })
  }

  render() {
    const { mode, number } = this.state
    const a = mode === 'default' ? number : tryConvert(number, mode)
    const b = mode === 'multiply' ? number : tryConvert(number, mode)
    return (
      <div>
        <MyInput mode="default" number={a || ''} onNumberChange={this.onDefaultChange}></MyInput>
        <MyInput mode="multiply" number={b || ''} onNumberChange={this.onMultiplyChange}></MyInput>
      </div>
    )
  }
}

export default ShowInput
```

```jsx
const modeNames = {
  default: '*1',
  multiply: '*10'
}
class MyInput extends React.Component {
  constructor(props) {
    super(props)
  }
  numberChange = (e) => {
    this.props.onNumberChange(e.target.value)
  }
  render() {
    const { mode, number } = this.props
    return (
      <fieldset>
        <legend>
          {number} {modeNames[mode]}
        </legend>
        <input value={number} onChange={this.numberChange} />
      </fieldset>
    )
  }
}
export default MyInput
```

## 组合 vs 继承

### 包含关系 - slot

无法提前知晓它们子组件的具体内容

_组件预留一个_， `children prop` 来将他们的子组件传递到渲染结果。通过 _`JSX` 嵌套_，将任意组件作为子组件传递给它们。

```jsx
function FancyBorder(props) {
  return <div className={'FancyBorder FancyBorder-' + props.color}>{props.children}</div>
}
```

```jsx
function WelcomeDialog() {
  return (
    <FancyBorder color="blue">
      <h1 className="Dialog-title">Welcome</h1>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  )
}
```

_组件预留多个_，将所需内容传入 props，并使用相应的 prop。

```jsx
function SplitPane(props) {
  return (
    <div className="SplitPane">
      <div className="SplitPane-left">{props.left}</div>
      <div className="SplitPane-right">{props.right}</div>
    </div>
  )
}

function App() {
  return <SplitPane left={<Contacts />} right={<Chat />} />
}
```

组件间*复用非 `UI` 的功能*，将其提取为一个单独的 `JavaScript` 模块

## React 哲学

### UI 划分组件层级

*一个组件*原则上只能负责*一个功能*。需要负责*更多的功能*，这时候就应该考虑将它*拆分成更小的组件*

- `FilterableProductTable `产品列表
  - `SearchBar` - 搜索框
  - `ProductTable` - 表单
    - `ProductCategoryRow` - 产品分类
    - `ProductRow` - 产品

### 创建一个静态版本

_应用静态版本_：要编写大量代码，而不需要考虑太多交互细节

_添加交互功能_：考虑大量细节，而不需要编写太多代码。

通过 _props_ 传入所需的数据，**不应该**使用 _state_ 构建静态版本，_state_ 代表了*随时间会产生变化*的数据

### 确定 UI state 最小（且完整）表示

要使你的 UI 具备交互功能，需要有*触发基础数据模型改变*的能力，通过`state`来完成。

只保留所需*最小`state`集合*，其他数据由计算产生

_样例分析_

- 包含所有产品的原始列表
- 用户输入的搜索词 - `state`
- 复选框是否选中的值 - `state`
- 经过搜索筛选的产品列表

**判断规则** - 以下不是 `state`

- 是否由*父组件 props*传递？
- *随时间推移*保持不变？
- 是否*根据其他`state`或`props`计算*？

### 确定 state 放置位置

需要*确定*哪个组件*能够改变*这些 `state`，或者*拥有*这些 `state`。

**筛选规则**

- 找到*根据这个 `state` 进行渲染*的所有*组件*。
- 找到他们的*共同所有者*（common owner）组件（在组件层级上高于所有需要该 state 的组件）。
- 该*共同所有者组件*或者*比它层级更高的组件*应该**拥有该 `state`**。
- 找不到一个合适的位置来存放该 state，就可以直接**创建一个新的组件**来存放该 `state`，并将这一**新组件置于高于共同所有者组件层级的位置**。

`FilterableProductTable `产品列表

- `SearchBar` - 搜索框 - 展示 复选框 和 搜索词
- `ProductTable` - 表单 - 根据 `props` 进行筛选
  - `ProductCategoryRow` - 产品分类
  - `ProductRow` - 产品

`SearchBar` 和 `productTable` 共同所有者 为 `FilterableProductTable`（存放 state）

### 添加反向数据流

_尝试让数据反向传递_：处于*较低层级*的表单组件*更新较高层级*的 `FilterableProductTable` 中的 `state`

`state` 只能由拥有它们的组件进行更改。`FilterableProductTable`需要向 `SearchBar`传入触发 `state` 改变的回调，当`SearchBar` 改变，触发此回调。

## 组件生命周期

### 三个状态

`Mounting`：*已插入*真实 DOM

`Updating`：正在被*重新渲染*

`Unmounting`：*已移出*真实 DOM

### 周期方法

| 方法                            | 说明                                                          |                                                                            |
| ------------------------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------- |
| **component`WillMount`**        | *渲染前*调用，在客户端也在服务端                              |                                                                            |
| **component`DidMount`**         | *第一次渲染后*调用，只在客户端                                | 在此之后可以通过 `this.getDOMNode()`来进行访问                             |
| **component`WillReceiveProps`** | 组件接收到新 `prop` (_更新后_)时被调用。                      | *初始化`render`*时不会被调用                                               |
| **`should`Component`Update`**   | 在组件*接收到新`props`或者`state`时*被调用                    | 返回`boolean`值，*初始化*或使用`forceUpdate`时不被调用，`true`代表允许改变 |
| **component`WillUpdate`**       | 组件接\*收到新`props`或者`state`但**还没有 render\***时被调用 | 初始化时不会被调用                                                         |
| **component`DidUpdate`**        | 组件*完成更新后*立即调用                                      | 在初始化时不会被调用。                                                     |
| **component`WillUnmount`**      | 组件从 *DOM 中移除之前*立刻被调用                             |                                                                            |
