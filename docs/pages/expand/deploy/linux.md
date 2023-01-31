---
title: Linux
order: 2
---

# linux



## 基础用法

```shell
## 新建文件
touch <file>

## 新建文件夹
mkdir <folder>
```



## 批量替换内容

语法

```v
:[addr]s/源字符串/目的字符串/[option]
```

`[addr]`：表示检索范围，省略时表示当前行

“1,20” ：表示从第1行到20行；

“%” ：表示整个文件，同“1,$”；

“. ,$” ：从当前行到文件尾；

`s`：表示替换操作

`[option]`：操作类型

g - 全局替换; 

c - 进行确认

p - 替代结果逐行显示

> 省略 option 时仅对每行第一个匹配串进行替换

全局替换

```v
:%s/源字符串/目的字符串/g
```

替换示例

```bash
# 将That or this 换成 This or that
:%s/\(That\) or \(this\)/\u\2 or \l\1/

# 将句尾的child换成children
:%s/child\([ ,.;!:?]\)/children\1/g

# 将mgi/r/abox换成mgi/r/asquare
:g/mg\([ira]\)box/s//mg//my\1square/g    <=>  :g/mg[ira]box/s/box/square/g

# 将多个空格换成一个空格
:%s/  */ /g

# 使用空格替换句号或者冒号后面的一个或者多个空格
:%s/\([:.]\)  */\1 /g

# 删除所有空行
:g/^$/d

# 删除所有的空白行和空行
:g/^[  ][  ]*$/d

# 在每行的开始插入两个空白
:%s/^/>  /

# 在接下来的6行末尾加入.
:.,5/$/./

# 颠倒文件的行序
:g/.*/m0O  <=> :g/^/m0O

# 寻找不是数字的开始行,并将其移到文件尾部
:g!/^[0-9]/m$ <=> g/^[^0-9]/m$

# 将文件的第12到17行内容复制10词放到当前文件的尾部
:1,10g/^/12,17t$
~~~~重复次数的作用

# 将chapter开始行下面的第二行的内容写道begin文件中
:g/^chapter/.+2w>>begin

:/^part2/,/^part3/g/^chapter/.+2w>>begin

:/^part2/,/^part3/g/^chapter/.+2w>>begin|+t$
```

参考：https://www.cnblogs.com/beenoisy/p/4046074.html

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

