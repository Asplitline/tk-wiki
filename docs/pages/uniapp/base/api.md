---
title: 通用Api
order: 3
---

# 网络

## uni.request(object)

发起网络请求

### object 对象说明

| 参数名            | 必填   | 说明                                             |
| :---------------- | :----- | :----------------------------------------------- |
| `url`             | **是** | 开发者服务器**接口地址**                         |
| `data`            | 否     | **请求参数**                                     |
| `header`          | 否     | **请求 `header`**，header 中不能设置 Referer     |
| `method`          | 否     | **请求类型**，必须**大写**                       |
| `timeout`         | 否     | **超时时间**，单位 `ms`                          |
| `dataType`        | 否     | 默认为 _json_：会对返回的数据做一次 `JSON.parse` |
| `responseType`    | 否     | 设置**响应数据类型**。合法值：text、arraybuffer  |
| `sslVerify`       | 否     | 验证 `ssl` 证书                                  |
| `withCredentials` | 否     | **跨域**请求时**是否携带凭证**（cookies）        |
| `firstIpv4`       | 否     | DNS 解析时优先使用`ipv4`                         |
| `success`         | 否     | 成功回调函数                                     |
| `fail`            | 否     | 失败回调函数                                     |
| `complete`        | 否     | 结束回调函数（调用成功、失败都会执行）           |

### success 返回参数

| 参数         | 类型                      | 说明                                   |
| :----------- | :------------------------ | :------------------------------------- |
| `data`       | Object/String/ArrayBuffer | 服务器返回**数据**                     |
| `statusCode` | Number                    | 服务器返回 **`HTTP` 状态码**           |
| `header`     | Object                    | 服务器返回 `HTTP Response Header`      |
| `cookies`    | `Array.<string>`          | 服务器返回 `cookies`，格式为字符串数组 |

_data 数据说明_

如果`data`不是`String`，会被转为 `String`

- `GET` 方法：会将数据转换为 query string。
  - `{ name: 'name', age: 18 }` =》 `name=name&age=18`。
- `POST` 方法
  - `header['content-type']` 为 `application/json` ，会进行 `JSON` 序列化。
  - `header['content-type']` 为 `application/x-www-form-urlencoded` ，会将数据转换为 `query string`

### requestTask

通过`requestTask`对象，可中断请求任务

> 必须传`sucess/fail/complete`参数中一个，如果不传，将会返回`Promise`对象

```js
var requestTask = uni.request({
  url: 'https://www.example.com/request', //仅为示例，并非真实接口地址。
  complete: () => {}
})
requestTask.abort()
```

| 方法                 | 说明                                                                               |
| :------------------- | :--------------------------------------------------------------------------------- |
| `abort`              | **中断**请求任务                                                                   |
| `offHeadersReceived` | **取消监听** `HTTP Response Header` 事件，仅`微信小程序平台`支持                   |
| `onHeadersReceived`  | **监听** `HTTP Response Header` 事件。会比请求完成事件更早，仅`微信小程序平台`支持 |

### Tips

