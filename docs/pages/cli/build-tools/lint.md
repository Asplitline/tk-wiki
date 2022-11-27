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

## Eslint

### 基本配置

```json
env: {
   browser: true,
   es6: true,
   node: true
},
rules: {
  'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
  "no-tabs": 0,
  "eol-last":0,
  "space-before-function-paren": 0,
  "indent": "off"
},
parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module'
},
```

### 常见错误

| 错误                                             | 解决                              |
| ------------------------------------------------ | --------------------------------- |
| error Unexpected tab character                   | "no-tabs": 0                      |
| Newline required at end of file but not found    | eol-last: 0                       |
| Missing space before function parentheses        | "space-before-function-paren": 0, |
| Expected indentation of 2 spaces but found 1 tab | "indent": "off"                   |
| 'require' and 'process' is not defined           | node: true                        |
| upgrade es version                               | ecmaVersion: 2020                 |

### 错误整理

#### 废除多个规则

同时废除多个规则`, `号隔开

```javascript
// eslint-disable-next-line no-multi-assign,new-cap
const widget = new (window as any).TradingView.widget({ ...config, datafeed })
```

#### warning Delete `CR`

```json
'prettier/prettier': [
  'error',
  {
    endOfLine:'auto',
  },
],
```

#### 禁用 min.js 报错

1. 禁入导入报错
2. 禁用文件报错

```javascript
// eslint-disable-next-line import/extensions
import 'lib/charting_library/charting_library.min.js'
```

```javascript
/* eslint-disable */
```

### Eslint-prettier

在 eslint 中重写 prettier

文档：https://github.com/prettier/prettier-eslint

```javascript
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        quoteProps: 'as-needed',
      },
    ],
  }
```
