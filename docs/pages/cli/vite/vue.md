---
title: Vue
order: 3
---

# Vite Config - Vue

## Svg-icon

1. 安装依赖

```bash
yarn add vite-plugin-svg-icons -D
```

2. 配置 svg

```js
import { defineConfig } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
const rootDir = dirname(fileURLToPath(import.meta.url))
export default defineConfig({
  plugins: [
    // https://github.com/vbenjs/vite-plugin-svg-icons
    createSvgIconsPlugin({
      iconDirs: [resolve(rootDir, 'src/assets/svg')],
      symbolId: 'icon-[name]'
    })
  ]
})

```

3. 编写 svg-icon 组件

```vue
<!-- SvgIcon.vue -->
<template>
  <div v-if="isOnlineSvg" :style="svgStyle" class="svg-icon svg-icon-online" :class="className" />
  <svg
    aria-hidden="true"
    :style="{
      fontSize: size + 'px'
    }"
    class="svg-icon"
    :class="className"
    v-else
  >
    <use :href="symbolId" />
  </svg>****
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String
  },
  className: {
    type: String
  },
  size: {
    type: Number
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const isOnlineSvg = computed(() => /^(https?:)/.test(props.name))
const svgStyle = computed(() => {
  const baseStyle: { '--svg-icon-url'?: string; fontSize?: string } = {}
  if (isOnlineSvg) {
    baseStyle['--svg-icon-url'] = `url(${props.name})`
  }
  if (props.size) {
    baseStyle['fontSize'] = props.size + 'px'
  }
  return baseStyle
})
</script>

<style lang="scss" scoped>
.svg-icon {
  fill: currentColor;
  overflow: hidden;
  width: 1em;
  height: 1em;
  font-size: 24px;
}

.svg-icon-online {
  background-color: currentColor;
  mask-image: var(--svg-icon-url);
  -webkit-mask-image: var(--svg-icon-url);
  mask-size: cover;
  -webkit-mask-size: cover;
  display: inline-block;
}
</style>

```

4. 在 main.ts 注册 svg

```js
import 'virtual:svg-icons-register'
```

5. 使用。（假定存在 `src/assets/svg/arrow-left.svg` ）

```vue
<svg-icon name="arrow-left"></svg-icon>
```



## Vue3 无法识别 @

在 tsconfig.json 配置

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
}
```

