---
title: WebSocket ｜概念、原理、用法及实践
order: 1
---

::: warning 文章非原创
作者：禾味

来源：https://juejin.cn/post/7086021621542027271

注意：个人学习使用，会对原文进行修改批注

:::

# WebSocket ｜概念、原理、用法及实践 ✨✨

## 一、WHY：为什么需要 WebSocket？

在 WebSocket 出现之前，如果我们想实现实时通信，比较常采用的方式是 Ajax 轮询，即在特定时间间隔（比如每秒）由浏览器发出请求，服务器返回最新的数据。这样子的轮询方式有什么缺陷呢？

- HTTP 请求一般包含的**头部信息比较多**，其中**有效的数据可能只占很小的一部分**，**导致带宽浪费**；
- 服务器被动接收浏览器的请求然后响应，数据没有更新时仍然要接收并处理请求，导致**服务器 CPU 占用**；

WebSocket 的出现可以对应解决上述问题：

- WebSocket 的**头部信息少**，通常只有 2Bytes 左右，能节省带宽；
- WebSocket **支持服务端主动推送消息**，更好地支持实时通信；

比如以下场景，都可以使用 WebSocket：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdd15392198349649e3d9552bfc863d1~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) （图片截取自 aliyun 网站）

![use.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3937d8d360f4cb9a61ced638b026210~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) （WebSocket 兼容性）

## 二、WHAT：WebSocket 是什么？

WebSocket 是**基于 `TCP` 的一种新的应用层网络协议**。它实现了浏览器与服务器**全双工通信**，即**允许服务器主动发送信息给客户端**。

因此，在 WebSocket 中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并**进行双向数据传输**，客户端和服务器之间的数据交换变得更加简单。

### 2.1、WebSocket 的特点

- 建立**在 `TCP` 协议之上**；
- **与 `HTTP` 协议有着良好的兼容性**：默认端口也是 80（ws） 和 443(wss，运行在 TLS 之上)，并且握手阶段采用 HTTP 协议；
- **较少的控制开销**：连接创建后，ws 客户端、服务端进行数据交换时，协议控制的数据包头部较小，而 HTTP 协议每次通信都需要携带完整的头部；
- 可以发送**文本**，也可以发送**二进制**数据；
- **没有同源限制**，客户端可以与任意服务器通信；
- 协议标识符是 ws（如果加密，则为 wss），服务器网址就是 URL；
- **支持扩展**：ws 协议定义了扩展，用户可以扩展协议，或者实现自定义的子协议（比如支持自定义压缩算法等）；

### 2.2、 WebSocket 与 HTTP、TCP

HTTP、WebSocket 等协议都是处于 OSI 模型的最高层：应用层。而 IP 协议工作在网络层，TCP 协议工作在传输层。

`HTTP、WebSocket` 等应用层协议，都是**基于 `TCP` 协议来传输数据**的，因此其连接和断开，都要遵循 TCP 协议中的三次握手和四次挥手 ，只是在连接之后发送的内容不同，或者是断开的时间不同。

### 2.3、 HTML5 与 WebSocket

WebSocket API 是 HTML5 标准的一部分， 但这并不代表 WebSocket 一定要用在 HTML 中，或者只能在基于浏览器的应用程序中使用。 实际上，许多语言、框架和服务器都提供了 WebSocket 支持，例如：

- 基于 C 的 libwebsocket.org
- 基于 Node.js 的 Socket.io
- 基于 Python 的 ws4py
- 基于 C++ 的 WebSocket++
- Apache 对 WebSocket 的支持：Apache Module mod_proxy_wstunnel
- Nginx 对 WebSockets 的支持：NGINX as a WebSockets Proxy 、 NGINX Announces Support for WebSocket Protocol 、WebSocket proxying

## 三、WebSocket 原理

### 3.1、如何建立连接

在 WebSocket 开始通信之前，通信双方需要先进行握手，**`WebSocket` 复用了 HTTP 的握手通道**，即客户端通过 HTTP 请求与 WebSocket 服务端协商升级协议。协议升级完成后，后续的数据交换则遵照 WebSocket 的协议。

**利用 HTTP 完成握手有什么好处呢？**

1. 让 WebSocket 和 HTTP 基础设备**兼容**（运行在 80 端口 或 443 端口）

2. 复用 HTTP 的 **`Upgrade` 机制**，完成升级协议的协商过程。

