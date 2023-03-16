---
outline: deep
title: CSS3
order: 1
---

# CSS3

## flex

`display:flex`

### 与传统布局对比

#### 传统布局

布局繁琐。移动端不友好
兼容性好

#### flex 布局

布局简单，移动端使用广泛

兼容性：pc 端浏览器支持情况差、IE11 或更低版本不支持 flex 或仅支持部分

> 选择：pc：传统布局。移动端或不考虑兼容性使用 flex

### 基本概念

flex 是 flexible Box 的缩写，意为"弹性布局"，**任何一个容器都可以指定为 flex 布局**。

采用 Flex 布局的元素，称为 Flex 容器（`flex containe`r）。所有子元素自动成为容器成员，称为 Flex 项目（`flex item`）

> 不会脱离文档流
>
> flex 布局中，子元素的 `float`、`clear` 和 `vertical-align` 属性将失效

通过**父盒子添加 flex 属性**，来**控制子盒子**的位置和排列方式

容器默认存在两根轴：水平的**主轴**（main axis）和垂直的**交叉轴**（cross axis）

### 父项常见属性

|       属性        |              说明              |
| :---------------: | :----------------------------: |
| `flex-direction`  |          **主轴方向**          |
|    `flex-wrap`    |       子元素**是否换行**       |
|    `flex-flow`    |  flex-direction 和 flex-wrap   |
| `justify-content` |        **主轴**排列方式        |
|   `align-items`   | **交叉轴**排列方式（**单行**） |
|  `align-content`  | **交叉轴**排列方式（**多行**） |

#### flex-direction

**主轴方向**

```css
flex-direction: row | row-reverse | column | column-reverse;
```

- `row` (主轴默认)：横向排列（左右）
- `row-reverse`： 横向反向排列（右左）
- `column`（侧轴默认） ：纵向排列 （上下）
- `column-reverse` ：纵向反向排列（下上）

#### flex-wrap

子元素**是否换行**

```css
flex-wrap: nowrap | wrap | wrap-reverse;
```

- `nowarp`（默认）：不换行
- `warp`：换行
- `wrap-reverse`： 换行，反向排列，（从下到上，从左到右）

#### flex-flow

简写属性

```css
flex-flow: <flex-direction> || <flex-wrap>;
```

#### justify-content

**主轴**排列方式

```css
justify-content: flex-start | flex-end | center | space-between | space-around;
```

- `flex-start`（默认）：从头部开始
- `flex-end`：从尾部开始
- `center`： 居中对齐
- `space-between`：两端对齐，轴线之间的间隔平均分布
- `space-around`：环绕对齐，每根轴线两侧的间隔都相等
- `space-evenly`：等距离排列

#### aligin-items

**交叉轴**排列方式（**单行**）

```css
align-items: flex-start | flex-end | center | baseline | stretch;
```

- `flex-start`（默认）：交叉轴的起点对齐
- `flex-end`：交叉轴的终点对齐
- `center`：居中
- `baseline`：项目的第一行文字的基线对齐
- `stretch`：拉伸子元素（图片不行）

#### aligin-content

**交叉轴**排列方式（**多行**）

```css
align-content: flex-start | flex-end | center | space-between | space-around | stretch;
```

- `stretch`（默认）：未设置高度或设为 auto，将占满整个容器的高度
- `flex-start`：从头部开始
- `flex-end`：从尾部开始
- `center`： 居中对齐
- `space-between`：两端对齐，轴线之间的间隔平均分布
- `space-around`：环绕对齐，每根轴线两侧的间隔都相等
- `space-evenly`：等距离排列

> `space-around` - 首间距 + 尾间距 = 其他间距
> `space-evenly` - 首间距 = 尾间距 = 其他间距

### 子项常见属性

