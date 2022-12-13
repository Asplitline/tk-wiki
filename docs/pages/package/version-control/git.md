---
title: Git
order: 1
---

# Git

| git 仓库         | 暂存区             | 工作目录              |
| ---------------- | ------------------ | --------------------- |
| 用于存放提交记录 | 临时存放被修改文件 | 被 Git 管理的项目目录 |

## 基础

```shell
# 初始化git仓库
git init
```

```shell
git 命令 -h # 简略
git 命令 --help #详细
```

```shell
# 查看git历史
history
# 搜索关键字
history | grep <keyword>
```

```shell
# 提交暂存区文件（当前目录极其子孙）
git add .
# 添加到暂存区(整个项目文件,不管当前路径)
git add --all # -A
# 提交修改文件
git add -u
```

## status - 状态

```shell
# 查看文件状态
git status
git status -s # 简短
git status --ignored # 包括忽略文件
```

## branch - 分支命令

主分支（master）：第一次向 git 仓库中提交更新记录时自动产生的一个分支。

开发分支（develop）：作为开发的分支，基于 master 分支创建。

功能分支（feature）：作为开发具体功能的分支，基于开发分支创建

功能分支 -> 开发分支 -> 主分支

### 查看分支

```shell
# 查看分支
git branch    # 本地
git branch -r # 远程
git branch -a # 所有（包括远端）
git branch -v # 显示分支提交信息
git branch -vv # 包括远程分支信息
```

```shell
# 创建分支
git branch <branch_name>

# 分支改名
git branch -m old new
git branch -m new # 当前分支改名

# 切换分支
git checkout 分支名称

# 拉取远程分支并创建本地分支
git checkout -b dev origin/dev  # 获取远程dev分支，在本地起名为dev分支，并切换到本地的dev分支
git fecth origin dev:dev # 获取远程dev分支到本地dev分支 - 需要手动切换到本地dev

# 删除远程分支
git push origin --delete 分支名称 # --delete 简写 -d
```

```shell
# 查看已合并分支
git branch --merged
# 查看未合并分支
git branch --no-merged
# 删除分支（分支被合并后才允许删除）
git branch -d <branch_name>
# 强制删除分支
git branch -D <branch_name>
```

## log - 版本历史

### log

```shell
# 查看历史记录
git log
# 简洁历史记录
git log --oneline
git log --pretty=online # 会完全显示id
# 倒序查看
git log --reverse
# 对比查看
git log -p
# 最近num次提交
git log -<num>
# 文件变化
git log --name-only
# 文件状态（A | M）
git log --name-status
```

```shell
# 范围 f5f630a和HEAD 之间记录
git log f5f630a..HEAD
# 查看文件变化的记录
git log a.js
```

```shell
# 查看上一次提交
git log -n1 -p
# 等效写法
git show
```

### reflog

可以查看所有分支的所有操作记录（包括**被删除的 commit 记录和 reset 的操作**）

```shell
git relog
```

## commit - 提交

```shell
# 向仓库中提交代码
git commit -m 提交信息
git commit -m 添加readme

# 合并 add + commit - 修改+删除文件，不含添加文件
git commit -a -m 提交信息
git commit -am 提交信息

# 修改提交信息 && 合并提交
git commit --amend # 修改提交信息（会提交缓存区代码）
git commit --amend -m 'xx'# 直接修改提交信息（会提交缓存区代码）
git commit --amend --only # 只改提交信息
git commit --amend --only -m 'xx'
```

## push - 推送

`git push` ： 将本地变更上传

```shell
# 添加别名
git remote add <remote_alias> <remote_url>
# 记住本次推送的分支和别名
git push -u <remote_alias> <branch_name>
git push --set-upstream <remote_alias> <branch_name>
# 推送仓库
git push <remote_url> <branch_name>
git push <remote_alias> <branch_name> #需先取别名
git push # 需先记住地址
```

> 不带参数，与`push.default`有关

