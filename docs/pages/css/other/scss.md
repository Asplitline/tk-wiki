---
title: SCSS
order: 2
---

# scss

```bash
base.scss # 基础
iconfont.scss # 字体图标
index.scss # 入口文件
mixin.scss # 混入
reset.scss # 样式重置
variable.scss # 变量
```

## 安装

```shell
npm install -g sass
```

## 语法嵌套

### 选择器嵌套

```scss
.container {
  .img {
    width: 100px;
    height: 60px;
  }
}
```

### 属性嵌套

```scss
.container {
  font: {
    family: fantasy;
    size: 30em;
    weight: bold;
  }
}
```

### & - 父选择器

```scss
.container {
  a {
    color: #333;
    &:hover {
      text-decoration: underline;
      color: #f00;
    }
  }
}
```

## 变量

原生写法： --var

```css
:root {
  --color: #f00;
}
p {
  color: var(--color);
}
```

scss：$var

```scss
$color: #f00;
p {
  color: $color;
}
```

### 变量规则

1. 以美元符号`$`开头
2. 变量名是不以数字开头，可包含字母、数字、下划线、横线（连接符）
3. 连接符`-`与下划线`_`定义的同名变量，**为同一变量**
4. 先定义，后使用
5. 写法同`css`

### 变量作用域

变量作用域分为**全局变量域**和**局部变量域**：

全局变量：声明在最外层的变量，可在任何地方使用；

局部变量：嵌套规则内定义的变量只能在嵌套规则内使用。

> 局部变量 => 全局变量 添加`!global` 声明

### 数据类型

`scss`支持`7`种主要的数据类型：

1. 数字，`1rem、2vh、13、 10px`；
2. 字符串，分有引号字符串与无引号字符串，`"foo"、 'bar'、baz`；
3. 颜色，`blue, #04a3f9, rgba(255,0,0,0.5)`；
4. 布尔型，`true`和`false`；
5. 空值，`null`是其类型的唯一值。表示缺少值，通常由函数返回以表示缺少结果；
6. 数组 (`list`)，用空格或逗号作分隔符，`1.5em 1em 0 2em,Helvetica,Arial,sans-serif`；
7. `maps`， 相当于 `JavaScript`的 `object`，`(key1: value1, key2: value2)`；

```scss
$layer-index: 10;
$border-width: 3px;

$font-weight: bold;

$font-base-family: 'Open Sans', Helvetica, Sans-Serif;
$block-base-padding: 6px 10px 6px 10px;

$top-bg-color: rgba(255, 147, 29, 0.6);

$blank-mode: true;

$var: null;

$fonts: (
  serif: 'Helvetica Neue',
  monospace: 'Consolas'
);

.container {
  font-family: $font-base-family;
  font-size: $font-size;
  padding: $block-base-padding;

  @if $blank-mode {
    background-color: #000;
  } @else {
    background-color: #fff;
  }

  content: type-of($var);
  content: length($var);
  color: $top-bg-color;
}

// 如果列表中包含空值，则生成的CSS中将忽略该空值。
.wrap {
  font: 18px $font-weight map-get($fonts, 'sans');
} // font:18px bold
```

### 默认值

```scss
$content: 'First content';
// 如果$content之前没定义就使用如下的默认值
$content: 'Second content' !default;
#main {
  content: $content;
}
```

## 运算符

所有数据类型均支持 `==` 和`!=`.

```scss
$theme: 'blue';

.container {
  @if $theme== 'blue' {
    background-color: red;
  } @else {
    background-color: blue;
  }
}
```

关系运算符：`< > >= <=`

```scss
$theme: 3;
.container {
  @if $theme >= 5 {
    background-color: red;
  } @else {
    background-color: blue;
  }
}
```

布尔运算符：`and or not`

```scss
$width: 100;
$height: 200;
$last: false;
div {
  @if $width>50 and $height<300 {
    font-size: 16px;
  } @else {
    font-size: 14px;
  }
  @if not $last {
    border-color: red;
  } @else {
    border-color: blue;
  }

  @if $width>500 or $height<300 {
    line-height: 20px;
  } @else {
    line-height: 50px;
  }
}
```

