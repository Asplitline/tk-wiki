---
outline: deep
title: 部署
order: 2
---

# 部署

## nginx

80 端口 默认入口：/usr/share/nginx/html
目录 ： /etc/nginx/conf.d/\*

参考：[https://juejin.cn/post/6897100462676246541](https://juejin.cn/post/6897100462676246541)

### nginx 命令

```shell
# 常规
netstat -nltp # 查看端口使用情况
netstat -ntlp | grep 3030

# nginx
nginx -t # 语法检测
service nginx restart # 重启nginx
nginx -s reload # 重新加载,错误会回滚
```

### 安装

#### 安装依赖

? npm 安装存在问题

```shell
sudo apt-get update # 更新软件列表

sudo apt-get upgrade -y # 对比各软件版本并更新

sudo apt-get install nodejs -y # 安装 nodejs

sudo apt-get install npm -y # 安装 npm

sudo npm install n -g # 安装 nodejs 版本管理器

n latest # 更新 nodejs 至最新版本，可自行选择，更新完成记得重新连接服务器输入 node -v 检查是否更新成功

sudo npm install pm2 -g # 安装 pm2，node 进程管理工具，这里主要用于持久化运行和监控 Nestjs 服务器
```

#### 安装 nginx

```shell
sudo apt-get install nginx -y # 安装 Nginx 服务器

service nginx start # 启动 Nginx 服务器
```

#### 配置 nginx

##### Hash 路由

```nginx
server {
  listen       8010;
  server_name  127.0.0.1;
  index index.html;
  gzip             on;
  gzip_min_length  1000;
  gzip_proxied     expired no-cache no-store private auth;
  gzip_types       text/plain application/x-javascript text/html text/css application/xml application/octet-stream;
  root /data/test_web;
}
```

##### History 路由

```bash
server {
    listen       80;
    server_name  localhost;
    location / {
      root   /app;
      index  index.html;
      try_files $uri $uri/ /index.html;
    }
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
      root   /usr/share/nginx/html;
    }
}
```

### 问题

#### root 权限问题

```shell
sudo passwd root # 设置root密码
su root # 登录root
sudo passwd -l root # 禁用root账号
```

#### 无法创建 nginx 配置文件

```shell
sudo touch test.conf
```

#### xftp 无法创建文件

权限不够，需要让 xshell 登录 root 账号

##### 编辑 /etc/ssh/sshd_config 文件

```shell
# PermitRootLogin Prohibit-password
PermitRootLogin yes
PermitEmptyPasswords no
```

![image.png](deploy.assets/1648799235046-04a87216-9235-4c96-9d6c-00393e764eaf.png)

##### 重启 ssh 服务

service ssh restart（或者执行：/etc/init.d/ssh restart）

##### 重启服务器

shutdown -r now

##### 登录

再次通过 xshell 登录

## yarn

安装 yarn
[https://www.myfreax.com/how-to-install-yarn-on-ubuntu-18-04/](https://www.myfreax.com/how-to-install-yarn-on-ubuntu-18-04/)
安装 nodejs 和 npmjs
[https://www.myfreax.com/how-to-install-node-js-on-ubuntu-18-04/](https://www.myfreax.com/how-to-install-node-js-on-ubuntu-18-04/)

## pm2

### pm2 命令

```shell
# pm2 命令
pm2 list # pm2 列表

pm2 start yarn --name demo -- start  # 运行 yarn start - 取名为demo
pm2 startup # 开机自启
pm2 unstartup # 关闭开机自启

pm2 show demo # 查看详情


pm2 monit # 监控性能

pm2 start ecosystem.config.js # 通过配置启动
pm2 start ecosystem.config.js --only myapp # 单独处理 myapp
```

### 配置启动多个项目

```javascript
module.exports = {
  apps: [
    {
      name: 'p57_swap',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3012',
      max_memory_restart: '1024M',
      cwd: '/data/p57_swap', // 根目录
      instances: 1,
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      watch: true,
      ignore_watch: ['node_modules']
    },
    {
      name: 'qj_swap',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3011',
      max_memory_restart: '1024M',
      cwd: '/data/qj_swap', // 根目录
      instances: 1,
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      watch: true,
      ignore_watch: ['node_modules']
    }
  ]
}
```
