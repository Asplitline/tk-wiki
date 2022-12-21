---
title: 配置与实战
order: 3
---



# Git 配置与实战

## ---配置---

## 别名配置

.bash_profile：登录时执行一次，可以手动执行

.bashrc：登录或打开新 shell 时执行

修改 `~/.bashrc` 或 `~/.bash_profile`文件都可，建议使用 `.bashrc`，新开 shell 时无需再手动读取配置文件

```bash
# base config
alias see="ps -ef|grep"
alias rl="source ~/.bashrc"
alias bashconf="code ~/.bashrc"
alias gitconf="code ~/.gitconfig"
alias npmconf="code ~/.npmrc"
alias yarnconf="code ~/.yarnrc"

# git config
alias gs="git status"
alias gl="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit  "
alias glo="git log --oneline"
alias gb="git branch"
alias gtn="git tag -n"
alias grtv="git remote -v"
alias ga="git add ."
alias gac="git add . && git commit -m"
alias gaca="git add . && git commit --amend"
alias gca="git commit --amend"
alias gc="git commit"
alias gct="git checkout"
alias gcp="git cherry-pick"
alias gpl="git pull"
alias gp="git push"
alias grs='git restore'
alias grst='git restore --staged'
alias gbranch="git fetch -p"
alias gtag="git fetch -P"
alias gtng="git tag -n | grep"

alias conf="git config --list"
alias confl="git config --local --list"
alias confg="git config --global --list"
alias reset="git reset HEAD"
alias reset!="git reset --hard HEAD"
alias reset1="git reset HEAD~1"
alias reset1!="git reset --hard HEAD~1"
alias clone="git clone"

# project simple
alias cls="clear"
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."

# npm
alias docs="npm docs"
alias repo="npm repo"
```

```bash
# tk
alias unproxy="git config --global --unset http.proxy && git config --global --unset https.proxy"
alias proxy="git config --global http.proxy http://127.0.0.1:1081 && git config --global https.proxy https://127.0.0.1:1081"

alias my="git config user.name Asplitline && git config user.email *@qq.com"
alias cmy="git config user.name tink && git config user.email tink@tink.com"
alias clsmy="git config --unset user.name && git config --unset user.email"
```



问题：bash: xx: command not found

```bash
source ~/.bash_profile
```

> 在~/.bash_profile 文件中定义完别名，使用 source 命令刷新当前 shell 环境

参考：