|     属性      |                       说明                       |
| :-----------: | :----------------------------------------------: |
|    `order`    |           项目的**排列**顺序，默认为 0           |
|  `flex-grow`  |           项目的**放大**比例，默认为 0           |
| `flex-shrink` |           项目的**缩小**比例，默认为 1           |
| `flex-basis`  |  在分配多余空间之前，**项目占据的主轴空间大小**  |
|    `flex`     | `flex-grow`, `flex-shrink` 和 `flex-basis`的简写 |
| `align-self`  |                **子项交叉轴排列**                |

#### order

**数值越小，越靠前**，默认值`0`。

```css
order: <integer>;
```

#### flex-grow

按`flex-grow`比例分配剩余空间。

默认值`0`：存在剩余空间，也不放大。

```css
flex-grow: <number>; /* default 0 */
```

#### flex-shrink

在`flex`元素*默认宽度之和大于容器*时发生。

默认值`1`：空间不足，将会缩小。

```css
flex-shrink: <number>; /* default 1 */
```

#### flex-basis

默认为`auto`，项目自身大小。此属性帮助浏览器**计算主轴剩余空间**

同时设置 `flex-basis`（除`auto`）和 `width/height`，`flex-basis`优先级*更高*

值为`0`，表示**伸缩时不考虑尺寸**

```css
flex-basis: <length> | auto; /* default auto */
```

#### flex

简写属性。默认值`0 1 auto`。设置了弹性项目如何*增大*或*缩小*以*适应*其弹性容器中*可用空间*。

```css
flex: none | [ < 'flex-grow' > < 'flex-shrink' >? || < 'flex-basis' > ];
```

_关键字_

- `inital`：根据自身宽高设置尺寸。_会缩短，不会拉长_，`flex: 0 1 auto`
- `auto`：同上，_会拉长，会缩短_，`flex：1 1 auto`
- `none`：同上，非弹性，_不会拉长，也不会缩短_，`flex：0 0 auto`

```css
/* 一个值, 无单位数字: flex-grow */
flex: 2;

/* 一个值, width/height: flex-basis */
flex: 10em;
flex: 30px;
flex: min-content;
flex: 1; /* flex:1 1 0 */
flex: auto; /* flex: 1 1 auto */
/* 两个值: flex-grow | flex-basis */
flex: 1 30px;

/* 两个值: flex-grow | flex-shrink */
flex: 2 2;

/* 三个值: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```

#### align-self

**子项**在**交叉轴**排列方式，可覆盖 `align-items`。

默认值`auto`：继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`

```css
align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

- `auto`（默认）：继承父容器 align-items 属性，没有父容器则为"`stretch`"
- `stretch`：拉伸
- `center`：居中
- `flex-start`：最上面
- `flex-end`：最下面
- `baseline`：容器的基线

## 阴影

**文本阴影**：`text-shadow:横向偏移 纵向偏移 模糊距离 颜色`

**边框阴影**：`box-shadow:水平位置 垂直位置 模糊距离 阴影尺寸（影子大小） 阴影颜色 内/外阴影`

```css
div {
  width: 200px;
  height: 200px;
  border: 10px solid red;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4) outset;
  /*默认outset，设置inset为内阴影*/
}
```

> 边框阴影和边框没有关系

## 内减模式

将 padding 内边距和边框带来增大盒子的影响去掉，**不能去 margin 影响**

**css3 盒子模型**

`box-sizing:border-box;`

> **传统盒子模型**
>
> box-sizing: content-box

## 新增属性选择器

|    属性选择器     |             说明             |
| :---------------: | :--------------------------: |
| **[属性 ^ =值]**  | 以指定字符开头的属性值的元素 |
| **[属性 $ =值]**  | 以指定字符结尾的属性值的元素 |
| **[属性 * = 值]** |     **包含当前值**的元素     |

## 新增伪对象选择器

给元素追加一个**虚拟标签**，由 css 加载，可以节省 html 的资源开销

- `::after`：指定标签后添加一个对象
- `::before`：指定标签前添加一个对象

:after 和 ::after 区别

- css3 引入用于区别伪类和伪元素，`:`伪类，`::`伪元素，css3 伪元素不支持 `:`写法
- 对于之前有的伪元素，`:`和`::`效果相同，兼容 ie 用`:`，其他用`::`

