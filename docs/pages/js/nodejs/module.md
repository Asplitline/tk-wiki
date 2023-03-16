---
outline: deep
title: 模块化
order: 3
---

# 模块化

## 模块规范化

Node.js 规定一个**JavaScript**文件**就是一个模块，模块**内部定义的变量和函数**默认情况下在**外部无法得到

### 导出 - exports

```js
// 在模块内部定义变量
let version = 1.0
// 在模块内部定义方法
const sayHi = (name) => `您好, ${name}`
// 向模块外部导出数据
exports.version = version
module.exports.sayHi = sayHi
```

`exports`是`module.exports`的地址引用，导出对象最终以 module.exports 为准

exports 只是前者一个引用，容易丢失，前者指向被覆盖，后者导出 3

```js
exports = 3
module.exports = 3
```

### 导入 - require

```js
let a = require('./b.js') // 后缀可省
// 输出b模块中的version变量
console.log(a.version)
// 调用b模块中的sayHi方法 并输出其返回值
console.log(a.sayHi('123'))
```

## 模块加载机制

### 模块查找规则

#### 当模块拥有路径但没有后缀时

```js
require('./find.js')
require('./find')
```

1.require 方法根据模块路径查找模块，如果是完整路径，直接引入模块。

2.如果模块后缀省略，先找**同名 JS 文件**再找**同名 JS 文件夹**

3.如果找到了**同名文件夹**，找文件夹中的**index.js**

4.如果文件夹中没有 index.js 就会去当前文件夹中的 package.json 文件中查找**main 选项中入口文件**

5.如果找指定的入口文件不存在或者没有指定入口文件就会报错，模块没有被找到

#### 当模块没有路径且没有后缀时

```js
require('find')
```

1.Node.js 会假设它是系统模块

2.Node.js 会去**node_modules 文件夹中**

3.首先看是否有**同名 JS 文件**

4.再看是否有**同名文件夹**，找文件夹中 index.js

5.如果没有 index.js 查看该文件夹中的**package.json 中的 main 选项确定模块入口文件**

6.否则找不到报错
