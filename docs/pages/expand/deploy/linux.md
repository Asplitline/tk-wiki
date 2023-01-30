---
title: Linux
order: 2
---

<!-- todo Linux -->

# linux



## 行号

打开 vim 编译器，进入命令行模式，输入如下内容

```v
:set nu
```

打开 vim 编译器，进入命令行模式，输入如下内容

```v
:set nonu
```

> 以上方式都是临时

### 永久显示行号

```v
vim ~/.vimrc
```

在 .vimrc 中追加如下内容

```js
:set num
```

