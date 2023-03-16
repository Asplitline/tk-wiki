---
outline: deep
title: 实践总结
order: 2
---

# 实践总结

## 遮罩层滚动穿透

`@touchmove.native.prevent` 设置在 遮罩层上

## App - IOS 端软键盘上方横条去除方案

`pages.json`

```json
"app-plus": {
    "softinputNavBar": "none"
}
```

`js`：动态设置`softinputNavBar`

```javascript
this.$scope.$getAppWebview().setStyle({
  softinputNavBar: 'none'
})
//this.$scope.$getAppWebview()相当于html5plus里的plus.webview.currentWebview()。在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
```

## App - 关于软键盘弹出的逻辑说明

App 平台软键盘弹出有 `adjustResize|adjustPan` 两种模式，默认为 ad~justPan 模式，小程序平台只支持 `adjustPan` 模式，H5 平台因不同浏览器而异

- `adjustResize`：软键盘弹出时，webview 窗体**高度挤压**。_屏幕高度= `webview`窗体高度+软键盘高度_
- `adjustPan`：软键盘弹出时，webview 窗体高度不变，**窗体上推**

`pages.json`

```json
"app-plus": {
    "softinputMode": "adjustResize"
}
```

_Tips_

- `adjustResize`模式在`Android App`上，因为要重设 webview 窗体高度，可能会在个别安卓机型闪现灰屏或漏出下层页面内容。
- 小程序端在 input 聚焦期间，_避免使用 `css` 动画_。
- _禁止点击其他位置收起键盘_，可以监听`touch`事件并使用`prevent`修饰符（仅支持 App-v3、H5，其他平台可以通过设置`focus`来使输入框重新获取焦点），例如在确认按钮上使用：`@touchend.prevent="onTap"`

## App - 关于软键盘收起的逻辑说明

- `Android`：软键盘弹出，*点击 back 或点击非置焦区域*可收起软键盘
- `iOS`：软键盘上方有*带有“完成”的横条*，则需要*点完成*才能收起键盘；如果*无横条*，则点击非*`input/textarea`区域*可收起软键盘

> 隐藏软键盘 api：`uni.hideKeyboard()`

## Wx - 体验版接口失败

场景：微信小程序体验版，不打开开发调试，接口调用失败

原因 1：体验版、正式版小程序需要校验域名是否存在后台白名单。

微信开发平台（软件） -> 详情 -> 本地设置 -> 不进行校验域名...

将 `不进行校验域名... `勾选上

原因 2：需要配置合法域名

微信小程序平台() -> 开发 -> 开发设置 -> 服务器域名

在服务器域名进行配置

> https://mp.weixin.qq.com/
