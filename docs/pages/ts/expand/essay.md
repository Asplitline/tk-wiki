---
title: TS 杂谈
order: 6
---

# TS 杂谈

## import 和 import type

`import`：导入一个标准 JS 值和值类型

`import type`：导入值类型

`import` 导入最终 js

### 编译差异

```ts
// foo.ts
export function foo() {
  console.log('Hello')
}

// bar.ts
import { foo } from './foo'
```

```ts
'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var foo_1 = require('./foo')
// The require statement will execute the code in foo.ts and print "Hello" to the console
```

`import type` 导入最终 js

```ts
// bar.ts
import type { foo } from './foo'
```

```ts
'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
// There is no require statement, so the code in foo.ts is not executed and nothing is printed to the console
```

### `import type`优点

1. 使用 import type 没有具体的 type，会报错

```js
// foo.js
export function foo() {
  console.log('Hello')
}

// bar.js
import type { foo } from './foo'
```

```
Cannot import foo because there is no foo export in ./foo. [missing-export]

     1| // bar.js
     2| import type { foo } from "./foo";
```

2. 通过 `import type` 可以避免循环依赖。`import type` 只影响类型检测，不是运行时行为，不存在真实文件执行。

3. 代码可读性强，明确导入是类型
