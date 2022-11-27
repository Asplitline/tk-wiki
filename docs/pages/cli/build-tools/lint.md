---
title: Linters
order: 2
---

# Linters

## commitlint

描述：git commit 提交信息检查

文档：https://commitlint.js.org/

仓库：https://github.com/conventional-changelog/commitlint

### 使用

1. 安装 commitlint 命令行 和 commitlint 通用配置

```bash
yarn add --dev @commitlint/cli @commitlint/config-conventional
```

2. 项目根目录下添加 config 文件

```javascript
echo "module.exports = {extends: ['@commitlint/config-conventional']}" > commitlint.config.js
```

3. 配置 package，安装依赖后初始化 husky

```javascript
{
  "scripts": {
    "prepare": "yarn husky install || npx husky install"
  }
}
```

4. 安装 husky，husky 是 githook 辅助器

```javascript
yarn add --dev husky
```

5. 添加 commit hook

```javascript
cat <<EEE > .husky/commit-msg
#!/bin/sh
. "\$(dirname "\$0")/_/husky.sh"

npx --no -- commitlint --edit "\${1}"
EEE
```

> <<EEE ... EEE：用于多行文本输入，第一个 EEE 表示开始，第二个表示结束
