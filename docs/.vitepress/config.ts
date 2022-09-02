import { nav, sidebar } from '../../themeConfig'
import { defineConfig } from 'vitepress'
import fs from 'fs'
export default defineConfig({
  title: 'Tk Wiki',
  description: 'tk Wiki',
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  base: '',
  themeConfig: {
    nav: nav,
    sidebar: {
      ...sidebar
    }
    // sidebar: i.default
  }
})
try {
  generateJson()
} catch (error) {
  console.log('error :', error)
}

function generateJson(test = false) {
  console.log('is Test :', test)
  if (!test) {
    fs.writeFileSync('./json/sidebar.json', JSON.stringify(sidebar, null, '\t'))
    fs.writeFileSync('./json/nav.json', JSON.stringify(nav, null, '\t'))
  } else {
    console.log('sidebar: ', sidebar)
    fs.writeFileSync('./json/sidebar-test.json', JSON.stringify(sidebar, null, '\t'))
  }
}
