---
title: React Router
order: 4
---

# React-Router

## 快速开始

```shell
npm install react-router-dom
```

### 基础路由

`<Switch>`渲染第一个匹配的 `<Route>`

```jsx
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}
```

### 嵌套路由

```jsx
import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/topics">
            <Topics />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

function Home() {
  return <h2>Home</h2>
}

function About() {
  return <h2>About</h2>
}

function Topics() {
  let match = useRouteMatch()
  return (
    <div>
      <h2>Topics</h2>
      <ul>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
      </ul>

      {/* The Topics page has its own <Switch> with more routes
          that build on the /topics URL path. You can think of the
          2nd <Route> here as an "index" page for all topics, or
          the page that is shown when no topic is selected */}
      <Switch>
        <Route path={`${match.path}/:topicId`}>
          <Topic />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  )
}

function Topic() {
  let { topicId } = useParams()
  return <h3>Requested topic ID: {topicId}</h3>
}
```

## 基础组件

- `routers`：like `<BrowserRouter>` and `<HashRouter>`
- `route matchers`： like `<Route>` and `<Switch>`
- `navigation`：like `<Link>`, `<NavLink>`, and `<Redirect>`

### Routers

`<BrowserRouter>`：常规 URL，需要服务器配置，[配置指南](https://create-react-app.dev/docs/deployment#serving-apps-with-client-side-routing)。

`<HashRouter>`：存储在 URL hash 部分，hash 不会发送到服务器，无需单独配置。

> 确保 router 在元素根级层次，将 `<app>`包裹在 路由器下

### route matchers

`<Switch>` 和 `<Route>`：Switch 渲染，会寻找 **一个匹配路径 的路由**，**忽略其他**

**明确的路径放前面**。没有 `Route` 匹配，渲染 `null`。

> `/`将会匹配所有路由

path 默认匹配，_以...开始的路由_。完整路径匹配，使用 `exact`

```jsx
<Route exact path="/">
```

> **?** Although React Router does support rendering `<Route>` elements outside of a `<Switch>`, as of version 5.1 we recommend you use [the `useRouteMatch` hook](https://reactrouter.com/web/guides/primary-components/TODO) instead. Additionally, we do not recommend you render a `<Route>` without a `path` and instead suggest you use [a hook](https://reactrouter.com/web/guides/primary-components/TODO) to get access to whatever variables you need

### Navigation

`<Link>`：创造一个链接，类似 a 标签

```jsx
<Link to="/">Home</Link>
// <a href="/">Home</a>
```

`<NavLink>`：类似 Link。但*匹配路径时*，添加 `activeClassName`

```jsx
<NavLink to="/react" activeClassName="hurray">
  React
</NavLink>

// When the URL is /react, this renders:
// <a href="/react" className="hurray">React</a>
```

`<Redirect>`：强制跳转路径

## @ [服务器渲染](https://reactrouter.com/web/guides/server-rendering)

## 代码拆分

### 动态导入

不必加载所有代码。

`.babelrc`

webpack 内置 [`dynamic imports`](https://github.com/tc39/proposal-dynamic-import)

编译 JSX 和 JS 使用 [`@babel/plugin-syntax-dynamic-import`](https://babeljs.io/docs/plugins/syntax-dynamic-import/)

```json
{
  "presets": ["@babel/preset-react"],
  "plugins": ["@babel/plugin-syntax-dynamic-import"]
}
```

[loadable-components](https://github.com/smooth-code/loadable-components) ：动态导入库

```bash
npm install @loadable/component
# or use yarn
yarn add @loadable/component
```

`LoadableComponent` 渲染之前 使用 `Loading` 占位

```jsx
import loadable from '@loadable/component'
import Loading from './Loading.js'

const LoadableComponent = loadable(() => import('./Dashboard.js'), {
  fallback: <Loading />
})

export default class LoadableDashboard extends React.Component {
  render() {
    return <LoadableComponent />
  }
}
```

## 恢复滚动

### 滚到头部

`<ScrollToTop>`

#### 改变时触发

渲染在顶部（`<Router>`之下）

```jsx
function App() {
  return (
    <Router>
      <ScrollToTop />
      <App />
    </Router>
  )
}
```

##### Hook

添加 `pathname` 依赖

```jsx
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
```

##### subClass

`componentDidUpdate` 更新钩子

```jsx
import React from 'react'
import { withRouter } from 'react-router-dom'

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return null
  }
}

export default withRouter(ScrollToTop)
```

#### 初始化时触发

#### Hook

`[]` 空依赖

```jsx
function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return null
}
```

##### subClass

`componentDidMount`组件渲染依赖

```jsx
class ScrollToTopOnMount extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
    return null
  }
}
```

### 通用方案

需要解决两个问题

- 向上滚动导航，这样你就不会启动一个滚动到底部的新屏幕
- _前进、后退 、溢出元素_ 恢复 窗口位置，

```jsx
<Router>
  <ScrollRestoration>
    <div>
      <h1>App</h1>

      <RestoredScroll id="bunny">
        <div style={{ height: '200px', overflow: 'auto' }}>I will overflow</div>
      </RestoredScroll>
    </div>
  </ScrollRestoration>
</Router>
```

`ScrollRestoration`

- 向上滚动
- 通过 `sessionStorage` 保存窗口和组件滚动位置（`location.key`）

当 `ScrollRestoration`和 `RestoredScroll`挂载，能在 `sessionStorage`查看 位置

## 哲学

### 静态路由

### 动态路由

### 嵌套路由

```jsx
const App = () => (
  <BrowserRouter>
    {/* here's a div */}
    <div>
      {/* here's a Route */}
      <Route path="/tacos" component={Tacos} />
    </div>
  </BrowserRouter>
)

// when the url matches `/tacos` this component renders
const Tacos = ({ match }) => (
  // here's a nested div
  <div>
    {/* here's a nested Route,
        match.url helps us make a relative path */}
    <Route path={match.url + '/carnitas'} component={Carnitas} />
  </div>
)
```

### 响应路由

## @ 测试

## ？Redux 集成
