---
title: 三方库
order: 3
---

# 三方库实践

## vue-i18n

1. 安装 vue-i18n

```javascript
yarn add vue-i18n
```

2. 引入 vue-i18n

```javascript
// zh-CN.js
export const btn = {
  back: '返回',
  all: '全部',
  logout: '注销',
  unbind: '解绑',
  exchange: '转换'
}
```

```javascript
// main.js
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n({
	locale: 'zh-CN', //语言标识
	messages: {
		'zh-CN': require('asset/i18n/zh-CN.js'),
		'en-US': require('asset/i18n/en-US.js'),
	}
})
Vue.prototype._i18n = i18n
const app = new Vue({
	i18n,
  ...
})
app.$mount()
```

3. 使用

```vue
<template>
  <div>
    <a href="javascript:;" @click="exchange">
      {{ $t('btn.exchange') }}
    </a>
    <ul>
      <li>{{ $t('btn.back') }}</li>
      <li>{{ $t('btn.all') }}</li>
      <li>{{ $t('btn.logout') }}</li>
      <li>{{ $t('btn.unbind') }}</li>
    </ul>
  </div>
</template>
参考网站：
```

官方文档：https://github.com/kazupon/vue-i18n#readme

语言标识符：http://www.lingoes.net/zh/translator/langcode.htm

## element ui

问题：表单重置后无法输入

原因：resetFields 会清除表单，将数据设为初始值。如果未在 data 中初始化，会丢失响应式。

> resetFields：对整个表单进行重置，将所有字段值重置为初始值并移除校验结果

解决方案：

1. 在 data 中赋予初始值
2. 通过 $set 设置响应式

## wangEditor

自定义图片上传

```javascript
const editor = new E('#editor')
const baseUrl = 'http://47.108.129.64:8089'
editor.config.customUploadImg = async (resultFiles, insertImgFn) => {
  const formData = new FormData()
  formData.append('files', resultFiles[0])
  const res = await fetch('/api/file/uploadFile', {
    method: 'post',
    body: formData
  })
  console.log(res)
  insertImgFn(`${baseUrl}/file/${resultFiles[0].name}`)
}
editor.create()
```



## font-awesome

1. 安装 font-awesome

```bash
yarn add font-awesome@^4
```

2. 在 main.js 引入

```js
import 'font-awesome/css/font-awesome.css'
```

3. 使用

```html
 <i class="fa fa-tag" aria-hidden="true"></i>
```

> font-awesome v4官网：https://fontawesome.com/v4/icons/

## xicons

1. 安装 xicons

```
yarn add @v2icons/fa @v2icons/utils
```

> @v2icons/fa 图标库
>
> @v2icons/utils 包含图标组件

2. 使用 icons

```html
<template>
  <div>
      <Icon size="20">
          <CartArrowDown size="16"></CartArrowDown>
      </Icon>
  </div>
</template>

<script>
import { CartArrowDown } from '@v2icons/fa'
export default {
  components: {
    CartArrowDown,
    Icon
  },

}
</script>


```

> xicons：https://www.xicons.org/#/
>
> guide：https://github.com/07akioni/xicons#installation
