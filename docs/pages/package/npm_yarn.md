---
title: npm & yarn
order: 1
---

## npm

### 配置镜像

### config - 配置

#### npm config 修改

- `proxy, https-proxy`：指定 npm 使用的代理
- `registry`： 指定 `npm` 下载安装包时的源
- `package-lock` ：是否默认生成 `package-lock` 文件（默认 true）

```shell
## 淘宝源
npm config set registry http://registry.npm.taobao.org/
## 官方源
npm config set registry https://registry.npmjs.org/
```

```shell
## 查看npm配置
npm config ls
## 查看配置项
npm config get <key>
## 设置配置项
npm config set <key>
## 删除配置项
npm config delete <key>
```

#### 文件修改

`npmrc` 文件

```shell
## 使用 命令 打开 npmrc
npm config edit # 局部
npm config edit -g # 全局配置文件
```

重新初始化默认设置

- 第一行用空字符串替换配置文件

- 第二行用默认设置重新填充配置文件

```shell
## 局部
echo "" > $(npm config get userconfig)
npm config edit

## 全局
echo "" > $(npm config get globalconfig)
npm config --global edit
```

**文件优先级** - 从高到低

- 工程内：`/path/to/my/project/.npmrc`
- 用户级：`~/.npmrc`
- 全局配置：`$PREFIX/etc/npmrc`
- npm 内置配置文件：`/path/to/npm/npmrc`

可以配置独有的源，如：公司内网需要通过代理才能访问`npm`源，创建一个 `.npmrc` 文件来共享需要在团队间共享的 `npm` 运行相关配置。

并且作用域为项目级，更好隔离公司和个人

```shell
proxy = http://proxy.example.com/
https-proxy = http://proxy.example.com/
registry = http://registry.example.com/
```

### install - 安装

```shell
## 开发依赖
npm install <package> --save-dev | -D
## 生产依赖
npm install <package> --save-prod | -P
## 重新下载所有包
npm run rebuild
```

### env - 环境变量

```shell
## 列出所有环境变量
npm run env
## 输出环境变量
echo PATH
## 设置环境变量 - 绝对
echo PATH = /usr/local/lib
## 设置环境变量 - 相对
echo PATH = ${pwd}/lib/include  # 使用${},也可以直接使用双引号
```

### other - 其他

```shell
## 查看包信息
npm info axios
## 查看文档
npm docs axios
## 查看源码
npm repo axios
## 清除缓存
npm cache clean --force
## 查看版本
npm view axios versions
```

### npm 发布

#### 目录结构

包含以下目录：

- `bin`：可执行二进制文件
- `lib`：js 代码
- `doc`：文档
- `test`：单元测试用例代码

#### 发布包

1. 注册 npm 账号

```shell
npm adduser #根据提示输入用户名密码即可
```

2. 使用命令发布你的包

通过配置一个 `.npmignore` 文件来排除一些文件, 防止大量的垃圾文件推送到 `npm`。

`.gitignore` 文件也可以充当 `.npmignore` 文件

```shell
npm publish
```

3. 安装

```shell
npm install <package_name>
```

4. 更新包

使用 `npm publish` 命令发布，不过**必须更改 npm 包的版本号**

#### 版本管理

版本规范：https://semver.org/

##### 标准版本

- `major`：主版本，不兼容的 API 修改
- `minor`：次版本，当向下兼容的功能性新增
- `patch`：修订号，向下兼容的问题修正。

##### 先行版本

先行版本号可以加到`“主版本号.次版本号.修订号”`的后面，先加上一个连接号再加上一连串以句点分隔的标识符和版本编译信息。

`3.2.0-beta.5`

- `alpha`：内部版本
- `beta`：公测版本
- `rc` 即 `Release candiate`：正式版本候选版本

##### 发布版本

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

#### 依赖详解

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

#### 依赖更新

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

## [yarn](https://yarnpkg.com/)