## stash - 临时存储区

暂时提取分支上所有的改动并存储，让开发人员得到一个干净的工作副本，临时转向其他工作。

**默认情况**

- 添加到暂存区的修改（staged changes）
- Git 跟踪的但并未添加到暂存区的修改（unstaged changes）不会缓存
- 在工作目录中新的文件（untracked files）
- 被忽略的文件（ignored files）

> 使用-u 或者--include-untracked 可以 stash untracked 文件
> 使用-a 或者--all 命令可以 stash 当前目录下的所有修改

```shell
# 暂存区文件添加至临时存储区
git stash
# 添加描述
git stash save <note>
# 临时存储区列表
git stash list
# 查看临时存储区文件区别
git stash show
git stash show stash@{0}
git stash show --patch # 简写 -p，更详细信息
```

```shell
# 恢复临时存储区（删除记录）
git stash pop
# 恢复临时存储区（不删除记录）
git stash apply stash@{0} # 旧写法
git stash apply n
# 删除临时存储区
git stash drop
# 清空临时存储区
git stash clear
```

> **恢复的时候注意当前分支是否为当初保存的分支**

```shell
# 从stash 新建 分支
git stash branch new_banch

# 将0记录提出，并新建分支（不删除记录）
git stash branch demo 0
```

自定义 statsh

作用：创建了一个记录，但当前修改或删除的文件**并未从工作区移除**

> 正常 stash，创建记录并清空工作区，方便切换分支

```shell
git stash create
# 09eb9a97ad632d0825be1ece361936d1d0bdb5c7
git stash store 09eb9a97ad632d0825be1ece361936d1d0bdb5c7
git stash list
# stash@{0}: Created via "git stash store".
```

## config - 配置

```shell
# 配置全局姓名和邮箱
git config --global user.name <user_name>
git config --global user.email <user_email>

# 配置局部姓名和邮箱
git config user.name <user_name>
git config user.email <user_email>

# 为命令取别名
git config alias.a add

# 查看所有配置
git config --list
# 查看局部配置
git config --local --list
# 查看全局配置
git config --global --list
```

```shell
# 全局配置文件
cd # 进入家目录
subl .gitconfig
# 或者
subl ~/.gitconfig

# 局部配置文件
subl .git/config
```

`.gitignore`：不需要被 git 管理的文件名字添加到此文件中，在执行 git 命令的时候，git 就会忽略这些文件

```shell
*.txt
!a.txt
/vendor/**/*.txt
```

## remote - 远端操作

`git remote`

```shell
# 查看远程仓库别名
git remote -v
# 远端分支详情
git remote origin show
# 移除远端地址
git remote remove <alias_name> # 简写 rm
# 添加远端地址
git remote add <alias_name> <remote_url>
# 修改远端地址
git remote set-url origin <remote_url>
# 更新远端分支
git remote update origin --prune
git remote update origin -p
```

## fetch - 拉取

`git fetch`

- 远程下载本地缺失
- 更新远程分支指针
- **不会更改本地仓库状态**，`pull`拉取下来后会**自动和本地分支合并**

| 命令                           | 作用                                 |
| ------------------------------ | ------------------------------------ |
| `git fetch origin master:temp` | 拉取远端分支`master`并新建分支`temp` |

## merge - 合并分支

两个分支时会产生一个特殊的提交记录，它有两个父节点

- 默认：`fast-farward merge`合并方式，会**直接**将 `Master`分支指向 `Develop` 分支
- `--squash` ：合并时将 commit **压缩**为 1 个
- `--no-ff` ：执行正常合并，在 `Master`分支上**生成一个新节点**，保证版本演进更清晰
- `--no-edit`：没有冲突的情况下合并，自动生成 说明文字并提交（`Merge branch 'test'`）

> 压缩一个：将 多个 commit 整合，然后通过 commit 手动提交一次

```shell
git merge --squash
git merge --no-ff
git merge --no-edit
```

