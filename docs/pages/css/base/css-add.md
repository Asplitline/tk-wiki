---
title: CSS补充
order: 4
---

# 补充

## 背景线性渐变

起始方向： **方位名词 或者 度数**

如果省略默认就是 `top`

```css
background: linear-gradient(起始方向, 颜色1, 颜色2, ...);
background: -webkit-linear-gradient(left, red, blue);
background: -webkit-linear-gradient(left top, red, blue);
```

> 背景渐变必须添加浏览器私有前缀

## BFC

BFC(Block formatting context)："块级格式化上下文"。它是一个独立的渲染区域，只有 Block-level box 参与

哪些情况会产生 BFC:

1. 根元素
2. float 属性不为 none
3. position 为 absolute 或 fixed
4. display 为 inline-block, table-cell, table-caption, flex, inline-flex
5. overflow 不为 visible

## 光标形状 cursor

`cursor:值`

| 属性值        | 描述                                          |
| ------------- | --------------------------------------------- |
| `default`     | 箭头（默认）                                  |
| `pointer`     | 小手                                          |
| `move`        | 移动                                          |
| `text`        | 文本                                          |
| `not-allowed` | 禁止                                          |
| `help`        | 问号                                          |
| `url()`       | 临时替换样式<br />`cursor:url('*.ico'),auto;` |

## 轮廓线 outline

`outline:值`

```css
outline: outline-color ||outline-style || outline-width;
```

应用： `outline: 0;` 或者 `outline: none;`

## 元素可见性

`visibility:值` （**占空间**）

- hidden 隐藏
- visible 可见

`display:none`（**不占空间**）

> 应用：js 特效，下拉菜单

`overflow:值`

- **auto**：内容溢出时，生成滚动条（**默认**）
- **hidden**：内容溢出时超出部分隐藏
- **scroll**：右边和下边都有滚动条
- **visible**（默认）：不剪切内容，也不加滚动条

> 水平方向溢出可以使用 overflow-x，纵向溢出使用 overflow-y
>
> 应用：清除浮动，保证内容不超出盒子

## 行内文字溢出省略号显示

`white-space`：设置或检索对象内文本显示方式

- **normal** - 默认
- **nowarp** - 一行显示（直到文本结束 or br 标签）

`text-overflow`：设置或检索是否使用一个省略标记

- **clip**：不显示
- **ellipsis**：溢出省略号显示

### 单行溢出

```css
overflow: hidden;
white-space: nowrap; /* 设置文本不换行，单行显示 */
text-overflow: ellipsis; /* 超出的文本使用省略号代替 */
```

### 多行溢出省略号

```css
display: -webkit-box; /*弹性伸缩盒子模型*/
-webkit-box-orient: vertical; /*伸缩盒子子排列方式*/
-webkit-line-clamp: 3; /*设置显示文本行数*/
text-overflow: ellipsis;
overflow: hidden;
```

## 多栏布局

**分栏显示**：`column-count:值`

- 值：栏目的数量

**多栏隔断框**：`column-rule:值`

- 取值同边框

**每一栏的宽度**：`column-width:值`

## 对齐

### 水平居中

|            | margin:0 auto； | text-align:center;   |
| ---------- | --------------- | -------------------- |
| 针对的对象 | 块元素          | 行元素和行内块       |
| 居中的范围 | 盒子本身        | 盒子中的文字和行内块 |

### 垂直居中

只针对**行内元素或行内块元素**

```css
vertical-align: baseline |top |middle |bottom;
```

> 设置在 img 上

**应用**：图片/表单与文字的对齐

<img src="./css-add.assets/xian.jpg" alt="xian" style="zoom: 67%;" />

#### 垂直居中补充

##### table

```css
parent {
  display: table;
}
child {
  display: table-cell;
  vertical-align: middle;
}
```

##### 弹性布局

```css
parent {
  display: flex;
  align-items: center;
}
```

##### 定位

```css
parent {
  position: relative;
}
child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

##### 伪元素

```css
parent:after {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  width: 0;
}
child {
  display: inline-block;
  vertical-align: middle;
}
```

### **图片底侧空白缝隙**问题

原因：图片或者表单等行内块元素，他的**底线会和父级盒子的基线对齐**

- 设置图片对齐方式(除了 baseline) - `vertical-align:middle | top| bottom`
- 将图片转为块级，**垂直对齐对块级无效** - `display:block`

## 其他

**去掉文本域自动拉伸**：`resize:none;`

**透明度**：`opacity:值` （ 0 - 1）

**背景透明**：`rgba(值1，值2，值3，值4)`

- 值 123：颜色（0-255）
- 值 4：透明度

**缩放 ZOOM**：`zoom:值`

- 倍数（整数，小数）

**zoom 和 transform 区别**

`zoom：2`

默认以左上角，占位

`transform:scale(2);`

默认以中心点，不占位
