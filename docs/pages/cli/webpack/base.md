---
title: Webpack
order: 1
---

# Webpack

## webpack 配置别名

1. 拉取配置文件，安装依赖

```json
yarn eject
yarn install
```

2. 配置 别名

```javascript
alias: {
  // Support React Native Web
  // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-we
  'react-native': 'react-native-web',
  // Allows for better profiling with ReactDevTools
  ...(isEnvProductionProfile && {
    'react-dom$': 'react-dom/profiling',
    'scheduler/tracing': 'scheduler/tracing-profiling',
  }),
  ...(modules.webpackAliases || {}),
  // done alias
  '@': path.resolve(__dirname, '../src'),
},
```

## 移动端适配 flexible

[参考](https://zhuanlan.zhihu.com/p/148529375)

1. 安装 `yarn add lib**-**flexible postcss**-**px2rem`
2. 引入 `**import** 'lib-flexible'`
3. `webpack` 中配置

```javascript
const px2rem = require('postcss-px2rem-exclude')
```

```javascript
{
  // Options for PostCSS as we reference these options twice
  // Adds vendor prefixing based on your specified browser support in
  // package.json
  loader: require.resolve('postcss-loader'),
  options: {
    // Necessary for external CSS imports to work
    // https://github.com/facebook/create-react-app/issues/2677
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      },
      ),
      // done config px2rem  -- 1rem = 75px (750px)
      px2rem({ remUnit: 75, exclude: /node_modules/i }),
      // Adds PostCSS Normalize as the reset css with default options,
      // so that it honors browserslist config in package.json
      // which in turn let's users customize the target behavior as per their needs.
      postcssNormalize(),
    ],
    sourceMap: isEnvProduction ? shouldUseSourceMap : isEnvDevelopment,
  },
},
```

> `postcss**-**px2rem` 中 没有 exclude，改用 `postcss**-**px2rem**-**exclude` > `yarn remove postcss**-**px2rem ` > `yarn add postcss**-**px2rem**-**exclude`

## webpack 配置 proxy

```json
devServer: {
  port: port,
  open: true,
  overlay: {
    warnings: false,
    errors: true
  },
  proxy: {
    '/api': {
      target: 'http://000.000.000.000:8088/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '' // 路径重写
      },
      logLevel:'debug' // 打印日志
    }
  }
}
```

默认 request header 中 origin 为 local 本地地址，设置 changeOrigin，origin 变为 target 目标地址

## 去除 console

生产环境下去除 console
webpack.prod.config.js 文件下

1. 安装 `yarn add --dev uglifyjs-webpack-plugin`
2. 引入 `uglifyjs-webpack-plugin`

```javascript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
```

3. 在 plugins 中配置

```javascript
plugins: [
   new UglifyJsPlugin({
          uglifyOptions: {
            output: {
              comments: false, // 去掉注释
            },
            warnings: false,
            compress: {
              drop_console: true,
              drop_debugger: false,
              pure_funcs: ['console.log']//移除 console
            }
          }
    })
],
```

## 托管 cdn

webpack.dev.js

```javascript
const devWebpackConfig = merge(baseWebpackConfig, {
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      isProd: false
    }),
  ]
})
```

webpack.prod.js

```javascript
const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    app: './src/main.prod.js'
  },
  externals: {
    'vue': 'Vue',
    'element-ui': 'ELEMENT'
  },
  new HtmlWebpackPlugin({
      filename: process.env.NODE_ENV === 'testing'
        ? 'index.html'
        : config.build.index,
      template: 'index.html',
      inject: true,
      isProd: true, // 配置首页标识
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
  }),
}
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <% if (htmlWebpackPlugin.options.isProd) { %>
    <link rel="stylesheet" href="https://unpkg.com/element-ui@2.15.2/lib/theme-chalk/index.css" />
    <% } %>
  </head>

  <body>
    <% if (htmlWebpackPlugin.options.isProd) { %>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.14"></script>
    <script src="https://unpkg.com/element-ui@2.15.2/lib/index.js"></script>
    <% } %>

    <div id="app"></div>
    <!-- built files will be auto injected -->
  </body>
</html>
```

##