<img src="https://mmbiz.qpic.cn/mmbiz_png/kChlCQZAfH5eBrzeP4kHVbwcqAicZkgowMRTMOI4wPj7ZZSURhODgT5QGEicfXIS3icW6LJRTwf4YdJUWOnugxQoA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" style="zoom:50%;" />

**部分记录合并**：指定提交（commit）应用于其他分支

```shell
git cherry-pick <commitHash>
```

## rebase - replace base

合并冲突：从 master 分支新建分支，并且 master 分支由新的提交记录，此时新建分支还指向旧的 master。

rebase：将分支**出发点**从 旧 master 移动到 新 master。

- 将提交记录变为线性
- 传统合并，master 并分支新分支，合并冲突由 master 处理。
- 通过 新分支 rebase，可以将冲突，交由 **分支开发者处理。**

> 如果 master 分支没有新记录，此时合并只会移动指针（`fast-forward`）

```shell
git rebase branch_name
```

## pull - 拉取

`fetch` 和 `merge`的合并写法，`fetch`更新远程状态，`merge`更新状态和本地合并。

```shell
# fetch  + merge
git fecth origin ask:temp # 拉取远端mask到本地temp分支
git diff temp # 查看ask 和 temp 差别
git merge temp # 将temp合并到ask
git branch -d temp # 删除temp分支
# pull
git pull origin ask:ask # 将远程ask请求到本地ask
```

## checkout - 切换分支 | 还原

切换分支，或 从历史还原部分文件

```shell
# 切换并创建
git checkout -b daily/0.0.1

# 利用缓存区文件覆盖物理文件
git checkout 文件

# 创建新分支（没有历史记录）
git checkout --orphan new_branch

# 交互式比较分支
git checkout -p other_branch
```

```shell
# 从本地库 HEAD 检出 demo.html 覆盖 当前工作区
git checkout HEAD demo.html
# 还原多个文件
git checkout 90...ceb E:\\**\\src\\assets\\*.png # 支持通配符
# 将某个版本文件夹还原
git checkout 90...ceb E:\\**\\src\\views\\exception
git checkout 90...ceb src/views/auth-demo  # 相对路径
```

> `HEAD`（也可以是提交 ID、分支名、Tag 名）。省略 HEAD，从暂存区检出。

## reset - 重设

当前分支重设（reset）到指定的 `<commit>` 或者 `HEAD`

- `--mixed`：默认，保留文件内容，回退提交历史
- `--soft`：暂存区和工作区中的内容不作任何改变，HEAD 指针回退
- `--hard` ：工作区和 HEAD 指针都回退

```shell
git reset --mixed <commit>
git reset --soft <commit>
git reset --hard <commit>
```

## revert - 撤销

**撤销某次操作**，此次操作**之前和之后**的 `commit` 和 `history` 都会**保留**，并且把**这次撤销作为一次最新的提交**

```shell
git revert HEAD
# 撤销前一次 提交
git revert HEAD --no-edit
# 撤销多次操作（不会每次都提交，最终提交一次）
git revert -n HEAD
```

## tag - 标签

标签是版本库快照。通过标签，无需使用 `commit_id` 来获取固定版本代码

### 基本操作

| 命令                                    | 作用             |
| --------------------------------------- | ---------------- |
| `git tag`                               | 查看所有标签     |
| `git show-ref --tags`                   | 查看所有远程标签 |
| `git tag <tag-name>`                    | 创建标签         |
| `git tag -a <tag-name> -m <comment>`    | 为标签 增加说明  |
| `git show <tag-name>`                   | 查看标签内容     |
| `git tag -d <tag-name>`                 | 删除标签         |
| `git push origin :refs/tags/<tag-name>` | 删除远程标签     |

批量处理

