---
outline: deep
title: 流程模型
order: 2
---

# 流程模型

**为什么不是一个单一的进程**：网页浏览器是个极其复杂的应用程序。

- 单个进程来处理所有功能，打开每个标签页的开销较少。
- 但**一个网站的崩溃或无响应会影响到整个浏览器**。

**多进程模型**：单点故障或恶意代码对整个程序的影响

**两种类型进程**：主进程和渲染器

![image-20211029232707443](model.assets/image-20211029232707443.png)

## 主进程

每个 Electron 应用都有一个单一的主进程，作为应用程序的入口点。主进程在 Node.js 环境中运行，这意味着它**具有 `require` 模块和使用所有 Node.js API 的能力**。

### 窗口管理

通过 [`BrowserWindow`](https://www.electronjs.org/zh/docs/latest/api/browser-window) 模块**创建和管理应用程序**窗口。

`BrowserWindow` 类的每个实例创建一个应用程序窗口，且在单独的渲染器进程中加载一个网页。 您可从主进程用 window 的 [`webContent`](https://www.electronjs.org/zh/docs/latest/api/web-contents) 对象与网页内容进行交互。

```js
const { BrowserWindow } = require('electron')

const win = new BrowserWindow({ width: 800, height: 1500 })
win.loadURL('https://github.com')

const contents = win.webContents
console.log(contents)
```

- `BrowserWindow` 模块是一个 [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)， 可以监听事件
- `BrowserWindow` 实例被销毁时，与其相应的渲染进程也会被终止

### 应用程序生命周期

通过 [`app`](https://www.electronjs.org/zh/docs/latest/api/app) 模块来控制您应用程序的生命周期

```js
// quitting the app when no windows are open on non-macOS platforms
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
```

## 渲染进程

**展示页面的进程**

为每个打开的 `BrowserWindow` ( 与每个网页嵌入 ) 生成一个**单独的渲染器进程**

- HTML 文件作为渲染器进程的入口点
- 层叠样式表 (Cascading Style Sheets, CSS) 对 UI 添加样式.
- `<script>` 元素可添加可执行的 JavaScript 代码

**渲染器无法直接访问 `require` 或其他 Node.js API**

==为了在渲染器中直接包含 NPM 模块，您必须使用与在 web 开发時相同的打包工具 (例如 `webpack` 或 `parcel`)==

## 预加载脚本

**预加载（preload）脚本**：包含了那些**执行于渲染器进程中**，且**先于网页内容开始加载的代码**。

- 执行于渲染器进程中，且**先于网页内容开始加载的代码**
- 运行于渲染器的环境中，**能访问 Node.js API**
- 在 `BrowserWindow` 构造方法中的 `webPreferences` 选项，将预处理脚本添加到主进程

```js
const { BrowserWindow } = require('electron')
//...
const win = new BrowserWindow({
  webPreferences: {
    preload: 'path/to/preload.js'
  }
})
//...
```

预加载脚本与其所附加的渲染器在**全局共享着一个 `window` 变数**，但您并**不能从中直接附加任何变数到 `window`** 之中，因为 [`contextIsolation`](https://www.electronjs.org/zh/docs/latest/tutorial/context-isolation) 是默认的

```js
// preload.js
window.myAPI = {
  desktop: true
}
// renderer.js
console.log(window.myAPI) // => undefined
```

> **语境隔离（Context Isolation）**：预加载脚本与渲染器的主要运行环境是隔离开来的，以避免泄漏任何具特权的 API 到您的网页内容代码中

通过 [`contextBridge`](https://www.electronjs.org/zh/docs/latest/api/context-bridge) 模块来安全地实现交互

- 暴露 [`ipcRenderer`](https://www.electronjs.org/zh/docs/latest/api/ipc-renderer) 帮手模块于渲染器中，使用 进程间通讯 ( inter-process communication, IPC ) 来从渲染器触发主进程任务 ( 反之亦然 )。
- 如果您正在为远程 URL 上托管的现有 web 应用开发 Electron 封裝，则您可在渲染器的 `window` 全局变量上添加自定义的属性，好在 web 客户端用上仅适用于桌面应用的设计逻辑 。

```js
// preload.js
const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('myAPI', {
  desktop: true
})

// renderer.js
console.log(window.myAPI)
// => { desktop: true }
```
