---
outline: deep
title: 入门
order: 1
---

# Electron

Electron 是一个使用 JavaScript、HTML 和 CSS 构建**桌面应用程序的框架**。

嵌入 [Chromium](https://www.chromium.org/) 和 [Node.js](https://nodejs.org/) 到 二进制的 Electron 允许您保持一个 JavaScript 代码代码库并创建 在 Windows 上运行的**跨平台**应用 macOS 和 Linux

> Electron 将 Node.js 嵌入到其二进制文件中，你应用运行时的 Node.js 版本与你系统中运行的 Node.js 版本无关

![image-20211029235047268](guide.assets/image-20211029235047268.png)

## 应用程序创建

1. 新建文件夹，初始化项目

```shell
mkdir my-electron-app && cd my-electron-app
yarn init
```

2. 将 `electron` 添加开发依赖

```shell
yarn add --dev electron
```

3. `package.json` 新加 命令

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

4. main.js - 添加主进程

主进程： Electron 应用程序的入口 `main` 文件。

> package.json 中 main 字段，可配置应用程序入口

5. index.html - 创建页面

为应用创建窗口前，需要先创建加载进该窗口的内容。 在 Electron 中，每个窗口中**无论是本地的 HTML 文件还是远程 URL 都可以被加载显示。**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <!-- https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
    <meta http-equiv="X-Content-Security-Policy" content="default-src 'self'; script-src 'self'" />
    <title>Hello World!</title>
  </head>
  <body>
    <h1>Hello World!</h1>
    We are using Node.js <span id="node-version"></span>, Chromium <span id="chrome-version"></span>, and Electron
    <span id="electron-version"></span>.
  </body>
</html>
```

6. 打开页面 - main.js 中添加

将页面加入应用窗口，需要 2 个 Electron 模块

- [`app`](https://www.electronjs.org/zh/docs/latest/api/app) ：控制应用程序的事件**生命周期**
- [`BrowserWindow`](https://www.electronjs.org/zh/docs/latest/api/browser-window) ：它**创建和管理应用**程序窗口

`app` 模块的 [`ready`](https://www.electronjs.org/zh/docs/latest/api/app#event-ready) 事件被激发后才能创建浏览器窗口，使用 [`app.whenReady()`](https://www.electronjs.org/zh/docs/latest/api/app#appwhenready) API 来监听此事件。

```js
const { app, BrowserWindow } = require('electron')
// 将 index.html 加载进 BrowserWindow 实例
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })
  win.loadFile('index.html')
}

// whenReady 成功后，调用 createWindow
app.whenReady().then(() => {
  createWindow()
})
```

## 生命周期

使用 `进程` 全局的 [`platform`](https://nodejs.org/api/process.html#process_process_platform) 属性来专门为某些操作系统运行代码

`Windows和Linux`：关闭所有窗口通常会**完全退出**一个应用程序。

```js
app.on('window-all-closed', function () {
  // 平台不为mac 退出程序
  if (process.platform !== 'darwin') app.quit()
})
```

`macOS`：应用通常即使在**没有打开任**何窗口的情况下**也继续运行**

```js
app.whenReady().then(() => {
  createWindow()
  // 应用初始化后，新建窗口
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
```

## 预加载脚本 - 从渲染器访问 node.js

不能在主进程编辑 DOM，因为无法访问渲染器 文档上下文。 **它们存在于完全不同的进程！**

预加载脚本：渲染器进程加载之前加载。

**有权访问两个 渲染器全局 (例如 `window` 和 `document`) 和 Node.js 环境**。

`preload.js`

```js
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
```

在主进程中，预加载脚本通过 `webPreferences.preload` 选项配置

```js
const path = require('path')
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 添加 preload.js
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}
```

## 额外 - 添加功能到网页

在 `index.html` 文件关闭 `</body>` 标签之前添加一个 `<script>` 标签

```js
<script src="./renderer.js"></script>
```

## 打包

将 Electron Forge 添加到您应用的开发依赖中，并使用其"import"命令设置 Forge 的脚手架

```shell
cd my-app
yarn add --dev @electron-forge/cli
yarn electron-forge import
```

使用 Forge 的 `make` 命令来创建可分发的应用程序：

```shell
yarn run make
```

> 目标目录 ： `/out`

##
