---
title: nginx
order: 2
---

# nginx

## nginx 命令

```shell
# 常规
netstat -nltp # 查看端口使用情况
netstat -ntlp | grep 3030

# nginx
nginx -t # 语法检测
service nginx restart # 重启nginx
nginx -s reload # 重新加载,错误会回滚
```

## nginx 安装

1. 安装依赖

```shell
sudo apt-get update # 更新软件列表

sudo apt-get upgrade -y # 对比各软件版本并更新

sudo apt-get install nodejs -y # 安装 nodejs

sudo apt-get install npm -y # 安装 npm

sudo npm install n -g # 安装 nodejs 版本管理器

n latest # 更新 nodejs 至最新版本，可自行选择，更新完成记得重新连接服务器输入 node -v 检查是否更新成功

sudo npm install pm2 -g # 安装 pm2，node 进程管理工具，这里主要用于持久化运行和监控 Nestjs 服务器
```

2. 安装 nginx

```shell
sudo apt-get install nginx -y # 安装 Nginx 服务器

service nginx start # 启动 Nginx 服务器
```

