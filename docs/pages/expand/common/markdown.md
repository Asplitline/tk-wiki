---
title: markdown
order: 3
---

# Markdown

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

## 1~6 级标题

```shell
#
...
######
```

## 引用

`Ctrl+ Shift + Q` 引用（>）

```shell
> ss
>
> > ss
```

> ss
>
> > ss

## 代码块

````
代码块    ```c++
流程图    ```flow
流程图    ```mermaid
时序图    ```sequence
甘特图    ```mermaid
````

## 无序列表

```shell
- 001
  - 002
    - 003
```

- 001
  - 002
    - 003

## 有序列表

```shell
1. 任务列表
```

1. 任务列表

## 选择框

```shell
- [ ] 001
```

- [ ] 001

## 上下标

```shell
x^2^ x~2~
```

x^2^ x~2~

## 注解

```shell
你们在干什么[^1]

[^1]: 你猜
```

你们在干什么[^1]
[^1]:你猜

## 跳转

```shell
[标题](#Typora)
```

[标题](#Typora)

## 分割线

```shell
---
```

## 高亮

```shell
==123==
```

==123==

## 注释

```shell
<!--导出文件不显示-->
```

<!--导出文件不显示-->

## 内容折叠

```html
<details>
  <summary>点击展开</summary>
  你好呀
</details>
```

<details><summary>点击展开</summary>
你好呀
</details>
