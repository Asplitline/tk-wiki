---
title: CSS
order: 2
---

# CSS 实战

## input number 输入框上下箭头

```css
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'] {
  -moz-appearance: textfield;
}
```

## 0.5px 细线边框

```less
.box {
  position: relative;
  ::before {
    content: '';
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

## 滚动穿透

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

## 多行溢出隐藏

```css
display: -webkit-box; /*弹性伸缩盒子模型*/
-webkit-box-orient: vertical; /*伸缩盒子子排列方式*/
-webkit-line-clamp: 3; /*设置显示文本行数*/
text-overflow: ellipsis;
overflow: hidden;
```

## 溢出隐藏文本和全文显示

思路：

1. 利用文本占位
2. before 伪元素进行显示文本                                                                                                                                                                                                             
3. after 伪元素处理 link 显示

关键点：-webkit-line-clamp 会触发类似 bfc 的独立区域，保证盒子在 after 伪元素负值时不会重叠

```html
<div class="wrapper">
  <div class="text" title="Aut nobis voluptatem harum doloremque hic reiciendis dolorem.Aut nobis voluptatem harum doloremque hic reiciendis dolorem.Aut nobis voluptatem harum doloremque hic reiciendis dolorem.">Aut nobis voluptatem harum doloremque hic reiciendis dolorem.Aut nobis voluptatem harum doloremque hic reiciendis dolorem.Aut nobis voluptatem harum doloremque hic reiciendis dolorem.</div>
  <div class="link"><a href="#">全文</a></div>
</div>

<div class="wrapper">
  <div class="text" title="Aut nobis voluptatem harum doloremque hic reiciendis dolorem.">Aut nobis voluptatem harum doloremque hic reiciendis dolorem.</div>
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
  text-align:justify;
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



## box-sizing

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

## CSS 实现 - 三角形

```css
border: 50px solid transparent;
border-bottom: 150px solid green;
```

## 滚动条抖动问题

```css
.box {
  padding-right: calc(100vw - 100%);
}
```

> 100vw 为 视窗宽度，100%为内容宽度，100vw - 100 % 为 滚动条宽度。margin-right 也可以。

## 隐藏 空元素

```css
// 作用于所有节点
:empty {
  display: none;
}
```

## ---文字类---

## 文字镂空

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

## @font-face 字体多源

1. 声明多个源

```css
@font-face {
  font-family: 'DroidSerif';
  src: url('DroidSerif-Regular-webfont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: 'DroidSerif';
  src: url('DroidSerif-Italic-webfont.ttf') format('truetype');
  font-weight: normal;
  font-style: italic;
}
@font-face {
  font-family: 'DroidSerif';
  src: url('DroidSerif-Bold-webfont.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: 'DroidSerif';
  src: url('DroidSerif-BoldItalic-webfont.ttf') format('truetype');
  font-weight: bold;
  font-style: italic;
}
```

2. 使用

```css
body {
  font-family: 'DroidSerif', Georgia, serif;
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
