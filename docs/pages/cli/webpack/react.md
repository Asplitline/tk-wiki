---
title: React
order: 3
---

# React Config - Webpack

## 配置全局 scss

1. 安装 sass `yarn add sass -D`
2. 安装 全局 loader `yarn add sass-resources-loader -D`
3. 拉取配置文件，安装依赖

```json
yarn eject
yarn install
```

4. 配置 全局 sass

```javascript
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
    },
    'sass-loader'
  ).concat([
    // done global scss
    {
      loader: "sass-resources-loader",
      options: {
        resources: [
          path.join(__dirname, "../src/assets/scss/_variables.scss"),
          path.join(__dirname, "../src/assets/scss/_mixins.scss")
        ]
      }
    }
  ]),
  // Don't consider CSS imports dead code even if the
  // containing package claims to have no side effects.
  // Remove this when webpack adds a warning or an error for this.
  // See https://github.com/webpack/webpack/issues/6571
  sideEffects: true,
},
```


## 相关链接

[react--添加环境变量](https://juejin.cn/post/6850418114979430413)
