---
title: page.json
order: 1
---

# page.json

`pages.json` 文件用来对 uni-app 进行全局配置，决定页面文件的路径、窗口样式、原生的导航栏、底部的原生tabbar 等

> 在小程序中，*定位权限申请*等原属于`app.json`的内容，在uni-app中是在`manifest`中配置

| 属性                                   | 类型         | 必填   | 描述                           |
| :------------------------------------- | :----------- | :----- | :----------------------------- |
| `globalStyle`                          | Object       | 否     | 设置**默认**页面的**窗口表现** |
| `pages`                                | Object Array | **是** | 设置**页面路径**及**窗口表现** |
| `easycom`                              | Object       | 否     | **组件自动引入**规则           |
| `tabBar`                               | Object       | 否     | 设置**底部 tab** 的表现        |
| `condition`                            | Object       | 否     | 启动**模式配置**               |
| `subPackages`                          | Object Array | 否     | 分包**加载配置**               |
| `preloadRule`                          | Object       | 否     | 分包**预下载规则**             |
| `workers`                              | String       | 否     | `Worker` 代码放置的目录        |
| `leftWindow | topWindow | rightWindow` | Object       | 否     | **大屏*左 顶 右***侧窗口       |

## globalStyle

用于设置应用的状态栏、导航条、标题、窗口背景色等。

| 属性                                                         | 类型     | 默认值   | 描述                                                         |
| :----------------------------------------------------------- | :------- | :------- | :----------------------------------------------------------- |
| `navigationBarBackgroundColor`                               | HexColor | #F7F7F7  | **导航栏背景**颜色（同**状态栏背景色**）                     |
| `navigationBarTextStyle`                                     | String   | white    | **导航栏标题颜色**及**状态栏前景颜色**，仅支持 `black`/w`h`ite |
| `navigationBarTitleText`                                     | String   |          | **导航栏标题**文字内容                                       |
| `navigationStyle`                                            | String   | default  | **导航栏样式**，仅支持 `default`/`custom`。`custom`：取消默认原生导航栏 |
| `backgroundColor`                                            | HexColor | #ffffff  | **下拉窗口**的**背景**色                                     |
| `backgroundTextStyle`                                        | String   | dark     | **下拉 loading** 的样式，仅支持 `dark` / `light`             |
| `enablePullDownRefresh`                                      | Boolean  | false    | 是否开启**下拉刷新**                                         |
| `onReachBottomDistance`                                      | Number   | 50       | 页面**上拉触底事件触发时距页面底部距离**（只支持`px`）       |
| `backgroundColorTop`                                         | HexColor | #ffffff  | **顶部窗口**的**背景**色（bounce回弹区域）                   |
| `backgroundColorBottom`                                      | HexColor | #ffffff  | **底部窗口**的**背景**色（bounce回弹区域）                   |
| `titleImage`                                                 | String   |          | **导航栏图片地址**（替换当前文字标题）                       |
| `transparentTitle`                                           | String   | none     | **导航栏整体**（前景、背景）**透明**设置。<br />`always`： 一直透 `auto`：滑动自适应 `none`：不透明 |
| `titlePenetrate`                                             | String   | NO       | **导航栏**点击**穿透**                                       |
| `pageOrientation`                                            | String   | portrait | **横屏配置**，屏幕旋转设置，仅支持 `auto` / `portrait` / `landscape` |
| `animationType`                                              | String   | pop-in   | **窗口**显示的**动画效果**                                   |
| `animationDuration`                                          | Number   | 300      | **窗口**显示动画的**持续时间**（`ms`）                       |
| `app-plus | h5 | mp-alipay | mp-weixin | mp-baidu | mo-toutiao | mp-qq` | Object   |          | 各平台特定样式                                               |
| `usingComponents`                                            | Object   |          | **引用小程序组件**                                           |
| `renderingMode`                                              | String   |          | **同层渲染**。`webrtc`(实时音视频) 无法正常时尝试配置 `seperated` 强制关掉同层 |
| `leftWindow | topWindow | rightWindow`                       | Boolean  | true     | 是否显示 `leftWindow | topWindow | rightWIndow`              |
| `rpxCalcMaxDeviceWidth`                                      | Number   | 960      | `rpx` **最大设备宽度**（ `px`）                              |
| `rpxCalcBaseDeviceWidth`                                     | Number   | 375      | `rpx` **基准设备宽度**（`px`）<br />**实际宽度**超出 `rpx` **最大设备宽度**时**将按基准宽度**计算，单位 `px` |
| `rpxCalcIncludeWidth`                                        | Number   | 750      | `rpx` 计算特殊处理的值，始终按实际的设备宽度计算（`rpx`）    |
| `maxWidth`                                                   | Number   | 1190     | 当浏览器可见区域宽度（`px`）                                 |