操作运算符：`+ - * / %`

```scss
/* 纯数字与百分号或单位运算时会自动转化成相应的百分比与单位值 */
.container {
  /* ================== + 运算===================== */
  width: 50 + 20;
  width: 50 + 20%; // 70%
  width: 50% + 20%;
  width: 10pt + 20px; // 25pt ?
  width: 10pt + 20; // 30pt

  /* ================== - 运算===================== */
  height: 50 - 20;
  height: 10 - 20%;
  height: 50pt - 20px; // 35pt ?

  /* ================== * 运算===================== */
  height: 50 * 30;
  height: 10 * 30%;
  height: 50 * 2px;
  height: 50pt * 4;

  /* ==================/ 运算 (除完后最多只能保留一种单位)===================== */
  $width: 100px;
  width: 10 / 5;
  width: 10px / 5px;
  width: 10px / 20;
  width: ($width/2); // 使用变量与括号
  height: (500px/2); // 使用了括号

  /* ==================% 求余运算===================== */
  width: 10 % 3;
  width: 50px % 7;
  width: 50% % 7;
}
```

`/`在`css`中有分隔数字的用途

```scss
$width: 1000px;
.div {
  font: 16px / 30px Arial, Helvetica, sans-serif; // 不运算
  width: ($width/2); // 使用变量与括号
  width: (#{$width}/ 2); // 使用 #{} 插值语句将变量包裹，避免运算。
  z-index: round(10) / 2; // 使用了函数
  height: (500px/2); // 使用了括号
  margin-left: 5px + 8px/2px; // 使用了+表达式
}
```

字符串运算

以 + 号 左侧为准，左侧有引号，结果有引号，反之亦然。

```scss
.container {
  content: 'Foo ' + Bar;
  font-family: sans- + 'serif';
}
```

```css
.container {
  content: 'Foo Bar';
  font-family: sans-serif;
}
```

## 插值语句

`#{}` 插值语句可以在选择器、属性名、注释中使用变量

```scss
$class-name: danger;
$attr: color;

a.#{$class-name} {
  border-#{$attr}: #f00;
}
```

## 流程控制

### @if

`@if...@else if...@else`

```scss
$theme: 3;
.container {
  @if $theme >= 5 {
    background-color: red;
  } @else {
    background-color: blue;
  }
}
```

### @for

`for`在条件范围内重复操作

1. `@for $var from <start> through <end>`
2. `@for $var from <start> to <end>`

$var 可以是任何变量，`<start>` 和 `<end>` 必须是整数

through 和 to 区别

`through`：`<start><= <=<end>`

`to`：`<start><= <<end>`

```scss
@for $i from 1 to 3 {
  #loading span:nth-child(#{$i}) {
    width: 20 * ($i - 1) + px;
  }
}
```

### @each

`@each $var in $list` , `$var`可以是**任何变量名**

```scss
$color-list: red green blue turquoise darkmagenta;
@each $color in $color-list {
  $index: index($color-list, $color);
  .p#{$index - 1} {
    background-color: $color;
  }
}
```

index()：获取 变量的 index

### @while

`@while` 指令循环输出直到表达式返回结果为 `false`。

```scss
$column: 12;
@while $column>0 {
  .col-sm-#{$column} {
    width: $column / 12 * 100%;
  }
  $column: $column - 1;
}
```

## 指令

### @import

`scss`拓展了`@import` 的功能，允许其导入 `scss`或 `sass`文件。

以下情况下，`@import` 仅作为普通的`css`语句，不会导入`scss`文件

1. 文件拓展名是`.css`；
2. 文件名以 `http://`开头；
3. 文件名是`url()`；
4. `@import`包含媒体查询。

```scss
@import 'common.css';
@import url(common);
@import 'http://xxx.com/xxx';
@import 'landscape' screen and (orientation: landscape);
```

#### 批量导入

