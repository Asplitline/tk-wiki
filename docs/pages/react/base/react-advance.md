---
outline: deep
title: React 进阶
order: 3
---

# React 进阶

## 无障碍

### 鼠标和指针事件

外部点击模式，用户可以通过点击*元素以外*的地方来关闭已打开的弹出框。

```jsx
class OuterClickExample extends React.Component {
  constructor(props) {
    super(props)

    this.state = { isOpen: false }
    this.toggleContainer = React.createRef()

    this.onClickHandler = this.onClickHandler.bind(this)
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this)
  }

  componentDidMount() {
    window.addEventListener('click', this.onClickOutsideHandler)
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.onClickOutsideHandler)
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen
    }))
  }

  onClickOutsideHandler(event) {
    // 点击元素内部，不关闭Option。
    // cotains方法：判断target是否为toggleContainer的后代元素
    if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    return (
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select an option</button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    )
  }
}
```

## Context

`Context`：提供了一个*无需为每层组件手动添加 props*，就能在*组件树间进行数据传递*的方法。

在于*很多不同层级的组件*需要*访问同样一些的数据*。（**复用性变差**）

### 跨组件共享数据

#### 单文件 demo

- 传入值 为`value`，其余无效
- 通过 `static contextType = ThemeContext;`将 context 绑定

```jsx
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light')
class App extends React.Component {
  render() {
    // 无论多深，任何组件都能读取这个值。
    return (
      <ThemeContext.Provider value="dark">
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

// 中间的组件再也不必指明
function Toolbar() {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

class ThemedButton extends React.Component {
  // React 会往上找到最近的 theme Provider，然后使用它的值。
  static contextType = ThemeContext
  render() {
    return <Button theme={this.context} />
  }
}
```

#### 多文件

`TextContext.jsx` - 创建上下文

```jsx
import React, { Component, createContext } from 'react'

export const TextContext = createContext('text')

export default class TextContextProvider extends Component {
  render() {
    return <TextContext.Provider value="123">{this.props.children}</TextContext.Provider>
  }
}
```

`index.jsx` - 顶层组件

```jsx
import React, { Component } from 'react'
import ButtonGroup from './ButtonGroup'
import TextContext from './TextContext'
export default class ContextDemo extends Component {
  render() {
    return (
      <TextContext>
        <ButtonGroup></ButtonGroup>
      </TextContext>
    )
  }
}
```

`Button.jsx` - `ButtonGroup`子组件

```jsx
import React, { Component } from 'react'
import { TextContext } from './TextContext'
export default class Button extends Component {
  // React 会往上找到最近的 TextContext，然后使用它的值
  static contextType = TextContext
  render() {
    return <div>{this.context}</div>
  }
}
```

### Context 考虑

只是想避免层层传递一些属性

通过组件组合，将组件传递下去，会比 context 更好。（会提升高层次组件复杂度）

```jsx
function Page(props) {
  const user = props.user;
  const userLink = (
    <Link href={user.permalink}>
      <Avatar user={user} size={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={userLink} />;
}

// 现在，我们有这样的组件：
<Page user={user} avatarSize={avatarSize} />
// ... 渲染出 ...
<PageLayout userLink={...} />
// ... 渲染出 ...
<NavigationBar userLink={...} />
// ... 渲染出 ...
{props.userLink}
```

### API

#### React.createContext

创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，**会从组件树中离自身最近的那个匹配的 `Provider` 中读取到当前的 context 值**。

```jsx
const MyContext = React.createContext(defaultValue)
```

> 组件所在树没有匹配到`Provider`时，`defaultValue`才生效，**向`Provider`中 value 中传递 `undefined`**，`defaultValue`不会生效。

#### Context.Provider

Context 对象会返回 `Provider React` 组件

- 接收 value 属性，传递给 consumer 组件
- 可以嵌套，里层覆盖外层
- value 值改变，内部所有 consumer 组件重新渲染
- consumer 组件不受制于`shouldComponentUpdate` 函数，==? 因此 consumer 组件在其祖先组件退出更新的情况下也能更新==

```JSX
<MyContext.Provider value={/* 某个值 */}>
```