```css
元素::after {
  content: '';
}
```

<span style="color:red">注意：伪对象样式中，必须有 content 属性，否则伪对象无效</span>

> 伪对象不是实际标签，使用 css 样式模拟一个标签
>
> 伪元素是行元素
>
> 权重为 1

## 2D 转换

### 移动 - translate

`transform:translate(x,y);`

> 使用 translateX 和 translateY 设置 x 轴或者 y 轴，里面只设置一个值即可

- `translate` 中 100%，是相对于**本身的宽度和高度**来进行计算
- **行内标签没有效果**

> **不影响其他元素的位置**

### 旋转 - rotate

`transform:rotate(角度);`

- 单位：deg。值为正，顺时针。值为负，逆时针。

**设置旋转中心点**

`transform-origin:横向坐标 纵向坐标;`

- 默认中心点 （50% 50%）（center center）
- 取值：**像素（px） 或 方位名词（left,right,top,bottom,center）**

### 缩放 - scale

`transform:scale(值)`

- 倍数（整数，小数），两个值（宽度，高度）

> **中心点缩放，不影响其他盒子**

### 综合写法

`tranform:translate() rotate() scale()`

- 顺序会影响转换效果（先旋转会改变坐标轴方向）
- 尽量先写位移

## 过渡

`transition:动画css属性 过渡时间秒数 速度类型 延迟的秒数`

### 基本使用

```css
img {
  display: block;
  margin: 50px auto;
  border: 1px solid #000;
  /* 加过渡效果，必须是在元素原本的样式上面加，不在伪类上加 */
  transition: transform 2s linear;
}
img:hover {
  transform: scale(1.5);
}
```

### 常用属性

| 属性                       |               描述                |
| -------------------------- | :-------------------------------: |
| transition                 |             简写属性              |
| transition-property        |   规定应用过渡的 CSS 属性的名称   |
| transition-duration        |   过渡效果花费的时间。默认是 0s   |
| transition-timing-function | 过渡效果的时间曲线。默认是 "ease" |
| transition-delay           |    过渡效果何时开始。默认是 0s    |

### 运动曲线

- linear - 匀速
- ease - 逐渐慢下来
- ease-in - 加速
- ease-out - 减速
- ease-in-out - 加速再减速

## 动画

### 基本使用

通过设置多个节点来精确的控制一个或者一组动画，从而实现复杂的动画效果

- 先定义动画
- 调用定义好的动画

```css
/*定义*/
@keyframes 动画名称 {
  0% {
    width: 100px;
  }
  100% {
    width: 200px;
  }
}
/*调用*/
div {
  /* 调用动画 */
  animation-name: 动画名称;
  /* 持续时间 */
  animation-duration: 持续时间；;
}
```

- **动画序列**：0% （from）是动画开始，100 % （to）是动画完成
- 在 @keyframs 中规定某项 CSS 样式，就由创建**当前样式逐渐改为新样式的动画效果**，可以改变多次

### 常见属性

|           属性            |                              描述                               |
| :-----------------------: | :-------------------------------------------------------------: |
|      **@keyframes**       |                            规定动画                             |
|       **animation**       |                            简写属性                             |
|    **animation-name**     |                     动画的名称（**必须**）                      |
|  **animation-duration**   |     动画完成一个周期花费秒或毫秒<br />默认 0。（**必须**）      |
| animation-timing-function |                规定动画的速度曲线，默认是“ease”                 |
|      animation-delay      |                        **动画何时开始**                         |
| animation-iteration-count |             动画被播放的次数，默认 1<br />infinite              |
|    animation-direction    | 是否在下一周期逆向播放<br />normal 正常（默认），alternate 逆向 |
|   animation-play-state    |  动画是否正在运行或暂停<br />running 运行（默认），paused 暂停  |
|  **animation-fill-mode**  |    动画结束后状态<br />forward 终点（默认），backwards 起点     |

