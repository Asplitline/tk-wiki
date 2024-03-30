---
title: 进程间通信
order: 3
---

# 进程间通信

## 渲染进程 到 主进程

### callback 写法

渲染进程发送：`ipcRenderer.send`

主进程监听：`ipcMain.on`

### Promise 写法 ^7.0+^

处理请求 + 响应模式

渲染进程发送：`ipcRenderer.invoke`

主进程处理：`ipcMain.handle`

## 主进程 到 渲染进程

渲染进程监听：`ipcRenderer.on`

主进程发送：`webContents.send`

## 渲染进程之间

1. 通知事件

- 主进程转发 ^<5.0^
- `ipcRenderer.sendTo` ^5.0+^

2. 数据共享

- Web 技术（localStorage、sessionStorage、indexedDB）
- 使用 remote

> 少用 remote，sync 方法，影响性能

## 主进程之间

主进程只有一个，只是内容过多，分文件

- `webContents.send` ，发送给渲染进程
- 渲染进程
  - `ipcRenderer.on`：接收事件
  - `ipcRenderer.send`：返回事件
