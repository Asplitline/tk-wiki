---
title: 配置与实战
order: 3
---

# Git 配置与实战

## 配置

### 别名配置

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
alias as="cat ~/.bashrc"
alias asg="cat ~/.bashrc | grep"

# git config
alias gs="git status"
alias gl="git log --graph --pretty=format:'%Cred%h%Creset q-%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit  "
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

### Vscode 配置 Git Bash

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

### 配置 ssh 拉取代码

1. 将 ssh 密钥文件添加至 .ssh 目录下。如：`C:\Users\administrator\.ssh`

```shell
# 密钥文件
<key_file>.pub
<key_file>
```

2. 新增配置文件`config`，指向 ssh 密钥文件

```
Host codeup.aliyun.com
HostName codeup.aliyun.com
IdentityFile ~/.ssh/<key_file>
User <dev_name>
```

> 如果未发现 .ssh 文件，通过 `ssh-keygen -t rsa -C 123@qq.com` 命令生成

### vscode 配置全局 .gitignore

以 .history 文件举例

1. 创建 .gitignore，并向其写入 .history

```bash
echo .history >> ~/.gitignore
```

2. 应用 .gitignore

```bash
git config --global core.excludesfile ~/.gitignore
```

3. 全局 .gitignore 生效，如果 vscode `source control` 不生效，点击刷新

补充：vscode setting.json 进行如下配置，进一步优化体验

```json
 // 文件列表不显示 .history
 "files.exclude": {
    "**/.history": true,
  },
 // 搜索不显示 .history
  "search.useGlobalIgnoreFiles": true,
  "search.useIgnoreFiles": true,
  "search.exclude": {
    "**/.history": true
  }
```

### git bash 乱码

修改 `计算机\HKEY_CURRENT_USER\Console\D:_git_Git_usr_bin_bash.exe`中 codePage 为 十进制 65001

![image-20221031113553307](config.assets/image-20221031113553307.png)

### Git 多平台换行符问题

**文本文件所使用的换行符，在不同的系统平台上是不一样的**。

UNIX/Linux 使用的是 `0x0A（LF）`，早期的 Mac OS 使用的是 `0x0D（CR）`，后来的 OS X 在更换内核后与 UNIX 保持一致了。但 DOS/Windows 一直使用 `0x0D0A（CRLF）` 作为换行符。

Git 提供了一个 `autocrlf` 的配置项，用于在**提交和检出时自动转换换行符**，该配置有三个可选项

- **true:** 提交时转换为 LF，检出时转换为 CRLF
- **false:** 提交检出均不转换
- **input:** 提交时转换为LF，检出时不转换

```bash
# 提交时转换为LF，检出时转换为CRLF
git config --global core.autocrlf true

# 提交时转换为LF，检出时不转换
git config --global core.autocrlf input

# 提交检出均不转换
git config --global core.autocrlf false
```

把 `autocrlf` 设置为 false 时，那另一个配置项 `safecrlf` 最好设置为 **ture**。该选项用于检查文件是否包含混合换行符，其有三个可选项：

- **true:** 拒绝提交包含混合换行符的文件
- **false:** 允许提交包含混合换行符的文件
- **warn:** 提交包含混合换行符的文件时给出警告

```bash
# 拒绝提交包含混合换行符的文件
git config --global core.safecrlf true

# 允许提交包含混合换行符的文件
git config --global core.safecrlf false

# 提交包含混合换行符的文件时给出警告
git config --global core.safecrlf warn
```



多个系统平台上工作，推荐将 git 做如下配置

```bash
# 提交检出均不转换
git config --global core.autocrlf false
# git config --global core.autocrlf input

# 允许提交包含混合换行符的文件
git config --global core.safecrlf true
```

> 配置后需要重新拉去代码

参考链接：http://kuanghy.github.io/2017/03/19/git-lf-or-crlf

## 实战

### Git 回退

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

### 暂存区和未暂存区互换

暂存的内容变成未暂存，把未暂存的内容暂存起来

```bash
git commit -m "WIP"
git add .
git stash
git reset HEAD^
git stash pop --index 0
```

> -- index 保证 文件状态，否则默认还原为未暂存

### git status 检测不到文件变化

git 管理软件 SourceTree 会遇到往项目里新增了文件，软件却没有任何反应的问题，

这多发生在 git 合并出错而只能重新 git 的情况下，可能的原因是之前提交的文件"缓存"还在，所以相同的文件再提交时无法被检测。

```shell
1. 首先, 提交全部更新

2. 执行 git rm -r --cached .  # 删除缓存文件，不会删除物理
# -r 循环删除

3. 执行 git add .

4. 执行 git commit -m .  # SourceTree自带推送按钮，这一步命令行可以省略.
```

### 无法监测文件名大小写

`git mv`

```
git mv Hello.js hello.js
```

`git commit`

- Hello.js：随意改名
- 提交
- 然后改回 hello.js

> 需要通过 commit 后，再操作才能监听

### 锁定的 main

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

### git clone - RPC failed

