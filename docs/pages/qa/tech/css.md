---
title: css
order: 3
---

# CSS

## 基础类

### block 和 inline 的区别？

**block：** 独占一行，可设置宽高、margin、padding

**inline：** 不独占一行，不可设置宽高，可设置水平 margin、padding 但不能设置垂直方向 margin、padding

### 隐藏元素的方式

**display：none** 直接消失

**visibility：hidden** 不可见，但占着位置

**opacity：0** 透明不可见，但占着位置

**position：absolute** 绝对定位并移出可见范围

**z-index：-999** 将层级设置在底部，让他不可见

### link 和@import 区别

- link 可以加载 css、rss；@import 只能加载 css
- link 在页面载入时同时加载；@import 在页面载入后再加载
- link 无兼容问题；@import 是新语法，低版本浏览器不兼容
- link 标签可被 js 操作 dom 去除；@import 不行

### transition 和 animation 的区别

**transition：** 过度样式，需要被动触发

**animation：** 动画样式，不需要被动触发，可以自动触发，可结合@keyframe 进行多个关键帧的动画

### 伪元素和伪类

**伪元素：** 生成一些不存在的元素，并且可以在这些虚拟元素上应用样式。语法是在选择器后添加两个冒号和伪元素名称，例如 `::before`、`::after` 等。

```
::before
::after
::first-letter
::first-line
::selection
::placeholder
```

**伪类：** 选择元素的特殊状态或位置，它的语法是在选择器后添加一个冒号和伪类名称，例如 `:hover`、`:focus` 等

```
:hover
:active
:focus
:visited
:first-child
:last-child
:nth-child(n)
:not(selector)
:disabled
:checked
```

### 盒模型

**标准盒模型：** width、height 的计算范围只包含 content

**IE 盒模型：** width、height 的计算范围包含 content、padding、border

**box-sizing: content-box** 标准盒模型（默认）

**box-sizing: border-box** IE 盒模型（怪异盒模型）

### CSS3 新样式

1. 边框和背景：`border-radius`、`box-shadow`、`background-size`、`linear-gradient`、`radial-gradient`等。
2. 文字排版：`text-shadow`、`word-wrap`、`word-break`、`text-overflow`等。
3. 盒子模型：`box-sizing`、`background-clip`、`background-origin`等。
4. 变形与动画：`transform`、`transition`、`animation`、`perspective`等。
5. 选择器：`[attribute]`、`:checked`、`:not()`、`::before`、`::after`等。
6. 布局与弹性盒子：`column-count`、`column-gap`、`flex`、`flex-direction`等。
7. 字体：`@font-face`、`font-feature-settings`、`text-rendering`等。
8. 媒体查询：`@media`、`min-width`、`max-width`、`orientation`等。
9. 其他：`cal()，var()`

### flex：1 代表什么？

flex: 1 1 auto

分别是 `flex-grow、flex-shrink、flex-basis`

### CSS 常见单位

像素（`px`）：像素是最常用的单位，也是 Web 开发中默认的单位。像素可以根据设备分辨率的不同而自适应。

百分比（`%`）：百分比是相对于父元素的宽度或高度的单位。例如，设置一个元素的宽度为 50%将使该元素占父元素宽度的 50%。

`em`：em 是相对单位，它是相对于当前元素的字体大小。例如，如果一个元素的字体大小为 16 像素，设置它的宽度为 2em 将使该元素的宽度为 32 像素（16 x 2）。

`rem`：rem 也是相对单位，它是相对于根元素（即`<html>`元素）的字体大小。因此，rem 更适用于响应式设计，它可以根据不同的屏幕尺寸自动调整大小。

`vw和vh`：vw 和 vh 是相对于视窗宽度和高度的单位。例如，设置一个元素的宽度为 50vw 将使该元素占视窗宽度的 50%。

### CSS 提升性能方式

1. 减少选择器的复杂度和嵌套层级，避免使用通配符和标签选择器，使用类选择器和 ID 选择器。
2. 合并 CSS 文件，减少 HTTP 请求次数。
3. 尽可能使用 CSS Sprites（CSS 雪碧图）来减少图像 HTTP 请求。
4. 压缩 CSS 文件，减小文件大小。
5. 通过使用缓存来减少页面的加载时间。
6. 避免在 CSS 中使用表达式和!important，它们会影响页面渲染速度。
7. 避免在样式中使用长的和复杂的属性值，这会影响解析和渲染的速度。
8. 避免使用响应式图片，可以通过在服务器端根据设备类型动态生成适当的图片大小，减少浏览器端的计算。
9. 避免使用过度的动画效果，它们会影响页面的性能和交互体验。

### BFC

`BFC`是 CSS 中的一种渲染机制，它的全称是`Block Formatting Context`（块级格式化上下文）。BFC 的作用是提供一个独立的渲染环境，可以避免一些常见的布局问题，并且在一些特殊的情况下能够改变元素的渲染行为。

BFC 可以通过以下方式触发：

1. 根元素（`html`）
2. 浮动元素（`float`属性不为 none）
3. 绝对定位元素（`position`为 absolute 或 fixed）
4. display 属性值为`inline-block、table-cell、table-caption、flex、inline-flex、grid、inline-grid`的元素
5. overflow 属性值不为 visible 的元素（`overflow: hidden/scroll/auto`）

当一个元素形成了 BFC 之后，它的渲染规则会发生一些变化，包括但不限于：

1. BFC 元素会在**垂直方向上**形成一个独立的渲染区域，内部的元素会一个接一个地排列。
2. BFC 元素的**高度包含内部元素的高度，即使这些元素浮动也不例外**
3. BFC 元素的外边距**不会与相邻块级元素的外边距合并**。
4. BFC 元素可以包含浮动元素，并且会完整地**包裹浮动元素**。
5. BFC 元素可以**防止内部元素的文本环绕浮动元素**的现象。

## 对比类

块级元素和行内元素的区别

## 实战类

img 是否遇到底部 3px 的问题

### 垂直水平居中

### 画三角形

### 聊天气泡加阴影
