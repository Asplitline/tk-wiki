---
title: IOS 打包
order: 5
---

# uniapp IOS 离线打包

## IOS 开发和生产证书申请

### 申请 App ID

选择页面中 **'identifiers'**

`App IDS -> iOS,tvOS,watchOS -> Explict(bundle ID)`

> bundle ID - com.datachain.kw

### 生成证书请求文件

macOS 下，打开**钥匙串访问**

`钥匙串访问 -> 证书助理 -> 从证书颁发机构请求证书...`

> 请求文件：`.certSigningRequest`

### 开发流程

#### 申请 development 证书

选择页面中 **'Certificates'**

`ios App Development -> choose file -> download (ios_development.cer)`

双击 ios_development.cer , 找到证书 , 导出.p12 文件 , 输入密码

> 选择文件为 证书请求文件
>
> 开发证书：`.p12`

#### 添加调试设备

选择页面中 **'Devices'**

`填写设备 UDID（设备标识）`

- 获取设备 UDID：设备连接到电脑，启动 iTunes，点击此区域可切换显示设备的 UDID

> 开发描述文件必须绑定调试设备，只有授权的设备才可以直接安装 App

#### 申请 development 描述文件

选择页面中 **'Profiles'**

`"iOS App Development" -> 选择App ID -> 绑定证书 -> 输入描述文件名称 -> 下载描述文件 `

> 描述文件： `.mobileprovision`

### 发布流程

与开发流程大致相同，主要区别如下

- 申请证书：`"iOS App Development"`和 `"App Store and Ad Hoc"`
- 发布流程无需添加调试设备
- 申请描述文件：`"iOS App Development"`和`"App Store"`

#### 申请 production 证书

选择页面中 **'Certificates'**

`"App Store and Ad Hoc" -> choose file -> download (ios_production.cer)`

- 双击 ios_production.cer , 找到证书 , 导出.p12 文件 , 输入密码

#### 申请 Distribution 描述文件

选择页面中 **'Profiles'**

`"App Store" -> 选择App ID -> 绑定证书 -> 输入描述文件名称 -> 下载描述文件 `

> 描述文件： `.mobileprovision`

## IOS 开发生产模式配置

<img src="./ios.assets/image-20230109232639125.png" alt="image-20230109232639125" style="zoom:80%;" />

<img src="./ios.assets/image-20230109232655279.png" alt="image-20230109232655279" style="zoom:80%;" />

## IOS 相机相册权限配置

官方 demo：[IOS 集成相册](https://nativesupport.dcloud.net.cn/UniMPDocs/UseModule/ios/ios?id=下面以-gallery-模块为例)

```bash
## 用户相册权限
Privacy - Photo Library Usage Description
## 保存图片至相册
Privacy - Photo Library Additions Usage Description
```
