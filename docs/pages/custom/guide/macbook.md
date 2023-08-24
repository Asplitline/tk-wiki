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

on my zsh：终端

```bash

```



### on my zsh

终端工具

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



#### 插件

内容补全 - zsh-autosuggestions

1. 下载  zsh-autosuggestions

```bash
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
```

2. 配置插件，在 `~/.zshrc` 文件下添加如下内容

```bash
plugins=(git zsh-autosuggestions)
```

补充：实际是执行相关脚本实现内容补全

```bash
source ~/.oh-my-zsh/custom/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh  
source $ZSH_CUSTOM/plugins/zsh-autosuggestions/zsh-autosuggestions.zsh
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

解决：vscode 面板（shift + command + p）中 Shell Command: Install 'code' command in PATH



## 目录参考

code -> 自己的代码

work -> 工作代码

src -> 非 git 仓库源码

github -> github 拉下来的仓库

startup -> 开机脚本



## 快捷键记录

剪切文件：command + c 后 command + option + v



块注释：

window： alt + shift + /

Mac：shift + option + a



打开vscode终端

window：crtrl + `

Mac: ^ + `



撤销

window：ctrl + y

Mac： shift + option + z



锁屏

window： window + L

Mac：^ + command + q



https://juejin.cn/post/6844903849572974605



## 其他

鼠标滚轮反向 - 「鼠标」-> 关闭「自然滚动」