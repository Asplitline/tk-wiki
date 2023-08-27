---
title: macbook 装机
order: 2
---

# Mac 从零配置



## 常用软件

chrome：https://www.google.com/chrome/

vscode：https://code.visualstudio.com/

vrayU：[www.v2ray.com/awesome/tools.html](http://www.v2ray.com/awesome/tools.html)

beterandbetter：https://www.better365.cn/bab2.html

snipatse：https://www.snipaste.com/

item2：https://iterm2.com/



## 开发环境

### 常用

nvm，node版本

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
```

npm常用工具

```bash
# 依赖更新
npm install -g npm-check-updates
# 关闭端口
npm install -g kill-port
```

```bash
npm i -g npm-check-updates kill-port
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

http://spring4all.com/forum-post/2278.html



### on my zsh

终端工具

官网：https://ohmyz.sh/

#### 基础

安装 on my zsh

```
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

```bash
# 更换主题
open ~/.zshrc
# 查看默认主题
cd ~/.oh-my-zsh/themes && ls
# 替换主题 - ～/.zshrc
ZSH_THEME="ys.zsh-theme"
```

配置别名 - 直接添加末尾相关别名

```bash
vim ～/.zshrc
```



#### 主题

```
p10k configure
```

https://juejin.cn/post/6894432073491152910

https://juejin.cn/post/7006526195420364836

https://juejin.cn/post/7239715628172410917



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

内容补全 - zsh-autosuggestions

1. 下载  zsh-autosuggestions

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

2. 配置插件，在 `~/.zshrc` 文件下添加如下内容

```bash
plugins=(... zsh-autosuggestions)
```

补充：实际是执行相关脚本实现内容补全

```bash
source ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh  
source $ZSH_CUSTOM/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
```



路径跳转 - autojump

```
brew install autojump
```

```sh
plugins=(... autojump)
```



高亮 - zsh-syntax-highlighting

```sh
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

```sh
plugins=(... zsh-syntax-highlighting)
```



## 问题记录

问题1：Failed to connect to raw.github.com port 443: Connection refused

解决：

```bash
export http_proxy=http://127.0.0.1:1081;export https_proxy=http://127.0.0.1:1081;export ALL_PROXY=socks5://127.0.0.1:1080
```



问题2： You may be on a Mac, and need to install the Xcode Command Line Developer Tools.

If so, run `xcode-select --install` and try again. If not, please report this!

解决：app store 搜索 Xcode 安装



问题3：zsh: command not found: nvm

解决：

```bash
source ~/.nvm/nvm.sh
```



问题3：端口占用

mac EADDRINUSE: address already in use 0.0.0.0:9002

解决：安装 kill-port 并执行以下命令

```bash
npx kill-port 9002
```



问题4：zsh: command not found: code

临时解决：vscode 面板（shift + command + p）中 Shell Command: Install 'code' command in PATH

长期：https://juejin.cn/post/6951968350754832420



访达 -> 应用程序 -> vscode -> 右键查看包位置 -> 找到 bin/code 路径

```sh
alias code="/Applications/Visual\ Studio\ Code.app/Contents/Resources/app/bin/code"
```





## 目录参考

code -> 自己的代码

work -> 工作代码

src -> 非 git 仓库源码

github -> github 拉下来的仓库

startup -> 开机脚本



## 快捷键记录

剪切文件：command + c 后 command + option + v



撤销

window：ctrl + y

Mac： shift + option + z



锁屏

window： window + L

Mac：control + command + q




文件搜索

shift + command + o



https://juejin.cn/post/6844903849572974605

### typora

|              | window   | macOS               | 补充              |
| ------------ | -------- | ------------------- | ----------------- |
| 最近文件列表 | Ctrl + p | shift + command + o | window -> command |
|              |          |                     |                   |
|              |          |                     |                   |



### vscode

|                | window          | macOS                            | 补充            |
| -------------- | --------------- | -------------------------------- | --------------- |
| 打开vscode终端 | ctrl + `        | control + ` （推荐 command + j） | ctrl -> control |
| 块注释         | alt + shift + / | shift + option + a               | alt -> option   |
| 搜索符号       |                 | shift + option + o               |                 |



## 其他

鼠标滚轮反向 - 「鼠标」-> 关闭「自然滚动」