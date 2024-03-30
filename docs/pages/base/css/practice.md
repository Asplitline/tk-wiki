---
title: CSS 实战
order: 4
---

# CSS 实战

## 应用类

### input number 输入框上下箭头

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type="number"] {
  -moz-appearance: textfield;
}
```

### 0.5px 细线边框

```less
.box {
  position: relative;
  ::before {
    content: "";
    position: absolute;
    width: 200%;
    height: 200%;
    border: 1px solid transparent;
    /* transform-origin: 0 0; */
    transform: scale(0.5, 0.5);
    box-sizing: border-box;
    border-radius: 185px;
  }
}
```

### 滚动穿透

```javascript
toggleForbidScrollThrough(isForbide) {
	if (isForbide) {
		this.scrollTop =
		document.body.scrollTop || document.documentElement.scrollTop
		// position fixed会使滚动位置丢失，所以利用top定位
		document.body.style.position = 'fixed'
		document.body.style.top = `-${this.scrollTop}px`
		document.body.style.left = 0
		document.body.style.right = 0
	} else {
		// 恢复时，需要还原之前的滚动位置
		document.body.style.position = 'static'
		document.body.style.top = '0px'
		window.scrollTo(0, this.scrollTop)
	}
}
```

### 超长省略

#### 单行省略

```css
.single-line {
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

> 反向省略：通过 `direction` 设置文本排列方向。如 `direction: rtl`

#### 多行溢出隐藏

```css
.multiple-line {
  width: 200px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box; /*弹性伸缩盒子模型*/
  -webkit-line-clamp: 2; /*设置显示文本行数*/
  -webkit-box-orient: vertical; /*伸缩盒子子排列方式*/
}
```

#### 整块溢出隐藏

将 `display: inline` 改为 `display: inline-block` 实现整块省略

```html
<p class="person-card__desc single-line inlineblock">
  <span>FE</span>
  <span>BE</span>
  <span>UX Designer</span>
  <span>前端工程师</span>
</p>
```

```css
.inlineblock span {
  display: inline-block;
}
```

#### 溢出隐藏文本和全文显示

思路：

1. 利用文本占位
2. before 伪元素进行显示文本
3. after 伪元素处理 link 显示

关键点：-webkit-line-clamp 会触发类似 bfc 的独立区域，保证盒子在 after 伪元素负值时不会重叠

```html
<div class="wrapper">
  <div
    class="text"
    title="Aut nobis voluptatem harum doloremque hic reiciendis dolorem.Aut nobis voluptatem harum doloremque hic reiciendis dolorem.Aut nobis voluptatem harum doloremque hic reiciendis dolorem."
  >
    Aut nobis voluptatem harum doloremque hic reiciendis dolorem.Aut nobis
    voluptatem harum doloremque hic reiciendis dolorem.Aut nobis voluptatem
    harum doloremque hic reiciendis dolorem.
  </div>
  <div class="link"><a href="#">全文</a></div>
</div>

<div class="wrapper">
  <div
    class="text"
    title="Aut nobis voluptatem harum doloremque hic reiciendis dolorem."
  >
    Aut nobis voluptatem harum doloremque hic reiciendis dolorem.
  </div>
  <div class="link"><a href="#">全文</a></div>
</div>
```

```css
.wrapper {
  margin: 50px auto;
  width: 400px;
  background: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  position: relative;
  overflow: hidden;
}

.text,
.text::before {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  overflow: hidden;
  text-align: justify;
  text-overflow: ellipsis;
  line-height: 1.5;
  background: inherit;
}

.text::before {
  position: absolute;
  content: attr(title);
  left: 15px;
  right: 15px;
}

.text::after {
  content: "";
  display: block;
  margin-top: -1.5em;
}
```

### 实现三角形

```css
border: 50px solid transparent;
border-bottom: 150px solid green;
```

### 滚动条抖动问题

```css
.box {
  padding-right: calc(100vw - 100%);
}
```

> 100vw 为 视窗宽度，100%为内容宽度，100vw - 100 % 为 滚动条宽度。margin-right 也可以。

### 隐藏空元素

```css
// 作用于所有节点
:empty {
  display: none;
}
```

### 斜向分割线

```css
.hr-line {
  border: 0;
  padding: 3px;
  background: repeating-linear-gradient(135deg, #a2a9b6 0px, #a2a9b6 1px, transparent 1px, transparent 6px);
  margin: 0;
}
```

## 文字类

### 文字镂空

```css
h1 {
  display: inline-block;
  color: inherit;
  line-height: 1.2;
  font-size: 60px;
  background: linear-gradient(to right, rgb(0, 225, 180), rgb(1, 201, 218));
  -webkit-text-stroke: 4px transparent;
  -webkit-background-clip: text;
  -webkit-text-fill-color: inherit;
}
```

### @font-face 字体多源

1. 声明多个源

```css
@font-face {
  font-family: "DroidSerif";
  src: url("DroidSerif-Regular-webfont.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "DroidSerif";
  src: url("DroidSerif-Italic-webfont.ttf") format("truetype");
  font-weight: normal;
  font-style: italic;
}
@font-face {
  font-family: "DroidSerif";
  src: url("DroidSerif-Bold-webfont.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "DroidSerif";
  src: url("DroidSerif-BoldItalic-webfont.ttf") format("truetype");
  font-weight: bold;
  font-style: italic;
}
```

2. 使用

```css
body {
  font-family: "DroidSerif", Georgia, serif;
}
h1 {
  font-weight: bold;
}
em {
  font-style: italic;
}
strong em {
  font-weight: bold;
  font-style: italic;
}
```

> 参考 [@font-face tip: define font-weight and font-style](https://www.456bereastreet.com/archive/201012/font-face_tip_define_font-weight_and_font-style_to_keep_your_css_simple/)

## 知识扩展类

### currentColor 和 color

currentColor = color，但 color 不止为字体颜色

```css
.g-currentColor {
  color: #f00;
  border: 1px solid;
  box-shadow: 2px 2px 10px 2px;
  text-shadow: 2px 2px 5px;
}
```

`border: 1px solid` 等价于 `border: 1px solid currentColor`

### unset、initial、inherit

inherit：从父级继承

应用：继承图片资源重用图片

```css
.g-reflect {
    width: 200px;
    height: 200px;
    background-image: url('image.jpg');
}
.g-reflect::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    bottom: -100%;
+   background-image: inherit;
    transform: rotateX(180deg);
    mask: linear-gradient(transparent, #000);
}
```

unset：有继承样式，设置为继承值。没有继承样式，设置为初始值

应用：有些场景不好设置初值

```css
div {
  position: relative;
  margin: auto;
  width: 300px;
  height: 300px;
  border: 2px solid #000;
}
div::before,
div::after {
  content: "<";
  position: absolute;
  top: 130px;
  left: 20px;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  border: 1px solid #999;
  text-align: center;
  cursor: pointer;
}
/* 重置left */
div::after {
  left: unset;
  right: 20px;
}
```

### fixed 失效

层叠上下文对 fixed 影响，导致无法相对视口定位。

原因：堆叠上下文（Stacking Context）。堆叠上下文是 HTML 元素的三维概念，这些 HTML 元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的 z 轴上延伸，**HTML 元素依据其自身属性按照优先级顺序占用层叠上下文的空间**。

> 生成了 Stacking Context 的元素会影响该元素的层叠关系与定位关系

以下条件会触发

1. `z-index` 值不为 auto 的 绝对/相对定位
2. 一个 `z-index` 值不为 auto 的 flex 项目 (flex item)
3. `opacity` 属性值小于 1 的元素
4. `transform` 属性值不为 none 的元素
5. `mix-blend-mode` 属性值不为 normal 的元素
6. `filter`值不为“none”的元素
7. `perspective`值不为“none”的元素
8. `isolation` 属性被设置为 isolate 的元素
9. 在 `will-change` 中指定了任意 CSS 属性
10. `-webkit-overflow-scrolling` 属性被设置 touch 的元素
11. 设置了 `transform-style`: preserve-3d 的元素
12. 设置了 `contain`: paint | layout | content | strict 的元素
13. 设置了 `backdrop-filter` 的元素

在线示例：https://codepen.io/Chokcoco/pen/wqXZXd

> 希望 `position: fixed` 的父容器的 `overflow: hidden` 生效，也需要生成一个 Stacking Context

### 3D 坍塌

使用 CSS 混合模式（滤镜同理）的时候，堆叠上下文会重新对这个使用了混合模式的元素的根节点处创建一个独立的渲染平面，但是很可惜，这个渲染平面是不支持 preserve-3d 的，所以我们看到是一个 2D 的平面效果

参考：https://chokcoco.github.io/demo/ppt/html/YOU_DONT_KNOW_CSS.html#/8/7

### 100vh

在移动端 chrome 浏览器中， 100vh 高度会出现滚动条

原因：很多浏览器，会把地址栏计算在内

更优写法，利用百分比

```css
html,
body {
  width: 100%;
  height: 100%;
}
div {
  height: 100%;
}
```

### 替换元素伪元素

所有元素都有 `::before` 和 `::after` 伪元素吗？

无法将 CSS 伪元素 `::before` 和 `::after` 添加到文本输入框和图片，因为这些元素是**替换元素**

原因：替换元素将替换元素的所有内容，包括 `::before` 和 `::after`

常见替换元素：

- `<audio>`
- `<canvas>`
- `<embed>`
- `<iframe>`
- `<img>`
- `<input>`
- `<object>`
- `<video>`

特例：`<img>` 元素不一定总是替换元素

如果图像无法加载，则在 Chrome 和 Firefox 中可以将 `::before` 和 `::after` 添加到 `<img>` 中

利用这个特性将 默认图片 和 alt 同时显示

```html
<img src="image.png" onerror="this.classList.add('error');" alt="Alt Info" />
```

```css
img.error {
  position: relative;
}
img.error::before {
  content: "";
  /** 定位代码 **/
  background: url(error-default.png);
}
img.error::after {
  content: attr(alt);
  /** 定位代码 **/
}
```

在线示例：https://codepen.io/Chokcoco/pen/WNGgNqv

## 溢出元素隐藏的多种方式

1. `overflow : hidden`
2. `clip-path`: 灵活裁剪
3. `contain: paint` 不绘制元素范围外的内容

> `contain: paint` 属性诞生的目的，即是为加快页面的渲染，在非必要区域，不渲染元素。因此，如果元素不在屏幕上或以其他方式设定为不可见，则其后代不可见不被渲染。

参考链接：https://github.com/chokcoco/iCSS/issues/90

## 技巧类

### box-sizing

```css
html {
  box-sizing: border-box;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
```

### 选择器权重

```html
<div class="box"></div>
```

```css
body > .box {
  background-color: red;
}
```

场景：需要改变上面背景颜色

1. 新增 class，提高权重
2. 利用 !important 强行提高权重
3. class 复用 (推荐)

```css
.box.box {
  background-color: blue;
}
```

4. 利用属性选择器 (推荐)

```css
.box[class] {
  background-color: blue;
}
```

## 相关链接

- [你不知道的 CSS](https://chokcoco.github.io/demo/ppt/html/YOU_DONT_KNOW_CSS.html)
