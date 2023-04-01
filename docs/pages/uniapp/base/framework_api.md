---
title: 框架Api
order: 4
---

# 框架接口

## 页面

### [getApp()](https://uniapp.dcloud.io/collocation/frame/window?id=getapp)

`getApp()` 函数用于**获取当前应用实例**，一般用于获取 globalData 。

```js
const app = getApp()
console.log(app.globalData)
```

- 不要在定义于 `App()` 内的函数中，或调用 `App` 前调用 `getApp()` ，可以通过 `this.$scope` 获取对应的 app 实例
- 通过 `getApp()` 获取实例之后，**不要私自调用生命周期函数**。
- v3 模式加速了首页`nvue`的启动速度，在首页`nvue`中使用`getApp()`不一定可以获取`App`对象
  - v3 版本：`const app = getApp({allowDefault: true})`用来获取原始的`App`对象，在首页对`globalData`等初始化

### [getCurrentPages()](https://uniapp.dcloud.io/collocation/frame/window?id=getcurrentpages)

`getCurrentPages()` 函数用于获取**当前页面栈的实例**，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。

| 方法                    | 描述                            | 平台说明 |
| ----------------------- | ------------------------------- | -------- |
| `page.$getAppWebview()` | 获取当前页面的 webview 对象实例 | App      |
| `page.route`            | 获取当前页面的路由              |          |

> `getCurrentPages()`仅用于**展示**页面栈，**请勿修改**页面栈

- `navigateTo`, `redirectTo` 只能打开非 tabBar 页面
- `switchTab` 只能打开 `tabBar` 页面
- `reLaunch` 可以打开任意页面
- 页面底部的 `tabBar` 由页面决定，即只要是定义为 `tabBar` 的页面，底部都有 `tabBar`
- 不能在 `App.vue` 里面进行页面跳转

### [$getAppWebview()](https://uniapp.dcloud.io/collocation/frame/window?id=getappwebview)

`uni-app` 在 内置了一个方法 `$getAppWebview()` ：得到当前[webview](http://www.html5plus.org/doc/zh_cn/webview.html#plus.webview.WebviewObject)的对象实例

> **此方法仅 App 支持**

```js
var pages = getCurrentPages();
var page = pages[pages.length - 1];
// #ifdef APP-PLUS
var currentWebview = page.$getAppWebview();
console.log(currentWebview.id);//获得当前webview的id
console.log(currentWebview.isVisible());//查询当前webview是否可见
);
// #endif
```

## 页面通讯

### [`uni.$emit`(eventName,OBJECT)](https://uniapp.dcloud.io/collocation/frame/communication?id=emit)

**触发**全局的自定事件。附加参数都会传给监听器回调。

| 属性        | 类型   | 描述                       |
| ----------- | ------ | -------------------------- |
| `eventName` | String | 事件名                     |
| `OBJECT`    | Object | 触发事件携带的**附加参数** |

### [`uni.$on`(eventName,callback)](https://uniapp.dcloud.io/collocation/frame/communication?id=on)

**监听**全局的自定义事件。事件由 `uni.$emit` 触发，回调函数会接收所有传入事件触发函数的额外参数。

| 属性        | 类型     | 描述           |
| ----------- | -------- | -------------- |
| `eventName` | String   | 事件名         |
| `callback`  | Function | 事件的回调函数 |

### [`uni.$once`(eventName,callback)](https://uniapp.dcloud.io/collocation/frame/communication?id=once)

**监听**全局的自定义事件。但**只触发一次**，触发后**移除**监听器。

| 属性        | 类型     | 描述           |
| ----------- | -------- | -------------- |
| `eventName` | String   | 事件名         |
| `callback`  | Function | 事件的回调函数 |

### `uni.$off`([eventName, callback\])](https://uniapp.dcloud.io/collocation/frame/communication?id=off)

**移除**全局自定义事件监听器

| 属性        | 类型               | 描述           |
| ----------- | ------------------ | -------------- |
| `eventName` | Array ＜ String ＞ | 事件名         |
| `callback`  | Function           | 事件的回调函数 |

_Tips_

- **无参数**：移除*所有*事件监听器
- **只提供事件**：移除*该事件*所有的监听器
- **同时提供事件与回调**：只移除*此回调的*监听器，提供回调必须跟`$on`回调为同一个才能移除

上述函数触发的事件都是 **App 全局级别**的，跨任意组件，页面，nvue，vue 等

- `onLoad` 里边 `uni.$on` 注册监听
- `onUnload` 里边 `uni.$off` 移除
- 一次性事件，直接使用 `uni.$once` 监听