*Tips*

- 支付宝小程序使用`titleImage`时必须使用`https`的图片链接地址（真机有效，模拟器无效）
- `globalStyle`中设置的`titleImage`会覆盖掉`pages`->`style`内的设置文字标题
- 使用 `maxWidth` 时，页面内`fixed`元素需要使用`--window-left`,`--window-right`来保证布局位置正确
  - `>maxWidth`，两侧留白
  - `<=maxWidth`，页面铺满
  - **不同页面支持配置不同**的maxWidth
  - `maxWidth = leftWindow(可选)+page(页面主体)+rightWindow(可选)`

## pages

通过 `pages` 节点**配置应用由哪些页面组成**

pages 节点*接收一个数组*，*每个项都是一个对象*

| 属性    | 类型   | 描述             |
| :------ | :----- | :--------------- |
| `path`  | String | 配置页面路径     |
| `style` | Object | 配置页面窗口表现 |

*Tips*

- pages节点的**第一项为应用入口页**（即首页）
- **应用中新增/减少页面**，都需要对 pages 数组进行修改
- 文件名**不需要写后缀**，框架会自动寻找路径下的页面资源

### style

设置每个页面的状态栏、导航条、标题、窗口背景色等

页面中配置项**会覆盖 `globalStyle` 中相同的配置项**

