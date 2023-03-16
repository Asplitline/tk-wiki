---
outline: deep
title: 应用
order: 6
---

# 应用

## Yalc 本地调试 node_modules

1. 全局安装 yalc

```bash
npm i yalc -g
```

2. 在需要本地 link 的库中发布依赖。以 element-ui 为例

```bash
yalc publish
```

yalc publish 执行后，会逐一执行`npm 生命周期脚本`，如：`prepublish、prepare、prepublishOnly、prepack...`等

> 通过`--no-script`禁用钩子钩动各种脚本

3. 在项目中添加依赖

以 demo 为例

```bash
yalc add element-ui
```

> demo/node_modules 中 element-ui 没有丢，而是放到缓存文件中

4. 更改 element-ui 中代码后，进行更新

```bash
yalc publish --push
# 简化为：
yalc push
```

注意：

在 link 库（element-ui）中使用 yalc publish 后，还需要在项目 (demo) 里面通过 yalc update 更新。

而使用 yalc push 相当于 yalc publish + yalc update

补充命令：

```bash
# 更新依赖
yalc update <package_name>
# 移除 yalc 依赖
yarn remove <package_name>
# 移除当前包所有 yalc 依赖
yalc remove --all
```

> 参考：https://juejin.cn/post/7033400734746066957
>
> 仓库：https://github.com/wclr/yalc

## node-sass

```shell
 yarn add sass-loader@^10.1.1
```

## production

如果 production 为 true 将不会安装 开发依赖

```bash
npm config get production

npm config set production false
```

## RequestError

connect ETIMEDOUT 20.205.243.166:443

1. cmd 中 ping github.com ，是否能够正常连接
2. 不能正常连接，在 `C:\Windows\System32\drivers\etc`目录下 host 文件下添加

```bash
140.82.114.3 github.com
```

> 140.82.114.3 获取：在 https://ipaddress.com/ 中，搜索 github.com

## 配置代理

```bash
## cmd 配置临时代理
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080
## 查看配置状态
echo %http_proxy%

## powershell 设置代理
netsh winhttp set proxy "127.0.0.1:1080"
netsh winhttp reset proxy
## 查看代理
netsh winhttp show proxy

## git 配置局部代理
git config http.proxy http://127.0.0.1:1080
git config https.proxy http://127.0.0.1:1080

git config http.proxy socks5://127.0.0.1:1080
git config https.proxy socks5://127.0.0.1:1080

## 只对github生效
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
git config --global --unset http.https://github.com.proxy

## 删除局部代理
git config --unset http.proxy
git config --unset https.proxy

## npm 配置代理
npm config set proxy http://127.0.0.1:1080
npm config set https-proxy http://127.0.0.1:1080

npm config delete proxy
npm config delete https-proxy
## 查看状态
git config --list

## yarn 代理
yarn config list

yarn config set proxy http://127.0.0.1:1080
yarn config set https-proxy http://127.0.0.1:1080

yarn config delete proxy
yarn config delete https-proxy
```
