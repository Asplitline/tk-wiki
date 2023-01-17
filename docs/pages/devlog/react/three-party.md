---
title: 三方库
order: 3
---

# React 三方库实践

## react-intl

1. 安装 国际化插件 `yarn add react-intl`
2. 封装 Locale 组件

```jsx
import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { connect } from 'react-redux'
import enUS from './en-US'
import zhCN from './zh-CN'
const message = {
  'en-US': enUS,
  'zh-CN': zhCN
}
class Locale extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { locale } = this.props
    return (
      <IntlProvider locale={locale} messages={message[locale]}>
        {this.props.children}
      </IntlProvider>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    locale: state.locale.locale
  }
}
export default connect(mapStateToProps)(Locale)
```

3. 引入 Locale 组件（项目入口文件下）

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import LocaleProvider from './locale'
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocaleProvider>
        <App />
      </LocaleProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

4. 使用
   1. 函数式：需使用 `injectIntl `包裹组件
   2. 组件式：引入 `formattedMessage`

```jsx
import React, { Component } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
class Demo extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  change = () => {
    const { locale, changlanguage } = this.props
    changlanguage(locale === 'zh-CN' ? 'en-US' : 'zh-CN')
  }
  render() {
    const { intl } = this.props
    const t = intl.messages
    return (
      <div>
        <a href="#" onClick={this.change}>
          <FormattedMessage id="exchange"></FormattedMessage>
        </a>
        <ul>
          <li>{t.back}</li>
          <li>{t.all}</li>
          <li>{t.logout}</li>
          <li>{t.unbind}</li>
        </ul>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    locale: state.locale.locale
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    changlanguage: (value) =>
      dispatch({
        type: 'CHANGE_LANGUAGE',
        value
      })
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Demo))
```

> 此处使用 redux 和 react-redux，进行语言切换

官方网址：https://formatjs.io/

参考网址：

https://zhuanlan.zhihu.com/p/39732502

https://juejin.cn/post/6977183729944887333

案例仓库：
https://github.com/Asplitline/t-react-demo/tree/react-intl

## redux-tool

1. chrome ： 安装插件 Redux-DevTools
2. 项目添加依赖：`yarn add redux-devtools-extension -D`
3. 项目引入

```jsx
import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))
```

## react-dev-inspector

通过自定义，点击元素，跳转到对应文件

1. Inspector 插件 `yarn add --dev react-dev-inspector `
2. 添加 Inspector

```jsx
import React from 'react'
import { Inspector } from 'react-dev-inspector'

const InspectorWrapper = process.env.NODE_ENV === 'development'
  ? Inspector
  : React.Fragment

export const Layout = () => {
  // ...

  return (
    <InspectorWrapper
      keys={['control', 'shift', 'command', 'c']} // default keys
      ...  // Props see below
    >
     <Page />
    </InspectorWrapper>
  )
}
```

标签中加入相关信息，如下所示

```html
<div data-inspector-line="6" data-inspector-column="11" data-inspector-relative-path="src\examples\context-demo\Button.jsx">123</div>
```

3. 重写 webpack 插件 `yarn add --dev react-app-rewired`，使用`react-app-rewired `替换 `react-scripts`

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test",
  "eject": "react-scripts eject"
},
```

4. 配置工具库 ` yarn add customize-cra --dev`
5. 根目录下，新建 `config-overrides.js`

```javascript
const { ReactInspectorPlugin } = require('react-dev-inspector/plugins/webpack')
const { override, addBabelPlugin, addWebpackPlugin } = require('customize-cra')

module.exports = override(
  addBabelPlugin([
    'react-dev-inspector/plugins/babel',
    // plugin options docs see:
    // https://github.com/zthxxx/react-dev-inspector#inspector-babel-plugin-options
    {
      excludes: [/xxxx-want-to-ignore/]
    }
  ]),
  addWebpackPlugin(new ReactInspectorPlugin())
)
```

> 注意：customize-cra 依赖于 react-app-rewired

相关网址：

https://github.com/zthxxx/react-dev-inspector

https://github.com/timarney/react-app-rewired

https://github.com/arackaf/customize-cra

参考：
[https://juejin.cn/post/6901466406823575560](https://juejin.cn/post/6901466406823575560)

## babel-plugin-styled-components

debugger style-components

> 未在 create-react-app 项目中运行

备用方案：`react-app-rewire-styled-components`

1. `yarn add --dev react-app-rewired`，使用`react-app-rewired `替换 `react-scripts`
2. 安装 ：`yarn add --dev react-app-rewire-styled-components`
3. 配置 `config-overrides.js`

```javascript
const rewireStyledComponents = require('react-app-rewire-styled-components')

/* config-overrides.js */
module.exports = function override(config, env) {
  return rewireStyledComponents(config, env, {
    fileName: true,
    displayName: true
  })
}
```

```bash
yarn add --dev react-app-rewired react-app-rewire-styled-components
```

相关网址：

https://github.com/withspectrum/react-app-rewire-styled-components

## customize-cra

```javascript
 yarn add uglifyjs-webpack-plugin customize-cra --dev
```

```javascript
const { override, addBabelPlugin, addWebpackPlugin } = require('customize-cra')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
/* config-overrides.js */
module.exports = override(
  addWebpackPlugin(
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_debugger: true,
          drop_console: true
        }
      }
    })
  ),
  addBabelPlugin([
    'styled-components',
    {
      fileName: true,
      displayName: true
    }
  ])
)
```

## antd 按需导入

1. 安装 antd 

```shell
yarn add antd
```

2. 安装 按需导入插件

```shell
yarn add babel-plugin-import -D
```

3. 拉取配置文件，然后安装依赖

```json
yarn eject
yarn install
```

4. `package.json` 同级目录下新建 `.babelrc`（需删除 package.json 中 babel 配置）内容如下

```json
{
  "presets": ["react-app"],
  "plugins": [
    [
      "import",
      {
        "libraryName": "antd",
        "libraryDirectory": "es",
        "style": "css"
      }
    ]
  ]
}
```

补充：手动引入

```js
import DatePicker from 'antd/es/date-picker'; // 加载 JS
import 'antd/es/date-picker/style/css'; // 加载 CSS
// import 'antd/es/date-picker/style';         // 加载 LESS
```

