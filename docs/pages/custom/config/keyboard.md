---
outline: deep
title: 快捷键
order: 1
---

# 快捷键

## Git Bash

| 快捷键         | 说明                   |
| -------------- | ---------------------- |
| Ctrl + u       | 清除到开始             |
| Ctrl + a       | 行首                   |
| Ctrl + e       | 行尾                   |
| Ctrl + w       | 删除左边字符（单词）   |
| Ctrl + xx      | 行首，行尾切换         |
| Ctrl + r       | 搜索命令               |
| Ctrl + g       | 取消搜索，并恢复原始行 |
| Ctrl + j       | 选中搜索               |
| Ctrl + u / esc | 删除整行               |

## Github

| 按键     | 说明                        |
| -------- | --------------------------- |
| `.`      | 打开 web 编辑器             |
| Ctrl + k | github 命令面板             |
| b        | 查看文件历史记录            |
| l        | 行跳转                      |
| t        | 文件搜索                    |
| w        | 搜索分支                    |
| S 或 /   | 聚焦于搜索栏。              |
| G N      | 转到您的通知。              |
| G C      | 转到 Code 选项卡            |
| G I      | 转到 Issues 选项卡。        |
| G P      | 转到 Pull requests 选项卡。 |

## Cmd

| 命令      | 说明            |
| --------- | --------------- |
| `start .` | 打开当前文件    |
| `tree`    | 简略树形结构    |
| `dir`     | 列出 文件、目录 |

```shell
tree /f /a >文件名.txt

# 查询所有运行端口
netstat -ano

# 查询某个运行端口
netstat -aon|findstr "8081"
```

## VsCode

自定义代码折叠区域

```js
//#region
//#endregion
```

| 按键                                  | 功能                                                            |
| :------------------------------------ | :-------------------------------------------------------------- |
| Ctrl + P                              | 打开文件                                                        |
| Ctrl + Shift + ([ `or` ])             | 折叠/展开代码块（当前）                                         |
| Ctrl + K (Ctrl + 0 `or` Ctrl + J)     | 折叠/展开所有代码                                               |
| Ctrl + G                              | 行跳转                                                          |
| Ctrl + D                              | 多次触发后，在所有相同文字后追加光标                            |
| Ctrl + R                              | 切换工作区                                                      |
| Ctrl + T                              | 全局元素导航                                                    |
| F12                                   | 跳到声明（ Ctrl + LeftClick 同效果）                            |
| Alt + F12                             | 查看声明（ Ctrl + LeftClick 同效果）                            |
| Alt + (Left `or` Right)               | 上次/下次光标位置                                               |
| Alt + Shift + T                       | 切换已打开的工作区（与 Ctrl + Shift + P 中 swtich window 类似） |
|                                       |                                                                 |
| Ctrl + KS                             | 快捷键                                                          |
| Ctrl + F2                             | 选中所有匹配项                                                  |
| Ctrl + KX                             | 减去末尾空格                                                    |
| Ctrl + Shift + L                      | 选中文本的所有相同内容处，出现光标                              |
| Ctrl + Shift + \\                     | 跳转到匹配括号                                                  |
| Alt + Shift + arrowRight              | 选中括号间文本                                                  |
| Ctrl + p 输入 @ `or` Ctrl + Shift + o | 符号导航                                                        |
| Alt + Q                               | 当前文件终端                                                    |
| Ctrl + shift + C                      | 当前工作区终端                                                  |
| Ctrl + Alt + R                        | 搜索代码片段                                                    |
|                                       |                                                                 |
| 自定义快捷键                          |                                                                 |
| Ctrl + ED                             | 打开文件夹                                                      |
| Ctrl + KZ                             | 禅模式                                                          |

| 按键                           | 功能                                                |
| :----------------------------- | :-------------------------------------------------- |
| Ctrl+P                         | 打开文件                                            |
| Ctrl+B                         | 侧栏                                                |
| Shift+Alt+F                    | 格式化代码                                          |
| Shift+Alt+A                    | 块注释                                              |
| Alt + Shift + i                | 所选文本末尾追加光标                                |
| Alt + leftClick                | 选中状态                                            |
| Ctrl + Alt + (Up `or` Down)    | 连续的多列上，同时出现光标（与 Alt + 鼠标左键等效） |
| Ctrl + Shift + P               | **命令面板**                                        |
| Ctrl + \                       | 分屏                                                |
| Ctrl + [number]                | 分屏切换                                            |
| Ctrl + J                       | 显示控制台                                          |
| Ctrl + Shift + (N `or` W)      | 新开软件窗口/关闭软件窗口                           |
| Ctrl + (Pagedown `or` Pageup)  | 文件间切换                                          |
| Ctrl + (Left `or` Right)       | 单词间移动                                          |
| Ctrl + (Backspace `or` delete) | 删除前一个单词/后一个单词                           |
| Ctrl + Shift + E `or` Ctrl + Q | **聚焦到侧边栏**                                    |
| Ctrl + Shfit + F               | 全局搜索（选中文本）                                |
| Alt + Z                        | 自动换行                                            |
| F8                             | 聚焦下一个错误                                      |
| **Ctrl + Tab**                 | **切换 Tab**                                        |
| Ctrl + KR                      | 快捷键 pdf                                          |
| Ctrl + Shift + H               | 替换文件                                            |