```scss
@import 'rounded-corners', 'text-shadow';
```

#### 动态导入

```scss
$family: unquote('Droid+Sans');
@import url('http://fonts.googleapis.com/css?family=#{$family}');
```

unquote：去掉 引号

#### 嵌套@import

将`@import` 嵌套进内层选择器或者 `@media` 中

```scss
#main {
  @import 'example';
}
```

> `@import`不能嵌套使用在控制指令或混入中（带有`@`符号的叫指令）

#### @import 缺点

1. 多处导入，存在样式重复加载
2. 没有命名空间，易重名
3. 没有私有函数，样式完全暴露在使用`import`的地方

### @use ^1.23.0+^

`scss`还提供了很多内置模块，我们可以通过`@use`使用

#### 命名空间

```scss
// src/_corners.scss
$radius: 3px;
@mixin rounded {
  border-radius: $radius;
}
```

```scss
// index.scss
@use 'src/corners' as c;
.button {
  @include c.rounded;
  padding: 5px + c.$radius;
}
```

> as \* ：表示处于全局命名空间

#### 私有模块

私有成员命名以`-`或开头

```scss
// src/_corners.scss
$-radius: 3px;

@mixin rounded {
  border-radius: $-radius;
}
```

私有成员不能访问

```scss
// index.scss
@use 'src/corners';

.button {
  @include corners.rounded;
  // Error: Private members can't be accessed from outside their modules
  padding: 5px + corners.$-radius;
}
```

### @forward

`@forward`：将引入其他模块的变量、`mixins`和函数，作为当前模块的`API`暴露出去

- 不在当前模块增加代码
- 不能给变量添加命名空间

#### 使用

```scss
// a.scss
@mixin rounded {
  border-radius: 100px;
}
```

```scss
// b.scss
$radius: 3px;
```

```scss
// c.scss
@forward 'a';
@forward 'b';
```

```scss
// index.scss
@import 'c.scss';

.button {
  @include rounded;
  padding: $radius;
}
```

#### show/hide

决定模块中的哪些成员对引入后的模板**可见**

```scss
@forward 'a' show rounded;
@forward 'b' hide $radius;
```

```scss
// c.scss
@forward 'a' show rounded;
@forward 'b' hide $radius;
```

```scss
// index.scss
@import 'c.scss';
.button {
  @include rounded;
  padding: $radius;
}
// Error: Undefined variable. padding: $radius;
```

#### 使用 as \*号为子模块添加前缀

使用`as <prefix>-*`语句，为子模块下的成员自动带上前缀以区分

```scss
// c.scss
@forward 'a' as mixin-*;
@forward 'b' as var-*;
```

```scss
// index.scss
@import 'c.scss';

.button {
  @include mixin-rounded;
  padding: $var-radius;
}
```

### @Partials

导入 `scss`或者 `sass`文件，但又不希望将其编译为 `css`

1. 导入语句中却不需要添加下划线；
2. 不可以同时存在添加下划线与未添加下划线的同名文件，**添加下划线的文件将会被忽略**。

作用：用来**定义公共样式**，专门用于被其他的 `scss`文件 `import`进行使用

### @media

`@media` 指令：增加一点额外功能，允许在`css`规则中嵌套。

`@media` 嵌套在 `css`规则内，编译时，`@media` 将被编译到文件的最外层，包含嵌套的父选择器。

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
    .item {
      height: auto;
    }
  }
}
```

```css
.sidebar {
  width: 300px;
}
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
  .sidebar .item {
    height: auto;
  }
}
```

**嵌套**：`@media`允许互相嵌套使用，编译时，`scss`自动添加 and

```scss
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}
```

```css
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

使用插值

```scss
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}
```

### @mixin

混合指令（`Mixin`）用于定义可重复使用的样式。

#### 标准形式

```scss
@mixin mixin-name() {
  /* css 声明 */
}
@include mixin-name;
```

#### 参数传递

##### 多参数

