---
outline: deep
title: 三方库使用
order: 3
---

# 三方库使用

## 使用 uview-ui 库

文档：https://www.uviewui.com/

插件：https://ext.dcloud.net.cn/plugin?id=1593

1. 插件市场 下载 uview-ui 压缩包，解压到根目录
2. `main.js` 引入 uview-ui

```javascript
import uView from 'uview-ui'
Vue.use(uView)
```

3. `uni.scss `中引入 样式

```css
@import 'uview-ui/theme.scss';
@import 'uview-ui/index.scss';
```

4. `page.json` 配置 easycom

```javascript
	"easycom": {
		"^u-(.*)": "@/uview-ui/components/u-$1/u-$1.vue"
	}
```

## 引入 iconfont

```css
@import url('https://at.alicdn.com/t/font_3207542_nupi733rvm8.css');
```

> 地址需要添加 `https:`