- 请求的 `header` 中 `content-type` 默认为 `application/json`。
- 避免在 `header` 中使用中文，或者使用 `encodeURIComponent` 进行编码，否则在百度小程序报错。
- 网络请求的 `超时时间` 可以统一在 `manifest.json` 中配置 [networkTimeout](https://uniapp.dcloud.io/collocation/manifest?id=networktimeout)。
- H5 端本地调试需注意跨域问题，参考：[调试跨域问题解决方案](https://ask.dcloud.net.cn/article/35267)
- 注意小程序端不支持自动保持 cookie，服务器应避免验证 cookie。如果服务器无法修改，通过[工具](https://github.com/charleslo1/weapp-cookie) 请求时带 cookie 并将响应 cookie 存本地
- 根据 W3C 规范，H5 端无法获取 response header 中 Set-Cookie、Set-Cookie2 这 2 个字段，对于跨域请求，允许获取的 response header 字段只限于“simple response header”和“Access-Control-Expose-Headers”（[详情](https://www.w3.org/TR/cors/#access-control-allow-credentials-response-header)）
- 低版本手机自身**不支持 `ipv6`**，如果服务器仅允许 ipv6，会导致老手机无法正常运行或访问速度非常慢
- 单次网络请求数据量建议控制在`50K`以下（仅指 json 数据，不含图片），过多数据应分页获取

## uni.uploadFile(OBJECT)

本地资源上传到开发者服务器，客户端发起一个 `POST` 请求，其中 `content-type` 为 `multipart/form-data`

**OBJECT 参数说明**

| 参数名     | 必填           | 说明                                                                     |
| :--------- | :------------- | :----------------------------------------------------------------------- |
| `url`      | **是**         | 开发者**服务器 `url`**                                                   |
| `files`    | 否             | 需要上传的**文件列表**。\*使用 `files` 时，`filePath` 和 `name` 不生效。 |
| `fileType` | 见平台差异说明 | 文件**类型**，image/video/audio                                          |
| `file`     | 否             | 要上传的**文件对象**                                                     |
| `filePath` | 是             | 要上传**文件资源路径**                                                   |
| `name`     | 是             | 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容   |
| header     | 否             | HTTP 请求 Header, header 中不能设置 Referer。                            |
| timeout    | 否             | 超时时间，单位 ms                                                        |
| formData   | 否             | HTTP 请求中其他额外的 form data                                          |
| success    | 否             | 接口调用成功的回调函数                                                   |
| fail       | 否             | 接口调用失败的回调函数                                                   |
| complete   | 否             | 接口调用结束的回调函数（调用成功、失败都会执行）                         |

# 路由与页面跳转

| 函数                                                                                      | 说明                                                     |
| ----------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| [`uni.navigateTo`(OBJECT)](https://uniapp.dcloud.io/api/router?id=navigateto)             | **保留**当前页面，**跳转**到某个页面                     |
| [`uni.redirectTo`(OBJECT)](https://uniapp.dcloud.io/api/router?id=redirectto)             | **关闭**当前页面，**跳转**到某个页面                     |
| [`uni.reLaunch`(OBJECT)](https://uniapp.dcloud.io/api/router?id=relaunch)                 | **关闭所有**页面，**打开**某个页面                       |
| [`uni.switchTab`(OBJECT)](https://uniapp.dcloud.io/api/router?id=switchtab)               | **跳转到 `tabBar`** 页面，并**关闭所有非 `tabBar`** 页面 |
| [`uni.navigateBack`(OBJECT)](https://uniapp.dcloud.io/api/router?id=navigateback)         | **关闭**当前页面，**返回上一页面**或**多级页面**         |
| [`uni.preloadPage`(OBJECT)](https://uniapp.dcloud.io/api/preload-page?id=preloadpage)     | **预加载**页面                                           |
| [`uni.unPreloadPage`(OBJECT)](https://uniapp.dcloud.io/api/preload-page?id=unpreloadpage) | **取消预载**页面                                         |

## uni.navigateTo

**保留**当前页面，**跳转**到某个页面

| 参数                | 类型     | 必填   | 默认值 | 说明                                                                         |
| :------------------ | :------- | :----- | :----- | :--------------------------------------------------------------------------- |
| `url`               | String   | **是** |        | 应用内**非 `tabBar` 的页面的路径** , 路径后可以带参数                        |
| `animationType`     | String   | 否     | pop-in | 窗口显示的**动画效果**                                                       |
| `animationDuration` | Number   | 否     | 300    | 窗口**动画持续时间**(`ms`)                                                   |
| `events`            | Object   | 否     |        | 页面间**通信接口**，监听**被打开**页面发送**到当前页面**的**数据**。_2.8.9+_ |
| `success`           | Function | 否     |        | **成功**的回调函数                                                           |
| `fail`              | Function | 否     |        | **失败**的回调函数                                                           |
| `complete`          | Function | 否     |        | **结束**的回调函数（调用成功、失败都会执行）                                 |

### url

参数与路径之间使用`?`分隔，参数键与参数值用`=`相连，不同参数用`&`分隔

> 如`path?key=value&key2=value2`，下一个页面的`onLoad`函数**可得到传递的参数**

```js
//在起始页面跳转并传递参数
uni.navigateTo({
  url: 'test?id=1&name=uniapp'
})
```

```js
// 接受参数
export default {
  onLoad: function (option) {
    //option为object类型，会序列化上个页面传递的参数
    console.log(option.id)
    console.log(option.name)
  }
}
```

**`url`有长度限制**，太长的字符串会传递失败，可改用[窗体通信](https://uniapp.dcloud.io/collocation/frame/communication)、[全局变量](https://ask.dcloud.net.cn/article/35021)，

参数中**出现空格等特殊字符**时需要对参数进行编码

```js
<navigator :url="'/pages/test/test?item='+ encodeURIComponent(JSON.stringify(item))"></navigator>
```

```js
// 在test.vue页面接受参数
onLoad: function (option) {
    const item = JSON.parse(decodeURIComponent(option.item));
}
```

### event

```js
// 2.8.9+ 支持
uni.navigateTo({
  url: 'pages/test?id=1',
  events: {
    // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
    acceptDataFromOpenedPage: function(data) {
      console.log(data)
    },
    someEvent: function(data) {
      console.log(data)
    }
    ...
  },
  success: function(res) {
    // 通过eventChannel向被打开页面传送数据
    res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
  }
})
```

```js
// uni.navigateTo 目标页面 pages/test.vue
onLoad: function(option) {
  console.log(option.query)
  const eventChannel = this.getOpenerEventChannel()
  eventChannel.emit('acceptDataFromOpenedPage', {data: 'test'});
  eventChannel.emit('someEvent', {data: 'test'});
  // 监听acceptDataFromOpenerPage事件，获取上一页面通过eventChannel传送到当前页面的数据
  eventChannel.on('acceptDataFromOpenerPage', function(data) {
    console.log(data)
  })
}
```

### Tips

- 页面跳转路径**有层级限制**，不能无限制跳转新页面
- 跳转到 `tabBar` 页面**只能使用** `switchTab` 跳转
- **目标页面必须**是在`pages.json`里**注册**的 vue 页面
- 打开`web url`
  - App 平台，使用 [plus.runtime.openURL](http://www.html5plus.org/doc/zh_cn/runtime.html#plus.runtime.openURL)或`web-view`组件
  - H5 平台，使用 `window.open`
  - 小程序平台，使用 web-view 组件（`url`需在联网白名单）

## uni.redirectTo

**关闭所有**页面，**打开**某个页面

| 参数       | 类型     | 必填   | 说明                                                 |
| :--------- | :------- | :----- | :--------------------------------------------------- |
| `url`      | String   | **是** | 应用内**非 `tabBar` 的页面路径**，路径后可以带参数。 |
| `success`  | Function | 否     | **成功**回调函数                                     |
| `fail`     | Function | 否     | **失败**回调函数                                     |
| `complete` | Function | 否     | **结束**回调函数（调用成功、失败都会执行）           |

**跳转到 `tabBar` 页面只能使用 `switchTab` 跳转**

## uni.reLaunch

**关闭所有**页面，**打开**某个页面

_参数同 `redirect`_

调用了 [`uni.preloadPage`(OBJECT)](https://uniapp.dcloud.net.cn/api/preload-page) 不会关闭，仅触发生命周期 `onHide`

**H5 端**

- 调用`uni.reLaunch`之前页面栈会销毁，但无法清空历史记录，`navigateBack`不能返回
- 存在历史记录，点击浏览器*返回按钮*或*调用`history.back()`*仍可以导航到其他历史记录

## uni.switchTab

**跳转到 `tabBar`** 页面，并**关闭所有非 `tabBar`** 页面

| 参数       | 类型     | 必填   | 说明                                                                                                       |
| :--------- | :------- | :----- | :--------------------------------------------------------------------------------------------------------- |
| `url`      | String   | **是** | 需要**跳转的 `tabBar` 页面的路径**（**需** pages.json 的 tabBar 字段**定义**的页面），路径后**不能带参数** |
| `success`  | Function | 否     | **成功**回调函数                                                                                           |
| `fail`     | Function | 否     | **失败**回调函数                                                                                           |
| `complete` | Function | 否     | **结束**回调函数（调用成功、失败都会执行）                                                                 |

调用了 [`uni.preloadPage`(OBJECT)](https://uniapp.dcloud.net.cn/api/preload-page) 不会关闭，仅触发生命周期 `onHide`

## uni.navigateBack

**关闭**当前页面，**返回上一页面**或**多级页面**。可通过 `getCurrentPages()` 获取当前的页面栈，决定需要返回几层。

| 参数                | 类型   | 必填 | 默认值  | 说明                                                          |
| :------------------ | :----- | :--- | :------ | :------------------------------------------------------------ |
| `delta`             | Number | 否   | 1       | **返回的页面数**，如果 d**elta 大于现有**页面数，**返回首页** |
| `animationType`     | String | 否   | pop-out | 窗口关闭的**动画效果**                                        |
| `animationDuration` | Number | 否   | 300     | 窗口关闭动画的**持续时间**（`ms`）                            |

`navigateTo` 跳转，**页面会入堆栈**，而 `redirectTo` **则不会**

```js
// A页面
uni.navigateTo({
  url: 'B?id=1'
})

// B页面
uni.navigateTo({
  url: 'C?id=1'
})

// C页面内 navigateBack，返回A页面
uni.navigateBack({
  delta: 2
})
```

### Tips

- `navigateTo`, `redirectTo` 只能打开非 tabBar 页面
- `switchTab` 只能打开 `tabBar` 页面
- `reLaunch` 可以打开任意页面
- 不能在 `App.vue` 里面进行页面跳转。
- H5 端页面刷新之后页面栈会消失，此时`navigateBack`不能返回，如果一定要返回可以使用`history.back()`导航到浏览器的其他历史记录。

## 窗口动画

窗口的显示/关闭动画效果，支持在 API、组件、pages.json 中配置，优先级为：`API = 组件 > pages.json`

> _仅 App 支持_。*小程序*自身不支持自定义动画。*H5*的窗体动画可使用常规单页动画处理方案，见[H5 下单页动画示例](https://ext.dcloud.net.cn/plugin?id=659&tdsourcetag=s_pctim_aiomsg)

### API

有效的路由 API

- `navigateTo`
- `navigateBack`

```js
uni.navigateTo({
  url: '../test/test',
  animationType: 'pop-in',
  animationDuration: 200
})
uni.navigateBack({
  delta: 1,
  animationType: 'pop-out',
  animationDuration: 200
})
```

### 组件

`open-type` 有效值

- `navigateTo`
- `navigateBack`

```vue
<navigator animation-type="pop-in" animation-duration="300" url="../test/test">navigator</navigator>
<navigator animation-type="pop-out" animation-duration="300" open-type="navigateBack">navigator</navigator>
```

### pages.json

`pages.json` 中配置的是**窗口显示**的动画

```js
"style": {
    "app-plus": {
        "animationType": "fade-in",
        "animationDuration": 300
    }
}
```

| 显示动画        | 关闭动画         | 显示动画描述（关闭动画与之相反）                         |
| :-------------- | :--------------- | :------------------------------------------------------- |
| slide-in-right  | slide-out-right  | 新窗体从**右**侧进入                                     |
| slide-in-left   | slide-out-left   | 新窗体从**左**侧进入                                     |
| slide-in-top    | slide-out-top    | 新窗体从**顶**部进入                                     |
| slide-in-bottom | slide-out-bottom | 新窗体从**底**部进入                                     |
| pop-in          | pop-out          | 新窗体从**左侧进入**，且**老窗体被挤压**而出             |
| fade-in         | fade-out         | 新窗体从**透明**到**不透明**逐渐显示                     |
| zoom-out        | zoom-in          | 新窗体从**小到大**缩放显示                               |
| zoom-fade-out   | zoom-fade-in     | 新窗体从**小到大**逐渐放大并且从**透明到不透明**逐渐显示 |
| none            | none             | 无动画                                                   |

- **纯 nvue 项目**（render 为 native）
  - 窗体动画默认进入动画为`pop-in`，返回为`pop-out`。
  - 如果想修改动画类型，**只能通过**`uni.navigateTo` API**修改**，在**组件**或**`pages.json`**里配**置动画类型无效**
- **非纯 nvue 项目**
  - App 端窗体动画，默认进入动画为`slider-in-right`，默认返回动画为`pop-out`
- webview 中**嵌入 uni-app H5**
  - 使用 `uni.webView.navigateTo`跳转页面
