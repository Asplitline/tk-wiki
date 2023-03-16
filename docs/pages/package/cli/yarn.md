---
outline: deep
title: yarn
order: 3
---

# yarn

## config - 配置

### 全局配置文件

```shell
cd
subl .yarnrc
```

### 改变缓存位置

```shell
# 查看配置
yarn config list

# yarn bin 位置
yarn global bin
yarn config  set global-folder "D:/yarn/global"

# yarn 全局安装位置
yarn global dir
yarn config set cache-folder "D:\yarn\cache"
```

### 配置镜像

```shell
yarn config get registry
# 淘宝源
yarn config set registry http://registry.npm.taobao.org/
# 官方源
yarn config set registry https://registry.npmjs.org/
```

```bash
yarn config get
yarn config delete
```

## install - 安装

```bash
yarn
yarn install
# 重新下载所有包
yarn install --force
```

```bash
# 清除缓存
yarn cache clean
```

## add - 添加

```shell
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

# devDependencies - peerDependencies - optionalDependencies
yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

例子

```bash
yarn add package-1@1.2.3
yarn add package-2@^1.0.0
yarn add package-3@beta
```

## upgrade - 升级

```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

### npm-check-updates

```shell
# 安装 npm-check-updates
yarn global add npm-check-updates

# 更新包（yarn.lock和package.json同步更新）

# 查看所有更新
ncu
# 单包更新
ncu -u axios
```

### upgrade-interactive

> 版本管理存在问题

```shell
yarn upgrade-interactive --latest

# 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
```

### upgrade

> 不好用

```shell
yarn upgrade package@version

# yarn.lock和package.json都会更新，但是会锁定版本
```

## remove - 移除

```bash
yarn remove [package]
```

## link - 链接

1. 通过 link 链接本地依赖

```bash
yarn clone 模块到本地

## 模块和项目在同一目录下
yarn link ../module

## 模块和项目不在同一目录下
## 先去到模块目录，把它 link 到全局
cd ../yarn-link-test
yarn link

## 再去项目目录通过包名来 link
cd ../my-project-link
yarn link test-yarn-link(模块包名，即：package.json中name)

## 在项目目录下，解除项目与模块的link
yarn unlink 模块名

## 在模块目录下：解除模块全局的link
yarn unlink 模块名
```

2. 直接添加本地依赖

```shell
## 链接本地包 - 相对路径
yarn add  @pancakeswap/uikit "file:../pancake-toolkit/packages/pancake-uikit"

## 绝对路径
yarn add  @pancakeswap/uikit "D:\\*\\pancake-toolkit\\packages\\pancake-uikit"

## 链接
yarn link @pancakeswap/uikit
```

3. 重新安装

```shell
yarn install --force
```

> 建议 直接在 package.json 中添加，然后 yarn install --force

## yarn.lock

yarn.lock 是自动生成的，以下两种情况自动更新 `package.json` 和 `package.lock`

新增依赖：`yarn add`

升级依赖：`yarn upgrade`

```json
core-js-compat@^3.0.0:
  version "3.14.0"
  resolved "https://registry.npmjs.org/core-js-compat/-/core-js-compat-3.14.0.tgz#b574dabf29184681d5b16357bd33d104df3d29a5"
  integrity sha1-tXTavykYRoHVsWNXvTPRBN89KaU=
  dependencies:
    browserslist "^4.16.6"
    semver "7.0.0"
```

**Identifier(s)**：`core-js-compat@^3.0.0`是依赖的 identifier。

- package.json 里对应的包名和版本区间，用`@`连接。
- 可能多个 Identifier 指向同一版本

**version**：实际安装的版本，满足版本区间里的一个版本 (除非配置`resolutions` ) 。

**resolved**：一个链接，下载包的地址。

integrity：对`resolved`下载下来的文件进行完整性校验。如果出现 diff，说明同一个下载链接对应的文件被修改过。

**dependencies**：包自己的依赖。

- 依赖的`browserslist "^4.16.6"`
- 看下实际安装的哪个版本，把它拼成`browserslist@^4.16.6`，以此为关键字在 yarn.lock 中搜索，就能找到对应的“块”

## 生态

### yrm

yrm：切换镜像源，测试不同源速度

安装 yrm

```shell
npm install -g yrm
```

列出当前可用的所有镜像源

```shell
yrm ls
```

```shell
npm -----  https://registry.npmjs.org/
cnpm ----  http://r.cnpmjs.org/
taobao --  https://registry.npm.taobao.org/
nj ------  https://registry.nodejitsu.com/
rednpm -- http://registry.mirror.cqupt.edu.cn
skimdb -- https://skimdb.npmjs.com/registry
yarn ----  https://registry.yarnpkg.com
```

使用淘宝镜像源

```shell
yrm use taobao
```

测试访问速度

```shell
yrm test taobao
```

## 相关链接

官网：https://yarnpkg.com/

Yarn cli: https://classic.yarnpkg.com/en/docs/cli

更改 Yarn 缓存位置：https://zhuanlan.zhihu.com/p/380723351
