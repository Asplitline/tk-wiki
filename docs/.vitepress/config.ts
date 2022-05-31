import { nav, sidebar } from '../../themeConfig'
import { defineConfig } from 'vitepress'

import * as i from '../../json/sidebar.json'
// console.log('i :', i)
import fs from 'fs'
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
    // sidebar: {}
    sidebar: sidebar
    // sidebar: i.default
  }
})
// export default config
try {
  generateJson(true)
} catch (error) {
  console.log('error :', error)
}

function generateJson(test = false) {
  console.log('is Test :', test)
  if (!test) {
    fs.writeFileSync('./json/sidebar.json', JSON.stringify(sidebar, null, '\t'))
    fs.writeFileSync('./json/nav.json', JSON.stringify(nav, null, '\t'))
  } else {
    fs.writeFileSync('./json/sidebar-test.json', JSON.stringify(sidebar, null, '\t'))
  }
}
