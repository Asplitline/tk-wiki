---
title: TS 杂谈
order: 6
---

# TS 杂谈

## import 和 import type

通常会使用`import`去导入一些类型或者值

```ts
// ./foo.ts
interface Options {
    // ...
}

export function doThing(options: Options) {
    // ...
}

// ./bar.ts
import { doThing, Options } from "./foo.js";

function doThingBetter(options: Options) {
    // do something twice as good
    doThing(options);
    doThing(options);
}
```

由于`import elision`的作用，能够同时导入值和类型。

在 typescript 编译时，会自动在生成的 js 中删除类型导入

```js
// ./foo.js
export function doThing(options: Options) {
    // ...
}

// ./bar.js
import { doThing } from "./foo.js";

function doThingBetter(options) {
    // do something twice as good
    doThing(options);
    doThing(options);
}
```

问题 1：不明确导入是类型还是值

```ts
// ./some-module.ts
export interface MyThing {
  name: string;
}

// ./src.ts
import { MyThing } from "./some-module.ts";

export { MyThing };
```

最终生成的`src.js`文件中对`MyThing`的导入和导出都会被保留, 而在`some-module.js`文件中, `MyThing`仅作为一个类型而存在, 会在编译过程中被删除, 所以最终`some-module.js`文件是空的

问题2：会删除掉仅作为类型使用的`import`导入

```ts
// 因为import elision的功能, 这行代码在最终生成的js代码中会被删除
import { SomeTypeFoo, SomeOtherTypeBar } from "./module-with-side-effects";

// 这行代码要一直存在
import "./module-with-side-effects";
```



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