```bash
error: RPC failed; curl 18 transfer closed with outstanding read data remaining
fetch-pack: unexpected disconnect while reading sideband packet
fatal: early EOF
fatal: fetch-pack: invalid index-pack output
```

```bash
git config --global http.postBuffer 524288000
```

### remote: HTTP Basic: Access denied

```bash
fatal: Custom certificate bundle not found at path: D:/Git/mingw64/ssl/certs/ca-bundle.crt
fatal: Custom certificate bundle not found at path: D:/Git/mingw64/ssl/certs/ca-bundle.crt
```

```bash
git config --global http.sslVerify false
```

### OpenSSL SSL_read: Connection was reset, errno 10054

1. ssh 目录下是否有 ssh 的密钥

```shell
ls ~/.ssh

>>>>
id_rsa  id_rsa.pub
```

2. 将 pub 里的字符串配置到 ssh 中

### You are not currently on a branch

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

### 多个 commits 合并

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

参考：

[多个 commits 合并](https://www.cnblogs.com/yxhblogs/p/10527271.html)

### 清除工作区文件

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

### 本地分支和远端分支名称不匹配

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

### 清除未追踪文件

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

### 撤销 git commit --amend

查看提交记录

```bash
git reflog
ccccccc HEAD@{0}: commit (amend): xxxx
bbbbbbb HEAD@{1}: commit: xxxx
```

撤销 --amend

```bash
git reset --soft HEAD@{1}
```

### 修改 commit 信息

场景：commit 提交用户信息错误

解决：通过 rebase + commit --amend 处理

第一步：rebase commit 提交记录

```bash
git rebase -i HEAD~N
```

```bash
$ git rebase -i HEAD~3
pick a6976ec6 commit-1
pick 88c985a0 commit-2(error commit)
pick e333375e commit-3
```

第二步：将对应提交信息 pick 变更为 edit，并保存（`:wq`）退出

```bash
pick a6976ec6 commit-1
edit 88c985a0 commit-2(error commit)
pick e333375e commit-3
```

第三步：输入以下命令

```bash
git commit --amend --reset-author
```

补充：上面方法可以用来改 commit message

第三步输入如下命令

```bash
git commit --amend -m <new_message>
```

### 撤销操作

#### 撤销提交

场景：想撤回某些提交

原理：新增一次提交，抵消掉上一次提交导致的所有变化

```bash
git revert HEAD
```

撤销多次提交

```bash
git revert [倒数第一个提交] [倒数第二个提交]
```

参数说明

- `--no-edit`：执行时不打开默认编辑器，直接使用 Git 自动生成的提交信息。
- `--no-commit`：只抵消暂存区和工作区的文件变化，不产生新的提交。

#### 丢弃提交

场景：想丢弃某些提交

原理：最新提交指针回到以前

默认情况下，不改变工作区的文件（但会改变暂存区），可以通过 --hard 让工作区也回到以前

```bash
git reset <commitHashId>
```

> 通过 git reflog 可以找回丢弃的提交

#### 替换提交

场景：提交后，想修改提交信息

原理：产生一个新的提交对象，替换掉上一次提交产生的提交对象

```bash
git commit --amend -m "Fixes bug #42"
```

#### 撤销工作区文件

场景：工作区某个文件修改，但还没提交，通过 git checkout 找回修改之前的文件

原理：先找暂存区，如果该文件有暂存的版本，则恢复该版本，否则恢复上一次提交的版本

```bash
git checkout -- [filename]
```

#### 撤销暂存区文件

场景：不小心将文件添加暂存区，想撤销

```bash
git rm --cached [filename]
```

#### 撤销当前分支变化

当前分支上做了几次提交，突然发现放错了分支，这几个提交本应该放到另一个分支

```bash
# 新建一个 feature 分支，指向当前最新的提交
# 注意，这时依然停留在当前分支
$ git branch feature

# 切换到这几次提交之前的状态
$ git reset --hard [当前分支此前的最后一次提交]

# 切换到 feature 分支
```

参考：https://www.ruanyifeng.com/blog/2019/12/git-undo.html

### 同步本地和远端 tag

场景：远程 repository 中已经删除的 tag，使用 git fetch --prune，甚至"git fetch --tags"确保下载所有 tags，也不会让其在本地也将其删除

```bash
git tag -l | xargs git tag -d #删除所有本地分支
git fetch origin --prune #从远程拉取所有信息
git branch -a --contains Tag_V1.0.0 # 看看哪个分支包含这个tag/commit
```

参考：https://www.cnblogs.com/xiaouisme/p/10857149.html

### rebase 出现重复 commit 问题

场景: `main` 分支 rebase `origin/master` 分支

问题：直接在进行 `pull --rebase` 会出现重复 commit

```bash
# current branch - main
git pull origin --rebase master
```

解决：切到`master`，拉取 `origin/master`，然后切回 `main`，再进行 `rebase` 操作

```bash
# current branch - main
git checkout master
# current branch - master
git pull origin master
git checkout main
# current branch - main
git rebase master
```



