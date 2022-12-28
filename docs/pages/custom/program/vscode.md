---
title: vscode
order: 1
---

# vscode

## live server 配置 https

git bash 自带 openssl
1. 生成私钥

```bash
openssl genrsa -out privatekey.pem 1024
```

2. 根据私钥生成签名

```bash
openssl genrsa -out privatekey.pem 1024
```

3. 通过私钥和签名 生成证书 


```bash
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
```
 操作后，生成以下三个文件

```
privatekey.pem
certrequest.csr
certificate.pem
```

4.  在 vscode 安装 Live Server 
5.  配置 settings.json（建议绝对定位）

```json
"liveServer.settings.https": {
	"enable": false, //set it true to enable the feature.
	"cert": "E:\\**\\certificate.pem",
	"key": "E:\\**\\privatekey.pem"
 }
```