[Zsh alias](https://www.hejian.club/posts/ohMyZsh-alias)

[.bash_profile 和.bashrc 的区别](https://www.cnblogs.com/520yang/articles/8384321.html)

[ohmyzsh-git](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git)

## Vscode 配置 Git Bash

查看 git 位置

```bash
# 命令行获取 git路径
where git
```

```shell
# settings.json中配置
# "git.path": "D:\\git\\Git\\cmd\\git.exe" # 可选
"terminal.integrated.shell.windows": "D:\\git\\Git\\bin\\bash.exe"
```

新版配置

```json
"terminal.integrated.defaultProfile.windows": "bash",
"terminal.integrated.profiles.windows": {
  "bash": {
    "path": "D:\\Git\\bin\\bash.exe",
    "args": []
  }
},
```



## ---实战---

## Git 回退

1. 撤销提交

revert：新增一次提交，抵消上次提交

```bash
# 抵消上一次提交
git revert HEAD
# 抵消多次提交
git revert [倒数第一个提交] [倒数第二个提交]
```

2. 丢弃提交

reset：丢弃某个提交之后的所有提交

```bash
# 内容回到暂存区
git reset [last good SHA]

# 内容直接丢弃
git reset --hard [last good SHA]
```

> 可以通过 git flog 找回，但存在时效

3. 替换提交

产生新的提交对象，替换上次提交对象

```js
git commit --amend -m "Fixes bug #42"
```

4. 撤销工作区文件修改

先找暂存区，文件有暂存版本，恢复该版本。@QUES => 暂存区没有，恢复到上次提交版本。（**不可逆**）

```bash
git checkout -- [filename]
```

5. 暂存区撤销文件

误将文件添加到暂存区，使用 rm 撤销

```bash
git rm --cached [filename]

git restore --staged [filename]
```

6. 撤销分支变化

做了几次提交，但放错分支

解决：切到新分支，将旧分支回退

```bash
# 新建一个 feature 分支，指向当前最新的提交
# 注意，这时依然停留在当前分支
git branch feature

# 切换到这几次提交之前的状态
git reset --hard [当前分支此前的最后一次提交]

# 切换到 feature 分支
git checkout feature
```

## 暂存区和未暂存区互换

暂存的内容变成未暂存，把未暂存的内容暂存起来

```bash
git commit -m "WIP"
git add .
git stash
git reset HEAD^
git stash pop --index 0
```

> -- index 保证 文件状态，否则默认还原为未暂存

## git status 检测不到文件变化

git 管理软件 SourceTree 会遇到往项目里新增了文件，软件却没有任何反应的问题，

这多发生在 git 合并出错而只能重新 git 的情况下，可能的原因是之前提交的文件"缓存"还在，所以相同的文件再提交时无法被检测。

```shell
1. 首先, 提交全部更新

2. 执行 git rm -r --cached .  # 删除缓存文件，不会删除物理
# -r 循环删除

3. 执行 git add .

4. 执行 git commit -m .  # SourceTree自带推送按钮，这一步命令行可以省略.
```

## 无法监测文件名大小写

`git mv`

```
git mv Hello.js hello.js
```

`git commit`

- Hello.js：随意改名
- 提交
- 然后改回 hello.js

> 需要通过 commit 后，再操作才能监听

## 锁定的 main

`remote rejected`：! [远程服务器拒绝] main -> main (TF402455: 不允许推送(push)这个分支; 你必须使用 pull request 来更新这个分支.)

原因：因为策略配置要求 `pull requests` 来提交更新，远程服务器**拒绝**直接推送(`push`)提交到`main`,

解决

```shell
git checkout -b xx # 新建分支
git push # 推送分支
git checkout main
git reset --hard o/main # 回滚
git checkout xx
```

## git clone - RPC failed

```bash
error: RPC failed; curl 18 transfer closed with outstanding read data remaining
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
```

```bash
git config --global http.postBuffer 524288000
```

## remote: HTTP Basic: Access denied

```bash
fatal: Custom certificate bundle not found at path: D:/Git/mingw64/ssl/certs/ca-bundle.crt
fatal: Custom certificate bundle not found at path: D:/Git/mingw64/ssl/certs/ca-bundle.crt
```

```bash
git config --global http.sslVerify false
```

## OpenSSL SSL_read: Connection was reset, errno 10054

1. ssh 目录下是否有 ssh 的密钥

```shell
ls ~/.ssh

>>>>
id_rsa  id_rsa.pub
```

2. 将 pub 里的字符串配置到 ssh 中

## You are not currently on a branch

原因：HEAD 指向和 当前分支记录不符合

```bash
HEAD detached from refs/heads/test

# refs/heads/test => ca1f3a1
```

```bash
git branch
* (HEAD detached from refs/heads/test)

git branch temp ca1f3a1
git checkout master
git merge temp
git branch -d temp
```

## 多个 commits 合并

```bash
git rebase -i [hashA] [hashB]
```

注：左开右闭，不包含 hashA

```bash
pick a2cca36 feat: a
pick 52e9751 feat: b
pick 623fc96 feat: c
pick 42817be feat: d
```

```bash
Commands:
p, pick
use commit
r, reword
use commit,but edit the commit messagee,edit = use commit, but stop for amending
s, squash
use commit,but meld into previous commit
f, fixup
like "squash", but discard this commit's log messagex,exec = run command (the rest of the line) using shell
d, drop
remove commit
```

通过 squash 将 bcd 提交合并到 a

```bash
pick a2cca36 feat: a
s 52e9751 feat: b
s 623fc96 feat: c
s 42817be feat: d
```

参考：[多个 commits 合并](https://www.cnblogs.com/yxhblogs/p/10527271.html)

## 清除工作区文件

情况一：未 add 或 commit

```bash
git checkout .
```

情况二：checkout 无法清除新建文件或文件夹

```bash
git clean
```

情况三：清除暂存区 (已经 add)

```bash
git reset .
```

## 本地分支和远端分支名称不匹配

场景：本地分支为 main，想要推送到 远端 feat/main

解决：`git push origin HEAD:feat/main`

```bash
fatal: The upstream branch of your current branch does not match
the name of your current branch.  To push to the upstream branch
on the remote, use

    git push origin HEAD:feat/main

To push to the branch of the same name on the remote, use

    git push origin HEAD

To choose either option permanently, see push.default in 'git help config'.
```

场景：本地分支为 main，想要拉取远端分支 feat/main，无法追踪当前分支对应信息。

解决：`git branch --set-upstream-to=origin/<branch> feat/main`

```js
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> feat/main
```

## git bash 乱码

修改 `计算机\HKEY_CURRENT_USER\Console\D:_git_Git_usr_bin_bash.exe`中 codePage 为 十进制 65001

![image-20221031113553307](config.assets/image-20221031113553307.png)

## 清除未追踪文件

场景：git status 后，发现包含 修改文件(Changes not staged for commit) 和 未追踪文件 (untracked file)，只想删除 untracked file

```bash
# 删除 untracked files
git clean -f
```

扩展

```bash
# 连 untracked 的目录也一起删掉
git clean -fd
# 连 gitignore 的untrack 文件/目录也一起删掉 （慎用，一般这个是用来删掉编译出来的 .o之类的文件用的）
git clean -xfd

# 在用上述 git clean 前，墙裂建议加上 -n 参数来先看看会删掉哪些文件，防止重要文件被误删
git clean -nxfd
git clean -nf
git clean -nfd
```

## 