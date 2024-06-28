---
title: TS 基础应用
order: 1
---

# TS 基础应用

## ts - 2349

错误复现伪代码

```javascript
export default function useBoolean() {
  // ***
  return [isBoolean, exchangeBoolean]
}

const [isBoolean, exchangeBoolean] = useBoolean()

exchangeBoolean()
// error : This expression is not callable.Not all constituents of type 'Ref<boolean> | ((payload?: boolean | undefined) => void)' are callable.ts(2349)
```

分析：返回的是一个复合类型的数组，类型是里面元素类型的集合，不是所有类型都能函数调用，需要把类型锁定。
解决：通过 const 断言

```javascript
export default function useBoolean() {
  // ***
  return [isBoolean, exchangeBoolean] as const
}

```

## ts - 7053

```ts
const data = {
  101: {

title: '101',
  },
   102: {

title: '102',
  },
}

const index:any = 101
console.log(data[index])
// Element implicitly has an 'any' type because expression of type 'any' can't be used to index type '{ 101: {
title: string; }; 102: {
title: string; }; }'.(7053)
```

分析：any 类型 不能用于 object key。

解决：手动指定 index 类型

```ts
const index: keyof typeof data = 101
console.log(data[index])
```



## ts - 2322

Type 'Timeout' is not assignable to type 'number'" when running unit tests

```ts
let timeoutId: null | ReturnType<typeof setTimeout> = null
...
timeoutId = setTimeout(...)
```

