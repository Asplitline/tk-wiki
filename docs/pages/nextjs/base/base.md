---
outline: deep
title: 基础
order: 2
---

# Base

/pages/\_app.js - 处理全局样式

```javascript
import '../styles/global.css'
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

/pages/404.js - 重写 404 页面

```javascript
export default function Custom404() {
  return <h1>404 - Page Not Found</h1>
}
```
