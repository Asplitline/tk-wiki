---
title: 不同操作系统开发差异
order: 5
---


# 不同操作系统开发差异



## 路径

`Windows` 使用反斜杠 `\` 作为文件路径分隔符。

例如：`C:\Users\Username\Documents\file.txt`。

`Linux` 和 `macOS` 使用正斜杠 `/` 作为文件路径分隔符。

例如：`/home/username/Documents/file.txt`。



## 环境变量

在 Linux 和 Mac OS 上使用`$env`，但在 Windows 上应该使用 `%env%` 来代替

以 env-cmd 为例

Linux/MacOS环境下

```bash
cross-env env=test env-cmd -e $env node index.js
```

window 环境下

```bash
cross-env env=test env-cmd -e %env% node index.js
```