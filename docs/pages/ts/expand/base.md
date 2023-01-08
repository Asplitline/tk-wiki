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
