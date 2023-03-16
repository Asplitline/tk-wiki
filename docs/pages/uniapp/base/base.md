---
outline: deep
title: 入门
order: 1
---

# 框架简介

## 开发规范

为了实现多端兼容，综合考虑编译速度、运行性能等因素，`uni-app` 约定了如下开发规范：

- **页面文件**：遵循 [Vue 单文件组件 (SFC) 规范](https://vue-loader.vuejs.org/zh/spec.html)
- **组件标签**：靠近小程序规范，详见[uni-app 组件规范](https://uniapp.dcloud.io/component/README)
- **接口能力**：（JS API）靠近微信小程序规范，但需将前缀 `wx` 替换为 `uni`，详见[uni-app 接口规范](https://uniapp.dcloud.io/api/README)
- **数据绑定及事件处理**：同 `Vue.js` 规范，同时补充了 App 及页面的生命周期
- 为兼容多端运行，_建议使用 flex 布局进行开发_

## 目录结构

```shell
┌─uniCloud              云空间目录，阿里云为uniCloud-aliyun,腾讯云为uniCloud-tcb（详见uniCloud）
│─components            符合vue组件规范的uni-app组件目录
│  └─comp-a.vue         可复用的a组件
├─hybrid                App端存放本地html文件的目录，详见
├─platforms             存放各平台专用页面的目录，详见
├─pages                 业务页面文件存放的目录
│  ├─index
│  │  └─index.vue       index页面
│  └─list
│     └─list.vue        list页面
├─static                存放应用引用的本地静态资源（如图片、视频等）的目录，注意：静态资源只能存放于此
├─uni_modules           存放[uni_module](/uni_modules)规范的插件。
├─wxcomponents          存放小程序组件的目录，详见
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 应用生命周期
├─manifest.json         配置应用名称、appid、logo、版本等打包信息，详见
└─pages.json            配置页面路由、导航条、选项卡等页面类信息，详见
```

_Tips_

- 编译到任意平台时，`static` 目录下的文件均会被完整打包进去，且不会编译。非 `static` 目录下的文件（vue、js、css 等）只有*被引用到才会被打包*编译进去。
- `static` 目录下的 `js` 文件不会被编译，如果里面有 `es6` 的代码，不经过转换直接运行，在手机设备上会报错。
- `css`、`less/scss` 等资源不要放在 `static` 目录下，建议这些公用的资源放在自建的 `common` 目录下。
- HbuilderX 1.9.0+ 支持在根目录创建 `ext.json`、`sitemap.json` 等小程序需要的文件。

## 资源路径

### 静态资源

```html
<!-- 绝对路径，/static指根目录下的static目录，在cli项目中/static指src目录下的static目录 -->
<image class="logo" src="/static/logo.png"></image>
<image class="logo" src="@/static/logo.png"></image>
<!-- 相对路径 -->
<image class="logo" src="../../static/logo.png"></image>
```

- `@`开头的绝对路径以及相对路径会经过 base64 转换规则校验
- 引入的静态资源在非 h5 平台，均不转为 base64。H5 平台，小于 4kb 的资源会被转换成 base64，其余不转。
- 自`HBuilderX 2.6.6`起`template`内支持`@`开头路径引入静态资源，旧版本不支持此方式
- App 平台自`HBuilderX 2.6.9`起`template`节点中引用静态资源文件时（如：图片），调整查找策略为【基于当前文件的路径搜索】，与其他平台保持一致
- 支付宝小程序组件内 image 标签不可使用相对路径

### js 文件引入

```js
// 绝对路径，@指向项目根目录，在cli项目中@指向src目录
import add from '@/common/add.js'
// 相对路径
import add from '../../common/add.js'
```

- js 文件不支持使用`/`开头的方式引入

### css 文件引入

```css
/* 绝对路径 */
@import url('/common/uni.css');
@import url('@/common/uni.css');
/* 相对路径 */
@import url('../../common/uni.css');
```

_Tips_

- 引入字体图标请参考，[字体图标](https://uniapp.dcloud.io/frame?id=字体图标)
- `@`开头的绝对路径以及相对路径会经过 base64 转换规则校验
- 不支持本地图片的平台，小于 40kb，一定会转 base64。（共四个平台`mp-weixin, mp-qq, mp-toutiao, app v2`）
- h5 平台，小于 4kb 会转 base64，超出 4kb 时不转。
- 其余平台不会转 base64

## 生命周期

### 应用生命周期

**应用生命周期仅可在`App.vue`中监听，在其它页面监听无效**

| 函数名                 | 说明                                                                                                            |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------- |
| `onLaunch`             | 当`uni-app` *初始化完成*时触发（全局只触发*一次*）                                                              |
| `onShow`               | 当 `uni-app` *启动*或*后台进入前台*                                                                             |
| `onHide`               | 当 `uni-app` _前台进入后台_                                                                                     |
| `onError`              | 当 `uni-app` 报错时触发                                                                                         |
| `onUniNViewMessage`    | 对 `nvue` 页面发送的数据进行监听，可参考 [nvue 向 vue 通讯](https://uniapp.dcloud.io/nvue-api?id=communication) |
| `onUnhandledRejection` | 对未处理的 Promise 拒绝事件监听函数（2.8.1+）                                                                   |
| `onPageNotFound`       | 页面不存在监听函数                                                                                              |
| `onThemeChange`        | 监听系统主题变化                                                                                                |

> `onlaunch`里进行页面跳转，如遇白屏报错，请参考https://ask.dcloud.net.cn/article/35942

### 页面生命周期

| 函数名                                | 说明                                                                                                                                       | 平台差异说明                                                    | 最低版本 |
| :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :------- |
| `onInit`                              | 监听**页面初始化\*\***<br />参数：同 `onLoad` 参数，_上个页面传递的数据_<br />参数类型： `Object`（用于页面传参），_触发时机早于 `onLoad`_ | 百度小程序                                                      | 3.1.0+   |
| `onLoad`                              | 监听**页面加载\*\***<br />参数：_上个页面传递的数据_<br />参数类型：`Object`（用于页面传参）                                               |                                                                 |          |
| `onShow`                              | 监听**页面显示**。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面                                                             |                                                                 |          |
| `onReady`                             | 监听**页面初次渲染完成**。注意如果渲染速度快，会在页面进入动画完成前触发                                                                   |                                                                 |          |
| `onHide`                              | 监听**页面隐藏**                                                                                                                           |                                                                 |          |
| `onUnload`                            | 监听页面卸载                                                                                                                               |                                                                 |          |
| `onResize`                            | 监听**窗口尺寸变化**                                                                                                                       | App、微信小程序                                                 |          |
| `onPullDownRefresh`                   | 监听**用户下拉动作**，用于下拉刷新                                                                                                         |                                                                 |          |
| `onReachBottom`                       | **页面滚动到底部**的事件（不是 scroll-view 滚到底），常用于下拉下一页数据。                                                                |                                                                 |          |
| `onTabItemTap`                        | **点击 tab 时触发**，参数：`Object`                                                                                                        | 微信小程序、支付宝小程序、百度小程序、H5、App（自定义组件模式） |          |
| `onShareAppMessage`                   | 用户**点击右上角分享**                                                                                                                     | 微信小程序、百度小程序、字节跳动小程序、支付宝小程序            |          |
| `onPageScroll`                        | 监听**页面滚动**，参数：`Object`                                                                                                           | nvue 暂不支持                                                   |          |
| `onNavigationBarButtonTap`            | 监听**原生标题栏按钮点击**事件，参数：`Object`                                                                                             | App、H5                                                         |          |
| `onBackPress`                         | **监听页面返回**                                                                                                                           | app、H5、支付宝小程序                                           |          |
| `onNavigationBarSearchInputChanged`   | 监听**原生标题栏搜索输入框*输入内容***变化事件                                                                                             | App、H5                                                         | 1.6.0    |
| `onNavigationBarSearchInputConfirmed` | 监听**原生标题栏搜索输入框*搜索***事件，用户点击软键盘上的“搜索”按钮时触发。                                                               | App、H5                                                         | 1.6.0    |
| `onNavigationBarSearchInputClicked`   | 监听**原生标题栏搜索输入框*点击***事件                                                                                                     | App、H5                                                         | 1.6.0    |
| `onShareTimeline`                     | 监听用户点击**右上角转发**到朋友圈                                                                                                         | 微信小程序                                                      | 2.8.1+   |
| `onAddToFavorites`                    | 监听用户点击**右上角收藏**                                                                                                                 | 微信小程序                                                      | 2.8.1+   |

> 页面关闭时，只会触发 `onUnload`，不会触发`onHide`

#### `onInit`使用注意

- *仅百度小程序*基础库 _3.260_ 以上支持 `onInit` 生命周期
- 其他版本或平台可以同时使用 `onLoad` 生命周期进行兼容，注意避免重复执行相同逻辑
- *不依赖页面传参*的逻辑*可以直接使用 `created`* 生命周期替代

#### `onReachBottom`使用注意

- 可在`pages.json`里定义具体*页面底部的触发距离*[onReachBottomDistance](https://uniapp.dcloud.io/collocation/pages)

> 设为 50，滚动页面到距离底部 50px 时，就会触发`onReachBottom`事件。

- 使用 scroll-view 导致页面没有滚动，则触底事件不会被触发

#### `onPageScroll` 参数说明

| 属性        | 类型   | 说明                                  |
| ----------- | ------ | ------------------------------------- |
| `scrollTop` | Number | 页面在垂直方向已滚动的距离（单位 px） |

- **不要写交互复杂的**`js`，比如频繁修改页面。
  - 这个生命周期是在*渲染层*触发的，在*非 h5 端*，js 是在*逻辑层*执行的，两层之间通信是有损耗的。
  - 滚动中，频发触发两层数据交换，会造成卡顿
- **滚动时标题栏透明渐变**：在 App 和 H5 下，可在`pages.json`中配置`titleNView`下的`type`为`transparent`[参考](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview)。
- **滚动吸顶固定某些元素**：推荐 css 的*粘性布局*，参考[插件市场](https://ext.dcloud.net.cn/plugin?id=715)。
- App、微信小程序、H5，可以使用 wxs 监听滚动，[参考](https://uniapp.dcloud.io/frame?id=wxs)；
- app-nvue，可以使用 bindingx 监听滚动，[参考](https://uniapp.dcloud.io/nvue-api?id=nvue-里使用-bindingx)。
- `onBackPress`上**不可使用`async`**，会导致无法阻止默认返回

#### `onTabItemTap` 返回的 json 对象说明

```js
 {"index":0,"text":"首页","pagePath":"pages/index/index"}
```

| 属性       | 类型   | 说明                                   |
| ---------- | ------ | -------------------------------------- |
| `index`    | String | 被点击`tabItem`的**序号**，_从 0 开始_ |
| `pagePath` | String | 被点击`tabItem`的**页面路径**          |
| `text`     | String | 被点击`tabItem`的**按钮文字**          |

- `onTabItemTap`常用于点击当前`tabitem`，**滚动或刷新当前页面**。点击不同的`tabitem`，一定会触发页面切换。
- **App 端实现点击`tabitem`不跳转页面**，不能使用`onTabItemTap`，可以使用[`plus.nativeObj.view`](http://www.html5plus.org/doc/zh_cn/nativeobj.html)放一个区块*盖住原先的`tabitem`*，并拦截点击事件。
- 支付宝小程序平台`onTabItemTap`：表现为**点击非当前 tabitem 后触发**，因此不能用于实现点击返回顶部这种操作

#### `onNavigationBarButtonTap` 参数说明

| 属性    | 类型   | 说明                         |
| ------- | ------ | ---------------------------- |
| `index` | Number | 原生标题栏**按钮数组的下标** |

```js
onNavigationBarButtonTap : function (e) {
    console.log(e);
    // e的返回格式为json对象：{"text":"测试","index":0}
}
```

#### `onBackPress` 回调参数对象说明

```js
event = {from:backbutton、 navigateBack}
```

| 属性   | 类型   | 说明                                                                                                                                                         |
| ------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `from` | String | 触发返回行为的来源：<br />'`backbutton`'：左上角导航栏按钮及安卓返回键；<br />'`navigateBack`：`uni.navigateBack()` 方法。**支付宝小程序端不支持返回此字段** |

> 支付宝小程序真机可以监听到非`navigateBack`引发的返回事件（使用小程序开发工具时不会触发`onBackPress`），不可以阻止默认返回行为

### 组件生命周期

| 函数名          | 说明                                                                                                                                                                                                                        | 平台差异说明   | 最低版本 |
| :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- | :------- |
| `beforeCreate`  | 在**实例初始化**之后被调用。[详见](https://cn.vuejs.org/v2/api/#beforeCreate)                                                                                                                                               |                |          |
| `created`       | 在实例**创建完成后**被立即调用。[详见](https://cn.vuejs.org/v2/api/#created)                                                                                                                                                |                |          |
| `beforeMount`   | 在**挂载开始之前**被调用。[详见](https://cn.vuejs.org/v2/api/#beforeMount)                                                                                                                                                  |                |          |
| `mounted`       | **挂载到实例之后**调用。[详见](https://cn.vuejs.org/v2/api/#mounted) 注意：此处并不能确定子组件被全部挂载，如果需要子组件完全挂载之后在执行操作可以使用`$nextTick`[Vue 官方文档](https://cn.vuejs.org/v2/api/#Vue-nextTick) |                |          |
| `beforeUpdate`  | **数据更新**时调用，发生在**虚拟 DOM 打补丁之前**。[详见](https://cn.vuejs.org/v2/api/#beforeUpdate)                                                                                                                        | 仅 H5 平台支持 |          |
| `updated`       | 由于数据更改导致的**虚拟 DOM 重新渲染和打补丁，在这之后**会调用该钩子。[详见](https://cn.vuejs.org/v2/api/#updated)                                                                                                         | 仅 H5 平台支持 |          |
| `beforeDestroy` | **实例销毁之前**调用。在这一步，实例仍然完全可用。[详见](https://cn.vuejs.org/v2/api/#beforeDestroy)                                                                                                                        |                |          |
| `destroyed`     | Vue **实例销毁后**调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。[详见](https://cn.vuejs.org/v2/api/#destroyed)                                                          |                |          |

## 路由

`uni-app`页面路由为框架统一管理，开发者需要在[pages.json](https://uniapp.dcloud.io/collocation/pages?id=pages)里配置每个路由页面的路径及页面样式

### 路由跳转

`uni-app` 有两种页面路由跳转方式：使用[navigator](https://uniapp.dcloud.io/component/navigator)组件跳转、调用[API](https://uniapp.dcloud.io/api/router)跳转

### 页面栈

框架以栈的形式管理当前所有页面

| 路由方式   | 页面栈表现                        | 触发时机                                                                                                                                                                      |
| ---------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 初始化     | 新页面入栈                        | uni-app 打开的第一个页面                                                                                                                                                      |
| 打开新页面 | 新页面入栈                        | API [uni.navigateTo](https://uniapp.dcloud.io/api/router?id=navigateto) 、组件`<navigator open-type="navigate"/>`                                                             |
| 页面重定向 | 当前页面出栈，新页面入栈          | API [uni.redirectTo](https://uniapp.dcloud.io/api/router?id=redirectto) 、组件`<navigator open-type="redirectTo"/>`                                                           |
| 页面返回   | 页面不断出栈，直到目标返回页      | API [uni.navigateBack](https://uniapp.dcloud.io/api/router?id=navigateback) 、组件 `<navigator open-type="navigateBack"/> `、用户按左上角返回按钮、安卓用户点击物理 back 按键 |
| Tab 切换   | 页面全部出栈，只留下新的 Tab 页面 | API [uni.switchTab](https://uniapp.dcloud.io/api/router?id=switchtab) 、组件`<navigator open-type="switchTab"/>`、用户切换 Tab                                                |
| 重加载     | 页面全部出栈，只留下新的页面      | API [uni.reLaunch](https://uniapp.dcloud.io/api/router?id=relaunch) 、组件` <navigator open-type="reLaunch"/>`                                                                |

## 运行环境判断

### 开发环境和生产环境

`uni-app` 可通过 `process.env.NODE_ENV` 判断当前环境是开发环境还是生产环境。

- 单一平台配置，可以 [package.json](https://uniapp.dcloud.io/collocation/package) 中配置
- 所有平台配置，可以在 [vue-config.js](https://uniapp.dcloud.io/collocation/vue-config) 中配置

### 判断平台

**编译期判断**，即条件编译：**不同平台**在编译出包后已经是**不同代码**

```js
// #ifdef H5
alert('只有h5平台才有alert方法')
// #endif
```

**运行期判断**，代码已入包中，仍然需要在**运行期判断平台**

> 小程序开发工具返回值均为 `devtools`

```js
switch (uni.getSystemInfoSync().platform) {
  case 'android':
    console.log('运行Android上')
    break
  case 'ios':
    console.log('运行iOS上')
    break
  default:
    console.log('运行在开发者工具上')
    break
}
```

## 页面样式与布局

### 尺寸单位

`uni-app` 支持的通用 css 单位包括 `px`、`rpx`

- `px` 即屏幕像素
- `rpx` 即响应式`px`，一种根据屏幕宽度自适应的动态单位。以 750 宽的屏幕为基准，750rpx 恰好为屏幕宽度。

**`vue`支持，`nvue`不支持**

- `rem` 根字体大小可以通过 [page-meta](https://uniapp.dcloud.io/component/page-meta?id=page-meta) 配置
- `vh` viewpoint height，视窗高度，1vh 等于视窗高度的 1%
- `vw` viewpoint width，视窗宽度，1vw 等于视窗宽度的 1%
- `% ` nvue 不支持百分比单位。

**App 端**，在 `pages.json` 里只支持 `px`。**注意此时不支持 `rpx`**

`设计稿 1px / 设计稿基准宽度 = 框架样式 1rpx / 750rpx`

`最终值 = ( 750 * 1px / 设计稿基准宽度 ) rpx`

> `uni-app` 规定屏幕基准宽度 750rpx

- `rpx`不支持动态**横竖屏切换计算**，使用`rpx`建议锁定屏幕方向

### 样式

框架组件上支持使用 `style`、`class` 属性来控制组件的样式

- `style`：静态的样式**统一写到 `class`** 。style 接收动态的样式，在**运行时会进行解析**，请尽量**避免将静态的样式写进 `style`** 中，以免影响渲染速度。
- `class`：用于指定样式规则。

_Tips_

- 在 `uni-app` 中不能使用 `*` 选择器
- 微信小程序自定义组件中*仅支持 `class` 选择器*
- `page` 相当于 `body` 节点

### CSS 变量

uni-app 提供内置 CSS 变量

| CSS 变量              | 描述                         | App                                                                                                                  | 小程序 | H5                   |
| :-------------------- | :--------------------------- | :------------------------------------------------------------------------------------------------------------------- | :----- | :------------------- |
| `--status-bar-height` | 系统**状态栏**高度           | [系统状态栏高度](http://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.getStatusbarHeight)、nvue 注意见下 | 25px   | 0                    |
| `--window-top`        | **内容区域距离*顶*部**的距离 | 0                                                                                                                    | 0      | NavigationBar 的高度 |
| `--window-bottom`     | **内容区域距离*底*部**的距离 | 0                                                                                                                    | 0      | TabBar 的高度        |

_Tips_

- `var(--status-bar-height)`
  - 微信小程序环境： `25px`
  - App ：手机实际状态栏高度
- 设置 `"navigationStyle":"custom"` 取消原生导航栏后，由于窗体为沉浸式，占据了状态栏位置
  - 使用一个高度为 `var(--status-bar-height)` 的 view 放在页面**顶部**，避免页面内容出现在状态栏
- H5 端，不存在*原生导航栏*和*`tabbar`*，如果设置了一个固定位置的居底 view，在小程序和 App 端是在 tabbar 上方，但在 H5 端会与 tabbar 重叠。
  - 使用`--window-bottom`，不管在哪个端，都是固定在`tabbar`上方
- 目前 nvue 在 App 端，还不支持 `--status-bar-height`变量
  - 替代方案：页面`onLoad`时通过`uni.getSystemInfoSync().statusBarHeight`获取状态栏高度，然后通过 style 绑定方式给占位 view 设定高度

### 固定值

`uni-app` 中以下组件的高度是固定的，不可修改

| 组件            | 描述       | App                                              | H5     |
| :-------------- | :--------- | :----------------------------------------------- | :----- |
| `NavigationBar` | 导航栏     | `44px`                                           | `44px` |
| `TabBar`        | 底部选项卡 | *2.3.4+*之前 `56px`，_2.3.4+_ `50px`。可自主更改 | `50px` |

### 背景图片

`uni-app` 支持使用在 css 里设置背景图片

- 支持 base64 格式图片

- 支持网络路径图片

- 小程序不支持在 css 中使用本地文件（背景，字体）

  - 以`base64`方式方可使用
  - App 端在**`v3`模式以后**，才支持本地文件

- 使用本地路径背景图片需注意

  - `<40kb` 时，`uni-app` 编译到不支持本地背景图的平台时，会自动将其转化为 base64 格式
  - `>= 40kb`，会有性能问题。可以将其转换为 base64 格式使用，或将其挪到服务器上，从网络地址引用
  - 本地背景图片的引用路径推荐使用以 `~@` 开头的绝对路径。

  ```css
  .test2 {
    background-image: url('~@/static/logo.png');
  }
  ```

> 微信小程序**不支持相对路径**（真机不支持，开发工具支持）

### 字体图标

`uni-app` 支持使用字体图标

- 支持 base64 格式字体图标
- 支持网络路径字体图标
- 小程序不支持，**同上**
- **网络路径**：必须加协议头 `https`
- 从 http://www.iconfont.cn 上拷贝的代码，**默认是没加协议头**
- 使用本地路径图标字体需注意：**同上**

## `<template/>` `<block/>`

`uni-app` 支持在 template 模板中嵌套 `<template/>` 和 `<block/>`，用来进行 _列表渲染_ 和 _条件渲染_

> `block` 不同平台表现不一，推荐`template`

## npm 支持

- 直接从 `npm` 下载库很容易只兼容 H5 端
- 非 H5 端不支持使用含有 `dom`、`window` 等操作的 `vue` 组件和 `js` 模块
- `node_modules` 目录必须在项目根目录下
