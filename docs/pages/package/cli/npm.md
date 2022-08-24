---
title: npm
order: 1
---

# npm

## config - 配置

### 通过 npm config 修改

- `proxy, https-proxy`：指定 npm 使用的代理
- `registry`： 指定 `npm` 下载安装包时的源
- `package-lock` ：是否默认生成 `package-lock` 文件（默认 true）

```shell
# 淘宝源
npm config set registry http://registry.npm.taobao.org/
# 官方源
npm config set registry https://registry.npmjs.org/
```

```shell
# 查看npm配置
npm config ls
# 查看配置项
npm config get <key>
# 设置配置项
npm config set <key>
# 删除配置项
npm config delete <key>
```

### 通过配置文件修改

`npmrc` 文件

```shell
# 使用 命令 打开 npmrc
npm config edit # 局部
npm config edit -g # 全局配置文件
```

重新初始化默认设置

- 第一行用空字符串替换配置文件

- 第二行用默认设置重新填充配置文件

```shell
# 局部
echo "" > $(npm config get userconfig)
npm config edit

# 全局
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

## install - 安装

```shell
# 开发依赖
npm install <package> --save-dev | -D
# 生产依赖
npm install <package> --save-prod | -P
# 重新下载所有包
npm run rebuild
```

## env - 环境变量

```shell
# 列出所有环境变量
npm run env
# 输出环境变量
echo PATH
# 设置环境变量 - 绝对
echo PATH = /usr/local/lib
# 设置环境变量 - 相对
echo PATH = ${pwd}/lib/include  # 使用${},也可以直接使用双引号
```

## other - 其他

```shell
# 查看包信息
npm info axios
# 查看文档
npm docs axios
# 查看源码
npm repo axios
# 清除缓存
npm cache clean --force
# 查看版本
npm view axios versions
```

## publish - 发布

### 目录结构

包含以下目录：

`bin`：可执行二进制文件

`lib`：js 代码

`doc`：文档

`test`：单元测试用例代码

### 发布包

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

## package.json

### resolutions - 选择性依赖

resolutions ：选择性依赖，控制依赖的版本

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

直接依赖（`foo/bar`）：foo 的**直接**依赖 bar，指向声明版本

间接依赖（`foo/**/bar`）：foo 的**间接**依赖 bar，指向声明版本

所有（`bar`）：**不管位置**，依赖`bar`都会指向声明版本

```js
"resolutions": {
  "bar": "1.0.0", // 所有依赖bar，1.0.0
  "foo/bar": "1.0.0",  // ，1.0.0
  "foo/**/bar": "1.0.0"
}
```



## 相关链接