看个具体的请求（在网上找了个[在线测试](http://www.websocket-test.com/ 'http://www.websocket-test.com/')）：

![req.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c39abcd4ab5d41b897f19041d68f8c4a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?) 图中有`几个关键点`：

- `101` 状态码，表示**协议切换**；
- `Connection: Upgrade` 表示要**升级协议**；
- `Upgrade: websocket` 表示要**升级到 `websocket`** 协议；
- `Sec-WebSocket-Key`：与服务端响应头部的 Sec-WebSocket-Accept 是配套的，提供基本的防护，比如恶意的连接，或者无意的连接



> “配套”指的是：Sec-WebSocket-Accept 是根据请求头部的 Sec-WebSocket-Key 计算而来，计算过程大致为基于 SHA1 算法得到摘要并转成 base64 字符串。

图中的请求已经完成握手并正常工作了：

![succ.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/86bc6bfaea8043978cdcfbfe0a6556df~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

### 3.2、如何交换数据

具体的数据格式是怎么样的呢？WebSocket 的每条消息可能**会被切分成多个数据帧（最小单位）**。

发送端：会将消息**切割成多个帧**发送给接收端

接收端：接收消息帧，并将关联的帧**重新组装**成完整的消息。

看一个来自 MDN 上的示例：

```shell
Client: FIN=1, opcode=0x1, msg="hello"
Server: (process complete message immediately) Hi.

Client: FIN=0, opcode=0x1, msg="and a"
Server: (listening, newmessage containing text started)

Client: FIN=0, opcode=0x0, msg="happy new"
Server: (listening, payload concatenated to previous message)

Client: FIN=1, opcode=0x0, msg="year!"
Server: (process complete message) Happy new year to you too!
```

在该示例中，客户端向服务器发送了两条消息，第一个消息在单个帧中发送，而第二个消息跨三个帧发送。当 WebSocket 的接收方收到一个数据帧时，会根据 `FIN` 字段值来**判断是否收到消息的最后一个数据帧**。利用 FIN 和 Opcode，我们就可以实现跨帧发送消息。

其中 `Opcode` 表示操作码，它的可能值有：

- `0x1`，传输数据是文本；
- `0x2`，传输数据是二进制数据；
- `0x0`，表示该帧是一个延续帧（这意味着服务器应该将帧的数据连接到从该客户端接收到的最后一个帧）；
- `0x3-7`：保留的操作代码，用于后续定义的非控制帧；
- `0x8`：表示连接断开；
- `0x9`：表示这是一个心跳请求（ping）；
- `0xA`：表示这是一个心跳响应（pong）；
- `0xB-F`：保留的操作代码，用于后续定义的控制帧；

具体的数据帧格式大概长下面这样（从左到右，单位是比特）：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17468163b87e4bdeab3b6838caa2ddc5~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

具体看下每一个字段：

- `FIN`：1 个比特，值为 1 表示这是**消息的最后一帧**，为 0 则不是；
- `RSV1, RSV2, RSV3`：各占 1 个比特，一般情况下全为 0，非零值表示采用 **`WebSocket` 扩展**；
- `Mask`: 1 个比特，表示是否要对数据**进行掩码操作**；
- `Payload` length：**数据负载的长度**，单位是字节。为 7 位，或 7+16 位，或 1+64 位；
- `Masking-key`：0 或 4 字节（32 位），所有**从客户端传送到服务端的数据帧，数据都进行了掩码操作**，Mask 为 1，且携带了 4 字节的 Masking-key；如果 Mask 为 0，则没有 Masking-key；
- `Payload data`：具体数据；

### 3.3、如何维持连接

使用 WebSocket 进行通信，建立连接之后**怎么判断连接正常没有断开或者服务是否可用呢**？

通过**建立心跳机制**，所谓心跳机制，就是**定时发送一个数据包，让对方知道自己在线且正常工作**，确保通信有效。如果对方无法响应，便可以弃用旧连接，发起新的连接了。

需要重连的场景可能包括：网络问题或者机器故障导致连接断开、连接没断但不可用、连接对端服务不可用等等。

发送方 -> 接收方：`ping`。

接收方 -> 发送方：`pong`。

ping 、pong 的操作，对应的是 WebSocket 的两个控制帧，Opcode 分别是 `0x9、0xA`。比如说，WebSocket 服务端向客户端发送 ping：

```js
// ping
ws.ping()
// pong
ws.on('pong', () => {
  console.log('pong received')
})
```

客户端也可以发送：

```js
// 发送心跳包
ws.send('heart check')
// 接收响应
ws.onmessage = (e) => {
  const response = e.data
  if (response.message === 'connection alive') {
    // 重置计时器
  }
}
```

## 四、WebSocket 使用

### 4.1、如何建立连接

使用 WebSocket 时，通过其构造函数实例化：

```js
// 构造一个 webSocket 对象
const socket = new WebSocket('ws://localhost:8080')
// const socket = new WebSocket('wss://localhost:8080');

ws.onopen = function (evt) {
  console.log('Connection open ...')
  ws.send('Hello WebSockets!')
}

ws.onmessage = function (evt) {
  console.log('Received Message: ' + evt.data)
}

ws.onclose = function (evt) {
  console.log('Connection closed.')
}
```

实例化出来的对象包含以下属性：

![obj.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cb82a86afdd5461da8a264dee3b24d0b~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp?)

每个属性的具体含义如下：

- `binaryType`：使用二进制的数据类型连接；
- `bufferedAmount`（只读）：未发送至服务器的字节数；
- `extensions`（只读）：服务器选择的扩展；
- `onclose`：用于指定连接关闭后的回调函数；
- `onerror`：用于指定连接失败后的回调函数；
- `onmessage`：用于指定当从服务器接受到信息时的回调函数；
- `onopen`：用于指定连接成功后的回调函数；
- `protocol`（只读）：用于返回服务器端选中的子协议的名字；
- `readyState`（只读）：返回当前 WebSocket 的连接状态，共有 4 种状态：

> 1.  CONNECTING — 正在连接中，对应的值为 0；
> 2.  OPEN — 已经连接并且可以通讯，对应的值为 1；
> 3.  CLOSING — 连接正在关闭，对应的值为 2；
> 4.  CLOSED — 连接已关闭或者没有连接成功，对应的值为 3；

- `url`（只读）：返回值为当构造函数创建 WebSocket 实例对象时 URL 的绝对路径；

#### 主要方法：

- `close()`：**关闭** WebSocket 连接，如果连接已经关闭，则此方法不执行任何操作；
- `send(data)`：通过 WebSocket 连接传输至服务器的数据队列，并根据所需要传输的数据的大小来增加 `bufferedAmount` 的值；

#### 主要事件：

- `close`：当一个 WebSocket 连接被关闭时触发，也可以通过 onclose 属性来设置；
- `error`：当一个 WebSocket 连接因错误而关闭时触发，也可以通过 onerror 属性来设置；
- `message`：当通过 WebSocket 收到数据时触发，也可以通过 onmessage 属性来设置；
- `open`：当一个 WebSocket 连接成功时触发，也可以通过 onopen 属性来设置；

### 4.2、在项目中使用 WebSocket

以 Vue 项目为例，写个简单的实例：

```js
<script>
export default {
  data() {
    return {
      socket: null,
      aliveTime: new Date().getTime(),
      checkTimer: null
    }
  },
  computed: {
    token() {
      return this.$store.getters.token
    }
  },
  beforeDestroy() {
    clearInterval(this.checkTimer)
    this.socket && this.socket.close()
  },
  mounted() {
   if (this.socket && this.socket.readyState === 1) {
    clearInterval(this.checkTimer)
    this.socket.close()
   }
   if (this.socket && this.socket.readyState === 3) {
      this.initWebSocket()
   }
   this.getData()
  },
  methods: {
    getData() {
      // ......
      this.initWebSocket()
    }
    initWebSocket() {
      if (typeof WebSocket === 'undefined') {
        this.$message({ message: '您的浏览器不支持WebSocket' })
        return false
      }
      this.checkTimer && clearInterval(this.checkTimer)
      this.socket && this.socket.close()
      this.aliveTime = new Date().getTime()
      const token = this.token.split('Bearer ')[1]
      const wsurl = `wss://${process.env.VUE_APP_DOMAIN}/ws?token=${token}`
      this.socket = new WebSocket(wsurl)
      this.socket.onmessage = this.websocketonmessage
      this.socket.onerror = this.websocketonerror
      this.checkTimer = setInterval(this.checkWebsocketAlive, 5 * 1000)
    },
    websocketonmessage(e) {
      const response = JSON.parse(e.data)
      if (response.message === 'success') {
        const data = response.data
        // 处理 data
      }
      // 这里的场景是服务端主动推数据，接收到消息说明连接正常
      if (response.message === 'connection alive') {
        this.aliveTime = new Date().getTime()
      }
    },
    websocketonerror() {
      clearInterval(this.checkTimer)
      this.leftSocket.close()
    },
    checkWebsocketAlive() {
      const now = new Date().getTime()
      if (now - this.aliveTime > 60 * 1000) {
        this.aliveTime = now
        this.initWebSocket()
      }
    },
  }
}
</script>
```
