import { nav, sidebar } from '../../themeConfig'
import { defineConfig } from 'vitepress'

// console.log(sidebar)
export default defineConfig({
  title: 'Tk Docs',
  description: 'my notes',
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  base: '',
  themeConfig: {
    nav: nav,
    sidebar: sidebar
  }
})
// export default config
