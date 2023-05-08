---
title: Github
order: 2
---

# Github

## 推送仓库

### 推送一个新仓库

```shell
# 创建readme
echo "# book-system" >> README.md
# 初始化仓库
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Asplitline/book-system.git
git push -u origin main
```

### 推送一个本地仓库

```shell
git remote add origin https://github.com/Asplitline/book-system.git
git branch -M main
git push -u origin main
```

## 拉取仓库

### git clone

```shell
# 克隆远端数据仓库到本地
git clone 仓库地址
# 远端代码
git clone -b 分支 仓库地址 本地路径
# 拉取单分支
git clone -b master --single-branch https://github.com/ant-design/ant-design.git ant-design
# 拉取最新版本
git pull 远程仓库地址 分支名称
```

### 下载 zip

```shell
# 下载 zip
# 解压 zip
# 初始化仓库
git init
# 添加远程仓库
git remote add origin https://....
# 拉取远程
git pull
```

## 冲突解决

两个人修改了同一个文件的同一个地方，就会发生冲突。冲突需要人为解决

- 推送到远程仓库产生冲突，冲突文件会显示具体信息
- 将冲突任务解决后，再进行推送

## 跨团队合作

1. 程序员 C fork 仓库
2. 程序员 C 将仓库克隆在本地进行修改
3. 程序员 C 将仓库推送到远程
4. 程序员 C 发起 pull request
5. 原仓库作者审核
6. 原仓库作者合并代码

> github - pull request
>
> gitlab - merge request

参考：[Pull Request 与 Merge Request 的区别](https://zhuanlan.zhihu.com/p/138868306)
