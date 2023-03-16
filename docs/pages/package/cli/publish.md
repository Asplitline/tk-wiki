---
outline: deep
title: 版本发布
order: 5
---

# 版本发布

版本规范：https://semver.org/

## 标准版本

`major`：主版本，不兼容的 API 修改

`minor`：次版本，当向下兼容的功能性新增

`patch`：修订号，向下兼容的问题修正

## 先行版本

先行版本号可以加到`“主版本号.次版本号.修订号”`的后面，先加上一个连接号再加上一连串以句点分隔的标识符和版本编译信息。

`3.2.0-beta.5`

`alpha`：内部版本

`beta`：公测版本

`rc` 即 `Release candiate`：正式版本候选版本

## 发布版本

```shell
## version 1.0.0
## 升级补丁版本号 1.0.1
npm version patch
## 升级小版本号 1.1.0
npm version minor
## 升级大版本号 2.0.0
npm version major
```

`semver`：通过 js 处理版本。

```shell
npm install semver
```

## 依赖详解

```js
  "dependencies": {
    "signale": "1.4.0",
    "figlet": "*",
    "react": "16.x",
    "table": "~5.4.6",
    "yargs": "^14.0.0"
  }
```

`x.y.z` - 主版本号.次版本号.修订号

| 标识   | 说明                                    |
| ------ | --------------------------------------- |
| 1.4.0  | 固定版本号                              |
| \*     | 任意版本 （>=0）                        |
| 16.x   | 主要版本（16.0.0<= version <17.0.0）    |
| 16.3.x | 次要版本（16.3.0<= version <16.4.0）    |
| ~      | 保持修订版本(`z`)最新。xy 不变。        |
| ^      | 保持次版本和修订版本(`y,z`)最新。x 不变 |

**特殊** - 主版本为 0

- 主版本号和次版本号都为 `0`: `^0.0.z`、`~0.0.z` 都被当作固定版本
- 主版本号为 `0`: `^0.y.z` 表现和 `~0.y.z` 相同，只保持修订号（`z`）为最新版本。

## 依赖更新

`npm outdated` ：列出有哪些还没有升级到最新版本的依赖：

- 黄色：不符合我们指定的语意化版本范围 - 不需要升级
- 红色：符合指定的语意化版本范围 - 需要升级

```shell
npm outedated
## 升级红色依赖
npm update
```

总结：

- 升级依赖：修改 `package.json`文件的依赖版本，执行 `npm install`
- 降级依赖:：执行 `npm install package@version`，改动`package.json`**不会对依赖进行降级**

> 注意改动依赖后提交`lock`文件

自动增加版本号

```shell
{
  "predeploy": "npm version patch"
}
```

## nvm

node 包管理器

### 基本使用

```shell
## nvm 版本
nvm version

## 安装 node.js 版本
nvm install 12.14.0

## 切换 node.js 版本
nvm use 12.14.0

## node.js 版本列表
nvm list
```

### 相关链接

[nvm 下载地址](https://github.com/coreybutler/nvm-windows/releases)

## npx

### 基本使用

解决问题：调用项目内部安装模块

```bash
 npm install -D mocha
```

一般来说，调用 Mocha ，通过 package.json 中 scripts 字段调用。但想通过命令行调用，写法如下

```bash
# 根目录下执行
node-modules/.bin/mocha --version
```

npx 调用

```bash
npx mocha --version
```

原理：npx 会到`node_modules/.bin`路径和环境变量`$PATH`里面，检查命令是否存在

如果模块全局安装，也能通过 npx 运行

```bash
npx create-react-app my-react-app
```

### --no-install 和- -ignore-existing

`--no-install`参数：强制使用本地模块，不下载远程模块。本地不存在，报错。

```bash
npx --no-install http-server
```

`--ignore-existing`参数：忽略本地的同名模块，强制安装使用远程模块

```bash
 npx --ignore-existing create-react-app my-react-app
```

### 运行指定 node 版本

指定某个版本的 Node 运行脚本。

```bash
 npx node@0.12.8 -v
```

原理：从 npm 下载这个版本的 node，使用后再删掉

-p 参数：指定 npx 所要安装的模块

```bash
$ npx -p node@0.12.8 node -v
v0.12.8
```

作用：先安装，再执行。可以用于多个模块安装执行

```bash
npx -p lolcatjs -p cowsay [command]
```

-c 参数：

作用 1：将所有命令都用 npx 解释

默认情况下：npx 安装多个模块时，只有第一个模块会使用 npx 安装。

```bash
npx -p lolcatjs -p cowsay 'cowsay hello | lolcatjs'
# 报错
```

```bash
npx -p lolcatjs -p cowsay -c 'cowsay hello | lolcatjs'
```

作用 2：带入环境变量

```bash
npx -c 'echo "$npm_package_name"'
```

### 相关链接

[npx 使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html)