```scss
@mixin block-padding($top, $right, $bottom, $left) {
  padding-top: $top;
  padding-right: $right;
  padding-bottom: $bottom;
  padding-left: $left;
}

.container1 {
  @include block-padding(10px, 20px, 30px, 40px);
}
```

##### 指定默认值

```scss
@mixin block-padding($top: 0, $right: 0, $bottom: 0, $left: 0) {
}
```

##### 可变参数

`...`处理参数不固定的情况

```scss
@mixin linear-gradient($direction, $gradients...) {
  background-color: nth($gradients, 1);
  background-image: linear-gradient($direction, $gradients);
}

.table-data {
  @include linear-gradient(to right, #f00, orange, yellow);
}
```

### @function

`@function`用于封装复杂的操作，函数提供返回值

```scss
@function square($base) {
  @return $base * $base * 1px;
}

.sidebar {
  float: left;
  margin-left: square(4);
}
```

#### 可选参数

change-color(_color_, _red_, _green_, _blue_, _hue_, _saturation_, _lightness_, _alpha_)：设置颜色

hsl(_hue_, _saturation_, _lightness_)：返回$color 的颜色为 0 到 360 度之间的一个数字。

mix(_color1_, _color2_, _weight_)：混合 color1 和 color2，

```scss
//change-color 用于设置颜色的属性
@function invert($color, $amount: 100%) {
  //@error hue($color); 调试 210deg
  $inverse: change-color($color, $hue: hue($color) + 180);
  @return mix($inverse, $color, $amount);
}

$primary-color: #036;
.header {
  background-color: invert($primary-color, 80%);
}
```

#### 指定参数

scale-color(_color_, _red_, _green_, _blue_, _saturation_, _lightness_, _alpha_)：缩放 color

```scss
$primary-color: #036;
.banner {
  //scale-color Fluidly scales one or more properties of .$color
  background-color: $primary-color;
  color: scale-color($primary-color, $lightness: +40%);
}
```

#### 可变参数

`meta.keywords()`函数采用**参数列表**

```scss
@function sum($numbers...) {
  $sum: 0;
  @each $number in $numbers {
    $sum: $sum + $number;
  }
  @return $sum;
}

$widths: 50px, 30px, 100px;
.micro {
  width: sum($widths...);
}
```

### @return

`@return`只允许在`@function`内使用

### @extend

使用`@extend`继承已经存在的样式

```scss
.alert {
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 12px;
}

.important {
  font-weight: bold;
  font-size: 14px;
}
.alert-danger {
  @extend .alert;
  @extend .important;
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}
```

#### 多重继承

```scss
.a {
  @extend .alert;
}
.b {
  @extend.a;
}
```

#### 占位符选择器

占位符选择器`%`，与常用的`id` 与 `class`选择器写法相似。

占位符选择器必须通过 `@extend` 指令调用

```scss
.button %base {
    display: inline-block;
	...
    user-select: none;
}

.btn-default {
    @extend %base;
    color: #333;
    background-color: #fff;
    border-color: #ccc;
}

.btn-danger {
    @extend %base;
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
}
```

优势：占位符选择器`%`所属的样式未使用时，不会被编译到`css`文件中

```scss
.button .btn-danger, .button .btn-default {
    display: inline-block;
	...
    user-select: none;
}

.btn-default {
    color: #333;
    background-color: #fff;
    border-color: #ccc;
}

.btn-danger {
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
}
```

### @at-root

`@at-root`用来跳出嵌套，在多级嵌套时比较常用，包含`without`和`with`。

```scss
//单个选择器跳出
.parent-2 {
  color: #f00;
  @at-root .child {
    width: 200px;
  }
}

//多个选择器跳出
.parent-3 {
  background: #f00;
  @at-root {
    .child1 {
      width: 300px;
    }
    .child2 {
      width: 400px;
    }
  }
}
```

### @without 和 with

默认`@at-root`只会跳出选择器嵌套，而不能跳出`@media`或`@support`

`@at-root`关键词

- `all`：所有
- `rule`：常规`css`选择器
- `media` ：`media`
- `support`：`support`

默认的`@at-root`是`@at-root (without:rule)`