| 属性                                                         | 类型     | 默认值  | 描述                                                         |
| :----------------------------------------------------------- | :------- | :------ | :----------------------------------------------------------- |
| `navigationBarBackgroundColor`                               | HexColor | #000000 | 导航栏背景颜色（同状态栏背景色）                             |
| `navigationBarTextStyle`                                     | String   | white   | 导航栏标题颜色及状态栏前景颜色，仅支持 black/white           |
| `navigationBarTitleText`                                     | String   |         | 导航栏标题文字内容                                           |
| `navigationBarShadow`                                        | Object   |         | **导航栏阴影**                                               |
| `navigationStyle`                                            | String   | default | 导航栏样式，仅支持 default/custom。                          |
| `disableScroll`                                              | Boolean  | false   | 设置为 `true` 则**页面整体不能上下滚动**（bounce效果*`globalStyle`中设置无效* |
| `backgroundColor`                                            | HexColor | #ffffff | 窗口的背景色                                                 |
| `backgroundTextStyle`                                        | String   | dark    | 下拉 loading 的样式，仅支持 dark/light                       |
| `enablePullDownRefresh`                                      | Boolean  | false   | 是否开启下拉刷新                                             |
| `onReachBottomDistance`                                      | Number   | 50      | 页面上拉触底事件触发时距页面底部距离，单位只支持px           |
| `backgroundColorTop`                                         | HexColor | #ffffff | 顶部窗口的背景色（bounce回弹区域）                           |
| `backgroundColorBottom`                                      | HexColor | #ffffff | 底部窗口的背景色（bounce回弹区域）                           |
| `titleImage`                                                 | String   |         | 导航栏图片地址（替换当前文字标题）                           |
| `transparentTitle`                                           | String   | none    | 导航栏透明设置。支持 always  / auto  / none                  |
| `titlePenetrate`                                             | String   | NO      | 导航栏点击穿透                                               |
| `app-plus | h5 | mp-alipay | mp-weixin | mp-baidu | mo-toutiao | mp-qq` | Object   |         | 各平台特定样式                                               |
| usingComponents                                              | Object   |         | 引用小程序组件                                               |
| `leftWindow | topWindow | rightWindow`                       | Boolean  | true    | 当前页面是否显示<br />`leftWindow | topWindow | rightWindow` |
| maxWidth                                                     | Number   | 1190    | 单位px                                                       |

 [topWindow | leftWindow | rightWindow](https://uniapp.dcloud.io/collocation/pages?id=topwindow)：可解决宽屏适配问题

### 自定义导航栏

**以下两种**：原生导航栏不显示

- `navigationStyle`设为`custom`

- `titleNView`设为`false`

*Tips*

- 非H5端，**手机顶部状态栏区域会被页面内容覆盖**。状态栏高度的css变量`--status-bar-height`

```vue
<template>
  <view>
      <view class="status_bar">
          <!-- 这里是状态栏 -->
      </view>
      <view> 状态栏下的文字 </view>
  </view>
</template>    
<style>
  .status_bar {
      height: var(--status-bar-height);
      width: 100%;
  }
</style>
```

- **前端导航栏搭配原生下拉刷新**
  - *微信小程序下iOS*需要拉更长才能看到下拉刷新的三个点
  - *Android*是从屏幕顶部下拉，无法从导航栏下方下拉
  - 如果一定要从前端导航栏下拉，小程序下只能放弃原生下拉刷新，纯前端模拟，参考[mescroll插件](https://ext.dcloud.net.cn/plugin?id=343)，但这样很容易产生性能问题。
- 非H5端，**前端导航盖不住[原生组件](https://uniapp.dcloud.io/component/native-component)**
  - 如果页面有`video、map、textarea`(仅小程序)等[原生组件](https://uniapp.dcloud.io/component/native-component)，滚动时会覆盖住导航栏
    - 小程序，使用`cover-view`来做导航栏，避免覆盖问题
    - App，使用[titleNView](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview)或[subNVue](https://uniapp.dcloud.io/collocation/pages?id=app-subnvues)，体验更好
- **前端组件在渲染速度上不如原生导航栏**
  - 原生导航可以在动画期间渲染，保证动画期间不白屏
  - 前端导航栏，在新窗体进入的动画期间可能会整页白屏，越低端的手机越明显
- 以上讨论的是前端自定义导航栏，在App侧，**原生导航栏也提供了比小程序导航更丰富的自定义性**
  - `titleNView`：给原生导航栏提供更多配置，包括自定义按钮、滚动渐变效果、搜索框等，详见[titleNView](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview)
  - `subNView`：使用nvue原生渲染，所有布局自己开发，具备一切自定义灵活度。详见[subNVue](https://uniapp.dcloud.io/collocation/pages?id=app-subnvues)
- 页面禁用原生导航栏后，**改变状态栏的前景字体样式**
  - 可设置页面的 `navigationBarTextStyle` 属性（只能设置为 `black`或`white`）
  - 单独设置状态栏颜色，App端可使用[plus.navigator.setStatusBarStyle](http://www.html5plus.org/doc/zh_cn/navigator.html#plus.navigator.setStatusBarStyle)设置
  - 低端Android手机（4.4）自身不支持设置状态栏前景色

**尽量使用原生导航**

- App和H5下，uni-app提供了灵活的处理方案：[titleNView](https://uniapp.dcloud.io/collocation/pages?id=app-titlenview)、[subNVue](https://uniapp.dcloud.io/collocation/pages?id=app-subnvues)、或整页使用nvue。
- 在小程序下，因为其自身的限制，没有太好的方案。

## easycom

传统vue组件，需要*安装、引用、注册*，三个步骤后才能使用组件

`easycom`将其精简为一步

- 组件在项目的`components`目录
- 并符合`components/组件名称/组件名称.vue`目录结构

> `easycom`打包后会自动剔除没有使用的组件

`easycom`是自动开启

| 属性       | 类型    | 默认值 | 描述                                         |
| :--------- | :------ | :----- | :------------------------------------------- |
| `autoscan` | Boolean | true   | 是否开启自动扫描，**自动扫描符合条件的组件** |
| `custom`   | Object  | -      | 正则方式**自定义组件匹配规则**               |

*Tips*

- `easycom`方式引入组件是局部引入
- 组件名完全一致，`easycom`引入的优先级**低于手动引入**（区分连字符形式与驼峰形式）
- 考虑到编译速度，直接在`pages.json`内修改`easycom`不会触发重新编译，需要改动页面内容触发。
- `easycom`只处理`vue`组件。不处理后缀为`.nvue`的组件

## tabBar

通过 `tabBar` 配置项指定一级导航栏，以及 tab 切换时显示的对应页

| 属性              | 类型     | 必填   | 默认值 | 描述                                                         |
| :---------------- | :------- | :----- | :----- | :----------------------------------------------------------- |
| `color`           | HexColor | **是** |        | **文字默认颜色**                                             |
| `selectedColor`   | HexColor | **是** |        | **文字选中**时的颜色                                         |
| `backgroundColor` | HexColor | **是** |        | **背景色**                                                   |
| `borderStyle`     | String   | 否     | black  | **边框颜色**，可选值 `black`/`white`                         |
| `blurEffect`      | String   | 否     | none   | iOS **高斯模糊**效果<br />`dark`/`extralight`/`light`/`none` |
| `list`            | Array    | **是** |        | **tab 列表**(*2-5*)                                          |
| `position`        | String   | 否     | bottom | 可选值 `bottom`、`top`                                       |
| `fontSize`        | String   | 否     | 10px   | **文字默认大小**                                             |
| `iconWidth`       | String   | 否     | 24px   | **图标默认宽度**（高度等比例缩放）                           |
| `spacing`         | String   | 否     | 3px    | 图标和文字的**间距**                                         |
| `height`          | String   | 否     | 50px   | tabBar **默认高度**                                          |
| `midButton`       | Object   | 否     |        | **中间按钮** 仅在 list 项为*偶数时有效*                      |

*Tips*

-  `position` 为 top 时，不会显示 icon
-  `list` 是一个数组，只能配置 `2 - 5` 个tab，**按数组的顺序排序**
-  **`tabbar`页面切换时，首次加载可能渲染不及时**，可在`tabbar`页面`onLoad`生命周期里先弹出一个等待雪花
-  **`tabbar` 页面展现后就保留在内存**，再次切换 `tabbar` 页面，触发`onShow`，不触发`onLoad`。

**list**

| 属性               | 类型   | 必填 | 说明                                        |
| :----------------- | :----- | :--- | :------------------------------------------ |
| `pagePath`         | String | 是   | 页面**路径**，**必须**在 pages 中**先定义** |
| `text`             | String | 是   | tab**按钮文字**，在 App 和 H5 平台为非必填  |
| `iconPath`         | String | 否   | **图片路径**                                |
| `selectedIconPath` | String | 否   | **选中时**的图片路径，同上                  |

*Tips*

`iconPath`

- icon 大小限制为40kb，建议尺寸为 81px * 81px
- 当 postion 为 top 时，此参数无效
- 不支持网络图片，不支持字体图标

**midButton**

| 属性              | 类型   | 必填 | 默认值 | 描述                                                         |
| :---------------- | :----- | :--- | :----- | :----------------------------------------------------------- |
| `width`           | String | 否   | 80px   | 中间按钮的**宽度**<br />tabBar **其它项为减去此宽度后平分**，默认值为与其它项平分宽度 |
| `height`          | String | 否   | 50px   | 中间按钮的**高度**<br />可大于 tabBar 高度，达到中间凸起的效果 |
| `text`            | String | 否   |        | 中间按钮的**文字**                                           |
| `iconPath`        | String | 否   |        | 中间按钮的**图片路径**                                       |
| `iconWidth`       | String | 否   | 24px   | 图片**宽度**（高度等比例缩放）                               |
| `backgroundImage` | String | 否   |        | 中间按钮的**背景图片路径**                                   |

`midButton`没有`pagePath`，需**监听点击事件**。监听点击事件API：`uni.onTabBarMidButtonTap`

### js api

| 函数                                                         | 说明                                   |      |
| ------------------------------------------------------------ | -------------------------------------- | ---- |
| [`uni.setTabBarItem`(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbaritem) | 设置 tabBar **某一项的内容**           |      |
| [`uni.setTabBarStyle`(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbarstyle) | 设置 tabBar 的**整体样式**             |      |
| [`uni.hideTabBar`(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbar) | **隐藏** tabBar                        |      |
| [`uni.showTabBar`(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=showtabbar) | **显示** tabBar                        |      |
| [`uni.setTabBarBadge`(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=settabbarbadge) | 为 tabBar 某项的**右上角添加文本**     |      |
| [`uni.showTabBarRedDot`(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=showtabbarreddot) | **显示** tabBar 某项的**右上角的红点** |      |
| [`uni.hideTabBarRedDot`(OBJECT)](https://uniapp.dcloud.io/api/ui/tabbar?id=hidetabbarreddot) | **隐藏** tabBar 某项的**右上角的红点** |      |
| [`uni.onTabBarMidButtonTap`(CALLBACK)](https://uniapp.dcloud.io/api/ui/tabbar?id=ontabbarmidbuttontap) | 监听**中间按钮点击**事件               |      |

> 大部分操作 tabbar 的 API 需要在 tabbar 渲染后才能使用，避免在 tabbar 未初始化前使用

*Tips*

- 跳转到 tabbar 页面，**只能使用[uni.switchTab](https://uniapp.dcloud.io/api/router?id=switchtab)**；使用*navigator组件跳转*时必须设置[open-type="switchTab"](https://uniapp.dcloud.io/component/navigator)
- tabbar 的**默认高度在不同平台不一样**。App端为50px，与H5端一致。
- **tabbar 在H5端**是div模拟，**属于前端屏幕窗口的一部分**
  - 在tabbar上方10px的按钮，`bottom: calc(var(--window-bottom) + 10px)`
- **先登录、后进入tab页面**，不需要把登录页设为首页，首页仍然是tabbar页
- **前端弹出遮罩层挡不住tabbar的问题**
  - 跨端处理：动态隐藏tabbar。
  - App端可以使用`plus.nativeObj.vie`w或`subNVue`做弹出和遮罩
  - [底部原生图标分享菜单例子](https://ext.dcloud.net.cn/plugin?id=69)
- **PC宽屏**上，当页面**存在**`topWindow`或`leftWindow`或`rightWindow`等**多窗体结构**时，**tabBar自动隐藏**（HBuilderX 2.9.9），使用 [custom-tab-bar组件](https://uniapp.dcloud.io/component/custom-tab-bar) 配置 tabBar 的位置

**自定义`tabbar`**

**除了H5端**，*自定义`tabBar`*的性能体验会*低于原生`tabBar`*

- **普通自定义`tabBar`**：使用view自行绘制tabBar。
  - 页面是**多页**方式，切换tabBar将无法保持底部tabBar一直显示，这种情况建议单页方式
  - **单页**方式，复杂页面，应用性能会下降明显，需减少页面复杂度
  - **App端**，nvue单页的性能会显著高于vue页面
- **微信小程序自定义`tabbar`**：微信提供一直基于webview自定义tabBar的方案。该功能体验不佳，不太推荐使用。
- **原生的`tabbar`有且只有一个且在首页**。二级页如需的tab，需自行编写view来实现。一般二级页面更适合的导航是 [segement组件](https://ext.dcloud.net.cn/plugin?id=54)

## Condition

启动模式配置，仅开发期间生效，用于模拟直达页面的场景

**属性**

| 属性      | 类型   | 是否必填 | 描述                               |
| :-------- | :----- | :------- | :--------------------------------- |
| `current` | Number | **是**   | **当前激活模式**，list节点的索引值 |
| `list`    | Array  | **是**   | 启动**模式列表**                   |

**list**

| 属性    | 类型   | 是否必填 | 描述                                                         |
| :------ | :----- | :------- | :----------------------------------------------------------- |
| `name`  | String | **是**   | 启动模式**名称**                                             |
| `path`  | String | **是**   | 启动页面**路径**                                             |
| `query` | String | 否       | 启动**参数**，可在页面的 [onLoad](https://uniapp.dcloud.io/collocation/frame/lifecycle?id=页面生命周期) 函数里获得 |

## [subPackages](https://uniapp.dcloud.io/collocation/pages?id=subpackages)

小程序有体积和资源加载限制，各家小程序平台提供了分包方式，优化小程序的下载和启动速度

**主包**：放置默认启动页面/TabBar 页面，以及一些所有分包都需用到公共资源/JS 脚本

**分包**：根据`pages.json`的配置进行划分

**小程序启动**

- **默认会下载主包**并启动主包内页面
- 当用户**进入分包**内某个页面时，会把**对应分包自动下载**

subPackages 节点接收一个数组，数组每一项都是应用的子包

| 属性    | 类型   | 是否必填 | 描述                                                         |
| :------ | :----- | :------- | :----------------------------------------------------------- |
| `root`  | String | **是**   | 子包的根目录                                                 |
| `pages` | Array  | **是**   | 子包由哪些页面组成，参数同 [pages](https://uniapp.dcloud.io/collocation/pages?id=pages) |

## [preloadRule](https://uniapp.dcloud.io/collocation/pages?id=preloadrule)

分包预载配置。

配置preloadRule后，在进入小程序某个页面时，由框架**自动预下载可能需要的分包**，提升进入后续分包页面时的启动速度

`preloadRule` 中，`key` 是页面路径，`value` 是进入此页面的预下载配置

| 字段       | 类型        | 必填 | 默认值 | 说明                                                         |
| ---------- | ----------- | ---- | ------ | ------------------------------------------------------------ |
| `packages` | StringArray | 是   | 无     | 进入页面后预下载分包的 `root` 或 `name`。`__APP__` 表示主包。 |
| `network`  | String      | 否   | wifi   | 在指定网络下预下载，可选值为：`all`（不限网络）、`wifi`（仅wifi下预下载） |

> app的分包，同样支持preloadRule，但网络规则无效