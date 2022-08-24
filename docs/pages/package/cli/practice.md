---
title: 实战
order: 4
---

# 实战

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