> `@support`：检测浏览器是否支持`css`的某个属性

```scss
/*跳出父级元素嵌套*/
@media print {
  .parent1 {
    color: #f00;
    @at-root .child1 {
      width: 200px;
    }
  }
}

/*跳出media嵌套，父级有效*/
@media print {
  .parent2 {
    color: #f00;
    @at-root (without: media) {
      .child2 {
        width: 200px;
      }
    }
  }
}

/*跳出media和父级*/
@media print {
  .parent3 {
    color: #f00;
    @at-root (without: all) {
      .child3 {
        width: 200px;
      }
    }
  }
}
```

```scss
/*跳出父级元素嵌套*/
@media print {
  .parent1 {
    color: #f00;
  }
  .child1 {
    width: 200px;
  }
}
/*跳出media嵌套，父级有效*/
@media print {
  .parent2 {
    color: #f00;
  }
}
.parent2 .child2 {
  width: 200px;
}
/*跳出media和父级*/
@media print {
  .parent3 {
    color: #f00;
  }
}
.child3 {
  width: 200px;
}
```

#### @at-root 与 &

```scss
.child {
  @at-root .parent & {
    color: #f00;
  }
}
```

```scss
.parent .child {
  color: #f00;
}
```

### 总结

`@function`用来计算，`@mixin`用来封装样式，`@import`用来抽离他们为一个模块

## scss 内置扩展

内置函数可以使用`@use`模块化引入，或者直接使用他提供的全局函数名调用

```scss
@use 'sass:list';
p {
  // 模块化引入
  color: nth($list: red blue green, $n: 2); // blue
  // 全局函数名调用
  color: list.nth($list: red blue green, $n: 2); // blue
}
```

### Color

操作颜色的函数

`lighten()`与 `darken()`：调亮、调暗颜色

`opacify()`：减少颜色透明度

`transparent()`：增加颜色透明度

`mix()`：混合两种颜色

```scss
.p1 {
  // 让颜色变亮
  color: scale-color(#5c7a29, $lightness: +30%);
}

.p2 {
  // 让颜色变暗
  color: scale-color(#5c7a29, $lightness: -15%);
}

.p3 {
  // 降低颜色透明度
  color: scale-color(#5c7a29, $alpha: -40%);
}
```

### String

处理字符串的函数

`quote()`：添加引号

`unquote()`：去除引号

`string-length()`：获取字符串长度

`string-insert()`：插入字符

```scss
p {
  &:after {
    content: quote(这是里面的内容);
  }
  background-color: unquote($string: '#F00');
  z-index: str-length('scss学习');
}
```

```css
p {
  background-color: #f00;
  z-index: 6;
}
p:after {
  content: '这是里面的内容';
}
```

### Math

数值函数处理数值计算

`percentage()`：无单元的数值转换为百分比

`round()`：数字四舍五入

`min()`和`max()`：几个数字最小值或最大值

`random()`：返回一个随机数

```scss
p {
  z-index: abs(-15); // 15
  z-index: ceil(5.8); //6
  z-index: max(5, 1, 6, 8, 3); //8
  opacity: random(); // 随机 0-1
}
```

### List

`List`函数操作`List`

`length()`：列表长度

`nth()`：列表中特定项

`join()`：两个列表连接在一起

`append()`：列表末尾添加一个值

```scss
p {
  z-index: length(12px); //1
  z-index: length(12px 5px 8px); //3
  z-index: index(a b c d, c); //3
  padding: append(10px 20px, 30px); // 10px 20px 30px
  color: nth($list: red blue green, $n: 2); // blue
}
```

### Map

`Map`函数操作`Map`

`map-get()`：根据键值获取`map`中的对应值

`map-merge()`：两个`map`合并成新`map`

`map-values()`：映射中的所有值。