> 通过新旧值检测来确定变化，使用了与 [`Object.is`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#Description) 相同的算法。

#### Class.contextType

`contextType` ：可以赋值为 [`React.createContext()`](https://zh-hans.reactjs.org/docs/context.html#reactcreatecontext) 创建的 Context 对象。赋值后，可以同 `this.context`来获取 最近 Context

**可以在任何生命周期中访问到它，包括 render 函数中。**

```jsx
class MyClass extends React.Component {}
MyClass.contextType = MyContext
```

实验性语法

```jsx
class MyClass extends React.Component {
  static contextType = MyContext
  render() {}
}
```

#### Context.Consumer

在函数式组件订阅 context，**需要一个函数作为子元素**。

函数接收当前的 context 值作为参数，并返回一个 React 节点。

context 参数值：由组件树上最近 Provider 提供，如果没有对应 Provider，为`createContext()` 的 `defaultValue`。

```jsx
<MyContext.Consumer>
  {value => /* 基于 context 值进行渲染*/}
</MyContext.Consumer>
```

#### Context.displayName

context 对象的 `displayName` 的 property

- type：string
- 作用：React DevTools 使用该字符串来确定 context 要显示的内容。

```jsx
const MyContext = React.createContext(/* some value */);
MyContext.displayName = 'MyDisplayName';

<MyContext.Provider> // "MyDisplayName.Provider" 在 DevTools 中
<MyContext.Consumer> // "MyDisplayName.Consumer" 在 DevTools 中
```

## Refs && DOM

`Refs`：允许我们*访问 DOM 节点*或*在 render 方法中创建的 React 元素*

### 使用场景

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

### 注意事项

- **避免使用 `refs` 来做可以通过声明式实现来完成的事情**。如：在 `Dialog` 组件里暴露 `open()` 和 `close()` 方法，最好传递 `isOpen` 属性。
- 不要过度使用

### 创建 Refs

`React.createRef()` ：创建`Refs`，并通过 `ref` 属性*附加到 React 元素*

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.myRef = React.createRef()
  }
  render() {
    return <div ref={this.myRef} />
  }
}
```

### 访问 Refs

ref 的 `current` 属性中被访问*`ref`所在节点*

```jsx
const node = this.myRef.current
```

#### DOM 元素添加 ref

React 会在*组件挂载*时给 `current` 属性传入 DOM 元素，并在*组件卸载*时传入 `null` 值。

`ref` 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子**触发前更新**。

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef()
    this.focusTextInput = this.focusTextInput.bind(this)
  }

  focusTextInput() {
    // 使用原生 API 获得焦点
    this.textInput.current.focus()
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input type="text" ref={this.textInput} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    )
  }
}
```

#### class 组件添加 ref

通过为 _组件添加 ref_，_调用组件方法_。**`CustomTextInput`必须声明为`class`**

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }

  componentDidMount() {
    this.textInput.current.focusTextInput()
  }

  render() {
    return <CustomTextInput ref={this.textInput} />
  }
}
```

#### Refs 与函数组件

**你不能在函数组件上使用 `ref` 属性**，因为它们没有实例

```jsx
function MyFunctionComponent() {
  return <input />
}

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = React.createRef()
  }
  render() {
    // This will *not* work!
    return <MyFunctionComponent ref={this.textInput} />
  }
}
```

可以**在函数组件内部使用 `ref` 属性**，只要它指向一个 DOM 元素或 class 组件

```jsx
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 才可以引用它
  const textInput = useRef(null)
  function handleClick() {
    textInput.current.focus()
  }
  return (
    <div>
      <input type="text" ref={textInput} />
      <input type="button" value="Focus the text input" onClick={handleClick} />
    </div>
  )
}
```

### DOM Refs 暴露给父组件

在*父组件中引用子节点 DOM* 节点（不建议）

- _直接添加`ref`_：在函数组件无效
- ref 作为特殊名字的 _prop 直接传递_
- _Ref 转发_^16.3^：使组件可以像*暴露自己 ref 一样*暴露子组件的 ref
- _findDOMNodex_^废弃^
- _String_^过时^：string 类型的 `ref` 属性。通过 `this.refs.textInput` 来访问 DOM 节点。

### 回调 Refs

更精细地*控制何时 `refs` 被设置和解除*。接受 React *组件实例*或 _HTML DOM_ 元素作为参数。

_组件挂载_：会调用 `ref` 回调函数并传入 DOM 元素

_组件卸载_：调用它并传入 `null`。

在 `componentDidMount` 或 `componentDidUpdate` 触发前，React 会*保证 `refs` 一定是最新的*

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props)
    this.textInput = null
    this.setTextInputRef = (element) => {
      this.textInput = element
    }
    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus()
    }
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput()
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React 实例上（比如 this.textInput）
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    )
  }
}
```

通过`props`将 `this.inputElement`设置为子元素 `ref`

```jsx
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />
    </div>
  )
}

class Parent extends React.Component {
  render() {
    return <CustomTextInput inputRef={(el) => (this.inputElement = el)} />
  }
}
```

### 回调 refs 说明

如果 `ref` 回调函数是以*内联函数的方式定义*的，在更新过程中它*会被执行两次*