[yarn cli](https://classic.yarnpkg.com/en/docs/cli/link)

### config - 配置

#### 全局配置文件

```shell
cd
subl .npnrc
```

#### [改变缓存位置](https://zhuanlan.zhihu.com/p/380723351)

```shell
## 查看配置
yarn config list

## yarn bin 位置
yarn global bin
yarn config  set global-folder "D:/yarn/global"

## yarn 全局安装位置
yarn global dir
yarn config set cache-folder "D:\yarn\cache"
```

#### 配置镜像

```shell
yarn config get registry
## 淘宝源
yarn config set registry http://registry.npm.taobao.org/
## 官方源
yarn config set registry https://registry.npmjs.org/
```

```bash
yarn config get
yarn config delete
```

### install - 安装

```bash
yarn
yarn install
## 重新下载所有包
yarn install --force
```

```bash
## 清除缓存
yarn cache clean
```

### add - 添加

```shell
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]

## devDependencies - peerDependencies - optionalDependencies
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

### upgrade - 升级

```bash
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

#### npm-check-updates

```shell
## 安装 npm-check-updates
yarn global add npm-check-updates

## 更新包（yarn.lock和package.json同步更新）

## 查看所有更新
ncu
## 单包更新
ncu -u axios
```

#### upgrade-interactive

> 版本管理存在问题

```shell
yarn upgrade-interactive --latest

## 需要手动选择升级的依赖包，按空格键选择，a 键切换所有，i 键反选选择
```

#### upgrade

> 不好用

```shell
yarn upgrade package@version

## yarn.lock和package.json都会更新，但是会锁定版本
```

### remove - 移除

```bash
yarn remove [package]
```

### link - 链接

1. 通过 link 链接本地依赖

```bash
npm clone 模块到本地

## 模块和项目在同一目录下
npm link ../module

## 模块和项目不在同一目录下
## 先去到模块目录，把它 link 到全局
cd ../npm-link-test
npm link

## 再去项目目录通过包名来 link
cd ../my-project-link
npm link test-npm-link(模块包名，即：package.json中name)

## 在项目目录下，解除项目与模块的link
npm unlink 模块名

## 在模块目录下：解除模块全局的link
npm unlink 模块名
```

2. 直接添加本地依赖

```shell
## 链接本地包 - 相对路径
yarn add  @pancakeswap/uikit "file:../pancake-toolkit/packages/pancake-uikit"

## 绝对路径
yarn add  @pancakeswap/uikit "D:\\project\\2021\\company\\pawswap\\pancake-toolkit\\packages\\pancake-uikit"

## ? 存在问题
yarn link @pancakeswap/uikit
```

3. 重新安装

```shell
yarn install --force
```

> 建议 直接在 package.json 中添加，然后 yarn install --force

## yrm

npm 使用 `nrm`，通`yrm`

yrm 不仅可以快速切换镜像源，还可以测试自己网络访问不同源的速度

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

## nvm

node 包管理器

```shell
https://github.com/coreybutler/nvm-windows/releases
```

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

## 问题

### node-sass

```shell
 yarn add sass-loader@^10.1.1
```

### production

==如果 production 为 true 将不会安装 开发依赖==

```bash
npm config get production

npm config set production false
```

### RequestError

connect ETIMEDOUT 20.205.243.166:443

1. cmd 中 ping github.com ，是否能够正常连接
2. 不能正常连接，在 `C:\Windows\System32\drivers\etc`目录下 host 文件下添加

```bash
140.82.114.3 github.com
```

> 140.82.114.3 获取：在 https://ipaddress.com/ 中，搜索 github.com

## 配置代理

- 尝试配置全局代理

```bash
## cmd 配置临时代理
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080
## 查看配置状态
echo %http_proxy%

## powershell 设置代理
netsh winhttp set proxy "127.0.0.1:1080"
netsh winhttp reset proxy
## 查看代理
netsh winhttp show proxy

## git 配置局部代理
git config http.proxy http://127.0.0.1:1080
git config https.proxy http://127.0.0.1:1080

git config http.proxy socks5://127.0.0.1:1080
git config https.proxy socks5://127.0.0.1:1080

## 只对github生效
git config --global http.https://github.com.proxy socks5://127.0.0.1:1080
git config --global --unset http.https://github.com.proxy

## 删除局部代理
git config --unset http.proxy
git config --unset https.proxy

## npm 配置代理
npm config set proxy http://127.0.0.1:1080
npm config set https-proxy http://127.0.0.1:1080

npm config delete proxy
npm config delete https-proxy
## 查看状态
git config --list

## yarn 代理
yarn config list

yarn config set proxy http://127.0.0.1:1080
yarn config set https-proxy http://127.0.0.1:1080

yarn config delete proxy
yarn config delete https-proxy
```

## package.json

```js
{
  "name": "project",
  "version": "1.0.0",
  "dependencies": {
    "left-pad": "1.0.0",
    "c": "file:../c-1",
    "d2": "file:../d2-1"
  },
  "resolutions": {
    "d2/left-pad": "1.1.1",
    "c/**/left-pad": "^1.1.2"
  }
}
```

resolutions ：选择性依赖，控制依赖的版本

- 直接依赖（`foo/bar`）：foo 的**直接**依赖 bar，指向声明版本
- 间接依赖（`foo/**/bar`）：foo 的**间接**依赖 bar，指向声明版本
- 所有（`bar`）：**不管位置**，依赖`bar`都会指向声明版本

```js
"resolutions": {
  "bar": "1.0.0", // 所有依赖bar，1.0.0
  "foo/bar": "1.0.0",  // ，1.0.0
  "foo/**/bar": "1.0.0"
}
```

## yarn.lock

yarn.lock 是自动生成的，以下两种情况自动更新 `package.json` 和 `package.lock`

- 新增依赖：`yarn add`
- 升级依赖：`yarn upgrade`

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
