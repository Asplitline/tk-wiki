---
title: 三方库
order: 2
---

# Vue3 三方库实战

## naive-ui

### message 全局挂载

场景：默认情况下，在 navie-ui 使用 message 有以下限制条件

1. 在外部包裹 `n-message-provider`
2. 在setup下使用 `useMessage()`

问题：

第一条限制：导致无法在以下场景使用

```html

<template>
    <n-message-provider>
           <!-- ... -->
    </n-message-provider>
</template>

<script lang="ts" setup>
import { NMessageProvider, useMessage } from "naive-ui";
const message = useMessage()
</script>
```

第二条限制：无法在 非 setup 下使用

解决：

第一种：使用 [createDiscreteApi](https://www.naiveui.com/zh-CN/os-theme/components/discrete)

第二种：挂载到 window 对象下

```js
window.$message = useMessage()
```

注意：直接在 `n-message-provider` 包裹的组件下获取 message，会出下以下错误

```html
Uncaught Error: [naive/use-message]: No outer <n-message-provider /> founded. See prerequisite in https://www.naiveui.com/en-US/os-theme/components/message for more details. If you want to use `useMessage` outside setup, please check https://www.naiveui.com/zh-CN/os-theme/components/message#Q-&-A.
```

解决：需要在外裹一层。

具体示例如下：

```html
<!-- GlobalContainer.vue -->
<template>
    <router-view />
</template>

<script lang="ts" setup>
import { useMessage } from "naive-ui";
window.$message = useMessage();
</script>

```

```html
<!-- App.vue -->
<template>
    <n-message-provider>
           <global-container />
    </n-message-provider>
</template>

<script lang="ts" setup>
import { NMessageProvider } from "naive-ui";
import GlobalContainer from ".../GlobalContainer.vue";
</script>
```

> 参考：https://www.naiveui.com/zh-CN/os-theme/components/message#%E5%9C%A8-setup-%E5%A4%96%E4%BD%BF%E7%94%A8