```bash
# 删除所有标签（本地）
git tag -l | xargs git tag -d ）

# 批量删除包含beta的标签（本地）
git tag | grep 'beta' | xargs git tag -d

# 批量删除包含beta的标签（远程）
git show-ref --tags | grep 'beta' | awk '{print $2}' | xargs git push origin --delete
```

补充

```bash
$ git show-ref --tags | grep 'beta'
9fa2ef1cc8483b4b1....2fceda9a3ea4e0af8f2 refs/tags/v0.0.29-beta.0
cd92619c6207eba22....5de8fef8e2163713f08 refs/tags/v0.0.29-beta.1
```

awk：一种处理文本文件的语言

```bash
$ git show-ref --tags | grep 'beta' | awk '{print $2}'

refs/tags/v0.0.29-beta.0
refs/tags/v0.0.29-beta.1
```

${number}：第number个，以空格分隔

$1 -  9fa2ef1cc8483b4b1....2fceda9a3ea4e0af8f2

$2 -  refs/tags/v0.0.29-beta.0

相关技术

grep：适合单纯的查找或匹配文本

sed：适合编辑匹配到的文本

awk：适合格式化文本，对文本进行较复杂格式处理

```bash
$ git show-ref --tags | grep 'beta' | awk '{print $2}' | xargs git push origin --delete

# 等效
git push origin --delete refs/tags/v0.0.29-beta.0 refs/tags/v0.0.29-beta.1
```

> xargs：将前面结果以参数形式传入后面命令

### 推送和拉取

| 命令                                            | 作用         |
| ----------------------------------------------- | ------------ |
| `git push origin --tags`                        | 推送所有标签 |
| `git push origin <tag-name>`                    | 推送指定标签 |
| `git clone --branch <branch-name> <remote-url>` | 拉取指定分支 |

> --branch 可简写为 -b

## other - 杂项命令

### rm - 清除缓存区

git rm 等效 rm + git add

| git rm                   | git rm --cached                              | git restore --staged |
| ------------------------ | -------------------------------------------- | -------------------- |
| 从版本库移除，本地也移除 | 从版本库移除，本地存在（也可用于移除暂存区） | 移出缓存区           |

```shell
# 从版本库移除，本地也移除
git rm <fileName>
# 删除文件夹
git rm -r <fileName>
```

```shell
# 从版本库移除，本地存在（也可用于移除暂存区）
git rm --cached <fileName>
```

### restore

```shell
# 移出缓存区 - 适用于（未commit）
git restore --staged <file>
# 还原文件
git restore <file>
```

> 删除都是针对当前分支

### mv - 修改文件名

git mv 等效 mv + git add

```shell
git mv index.js Index.js
```

> git 文件名大小写不敏感，如果直接修改文件名，则无法追踪变化。

另一种方法：手动改为 `index.js => demo.js`，然后 `commit`，再 `demo.js => Index.js`

### archive - 打包操作

```shell
# 生成zip
git archive master --prefix='confict/' --format=zip > confict.zip
```

### diff - 差异

查看工作区、暂存区、本地版本库之间的文件差异

### blame - 历史信息

查看文件每行代码块的历史信息

```shell
git blame -L 1,10 demo.html
```

### submodule - 子模块

通过 Git 子模块可以跟踪外部版本库，它允许在某一版本库中再存储另一版本库，并且能够**保持 2 个版本库完全独立**

```shell
# 添加子模块
git submodule add https://github.com/gafish/demo.git demo
# 更新子模块
git submodule update demo
```

### gc - 垃圾回收

运行 Git 的垃圾回收功能，清理冗余的历史快照

```shell
git gc
```

### archive - 打包

将加了 tag 的某个版本打包提取

- `--format` ：打包格式

```shell
git archive -v --format=zip v0.1 > v0.1.zip
```

### worktree - 工作树

```bash
# 工作树详情
git worktree list
git worktree list --porcelain # 更完整

# 创建工作树
git worktree add ../工作树目录 分支(commits ID)

# 移除工作树
git worktree remove <worktreePath>
git worktree remote -f <worktreePath> # 强制清理

# Prune working tree information in $GIT_DIR/worktrees.
git prune
```

