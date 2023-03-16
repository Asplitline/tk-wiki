---
outline: deep
title: 三方库兼容性
order: 2
---

# 三方库兼容性

## 安装 web3js 报错 - vue3

```shell
Module not found: Error: Can't resolve 'assert' in '*/node_modules/ethereumjs-util/dist'

BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
This is no longer the case. Verify if you need this module and configure a polyfill for it.

If you want to include a polyfill, you need to:
        - add a fallback 'resolve.fallback: { "assert": require.resolve("assert/") }'
        - install 'assert'
If you don't want to include a polyfill, you can use an empty module like this:
        resolve.fallback: { "assert": false }
```

1. 将日志中需要 resolve.fallback 的插件汇总，汇总后安装

```javascript
yarn add --dev stream-http https-browserify crypto-browserify stream-browserify os-browserify url assert
```

2. 在 vue.config.js 中添加如下配置

```javascript
module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
        process: 'process/browser'
      })
    ],
    resolve: {
      fallback: {
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        os: require.resolve('os-browserify/browser'),
        url: require.resolve('url'),
        assert: require.resolve('assert')
      }
    }
  }
})
```

3. 安装 buffer 和 wepack

> refs：[https://github.com/ChainSafe/web3.js/issues/4821](

## 引入 web3js 报错

### 方法 1 : Polyfill Node globals/modules

思路：web3 配置兼容性，使其能在浏览器使用

1. 安装以下两个插件

```bash
yarn add @esbuild-plugins/node-globals-polyfill --dev
yarn add @esbuild-plugins/node-modules-polyfill --dev
```

2. 配置 [optimizeDeps.esbuildOptions](https://vitejs.dev/config/#optimizedeps-esbuildoptions) 使用 ESBuild 插件，通过 define 替换 globalThis

[在线 demo ](https://stackblitz.com/edit/vue3-web3-demo-ffecex?file=vite.config.ts)

> 引入了 polyfill 包，导致打包体积增大

### 方法 2: Use pre-bundled script

思路：web3 打包后的 dist 可以直接在浏览器运行

1. 配置 alias 指向这个文件

```javascript
import { defineConfig } from 'vite'

export default defineConfig({
  ⋮
  resolve: {
    alias: {
      web3: 'web3/dist/web3.min.js',
    },

    // or
    alias: [
      {
        find: 'web3',
        replacement: 'web3/dist/web3.min.js',
      },
    ],
  },
})
```

[在线 demo](https://stackblitz.com/edit/vue3-web3-demo-w1lkev?file=vite.config.ts)

> 直接引用 dist ，体积更小

参考链接：[web3js-fails-to-import-in-vue3-composition-api-project](

## visual studio 模块缺失

错误信息

```shell
gyp ERR! find VS
gyp ERR! find VS msvs_version not set from command line or npm config
gyp ERR! find VS VCINSTALLDIR not set, not running in VS Command Prompt
gyp ERR! find VS could not use PowerShell to find Visual Studio 2017 or newer, try re-running with '--loglevel silly' for more details
gyp ERR! find VS looking for Visual Studio 2015
gyp ERR! find VS - not found
gyp ERR! find VS not looking for VS2013 as it is only supported up to Node.js 8
gyp ERR! find VS
gyp ERR! find VS **************************************************************
gyp ERR! find VS You need to install the latest version of Visual Studio
gyp ERR! find VS including the \"Desktop development with C++\" workload.
gyp ERR! find VS For more information consult the documentation at:
gyp ERR! find VS https://github.com/nodejs/node-gyp#on-windows
gyp ERR! find VS **************************************************************
gyp ERR! find VS
gyp ERR! configure error
gyp ERR! stack Error: Could not find any Visual Studio installation to use
gyp ERR! stack     at VisualStudioFinder.fail (D:\\**\\node_modules\\node-gyp\\lib\\find-visualstudio.js:122:47)
gyp ERR! stack     at D:\\**\\node_modules\\node-gyp\\lib\\find-visualstudio.js:75:16
gyp ERR! stack     at VisualStudioFinder.findVisualStudio2013 (D:\\**\\node_modules\\node-gyp\\lib\\find-visualstudio.js:363:14)
gyp ERR! stack     at D:\\**\\node_modules\\node-gyp\\lib\\find-visualstudio.js:71:14
gyp ERR! stack     at D:\\**\\node_modules\\node-gyp\\lib\\find-visualstudio.js:384:16
gyp ERR! stack     at D:\\**\\node_modules\\node-gyp\\lib\\util.js:54:7
gyp ERR! stack     at D:\\**\\node_modules\\node-gyp\\lib\\util.js:33:16
gyp ERR! stack     at ChildProcess.exithandler (child_process.js:315:5)
gyp ERR! stack     at ChildProcess.emit (events.js:315:20)
gyp ERR! stack     at maybeClose (internal/child_process.js:1048:16)
gyp ERR! stack     at Process.ChildProcess._handle.onexit (internal/child_process.js:288:5)
gyp ERR! System Windows_NT 10.0.22000
```

解决：安装 window-build-tools（安装后要重启）

```shell
npm install --global --production windows-build-tools
```

参考：https://www.ossez.com/t/msvs-version-not-set-from-command-line-or-npm-config/13800

## 没有找到 python

错误信息

```shell
gyp ERR! find Python
gyp ERR! find Python Python is not set from command line or npm configuration
gyp ERR! find Python Python is not set from environment variable PYTHON
gyp ERR! find Python checking if \"python3\" can be used
gyp ERR! find Python - \"python3\" is not in PATH or produced an error
gyp ERR! find Python checking if \"python\" can be used
gyp ERR! find Python - \"python\" is not in PATH or produced an error
...
...
gyp ERR! find Python checking if the py launcher can be used to find Python 3
gyp ERR! find Python - \"py.exe\" is not in PATH or produced an error
gyp ERR! find Python
gyp ERR! find Python **********************************************************
gyp ERR! find Python You need to install the latest version of Python.
gyp ERR! find Python Node-gyp should be able to find and use Python. If not,
gyp ERR! find Python you can try one of the following options:
gyp ERR! find Python - Use the switch --python=\"C:\\Path\\To\\python.exe\"
gyp ERR! find Python   (accepted by both node-gyp and npm)
gyp ERR! find Python - Set the environment variable PYTHON
gyp ERR! find Python - Set the npm configuration variable python:
gyp ERR! find Python   npm config set python \"C:\\Path\\To\\python.exe\"
gyp ERR! find Python For more information consult the documentation at:
gyp ERR! find Python https://github.com/nodejs/node-gyp#installation
gyp ERR! find Python **********************************************************
gyp ERR! find Python
gyp ERR! configure error
gyp ERR! stack Error: Could not find any Python installation to use
```

解决：

1. 安装 python
2. 配置 环境变量
3. cmd 通过 python 命令 检测是否安装成功

下载地址：https://www.python.org/downloads/windows/
