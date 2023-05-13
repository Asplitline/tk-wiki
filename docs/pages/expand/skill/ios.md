---
title: IOS
order: 3
---

# IOS 奇淫技巧

## 自定义 IOS 脚本

1. 新建 command 文件

2. 给 command 文件设置权限

```bash
chmod +x START.command
```

3. 编写 command 命令

```
open -a QQMusic.app
open -a WeChat.app
exit
```

原理：通过 `open -a` 打开 app，appName 为应用详情的名称

> 修改文件在 xcode 里面操作，通过文本编译器操作会乱码

4. 双击 command 文件