- 第一次：传入参数 `null`
- 第二次：传入参数 DOM 元素

因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。

解决：将 ref 回调函数定义成 *class 的绑定函数的方式*可以避免上述问题

## PropTypes 类型检查

通过类型检查*捕获大量错误*。`PropTypes` 提供一系列验证器，可用于确保组件接收到的数据类型是有效的。

适用于：class 组件、函数组件、`React.memo` / `React.forwardRef`创建的组件

> 仅在开发模式下检查

```jsx
import PropTypes from 'prop-types'
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}
Greeting.propTypes = {
  name: PropTypes.string
}
```

### PropTypes

```jsx
import PropTypes from 'prop-types'

MyComponent.propTypes = {
  // 你可以将属性声明为 JS 原生类型，默认情况下
  // 这些属性都是可选的。
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
  // 任何可被渲染的元素（包括数字、字符串、元素或数组）(或 Fragment) 也包含这些类型。
  optionalNode: PropTypes.node,
  // 一个 React 元素。
  optionalElement: PropTypes.element,
  // 一个 React 元素类型（即，MyComponent）。
  optionalElementType: PropTypes.elementType,
  // 你也可以声明 prop 为类的实例，这里使用
  // JS 的 instanceof 操作符。
  optionalMessage: PropTypes.instanceOf(Message),

  // 你可以让你的 prop 只能是特定的值，指定它为
  // 枚举类型。
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 一个对象可以是几种类型中的任意一个类型
  optionalUnion: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Message)]),

  // 可以指定一个数组由某一类型的元素组成
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 可以指定一个对象由某一类型的值组成
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 可以指定一个对象由特定的类型值组成
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // An object with warnings on extra properties
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number
  }),

  // 你可以在任何 PropTypes 属性后面加上 `isRequired` ，确保
  // 这个 prop 没有被提供时，会打印警告信息。
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的必需数据
  requiredAny: PropTypes.any.isRequired,

  // 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
  // 请不要使用 `console.warn` 或抛出异常，因为这在 `oneOfType` 中不会起作用。
  customProp: function (props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.')
    }
  },

  // 你也可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器。
  // 它应该在验证失败时返回一个 Error 对象。
  // 验证器将验证数组或对象中的每个值。验证器的前两个参数
  // 第一个是数组或对象本身
  // 第二个是他们当前的键。
  customArrayProp: PropTypes.arrayOf(function (propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error('Invalid prop `' + propFullName + '` supplied to' + ' `' + componentName + '`. Validation failed.')
    }
  })
}
```

### 限制单个元素

通过 `PropTypes.element` 来确保传递给组件的 children 中*只包含一个元素*。

```jsx
import PropTypes from 'prop-types'

class MyComponent extends React.Component {
  render() {
    // 这必须只有一个元素，否则控制台会打印警告。
    const children = this.props.children
    return <div>{children}</div>
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
}
```

### 默认 Prop 值

配置特定的 `defaultProps` 属性来定义 `props` 的*默认值*。

**`propTypes` 类型检查发生在 `defaultProps` 赋值后**

```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>
  }
}

// 指定 props 的默认值：
Greeting.defaultProps = {
  name: 'Stranger'
}

// 渲染出 "Hello, Stranger"：
ReactDOM.render(<Greeting />, document.getElementById('example'))
```

### 函数组件

函数组件中 使用 `propType`

```jsx
import PropTypes from 'prop-types'

function HelloWorldComponent({ name }) {
  return <div>Hello, {name}</div>
}

HelloWorldComponent.propTypes = {
  name: PropTypes.string
}

export default HelloWorldComponent
```

## 非受控组件

表单数据将交由 DOM 节点来处理， _使用 `ref` 来从 DOM 节点中获取表单数据_。非受控组件将*真实数据储存在 DOM 节点中*

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.input = React.createRef()
  }
  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value)
    event.preventDefault()
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
```

### 默认值

指定一个 `defaultValue` 属性，赋予组件一个初始值。在一个组件**已经挂载之后去更新 `defaultValue` 属性值**，**不会造成 DOM 上值的任何更新**。

### 文件输入

在 HTML 中，`<input type="file">` *可以让用户选择*一个或多个文件上传到服务器，或者*通过使用 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行操作*。

创建一个 [DOM 节点的 ref](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html) 从而在提交表单时获取文件的信息

```jsx
class FileInput extends React.Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fileInput = React.createRef()
  }
  handleSubmit(event) {
    event.preventDefault()
    alert(`Selected file - ${this.fileInput.current.files[0].name}`)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Upload file:
          <input type="file" ref={this.fileInput} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

ReactDOM.render(<FileInput />, document.getElementById('root'))
```