### 扩展

| 按键            | 功能                                                                  | 扩展名称        |
| --------------- | --------------------------------------------------------------------- | --------------- |
| alt + shift + p | 以新窗口打开项目（自定义快捷键 projectManager.listProjectsNewWindow） | Project Manager |
|                 |                                                                       |                 |
|                 |                                                                       |                 |

## Chrome

| 按键                | 功能               |
| ------------------- | ------------------ |
| Ctrl+L / Alt+D / F6 | 聚焦到地址栏       |
| esc                 | 地址栏复原         |
| Ctrl + Alt + Esc    | 窗口置底           |
| Shift + Enter       | 以当前地址新开窗口 |

| 函数                                 | 作用       |
| ------------------------------------ | ---------- |
| copy()                               | 复制数据   |
| document.body.contentEditable = true | 文本可编辑 |

## Linux

| 按键         | 功能     |
| :----------- | :------- |
| Ctrl+ Alt    | 获取鼠标 |
| Shfit + z +z | 保存退出 |
| pwd          | 当前目录 |
|              |          |

| 命令  | 作用         |
| ----- | ------------ |
| pwd   | 当前目录     |
| mkdir | 新建目录     |
| ls    | 显示目录内容 |
| touch | 创建空文件   |
| dir   | 显示目录     |
| mv    | 改名         |

## Markdown

[markdown 语法](https://www.jianshu.com/p/ebe52d2d468f)

| 按键                     | 功能                                                   |
| :----------------------- | :----------------------------------------------------- |
| Ctrl+ 0~4                | 普通文本，一级~四级标题                                |
| Ctrl+ B/I/U              | **加粗**（\****）*斜体\*（**）<u>下划线</u>（<u></u>） |
| Shift + Alt + 5          | ~~删除线~~（~~~~）                                     |
| Shift + Ctrl+ \` 或 \`\` | 行内代码块                                             |
| Ctrl+ K                  | [超链接](#Typora)                                      |
| Ctrl+ T                  | 表格                                                   |
| Ctrl+ Shift + I          | `![]()`                                                |
| Ctrl+ /                  | 源代码                                                 |
| Shift + enter            | 单回车                                                 |
| enter                    | 双回车                                                 |
| F11                      | 全屏                                                   |
| Ctrl+ shift + enter      | `<br /> `换行                                          |
| Ctrl+ backspace          | 删除当前行                                             |

#### 1~6 级标题

```shell
#
...
######
```

#### 引用

`Ctrl+ Shift + Q` 引用（>）

```shell
> ss
>
> > ss
```

> ss
>
> > ss

#### 代码块

````
代码块    ```c++
流程图    ```flow
流程图    ```mermaid
时序图    ```sequence
甘特图    ```mermaid
````

#### 无序列表

```shell
- 001
  - 002
    - 003
```

- 001
  - 002
    - 003

#### 有序列表

```shell
1. 任务列表
```

1. 任务列表

#### 选择框

```shell
- [ ] 001
```

- [ ] 001

#### 上下标

```shell
x^2^ x~2~
```

x^2^ x~2~

#### 注解

```shell
你们在干什么[^1]

[^1]: 你猜
```

你们在干什么[^1]
[^1]:你猜

#### 跳转

```shell
[标题](#Typora)
```

[标题](#Typora)

#### 分割线

```shell
---
```

#### 高亮

```shell
==123==
```

==123==

#### 注释

```shell
<!--导出文件不显示-->
```

<!--导出文件不显示-->

## Potplayer

| 按键    | 功能     |
| ------- | -------- |
| P       | 添加书签 |
| Alt + z | 书签定位 |

## PhotoShop

| 按键          | 功能                 |
| :------------ | :------------------- |
| Alt +/-       | 放大/缩小            |
| Space         | 拖动图片             |
| Ctrl + R      | 标尺                 |
| Ctrl + D      | 清除选区             |
| Shift + A     | 箭头                 |
| Shift + M     | 矩形选择框           |
| Alt + Delete  | 前色填充背景         |
| Ctrl + Delete | 后色填充背景         |
| Ctrl + T      | 等比例缩放           |
| Ctrl + left   | 移动工具下，选中图层 |

## OneNote

| 按键                | 功能                    |
| :------------------ | :---------------------- |
| Ctrl+ >             | 项目符号                |
| Ctrl+ /             | 数字符号                |
| Ctrl+ Alt + 1       | 一级标题                |
| Alt + Shift + 1     | 折叠一级标题            |
| Ctrl+ Shift + >     | 字体增大                |
| Ctrl+ B/I/U         | 加粗/斜体/下划线        |
| Alt + Shift + F/T/D | 插入时间+日期/时间/日期 |