### 速度曲线

|     属性      |               描述               |
| :-----------: | :------------------------------: |
|  **linear**   |               匀速               |
|   **ease**    | 低速开始，加快，慢慢减速（默认） |
|    ease-in    |             低速开始             |
|   ease-out    |             低速结束             |
|  ease-in-out  |        低速开始，低速结束        |
| **steps（）** |     指定时间间隔数量（步长）     |

### 动画简写

```css
/* animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 起始与结束状态 */
animation: name duration timing-function delay iteration-count direction fill-mode;
```

> 简写属性不包括**animation-play-state**

```css
/*匀速移动2s，1s后开始，无限循环，逆向，终点*/
animation: move 2s linear 1s infinite alternate forwards;
```

## 3D 转换

**近大远小，物体和面遮挡不可见**

- x 轴：水平向右
- y 轴：垂直向下

- z 轴：垂直屏幕

<img src="./css3.assets/sanwei.png" alt="sanwei" style="zoom: 67%;" />

### 位移 - translate3d

`transform: translate3d(x, y, z)`：其中 x、y、z 分别指要移动的轴的方向的距离。**xyz 不能省略，用 0 填充**

> translateX、translateY、translateZ

### 旋转 - rotate3d

`transform: rotateX(45deg)` -- 沿着 x 轴正方向旋转 45 度
`transform: rotateY(45deg)` -- 沿着 y 轴正方向旋转 45 度
`transform: rotateZ(45deg)` -- 沿着 z 轴正方向旋转 45 度

- xyz 表示角度

`transform: rotate3d(x, y, z, 45deg)`：沿自定义轴旋转 45 deg 为角度

- xyz 表示旋转矢量

```css
transform: rotate3d(1, 1, 0, 180deg) /*沿着对角线旋转 45deg*/
transform: rotate3d(1, 0, 0, 180deg) /*沿着 x 轴旋转 45deg*/
```

### 左手准则

- **rotateX**：左手的**拇指**指向 x 轴**正方向**，**其余手指**弯曲方向就是该元素沿着 x 轴**旋转方向**
- **rotateY**：左手的**拇指**指向 y 轴**正方向**，**其余手指**弯曲方向就是该元素沿着 y 轴**旋转方向**
- **rotateZ**：无

### 透视 - perspctive

透视也称为视距，就是人的眼睛到屏幕的距离。

- 距离视觉点越近的在电脑平面成像越大，越远成像越小

- 单位像素
- **透视需要写在被视察元素的父盒子上面**

```css
body {
  perspective: 1000px;
}
```

**translateZ** 与 **perspecitve** 的区别

**translateZ** 给子元素设置，**perspecitve** 给父级设置

### 呈现 - transfrom-style

控制子元素是否开启三维立体环境

`transform-style: flat` - 子元素不开启 `3D` 立体空间（默认）

`transform-style: preserve-3d` - 子元素开启立体空间

> 写在父级，影响子盒子

## 媒体查询

媒体查询（Media Query）是 CSS3 新语法。

- 使用 @media 查询，可以针对不同的媒体类型定义不同的样式
- @media 可以针对不同的屏幕尺寸设置不同的样式
- 当你重置浏览器大小的过程中，页面也会根据浏览器的宽度和高度重新渲染页面

### 语法规范

- **@media** - 开头
- **mediatype** - 媒体类型
  - **all** - 所有设备
  - **print** - 打印机和打印预览
  - **screen** - 电脑、平板、手机
- **and not only** - 关键字

  - **and** - 多个媒体类型连接到一起
  - **not** - 排除某个媒体类型 （可省）
  - **only** - 指定某个媒体类型 （可省）

- **media feature** - 媒体特性
  - **width** (可见区域)| **min-width** （最小可见区域）| **max-width**（最大可见区域）

```css
@media mediatype and|not|only (media feature) {
    CSS-Code;
}
```

> ​ 尽量从小到大书写，由于权重关系，可使代码更简洁
