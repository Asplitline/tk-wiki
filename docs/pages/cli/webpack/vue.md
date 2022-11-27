---
title: Vue
order: 2
---

# Vue Config - Webpack

## 配置全局 scss

### sass-resources-loader

1. 安装 sass-resources-loader，`yarn add sass-resources-loader -D`
2. 配置`vue.config.js`

```javascript
module.exports = {
  chainWebpack: (config) => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Or array of paths
          resources: ['./src/assets/scss/_mixins.scss', './src/assets/scss/_variables.scss']
        })
        .end()
    })
  }
}
```

### loaderOptions

1. 安装 sass，sass-loader，`yarn add sass-loader sass --dev`
2. 配置 `vue.config.js`

> vue 2.6，sass-loader 版本应该为^10，不能过高

```javascript
module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/css/variables.scss";@import "~@/css/mixins.scss";`
      }
    }
  }
}
```

## 配置别名

`vue.config.js`

```javascript
const path = require('path')
function load (url) {
  return path.resolve(__dirname, url)
}
module.exports = {
  chainWebpack: config => {
    config.when(process.env.NODE_ENV === 'production', config => {
    config.resolve.alias
      .set('@components', load('./src/components'))
   )
  }
}
```

## 生产开发环境

1. 分别新建 `.env.development` 和 `.env.production` 文件

```bash
VUE_APP_ENV="development"
```

```bash
VUE_APP_ENV="production"
```

2. 通过 `process.env.VUE_APP_ENV` 获取变量

> 踩坑：如果设置 NODE*ENV 和 BASE_URL 失效，尝试以 `VUE_APP*` 开头

## px to rem

1. `yarn add postcss-pxtorem@^5 --dev`
2. 新建 `postcss.config.js`

```javascript
module.exports = {
  plugins: {
    'postcss-pxtorem': {
      //根元素字体大小
      rootValue: 16,
      //匹配CSS中的属性，* 代表启用所有属性
      propList: ['*'],
      //转换成rem后保留的小数点位数
      unitPrecision: 5,
      //小于12px的样式不被替换成rem
      minPixelValue: 12,
      exclude: ['node_modules']
    }
  }
}
```

> postcss-pxtorem@6 会报错

## 去除生产环境 console

```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  // 去除生产环境sourceMap
  productionSourceMap: false,
  configureWebpack: (config) => {
    const plugins = []
    if (process.env.NODE_ENV !== 'development') {
      plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log'] //移除 console
            }
          }
        })
      )
      return { plugins }
    }
  }
}
```

## 三方库

### element ui 按需导入

安装 element ui

```shell
yarn add element-ui
yarn add babel-plugin-component -D
```

修改 `babel.config.js`

```javascript
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ]
  ]
}
```

### vue 引入 font-awesome

1. 安装 `yarn add font-awesome`
2. `main.js`引入

```javascript
import 'font-awesome/css/font-awesome.css'
```

##
