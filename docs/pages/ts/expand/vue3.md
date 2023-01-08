---
title: TS 在 Vue3 中应用
order: 3
---

# TS 在 Vue3 中应用

## Inject & Provide

参考：[TypeScript / Vue 3: Injecting mutating function causes TypeScript error “Object is of type ‘unknown’”](https://stackoverflow.com/questions/68149678/typescript-vue-3-injecting-mutating-function-causes-typescript-error-object)

```typescript
// types/provide
export type formatDateFunc = (v: number | string) => string
export const formateDateKey: InjectionKey<formatDateFunc> = Symbol('formateDate')
```

```javascript
// provide
import { formatDateFunc, formateDateKey } from './types/provide'

const formatDate: formatDateFunc = (v) => {
  const value = new Date(v)
  return value === 'Invalid Date' ? '暂无' : value
}

provide(formateDateKey, formatDate)
```

```javascript
// inject
const format = inject(formateDateKey)

// Cannot invoke an object which is possibly 'undefined'.ts(2722)
format?.(utime)
```
