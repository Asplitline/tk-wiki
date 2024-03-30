---
title: postcss
order: 4
---

# PostCSS

## PostCSS 是什么？

PostCSS 是专门用于处理 CSS 代码的工具，通过一系列的插件来修改最终样式

## PostCSS 如何使用？

利用 `autofixer` 插件，把一些新的 CSS 特性加上浏览器特有的前缀

```css
box-sizing: border-box;

-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
```


利用 `postcss-preset-env` 插件，来使用最新的 CSS 特性。

```css
.box {
  background: #000000;

  &:hover {
    background: #000000;
  }
}

.box:hover {
  background: #000000;
}
```

安装 PostCSS

```bash
# yarn
yarn add --dev postcss postcss-cli
```

运行 PostCSS

```bash
npx postcss style.css -o dist.css
```


配置 `Autoprefixer、PostCSS Preset Env、StyleLint、PostCSS pxtorem` 示例

```js
// postcss.config.js
const postcssPresetEnv = require("postcss-preset-env");
module.exports = {
  plugins: [
    require("stylelint"),
    require("autoprefixer"),
    postcssPresetEnv({
      stage: 0,
    }),
    require("postcss-pxtorem"),
  ],
};
```




## 参考网址

https://mp.weixin.qq.com/s/KaWdyOGPNgiPHNt6RSQ_XA
