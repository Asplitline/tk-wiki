---
title: Fiddler - 转载
order: 4
---

# Fildder 使用

> https://blog.csdn.net/qq_37688023/article/details/106609936

## 一、Fiddler 原理与下载

Fiddler 可以理解为处于客户端和服务器之间的代理服务器。通过在各浏览器、Andoird、IOS 设备上设置 Fiddler 的代理，从而可以监听客户端上发生的 HTTP(S)请求。
![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018703411-ff6f862a-9035-4f6c-a3fc-627d056341e4.png#averageHue=%23f6f5f4&clientId=u9ed35bd0-e38e-4&from=paste&id=u9b84f19f&originHeight=460&originWidth=819&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ub1463cad-fcb7-4aef-8726-e19a49ba93b&title=)
这篇博客是在 B 站上看完一个详细教程后编写的，想看视频的可以直接点击链接去看：[链接\_Fiddler 教程](https://www.bilibili.com/video/BV1c4411c7zH?p=3)

- 下载链接：可以直接官网上下载，也可以点击下面链接下载 [百度云链接](https://pan.baidu.com/s/1Ru_0HEcbwKqualM6bhQAeA)，提取码：g7nz

## 二、Fiddler 设置代理

### 2.1 谷歌、IE 浏览器

由于谷歌浏览器和 IE 浏览器启动的时候，就会默认读取系统代理，所以只需要将 Fiddler 设置为启动后作为系统代理即可。

- 设置启动即作为系统代理——点击 Tools->Options->Connections
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018703966-2df11b63-8d4c-48e7-a0eb-fb1c8d8a0c76.png#averageHue=%23f7f0ef&clientId=u9ed35bd0-e38e-4&from=paste&id=u2a5cdcc7&originHeight=435&originWidth=724&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9d5fa21b-481e-49ae-8c42-42490783df4&title=)

这样设置后，我们在谷歌浏览器和 IE 浏览器访问 HTTP 请求，就会在 Fiddler 工具左侧中显示出请求，但是 HTTPS 的请求却没有显示出来，这是为什么呢？
原因如下：Fiddler 作为一个代理服务器，是可以代理到 HTTPS 请求的。但是 HTTPS 可以理解为 HTTPS=HTTP+SSL/TLS,也就是 HTTPS 是加密的，是有证书存在的。所以我们需要配置解密 HTTPS 并安装证书。

- 配置解密 HTTPS 并安装证书——点击 Tools->Options->HTTPS。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018703442-ceaf7930-390f-45b6-90d2-a3087e547bcb.png#averageHue=%23f5edec&clientId=u9ed35bd0-e38e-4&from=paste&id=u9475b659&originHeight=441&originWidth=767&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud86e6c7e-e233-41b9-9b24-02fdee24a64&title=)
- 查看证书是否安装成功。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018703399-dc011f00-cb61-4480-8be0-e0ee07adcb70.png#averageHue=%23f5f2f1&clientId=u9ed35bd0-e38e-4&from=paste&id=uc4947819&originHeight=458&originWidth=741&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u5c1da8a1-1123-4cc8-bac8-332b9068302&title=)
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018703390-0549abf3-14e3-4c5c-8219-409a64774cb5.png#averageHue=%23f0ebe9&clientId=u9ed35bd0-e38e-4&from=paste&id=ua2d89978&originHeight=577&originWidth=839&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9412b482-16c7-4dbf-aac3-48acd2b8a58&title=)
- 最后效果——浏览器中访问 HTTPS 的页面，也能在 Fiddler 中显示。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018703929-2eb2a4cf-1319-454e-8c71-beff63838174.png#averageHue=%23f9f4f2&clientId=u9ed35bd0-e38e-4&from=paste&id=u8e0e65d0&originHeight=430&originWidth=711&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u76bcbfb8-2dcf-4eea-9c6d-6cfe56ad781&title=)

### 2.2 火狐浏览器

谷歌和 IE 浏览器是直接使用系统代理，且使用系统的证书。但是火狐浏览器默认不是使用系统代理，且使用的不是系统的证书，是自己管理自己的证书。
所以对于火狐浏览器，需要先设置为使用系统代理，再在火狐浏览器中导入 Fiddler 的证书。

- 火狐浏览器设置使用系统代理
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018703977-62c0d616-ee50-4cf5-ba66-563deb93f5c8.png#averageHue=%23314061&clientId=u9ed35bd0-e38e-4&from=paste&id=ue0272e89&originHeight=726&originWidth=1366&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u62137745-a143-4c4a-b3ce-6e7c6cd3044&title=)
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704037-f0edbcb8-176c-492d-ac33-423c8af2f180.png#averageHue=%23f4f5f6&clientId=u9ed35bd0-e38e-4&from=paste&id=u44b08bac&originHeight=477&originWidth=776&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u61809c15-1d2f-4bea-a334-cd56280299c&title=)
- Fiddler 导出证书
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704024-bfc25353-ddc8-4833-8a40-d5de9894b793.png#averageHue=%23f5f1f0&clientId=u9ed35bd0-e38e-4&from=paste&id=u674cb7e0&originHeight=438&originWidth=743&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u6e419c7e-1490-4692-b004-df34f451076&title=)
- 火狐浏览器导入证书
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704353-c6a3fed0-2b92-495b-aeb5-4fdf44f323f0.png#averageHue=%23314062&clientId=u9ed35bd0-e38e-4&from=paste&id=u08ffd3db&originHeight=729&originWidth=1366&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u44e626c3-71cb-4533-8fdb-52b3cef7776&title=)
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704386-2584eecd-3b55-4ea7-bd8f-018fc0bdee39.png#averageHue=%23dcda73&clientId=u9ed35bd0-e38e-4&from=paste&id=u2e0b742c&originHeight=490&originWidth=782&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uaebc49eb-05e0-4f1a-954b-031785049b0&title=)
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704422-60c49993-450a-4699-8658-25155ed2cf13.png#averageHue=%23eae4e3&clientId=u9ed35bd0-e38e-4&from=paste&id=u053c3263&originHeight=290&originWidth=568&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u17991fbf-6136-48a1-88ef-52bda3d398d&title=)
- 最后效果——浏览器中访问 HTTPS 的页面，也能在 Fiddler 中显示。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704486-31f77095-8b3b-4356-94c5-bb43b7da8172.png#averageHue=%23f7f1ee&clientId=u9ed35bd0-e38e-4&from=paste&id=u9635034c&originHeight=403&originWidth=707&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ubd9f7c55-46b1-443e-915c-dd051f63925&title=)

### 2.3 Android 客户端

首先，使用 Fiddler 对 Android 客户端抓包的时候，需要手机连接的 WIFI 和 Fiddler 电脑本机使用的同一个网络，这样才能做数据通信。

- Fiddler 设置——允许远程主机连接
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704558-58a41ccf-8789-4924-8b74-fe588ea31f75.png#averageHue=%23f5f0ee&clientId=u9ed35bd0-e38e-4&from=paste&id=ua70e6c42&originHeight=439&originWidth=607&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2c650591-2893-4516-a71d-76588c6cebc&title=)
- 手机 WLAN 设置代理
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704932-03ed085d-a585-4ff5-840b-77a98e31fd0e.png#averageHue=%23fbfafa&clientId=u9ed35bd0-e38e-4&from=paste&id=udda4c0df&originHeight=400&originWidth=700&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua7868eaf-7fef-4400-9e8a-e05166490c4&title=)
- 下载证书
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704864-d468a501-d65d-4af6-8aa2-ea7d1cbbfe97.png#averageHue=%23f8f7f7&clientId=u9ed35bd0-e38e-4&from=paste&id=u4f964302&originHeight=400&originWidth=700&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua71ac4fc-4614-480a-959e-440402e8bee&title=)
- 安装证书
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018704942-891b8a60-811d-48ea-bf84-7adce2eec942.png#averageHue=%23fdfcfc&clientId=u9ed35bd0-e38e-4&from=paste&id=uabfcafac&originHeight=400&originWidth=700&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0bdf6c7a-856c-468c-abbd-a732bf503ce&title=)
- 提示：按照上面的配置后，按照正常情况下，就能抓到 HTTPS 的包了。但是由于 Android7 之后，系统只信任系统预置的 CA 证书，不会信任用户安装的 CA 证书。具体参考：[这是一个链接](https://gaojiajun.cn/2018/08/charles-notTrust-in-android7.0/)

### 2.4 IOS 客户端

由于穷，没有演示 IOS 客户端的办法，请直接查看视频：[IOS 抓包](https://www.bilibili.com/video/BV1c4411c7zH?p=23)

## 三、Fiddler 界面及功能

可以将 Fiddler 从界面上划分，分为五个部分：菜单栏、工具条、监控面板（回话列表）、辅助标签（工具）、命令行+状态栏。
![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705008-0b629e24-834e-4480-a122-bd72ab2b16e1.png#averageHue=%23e6dea0&clientId=u9ed35bd0-e38e-4&from=paste&id=u99ea5141&originHeight=547&originWidth=896&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue50ed84f-a77a-4049-b788-5cb93e92f85&title=)

### 3.1 菜单栏

#### 3.1.1 Rules-规则

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705063-e40a1090-7fe4-4733-a9d7-e227044e701d.png#averageHue=%23d1b674&clientId=u9ed35bd0-e38e-4&from=paste&id=uc7185778&originHeight=388&originWidth=598&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc1e25f2e-4859-4a8d-970c-e8b40431bd7&title=)

#### 3.1.2 Tools—工具

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705295-fb50ac2a-b70a-4b72-a6fc-ac7179f79a6d.png#averageHue=%23efe7e5&clientId=u9ed35bd0-e38e-4&from=paste&id=u731a7338&originHeight=350&originWidth=514&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2dfdbb67-3c5f-48f2-9b7a-c4a5447fd78&title=)

### 3.2 工具条

#### 3.2.1 Comments—备注

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705317-e0e2116a-850c-45bb-ba74-5006dbac7979.png#averageHue=%23faf6f5&clientId=u9ed35bd0-e38e-4&from=paste&id=ubbde4b45&originHeight=397&originWidth=758&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9b6e4683-47ac-4741-847a-fa3e11271d4&title=)

#### 3.2.2 Replay—重放

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705417-1aa88c0f-c231-40d4-86a5-566e0aae462f.png#averageHue=%23fcf3f3&clientId=u9ed35bd0-e38e-4&from=paste&id=u36321532&originHeight=383&originWidth=756&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uca78dbd6-7383-40d3-b69e-fb4ff97faaa&title=)

#### 3.2.3 Remove—移除

移除所有 Remove ALL 的快捷键为 Ctrl+X
![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705473-8fc028ad-3158-4f45-86e8-015fe89b9c1a.png#averageHue=%23f9f0ee&clientId=u9ed35bd0-e38e-4&from=paste&id=uc731f424&originHeight=402&originWidth=661&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue75ee83c-a262-4b4d-9925-ecdc4266373&title=)

#### 3.2.4 Go—转到下一步（结束断点）

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705580-7280417b-0d42-4526-8250-597a0e666ed1.png#averageHue=%23dec98c&clientId=u9ed35bd0-e38e-4&from=paste&id=ufbe1422a&originHeight=542&originWidth=655&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc4cefaa2-03af-4c01-95db-eee2c73dcf9&title=)

#### 3.2.5 Stream—流模式

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705759-7e11f682-ee3e-44b9-8cad-bf90e4fbefa2.png#averageHue=%23faeeed&clientId=u9ed35bd0-e38e-4&from=paste&id=uc82dbf1b&originHeight=416&originWidth=672&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud58cb3d3-1fda-43b0-8135-166cc2b778a&title=)

#### 3.2.6 Decode—解码

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705807-d1f54794-6d7a-4832-8007-dba09ecafc80.png#averageHue=%23ebdca3&clientId=u9ed35bd0-e38e-4&from=paste&id=ube5b7d0e&originHeight=434&originWidth=591&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u18b0eab5-3576-4f9f-ac0e-8e6afe6f0a4&title=)

#### 3.2.7 Keep Sessions—保持回话

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018705963-90bbdf62-6219-4067-9896-7d1f759a7695.png#averageHue=%23faf4f4&clientId=u9ed35bd0-e38e-4&from=paste&id=uedf9fcdb&originHeight=309&originWidth=494&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u0ba17749-5e8c-40d7-a301-f1987d142d7&title=)

#### 3.2.8 Pick target—选择捕获对象

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018706004-9ba31f91-1489-4822-a20e-c090ccdeec7f.png#averageHue=%23fbf9f9&clientId=u9ed35bd0-e38e-4&from=paste&id=u52ead222&originHeight=317&originWidth=578&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua8f19cac-1307-465a-9b0c-b245ea63494&title=)
![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018706079-76066c22-af81-4c54-b9fa-0cdf7fd3b916.png#averageHue=%23faf8d3&clientId=u9ed35bd0-e38e-4&from=paste&id=uf85b970f&originHeight=361&originWidth=615&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uc317ee5d-378d-4720-9266-b4fd4083f67&title=)

#### 3.2.9 Find 查找—Save 保存

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018706272-ee6a0be6-2e4b-41c6-9776-43dbbca5b49a.png#averageHue=%23f7f2f2&clientId=u9ed35bd0-e38e-4&from=paste&id=ua79f985d&originHeight=500&originWidth=811&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u927ef754-603b-4258-afab-d161cd14aed&title=)

#### 3.2.10 浏览器快捷方式

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018706282-8756dc3a-2b55-467c-836b-6e4e83b4f7be.png#averageHue=%23fcf8f8&clientId=u9ed35bd0-e38e-4&from=paste&id=u9ebc834a&originHeight=382&originWidth=607&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1cad08da-547e-425c-8380-6adf7dc7b03&title=)

#### 3.2.11 TextWizard—文本编码解码器

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018706398-b5b0e11d-8eea-4fed-91c2-d03e9cce5371.png#averageHue=%23e2c583&clientId=u9ed35bd0-e38e-4&from=paste&id=u4bd61447&originHeight=608&originWidth=900&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u23da6969-48d5-4793-9804-acc0e64311d&title=)

### 3.3 监控面板（回话列表）

#### 3.3.1 字段含义

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018706452-a4c284d1-8f5e-4e29-8661-0281e5611dc9.png#averageHue=%23fbf2f1&clientId=u9ed35bd0-e38e-4&from=paste&id=u20cdb41f&originHeight=433&originWidth=781&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u13d62c85-8706-4feb-89ba-33b73cd5097&title=)

#### 3.3.2 添加 IP 列

参考链接：[Fiddler 显示服务器 ip 地址列](https://blog.csdn.net/qiqizhiyun/article/details/52385717)

- 点击菜单栏 rules——customize rules...
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018706564-a339ed6d-1065-4c17-b4c4-ad130f73432f.png#averageHue=%23f2edeb&clientId=u9ed35bd0-e38e-4&from=paste&id=u5fd7f4d8&originHeight=329&originWidth=465&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue59e710e-3504-4e42-b7ba-3e612b97142&title=)
- ctrl+f 搜索 static function main
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018706683-24fbe564-90ec-49fc-a090-723bf40f9f40.png#averageHue=%23f7f1ef&clientId=u9ed35bd0-e38e-4&from=paste&id=ufbd87298&originHeight=395&originWidth=664&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud3f3ae21-9a0a-4755-8941-247e580421b&title=)
- 在 main 函数里加入下面一行代码，调用 fiddlerUI 函数，显示 ip 地址列 FiddlerObject.UI.lvSessions.AddBoundColumn("IP 地址",120,"X-HostIP");
- 保存后关闭，重启 Fiddler 即可
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018706757-b4d1a7ee-7821-4e7e-8cd3-8049a3d376ba.png#averageHue=%23fbf9f8&clientId=u9ed35bd0-e38e-4&from=paste&id=uf056bc30&originHeight=288&originWidth=637&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud7970afd-3918-4b7b-83b5-14b15448559&title=)

#### 3.3.3 添加响应时间列

- 点击菜单栏 rules——customize rules...
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018707120-7ec3232e-d0a4-42ab-a740-5242eb0a8ef9.png#averageHue=%23f2edeb&clientId=u9ed35bd0-e38e-4&from=paste&id=u6cea04f4&originHeight=329&originWidth=465&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4c49f400-44c0-44e2-adb8-4d7c9d995b8&title=)
- 找到 class Handlers，并在其中添加下面代码
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018707227-10e585eb-8b5d-417d-b950-182fb53bd30e.png#averageHue=%23fdf8f7&clientId=u9ed35bd0-e38e-4&from=paste&id=u0637d1a7&originHeight=438&originWidth=785&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u8e5f5ae6-e94f-48d3-97e9-366c1698bb6&title=)function BeginRequestTime(oS: Session) { if (oS.Timers != null) { return oS.Timers.ClientBeginRequest.ToString(); } return String.Empty; } public static BindUIColumn("响应时间") function CalcTimingCol(oS: Session){ var sResult = String.Empty; if ((oS.Timers.ServerDoneResponse > oS.Timers.ClientDoneRequest)) { sResult = (oS.Timers.ServerDoneResponse - oS.Timers.ClientDoneRequest).ToString(); } return sResult; }
- 保存后退出，重启后即可。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018707420-af32c251-2d6c-40d2-a6ad-20bdfaf1218b.png#averageHue=%23faf8f6&clientId=u9ed35bd0-e38e-4&from=paste&id=ufe80de74&originHeight=374&originWidth=580&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3456b3d5-e2c8-4aeb-a58a-6198799d509&title=)

### 3.4 辅助标签（工具）

#### 3.4.1 Statistics—统计数据

- 代表详细的数据，具体参考：[这是一个链接](https://blog.csdn.net/qq_33250158/article/details/99640810)
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018707346-f7c93e1a-0dec-42ea-ac08-7c99f44b6d0b.png#averageHue=%23ebf5fd&clientId=u9ed35bd0-e38e-4&from=paste&id=u596dd3eb&originHeight=488&originWidth=699&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u43050906-2cce-43b9-bece-c5da0523ab1&title=)

#### 3.4.2 Inspector—检查器

- 可以理解为请求、响应的详细信息。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018707506-b3e6ef2f-1758-44f0-abb4-42102f78034e.png#averageHue=%23b7e8dc&clientId=u9ed35bd0-e38e-4&from=paste&id=uf8721133&originHeight=536&originWidth=952&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u4565e035-86ca-42c1-ac4d-8acd8cd8d80&title=)

#### 3.4.3 AutoResponder—自动响应器（重要）

含义：可以用于拦截某一个请求，进行如下操作：（1）重定向到本地资源（2）使用 Fiddler 内置响应（3）自定义响应

- 实例一：将网站中的图片请求设置内置响应 403。原本的图片如下：
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018707572-feafebc3-3834-4cd3-9bd4-70d8dad278ff.png#averageHue=%23d7dedb&clientId=u9ed35bd0-e38e-4&from=paste&id=ubfc3c74e&originHeight=351&originWidth=439&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u072eb5bf-c341-4a7a-9cb7-6f341de9c11&title=)
  在自动响应器中添加规则，请求匹配中填写图片链接，响应这里选择内置的 403 即可。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018707689-179300c0-6742-4dc7-b951-e2a5f3f8aecb.png#averageHue=%23faf5f4&clientId=u9ed35bd0-e38e-4&from=paste&id=u166b0700&originHeight=514&originWidth=836&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3dd24c4a-2dfd-4e67-a7bb-72553680631&title=)
  再次请求页面，图片加载失败。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018707744-7635a6ae-e067-45eb-ae29-066b29948387.png#averageHue=%2395bb97&clientId=u9ed35bd0-e38e-4&from=paste&id=uefaf5ce1&originHeight=311&originWidth=450&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u9f7d3ed1-2d3e-45ad-a45e-9e18631842a&title=)
- 除了使用内置响应，也可以使用本地文件。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018707913-78fa8f64-678d-4b2b-8467-2bd770ab6968.png#averageHue=%23fbf9f7&clientId=u9ed35bd0-e38e-4&from=paste&id=u62c2665c&originHeight=348&originWidth=644&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u7c02c671-1f60-4282-a81c-8178535cd25&title=)
- 还可以通过点击 Edit Response 来自定义响应。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708016-2963d9a2-c263-497e-b190-f059fa5f97d0.png#averageHue=%23f9f6f4&clientId=u9ed35bd0-e38e-4&from=paste&id=u06bdadc4&originHeight=414&originWidth=578&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u2e3e7ac6-bf71-4174-8b59-9315050fb40&title=)

在实际工作中，我们可以使用自动响应器来做以下工作：
（1）Web 调试：在相关接口未开发完事，使用作为调试
（2）Mock 测试：自定义响应，从而不影响实际的数据，例如有时在生产环境中不能产生脏数据。
（3）极端测试：例如自定义某个请求的响应为空，去查看前端界面的展示。

#### 3.4.3 Composer—设计器（重要）

功能为设计请求,即为模拟请求发送。可以认为一个简单的接口测试工具，例如 Postman 功能。

- 自定义请求并发送
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708032-4af37fba-29c6-457a-8079-6d652d53573b.png#averageHue=%23eee6e6&clientId=u9ed35bd0-e38e-4&from=paste&id=u075c5f13&originHeight=420&originWidth=665&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=uffd49172-afb3-430a-b518-f00f3fad100&title=)
- 修改请求并发送—类似于接口测试。在 Fiddler 捕获到请求后，将要进行测试的接口拖动到 Composer 中，修改参数，点击发送就达到接口测试的效果了。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708208-1d619fe7-1b0b-4ee3-9e1b-8605c4c7ed39.png#averageHue=%23ece8e4&clientId=u9ed35bd0-e38e-4&from=paste&id=ucbeb659a&originHeight=547&originWidth=1011&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue63c89d1-4d3b-4c0a-9281-1a37ee06f44&title=)

#### 3.4.4 Filter—过滤器

- 用于对请求过滤，具体自己实际试一下即可。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708217-7a027291-76e1-4371-8197-3c3788839cd4.png#averageHue=%23f7f3f3&clientId=u9ed35bd0-e38e-4&from=paste&id=u7b7f4084&originHeight=506&originWidth=780&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ua2046995-0df6-45a6-b5f8-118bca05b9b&title=)
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708322-b13a6184-d5ef-4fc5-9629-6c4397958596.png#averageHue=%23f7f2f1&clientId=u9ed35bd0-e38e-4&from=paste&id=ua453d6bd&originHeight=196&originWidth=508&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u69a28c47-2f7a-4271-ad36-07557850843&title=)
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708433-4f1d3351-6bbf-498b-82ed-b77043cf69af.png#averageHue=%23f6f0ef&clientId=u9ed35bd0-e38e-4&from=paste&id=ud73ad419&originHeight=243&originWidth=526&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u19d6dda9-3480-483f-9583-dc0a483be98&title=)

### 3.5 命令行+状态栏

#### 3.5.1 QuickExec—命令行

- 官方给出的命令教程：[这个是一个教程](https://docs.telerik.com/fiddler/knowledgebase/quickexec)
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708426-edc33942-82a5-4b4b-8365-67d9efe510d5.png#averageHue=%23efe9e9&clientId=u9ed35bd0-e38e-4&from=paste&id=uf3ef8a2c&originHeight=317&originWidth=617&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u549a1212-83e2-4f39-9a10-b4ed93bb56a&title=)

#### 3.5.2 请求前断点 & 响应后断点

- 请求前断点：请求从客户端发出，但是未发送到服务器
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708661-ebafb37e-279a-4c9d-8d57-eb32a07a3c8b.png#averageHue=%23f0f414&clientId=u9ed35bd0-e38e-4&from=paste&id=uf1030e7a&originHeight=546&originWidth=890&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u524fe026-1a32-4d90-9cf0-1424812cce2&title=)
- 响应后断点：响应从服务器发出，但是未到达客户端
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708736-0539eb46-02eb-4d8d-8724-29dc07990316.png#averageHue=%23edeb25&clientId=u9ed35bd0-e38e-4&from=paste&id=uc0f4a113&originHeight=407&originWidth=845&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue187135d-6d53-427f-9d02-d9c52d8265e&title=)

#### 3.5.3 捕获

![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708746-b4b506d0-7ff1-4025-b717-28a9c34f5a83.png#averageHue=%23eee6e4&clientId=u9ed35bd0-e38e-4&from=paste&id=u5cb97356&originHeight=326&originWidth=642&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u135357eb-446b-42b8-97ea-174c9cee6d3&title=)

### 3.6 其他内容

#### 3.6.1 断点应用

断点可以分为全局断点和局部断点。全局断点又可以分为请求前断点和响应后断点。之前点击命令行下的位置就是全局断点。

- 全局断点—请求前断点：可以在请求到达服务器之前，进行数据篡改。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708757-ba0e3d3f-187e-41b9-b386-a83561ecb632.png#averageHue=%23c1d45f&clientId=u9ed35bd0-e38e-4&from=paste&id=u9f267517&originHeight=386&originWidth=794&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u11b6033f-e87d-4eba-bc35-29c62f085de&title=)
- 全局断点—响应后断点。与请求前断点道理一样，可以修改响应结果，然后返回响应。这里还可以使用响应后断点模拟网络中断，打了断点之后，客户端迟迟收不到服务器的响应，就类似网络中断了,然后由于客户端的超时机制，查看显示是否友好。
- 局部断点—通过命令完成局部断点请求前断点：bpu 匹配内容 响应后断点：bpafter 匹配内容 ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018708838-3cffb028-c8ee-4f73-a183-a7d6f364b847.png#averageHue=%23e2dbd7&clientId=u9ed35bd0-e38e-4&from=paste&id=u2ea93cae&originHeight=283&originWidth=582&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u3d63b103-bafe-4c0f-82dd-4d4df236cb6&title=)
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018709070-b13dda95-8f91-44f1-9941-f9bb44d97e3d.png#averageHue=%23e0dbd8&clientId=u9ed35bd0-e38e-4&from=paste&id=ub5037071&originHeight=237&originWidth=538&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u1698413b-fc11-405f-ae60-644df314592&title=)

#### 3.6.2 弱网测试

弱网测试：就是模拟网络限速的情况下，请求及响应的情况。参考链接：[弱网测试](https://www.cnblogs.com/longronglang/p/9524889.html)

- 启动网络限速，打开 Fiddler，Rules->Performance->勾选 Simulate Modem Speeds
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018709159-d772fa66-a34e-4fe7-b1e9-dfab3f81de6d.png#averageHue=%23f3eeed&clientId=u9ed35bd0-e38e-4&from=paste&id=u5f208b35&originHeight=387&originWidth=595&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u31aa729e-ae5e-4040-ad9e-f889c5cd183&title=)
- 具体设置：Rules—>Cutomize Rules 打开 CustomRules.js 文档
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018709242-fc90a468-5e29-4af6-9bf3-ae1f5f12ae24.png#averageHue=%23efe9e6&clientId=u9ed35bd0-e38e-4&from=paste&id=uf3147b72&originHeight=256&originWidth=411&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud7315431-9f87-4f91-9843-d62f9a2e08e&title=)
- 搜索 m_SimulateModem。
  ![](https://cdn.nlark.com/yuque/0/2023/png/2621802/1680018709338-2b6be1fb-8592-48a0-9e55-0998f1bf2fba.png#averageHue=%23f7efee&clientId=u9ed35bd0-e38e-4&from=paste&id=u0ca07c17&originHeight=424&originWidth=733&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ud8aaf03d-c119-436f-84af-3e511f668bf&title=)

## 四、写在最后

Fiddler：从抓包到入狱,。抓包抓的好，牢饭吃的饱。请谨慎使用。
