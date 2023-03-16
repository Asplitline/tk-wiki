---
outline: deep
title: 实战
order: 3
---

# 部署实战

## 部署 nextjs 项目

### 项目

项目放置地址 - /data

### 配置

#### nginx 配置文件地址

文件路径：/etc/nginx/conf.d

qj_swap nginx 配置文件 qj_swap.conf

```nginx
server {
  listen       8011;
  server_name  12.12.12.12; # 需配置为对应服务器端口
  index index.html;
  gzip             on;
  gzip_min_length  1000;
  gzip_proxied     expired no-cache no-store private auth;
  gzip_types       text/plain application/x-javascript text/html text/css application/xml application/octet-stream;
location / {
    proxy_pass  http://127.0.0.1:3011;
    proxy_set_header Host $proxy_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

> 注意：12.12.12.12 - 改为对应服务端口

#### pm2 配置文件

文件路径： /etc/nginx/conf.d/ecosystem.config.js

参数说明

- name ： pm2 名称
- script：命令
- args：命令参数
- cwd：项目根目录

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
      watch: false,
      ignore_watch: ['node_modules']
    }
  ]
}
```

> ecosystem.config.js 为固定名称

启动方式 ： pm2 start ecosystem.config.js

### 相关链接

pm2 官网：[https://pm2.keymetrics.io/](https://pm2.keymetrics.io/)

样式修改：[https://styled-components.com/](https://styled-components.com/)

## 自动化部署 vitepress

### 获取 token - 本项目未用

token，配置 github actions 权限
<img src="./example.assets/1653816518588-5229b1a4-327c-46d5-b7d3-8f88b7c1cd72.png" alt="image.png" style="zoom: 67%;" />

### 配置 Repository secrets

port 端口默认 22
<img src="./example.assets/1653816442941-1e0c3957-0f1c-4d17-821f-6880e7b8ea40.png" alt="image.png" style="zoom: 80%;" />

### 配置 workflows

.github/workflows/main.yml

```yaml
# This workflow will do a clean installation of node dependencies, cache/restore them, build the source code and run tests across different versions of node
# For more information see: https://help.github.com/actions/language-and-framework-guides/using-nodejs-with-github-actions

name: tk-notes-ci/cd

on:
  push:
    branches: [master]
#  pull_request:
#   branches: [master]

jobs:
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [16.x]
    steps:
      # download source
      - name: Checkout
        uses: actions/checkout@master

      # Install & Build
      - name: Build
        uses: actions/setup-node@master
      - run: |
          yarn install
          yarn build

      # copy dist
      - name: Upload
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          password: ${{ secrets.PASSWORD }}
          port: ${{ secrets.PORT }}
          source: './docs/.vitepress/dist/*'
          target: '/data/tk-notes'
          strip_components: 3 # 去掉 3 层路径, /data/tk-notes/docs/.vitepress/dist/* => /data/tk-notes/*


      # - name: Deploy
      #   uses: appleboy/ssh-action@master
      #   with:
      #     host: ${{ secrets.HOST }}
      #     username: ${{ secrets.USERNAME }}
      #     password: ${{ secrets.PASSWORD }}
      #     port: ${{ secrets.PORT }}
      #     script: |
      #       cd /data/tk-notes
      #       yarn install
      #       yarn build
      #       pm2 start yarn --name tk-docs -- serve
```

### 相关链接

[GitHub Actions 入门教程](http://www.ruanyifeng.com/blog/2019/09/getting-started-with-github-actions.html)
[appleboy/scp-action@master](https://github.com/marketplace/actions/scp-command-to-transfer-files)

## vitepress 部署到 Git Page
