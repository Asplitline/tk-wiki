---
title: Nginx
order: 2
---

# Nginx Config

## nginx 配置 history router

```javascript
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

## 启动本地服务器

1. 项目打包：` yarn build`
2. 安装 serve：`yarn global add serve`
3. 启动本地服务：`npx serve -s build` 或 `npx serve -s build `