```scss
$font-sizes: (
  'small': 12px,
  'normal': 18px,
  'large': 24px
);
$padding: (
  top: 10px,
  right: 20px,
  bottom: 10px,
  left: 30px
);
p {
  font-size: map-get($font-sizes, 'normal'); //18px
  @if map-has-key($padding, 'right') {
    padding-right: map-get($padding, 'right');
  }
  &:after {
    content: map-keys($font-sizes) + ' ' + map-values($padding) + '';
  }
}
```

```scss
p {
  font-size: 18px;
  padding-right: 20px;
}
p:after {
  content: '"small", "normal", "large" 10px, 20px, 10px, 30px';
}
```

### selector

选择符相关函数

`selector-append()`：把一个选择符附加到另一个选择符

`selector-unify()`：两组选择器合成一个复合选择器

```scss
@use 'sass:selector';

@debug selector.is-superselector('a', 'a'); // true

// 可以直接使用@forward下的前缀
@debug selector-append('a', '.disabled'); // a.disabled
@debug selector-extend('a.disabled', 'a', '.link'); // a.disabled, .link.disabled

.header {
  content: selector-append('.a', '.b', '.c') + '';
  content: selector-unify('a', '.disabled') + '';
}
```

```css
.header {
  content: '.a.b.c';
  content: 'a.disabled';
}
```

### meta

`meta`提供一个`mixin`和一些原子级别的`function`

#### function

`meta.calc-args`：获取方法的参数

`meta.calc-name`：获取方法名。

```scss
@use 'sass:meta';
@debug meta.calc-args(calc(100px + 10%)); // unquote("100px + 10%")
@debug meta.calc-args(clamp(50px, var(--width), 1000px)); // 50px, unquote("var(--width)"), 1000px

@debug meta.calc-name(calc(100px + 10%)); // "calc"
@debug meta.calc-name(clamp(50px, var(--width), 1000px)); // "clamp"
```

#### meta.load-css

`meta.load-css($url，$with:())`：该`mixin`可以把`$url`中`css`样式全部包含进来。

注意：`$url`引入函数，变量和`mixin`在 `meta.load-css()`后的`scss`中并不能用。

原因：它只会返回编译后的`css`代码。

```scss
// src/corners
$border-contrast: false !default;

code {
  background-color: #6b717f;
  color: #d2e1dd;
  @if $border-contrast {
    border-color: #dadbdf;
  }
}
```

```scss
// index.scss
@use 'sass:meta';

body.dark {
  @include meta.load-css('src/corners', $with: ('border-contrast': true));
}
```

```css
body.dark code {
  background-color: #6b717f;
  color: #d2e1dd;
  border-color: #dadbdf;
}
```

## 调试

### @debug

`@debug`打印表达式的值

```scss
$font-sizes: 10px + 20px;
$style: (
  color: #bdc3c7
);
.container {
  @debug $style;
  @debug $font-sizes;
}
```

### @error

`@error`显示致命错误

```scss
$colors: (
  blue: #c0392b,
  black: #2980b9
);

@function style-variation($style) {
  @error "Invalid color: '#{$style}'.";
  @if map-has-key($colors, $style) {
    @return map-get($colors, $style);
  }
}

.container {
  color: style-variation(white);
}
```

### @warn

`@warn`显示警告性建议，会显示堆栈信息。

```scss
$colors: (
  blue: #c0392b,
  black: #2980b9
);

@function style-variation($style) {
  @warn "Invalid color: '#{$style}'.";
  @if map-has-key($colors, $style) {
    @return map-get($colors, $style);
  }
}

.container {
  color: style-variation(white);
}
```

### 自检函数

属于内置扩展`meta`下的方法

`feature-exists()`：当前`scss`版本是否存在某个特性

`variable-exists()`：当前作用域中是否存在某个变量

`mixin-exists()`：某个`mixin`是否存在。

```scss
$color: #f00;
@mixin padding($left: 0, $top: 0, $right: 0, $bottom: 0) {
  padding: $top $right $bottom $left;
}

.container {
  @if variable-exists(color) {
    color: $color;
  } @else {
    content: '$color不存在';
  }
  @if mixin-exists(padding) {
    @include padding($left: 10px, $right: 10px);
  }
}
```
