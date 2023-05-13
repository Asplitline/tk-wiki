---
title: 基础
order: 1
---

# HTML 实战

## 瞄点平滑跳转

根据 id，获取目标元素，通过 scrollIntoView 添加平滑效果

```javascript
function anchor(el) {
  const element = document.getElementById(el.id)
  element.scrollIntoView({ behavior: 'smooth' })
}
```

## 复制文本

[https://zhuanlan.zhihu.com/p/53382478](https://zhuanlan.zhihu.com/p/53382478)
[https://www.jb51.net/article/201421.htm](https://www.jb51.net/article/201421.htm)
[https://blog.csdn.net/zhenghhgz/article/details/106273496](https://blog.csdn.net/zhenghhgz/article/details/106273496)

### 实现一：input | textarea

```javascript
function copy(text) {
  const ipt = document.createElement('input')
  document.body.appendChild(ipt)
  ipt.setAttribute('value', text)
  ipt.select()
  console.log(ipt)
  try {
    // 'document.execCommand' is deprecated
    document.execCommand('copy')
  } catch (error) {
    console.log(error)
  } finally {
    document.body.removeChild(ipt)
  }
}
```

### 实现二：selectAllChildren

## 页面居底

[https://www.jianshu.com/p/c464576a43e4](https://www.jianshu.com/p/c464576a43e4)

```javascript
handle() {
  console.log('到了底部')
	window.removeEventListener('scroll', this.handleScroll)
},

handleScroll() {
	const ele = document.documentElement
	const body = document.body
	// 距离顶部距离
	const scrollTop = ele.scrollTop || body.scrollTop
	// 可视区高度
	const windowHeight = ele.clientHeight || body.clientHeight
	// 滚动条总高度
	const scrollHeight = ele.scrollHeight || body.scrollHeight
	if (scrollTop + windowHeight == scrollHeight) {
		// window.removeEventListener('scroll', handleScroll)  // ?直接写
    handle()
    console.log('到了底部')
	}
},

window.addEventListener('scroll', handleScroll)
```

## input 禁止输入小数

```javascript
const handleKeyPress = (e) => {
  if (!isDigit && !/^\d/.test(String.fromCharCode(e.charCode))) {
    e.preventDefault()
  }
}
```

```html
<input onKeyPress="{handleKeyPress}" />
```
