---
title: chrome
order: 4
---

# 其他

## 页面可编辑

```js
document.body.contentEditable = true
```

```js
javascript:(function(){ document.body.contentEditable = document.body.contentEditable === 'false' ? true : false})()
```

```js
document.designMode = 'on';
```

```
javascript:(function(){ document.designMode = document.designMode === "on" ? "off" : "on"})()
```

> 推荐使用 designMode ，有时contentEditable切换时会导致布局错位

## 调试

```js
setTimeout(() => {
  debugger
}, 2000)
```

```js
javascript:(function(){setTimeout(() => {  debugger}, 2000)})()
```

## 获取节点信息

```js
const obj = {}
class Ele {
  constructor(ele) {
    this.ele = ele
    this.funum = 1
  }
  //取当前节点的元素深度
  getEleDepth() {
    let fuele = this.ele.parentNode
    if (fuele !== document) {
      this.funum++
      this.ele = fuele
      return this.getEleDepth()
    } else {
      return this.funum
    }
  }
  //去当前节点的子元素个数
  getEleSubNum() {
    let zieles = this.ele.childNodes,
      zinum = 0
    for (let i = 0; i < zieles.length; i++) {
      if (zieles[i].nodeName !== '#text') {
        zinum++
      }
    }
    return zinum
  }
}
const totalElements = document.getElementsByTagName('*')
obj.所有节点数量 = totalElements.length

let eleDepthArr = []
let eleSubArr = []
for (let i = 0; i < totalElements.length; i++) {
  eleDepthArr.push(new Ele(totalElements[i]).getEleDepth())
  eleSubArr.push(new Ele(totalElements[i]).getEleSubNum())
}
eleDepthArr = eleDepthArr.sort((a, b) => b - a)
eleSubArr = eleSubArr.sort((a, b) => b - a)
obj.元素节点的最大嵌套深度 = eleDepthArr[0]
obj.最大子元素个数 = eleSubArr[0]

console.log('DOM信息', obj)
```

```
{
    "所有节点数量": 800,
    "元素节点的最大嵌套深度": 19,
    "最大子元素个数": 80
}
```



## 显示页面轮廓

```js
  document.querySelectorAll("*").forEach(item => {
    item.style.outline = hasOutline ? "none" : "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
  });
```

```js
javascript: (function () {    if (typeof hasOutline == "undefined") hasOutline = false;  document.querySelectorAll("*").forEach(item => {    item.style.outline = hasOutline ? "none" : "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);  });  hasOutline = !hasOutline;})();
```

