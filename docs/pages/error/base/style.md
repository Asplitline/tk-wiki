---
outline: deep
title: 样式相关
order: 3
---

# 样式相关问题

## sass 问题

### Module build failed: TypeError: this.getResolve is not a function

sass-loader 版本过高，降级到 ^7.3

```css
yarn add sass-loader@^7.3
```

## node-sass 问题

删除 node-sass ，安装 sass 和 sass-loader。

```
"sass": "~1.32.13",
"sass-loader": "~8.0.2",
```

> 需要锁住版本