### cherry-pick - 筛选

作用：将指定提交作用于其他分支

#### 基本用法

```bash
# commitHash作用于当前分支
git cherry-pick <commitHash>
# 参数也可以是分支名
git cherry-pick <branchName>
```

例子

```bash

    a - b - c - d   Master
         \
           e - f - g Feature
```

```bash
# 切换到 master 分支
git checkout master

# Cherry pick 操作
git cherry-pick f
```

```js

    a - b - c - d - f   Master
         \
           e - f - g Feature
```

#### 转移多个提交

```bash
# 转移 HashA HashB
git cherry-pick <HashA> <HashB>
# 转移 A 到 B （不包含A）
git cherry-pick A..B
# 转移 A 到 B
git cherry-pick A^..B
```

场景：节点为合并节点，cherry-pick 会失败

原因：不知道采用哪个分支变动

```bash
git cherry-pick -m 1 <commitHash>
```

> 1：接收合并的分支
>
> 2：变动来源的分支

#### 代码冲突

代码冲突，cherry-pick 会暂停。

方式一： --continue

1. 用户解决冲突

2. 添加暂存区

3. `git cherry-pick --continue`

方式二：--abort：放弃合并，还原

方式三：--quit：放弃合并

### vscode 配置 gitbash

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

## 系统配置

.bash_profile：登录时执行一次，可以手动执行

.bashrc：登录或打开新 shell 时执行

修改 `~/.bashrc` 或 `~/.bash_profile`文件都可，建议使用 `.bashrc`，新开 shell 时无需再手动读取配置文件

```shell
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
alias grm="git remote -v"
alias ga="git add ."
alias gc="git commit"
alias gac="git add . && git commit -m "
alias gaca="git add . && git commit --amend"
alias go="git checkout"
alias gpl="git pull"
alias gp="git push"
alias gck="git checkout"
alias gbranch="git fetch -p"
alias gtag="git fetch -P"
alias gtng="git tag -n | grep"
alias conf="git config --list"
alias confl="git config --local --list"
alias confg="git config --global --list"
alias reset="git reset HEAD"
alias reset1="git reset HEAD~1"

alias unproxy="git config --global --unset http.proxy && git config --global --unset https.proxy"
alias proxy="git config --global http.proxy http://127.0.0.1:1081 && git config --global https.proxy https://127.0.0.1:1081"

# project simple
alias cls="clear"
alias ..="cd .."
alias ...="cd ../.."
alias ....="cd ../../.."
# tk
alias my="git config user.name Asplitline && git config user.email *@qq.com"
alias cmy="git config user.name tink && git config user.email tink@tink.com"
alias clsmy="git config --unset user.name && git config --unset user.email"

# npm
alias docs="npm docs"
alias repo="npm repo"

```

问题：bash: xx: command not found

```bash
source ~/.bash_profile
```

> 在~/.bash_profile 文件中定义完别名，使用 source 命令刷新当前 shell 环境

参考 [[1]](#相关链接)

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

### git bash 乱码

修改 `计算机\HKEY_CURRENT_USER\Console\D:_git_Git_usr_bin_bash.exe`中 codePage 为 十进制 65001

![image-20221031113553307](.\git.assets\image-20221031113553307.png)

### 清除未追踪文件

场景：git status 后，发现包含 修改文件(Changes not staged for commit) 和 未追踪文件 (untracked file)

，只想删除 untracked file

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

## 相关链接

[[1] Zsh alias](https://www.hejian.club/posts/ohMyZsh-alias)

[多个 commits 合并](https://www.cnblogs.com/yxhblogs/p/10527271.html)

[自定义 bash 别名](https://www.hejian.club/posts/ohMyZsh-alias)

[.bash_profile 和.bashrc 的区别](https://www.cnblogs.com/520yang/articles/8384321.html)
