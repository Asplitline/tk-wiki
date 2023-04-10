import { nav, sidebar, pages } from '../../themeConfig'
import { baseURL } from '../../themeConfig/constants'
import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import { description, github, keywords, name, site } from './meta'
export default defineConfig({
  title: 'Tk  Wiki',
  description: 'Tk Wiki',
  lastUpdated: true,
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#3eaf7c' }],

    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'referrer', content: 'no-referrer-when-downgrade' }],
    ['meta', { name: 'keywords', content: keywords }],
    ['meta', { name: 'author', content: 'tink' }],
    ['meta', { property: 'og:type', content: 'article' }],
    ['meta', { name: 'application-name', content: name }],
    ['meta', { name: 'apple-mobile-web-app-title', content: name }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'default' }],
    // webfont
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', crossorigin: 'anonymous', href: 'https://fonts.gstatic.com' }],
    // og
    ['meta', { property: 'og:description', content: description }],
    ['meta', { property: 'og:url', content: site }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }]
  ],
  base: `${baseURL}/`,
  themeConfig: {
    logo: '/logo-text.svg',
    outline: 'deep',
    nav: nav,
    editLink: {
      pattern: `${github}/tree/master/docs/:path`,
      text: '在 GitHub 上编辑此页'
    },
    sidebar: {
      ...sidebar
    },
    footer: {
      message: '备案号：<a href="https://beian.miit.gov.cn/" target="_blank">蜀ICP备2022016215号-1 	</a>',
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
