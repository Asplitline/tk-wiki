---
title: vscode
order: 1
---

# vscode

## live server 配置 https

> git bash 自带 openssl

1. 生成私钥 `openssl genrsa -out privatekey.pem 1024`
2. 根据私钥生成签名` openssl req -new -key privatekey.pem -out certrequest.csr`
3. 通过私钥和签名 生成证书 `openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem`

操作后，生成以下三个文件

```bash
privatekey.pem
certrequest.csr
certificate.pem
```

4. 在 vscode 安装 [Live Server ](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
5. 配置 settings.json（绝对定位）

```json
 "liveServer.settings.https": {
    "enable": false, //set it true to enable the feature.
    "cert": "E:\\**\\certificate.pem",
    "key": "E:\\**\\privatekey.pem"
  }
```

