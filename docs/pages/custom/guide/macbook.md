---
title: macbook 装机
order: 2
---

# Mac 从零配置

## 常用软件

| 软件名称                                                                      | 说明 |
| ----------------------------------------------------------------------------- | ---- |
| [Chrome](https://www.google.com/chrome/)                                      |      |
| [VsCode](https://code.visualstudio.com/)                                      |      |
| [VrayU](https://www.v2ray.com/awesome/tools.html)                             |      |
| [BeterAndBetter](https://www.better365.cn/bab2.html)                          |      |
| [Snipatse](https://www.snipaste.com/)                                         |      |
| [AltTab](https://github.com/lwouis/alt-tab-macos)                             |      |
| [hidenBar](https://github.com/dwarvesf/hidden)                                |      |
| [MissionControlPlus](https://github.com/ronyfadel/MissionControlPlusReleases) |      |
| [LocalSend](https://github.com/localsend/localsend)                           |      |
| [HeyNote](https://github.com/heyman/heynote)                                  |      |
| [Iterm2](https://iterm2.com/)                                                 |      |

> iterm2 配色推荐 ayu - https://iterm2colorschemes.com/

破解版

| 软件名称                                   | 说明 |
| ------------------------------------------ | ---- |
| [Paste](https://www.imacso.com/paste.html) |      |

破解网站推荐

https://www.macv.com/

## 开发环境

### 常用

安装 nvm - node 版本管理工具

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```

安装 node - 以 v18 为例

```bash
nvm install 18
```

> [zsh-command-not-found-nvm](/pages/custom/guide/macbook.html##问题-3-zsh-command-not-found-nvm)

常用 npm 库

```bash
# yarn
npm install -g yarn
# pnpm
npm install -g pnpm


# rimraf - node_modules
npm install -g rimraf
# 依赖更新
npm install -g npm-check-updates
# 关闭端口
npm install -g kill-port
# 本地服务
npm install -g http-server
```

```bash
npm i -g yarn pnpm
```

```bash
npm i -g rimraf npm-check-updates kill-port http-server
```

### brew

软件包管理器

官网：https://brew.sh/index_zh-cn

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

```shell
==> Next steps:
- Run these two commands in your terminal to add Homebrew to your PATH:
    (echo; echo 'eval "$(/opt/homebrew/bin/brew shellenv)"') >> /Users/shouyong/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"

# 查看brew版本
➜  ~ brew -v
Homebrew 4.1.6
```

~/.zshrc 添加

```
export PATH=/opt/homebrew/bin:$PATH
```

执行 `source ./zshrc` 启用配置

http://spring4all.com/forum-post/2278.html

### on my zsh

终端工具

官网：https://ohmyz.sh/

#### 基础

安装 on my zsh

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

配置别名 - 直接添加末尾相关别名

```bash
vim ～/.zshrc
```

#### 主题

安装主题

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >>~/.zshrc
```

设置主题

```
ZSH_THEME="powerlevel10k/powerlevel10k"
```

```
p10k configure
```

https://juejin.cn/post/7239715628172410917

> 注意：下载字体建议使用全局代理

#### 别名配置

在家目录新建 `~/.bashrc` 文件，做以下配置

```sh
# base config
alias see="ps -ef|grep"
alias rl="source ~/.zshrc"
alias bashconf="code ~/.zshrc"
alias gitconf="code ~/.gitconfig"
alias npmconf="code ~/.npmrc"
alias yarnconf="code ~/.yarnrc"
alias as="cat ~/.zshrc"
alias asg="cat ~/.zshrc | grep"

# git config
alias gs="git status"
alias glo="git log --oneline"
alias gb="git branch"
alias gtn="git tag -n"
alias grtv="git remote -v"
alias ga="git add ."
alias gac="git add . && git commit -m"
alias gaca="git add . && git commit --amend"
alias gacan="git add . && git commit --amend --no-edit"
alias gc="git commit"
alias gca="git commit --amend"
alias gcan="git commit --amend --no-edit"
alias gct="git checkout"
alias gcp="git cherry-pick"
alias gpl="git pull"
alias gp="git push"
alias gbranch="git fetch -p"
alias gtag="git fetch -P"
alias gtng="git tag -n | grep"
alias gnow="git commit --amend --date=\"$(date -R)\""

alias conf="git config --list"
alias confl="git config --local --list"
alias confg="git config --global --list"
alias reset="git reset HEAD"
alias reset!="git reset --hard HEAD"
alias reset1="git reset HEAD~1"
alias reset1!="git reset --hard HEAD~1"
alias clone="git clone"

alias rdiff="git archive --format=zip -o diff-temp.zip HEAD \$(git diff --name-only HEAD^)"

# project simple
alias cls="clear"
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."

# npm
alias docs="npm docs"
alias repo="npm repo"

# proxy
alias unproxy="git config --global --unset http.proxy && git config --global --unset https.proxy"
alias proxy="git config --global http.proxy http://127.0.0.1:1081 && git config --global https.proxy https://127.0.0.1:1081"
alias shproxy="export http_proxy=http://127.0.0.1:1081;export https_proxy=http://127.0.0.1:1081;export ALL_PROXY=socks5://127.0.0.1:1080"
alias unshproxy="unset http_proxy https_proxy ALL_PROXY"

#tk
alias my="git config user.name * && git config user.email *@qq.com"
alias cmy="git config user.name * && git config user.email *.com"
alias clsmy="git config --unset user.name && git config --unset user.email"
```

配置成功，在 .zshrc 中添加 `source ~/.bashrc `

#### 插件

https://www.zhihu.com/question/49284484

##### 内容补全 - zsh-autosuggestions

1. 下载 zsh-autosuggestions

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

2. 配置插件，在 `~/.zshrc` 文件下添加如下内容。

```bash
plugins=(... zsh-autosuggestions) # 「...」表示以前的插件
```

> 实际是执行相关脚本实现内容补全
>
> ```bash
> source ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
> source $ZSH_CUSTOM/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
> ```

##### 路径跳转 - autojump

```
brew install autojump
```

```sh
plugins=(... autojump)
```

##### 高亮 - zsh-syntax-highlighting

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

```sh
plugins=(... zsh-syntax-highlighting)
```

### vim

vim 高亮配置

`vim ~/.vimrc`

```
:syntax on
:set hlsearch
:set tabstop=4
:set autoindent
```

### java

jdk 安装

1. 下载 jdk

下载地址：[jdk1.8.0_40](<http://www.[oracle](https://so.csdn.net/so/search?q=oracle&spm=1001.2101.3001.7020).com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html>)

2. 安装 jdk

```bash
# 默认安装地址
/Library/Java/JavaVirtualMachines/jdk1.8.0_40.jdk/Contents/Home
```

3. 配置 jdk

在 `~/.bashrc` 下添加如下配置

```bash
export JAVA_HOME=‘/Library/Java/JavaVirtualMachines/jdk1.8.0_40.jdk/Contents/Home‘

export PATH=$JAVA_HOME/bin:$PATH

export CLASSPATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
```

> 如果安装 zsh ，也可将配置添加到 ./zshrc

添加完成后，通过`source ~/.bashrc` 使配置生效

4. 验证

```bash
$ java -version
java version "1.8.0_391"
Java(TM) SE Runtime Environment (build 1.8.0_391-b13)
Java HotSpot(TM) 64-Bit Server VM (build 25.391-b13, mixed mode)
```

## 快捷键记录

|                    | window               | macOS              |
| ------------------ | -------------------- | ------------------ |
| 剪切文件           | ctrl + x 后 ctrl + v | ⌘ + c 后 ⌘ + ⌥ + v |
| 撤销               | ctrl + y             | ⌘ + z              |
| 锁屏               | window + L           | ⌃ + ⌘ + q          |
| 文件搜索           |                      | ⇧ + ⌘ + o          |
| 显示/隐藏 隐藏文件 |                      | ⌘ + ⇧ + .          |

https://juejin.cn/post/6844903849572974605

### typora

|              | window   | macOS     |
| ------------ | -------- | --------- |
| 最近文件列表 | ctrl + p | ⇧ + ⌘ + o |
|              |          |           |
|              |          |           |

### vscode

|                  | window               | macOS           |
| ---------------- | -------------------- | --------------- |
| 打开 vscode 终端 | ctrl + \`            | ⌘ + J 或 ⌃ + \` |
| 块注释           | alt + shift + /      | ⇧ + ⌥ + a       |
| 搜索符号         |                      | ⇧ + ⌥ + o       |
| 添加光标         | ctrl + shift + ↓ / ↑ | ⌘ + ⌥ + ↓ / ↑   |
| 回跳至上一次光标 | alt + -              | ⌃ + -           |

> window：https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf
>
> macOS：https://code.visualstudio.com/shortcuts/keyboard-shortcuts-macos.pdf

## 问题记录

### 问题 1：Failed to connect to raw.github.com port 443: Connection refused

解决：

```bash
export http_proxy=http://127.0.0.1:1081;export https_proxy=http://127.0.0.1:1081;export ALL_PROXY=socks5://127.0.0.1:1080
```

### 问题 2： You may be on a Mac, and need to install the Xcode Command Line Developer Tools.

If so, run `xcode-select --install` and try again. If not, please report this!

解决：app store 搜索 Xcode 安装

### 问题 3：zsh: command not found: nvm

在 ~/.zshrc 中追加下面文案，然后执行 `source ~/.zshrc`

```bash
source ~/.nvm/nvm.sh
```

### 问题 3：端口占用

mac EADDRINUSE: address already in use 0.0.0.0:9002

解决：安装 kill-port 并执行以下命令

```bash
npx kill-port 9002
```

### 问题 4：zsh: command not found: code

临时解决：vscode 面板（shift + command + p）中 Shell Command: Install 'code' command in PATH

长期：https://juejin.cn/post/6951968350754832420

访达 -> 应用程序 -> vscode -> 右键查看包位置 -> 找到 bin/code 路径

```sh
alias code="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
```

## 其他

### Mac 相关设置

鼠标滚轮反向 - 「鼠标」-> 关闭「自然滚动」

单击点击 - 「触摸板」-> 开启「单击点击」

### 目录参考

code -> 自己的代码

work -> 工作代码

src -> 非 git 仓库源码

github -> github 拉下来的仓库

startup -> 开机脚本

### 常见命令

```sh
ifconfig en0
```

### Mac 符号

⇧

⌘

⌥

⌃

↓

↑
