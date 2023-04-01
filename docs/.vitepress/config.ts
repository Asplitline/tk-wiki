import { nav, sidebar, pages } from '../../themeConfig'
import { baseURL } from '../../themeConfig/constants'
import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { github } from './meta'
export default defineConfig({
  title: ' ',
  description: 'tk Wiki',
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  base: `${baseURL}/`,
  themeConfig: {
    logo: '/logo-text.svg',
    outline: 'deep',
    nav: nav,
    editLink: {
      pattern: `${github}/tree/main/docs/:path`,
      text: '在 GitHub 上编辑此页'
    },
    sidebar: {
      ...sidebar
    },
    footer: {
      message: '备案号：<a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2022016215号-1	</a>',
      copyright: ''
    },
    algolia: {
      appId: 'K106B03X2S',
      apiKey: '087f59581f4c0842489cd49a5544ad71',
      indexName: 'wiki',
      placeholder: '请输入关键词'
    }
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
    fs.writeFileSync(path.resolve(__dirname, '../public/sidebar.json'), JSON.stringify(sidebar, null, '\t'))
    fs.writeFileSync(path.resolve(__dirname, '../public/nav.json'), JSON.stringify(nav, null, '\t'))
    fs.writeFileSync(path.resolve(__dirname, '../public/pageInfo.json'), JSON.stringify(pages, null, '\t'))
  } else {
    console.log('sidebar: ', sidebar)
    fs.writeFileSync(path.resolve(__dirname, '../public/sidebar-test.json'), JSON.stringify(sidebar, null, '\t'))
  }
}
