---
title: 移动web
order: 3
---

# 移动web

## 视口

视口（viewport）：浏览器显示页面内容的**屏幕区域**。 

视口分为布局视口、视觉视口和理想视口

### 布局视口 layout viewport

移动设备的浏览器都**默认**设置了一个布局视口。

<img src="mobile.assets/2.png" alt="2" style="zoom: 67%;" />

### 视觉视口 visual viewport

**用户**正在看到的网站的区域（网站区域）

<img src="mobile.assets/3.png" alt="3" style="zoom: 67%;" />

### 理想视口 ideal viewport

使网站在移动端有最理想的浏览和阅读宽度而设定

**手动添写meta视口标签**

- `width` - viewport宽度
- `user-scalable` -  用户是否可以缩放 `yes` | `no`
- `initial-scale` - **初始**缩放比
- `maximum-scale` - **最大**缩放比
- `minimum-scale` - **最小**缩放比

```html
<meta name="viewport" content="width=device-width，user-scalable=no,initial-scale=l.0,maximum-scale=l.0,minimum-scale=l.0">
```

## 像素

**物理像素**：屏幕显示的最小颗粒，是真实存在

**物理像素比或屏幕像素比**：一个px显示物理像素点个数

## 移动端方案

### 单独制作移动端页面（主流）

网址域名前面加 m(mobile)，PC端和移动端为两套网站

- 流式布局（百分比布局）
- flex 弹性布局（强烈推荐）
- less+rem+媒体查询布局

### 响应式页面兼容移动端（其次）

pc和移动端共用一套网站，不同屏幕下，样式会自动适配

- 媒体查询
- bootstarp

### 移动端兼容问题

移动端浏览器基本以 `webkit` 内核为主

> 移动端 CSS 初始化推荐使用 `normalize.css` 

```css
/*CSS3盒子模型*/
box-sizing: border-box;
-webkit-box-sizing: border-box;
/*点击高亮我们需要清除 设置为transparent 完成透明*/
-webkit-tap-highlight-color: transparent;
/*在移动端浏览器默认的外观在iOS上加上这个属性才能给按钮和输入框自定义样式*/
-webkit-appearance: none;
/*禁用长按页面时的弹出菜单*/
img,a { -webkit-touch-callout: none; }
```

## rem布局

rem(root em)：一个相对单位，类似于em，em是父元素字体大小。**rem基于html元素字体大小**

> 父元素文字大小可能不一致， 但只有一个html

### rem适配方案

使用媒体查询按不同设备设置不同html字体大小，然后以 rem作为尺寸单位

> 原理：利用rem的唯一性和媒体查询

- less+rem+媒体查询

- `flexible.js`+ rem（推荐）
  - 原理：设备划分为10等份
  - 设计稿是 750px， 只需要把 html 文字大小设置为75px(750px / 10) 

**html font-size字体 = 屏幕宽度 / 划分的份数**
**px 对应 rem =  页面元素值（px） /  html font-size字体**

最终公式 ：  **px 对应 rem =  页面元素值（px） /  （屏幕宽度 /  划分的份数）**



## 响应式布局

使用媒体查询针对不同宽度的设备进行布局和样式的设置，从而适配不同设备的目的。

|   设备   |      尺寸       | 版心 |
| :------: | :-------------: | :--: |
| 超小屏幕 |   尺寸 < 768    | 100% |
|   平板   | 768< 尺寸 <992  | 750  |
|  显示器  | 992< 尺寸 <1200 | 970  |
| 大显示器 |   1200 < 尺寸   | 1170 |

### Bootstrap

http://www.bootcss.com/

http://getbootstrap.com/

http://bootstrap.css88.com/

```html
<!DOCTYPE html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8">
   <!--要求当前网页使用IE浏览器最高版本的内核来渲染-->
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<!--视口的设置：视口的宽度和设备一致，默认的缩放比例和PC端一致，用户不能自行缩放-->
	<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0">

    <title>Bootstrap 101 Template</title>

    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
      <!--[if lt IE 9]>
	<!--解决ie9以下浏览器对html5新增标签的不识别，并导致CSS不起作用的问题-->
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<!--解决ie9以下浏览器对 css3 Media Query 的不识别 -->
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
  </head>
  <body>
    <h1>你好，世界！</h1>

    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="//cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
  </body>
</html>
```

# 
