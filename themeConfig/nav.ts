import { pageRoot } from './constants'
const nav = [
  {
    text: 'Vue',
    items: [
      { text: 'Vue2', link: '/vue2/index', activeMath: '/vue2/' },
      { text: 'Vue3', link: '/vue3/index', activeMatch: '/vue3/' }
    ]
  },
  {
    text: 'JavaScript',
    items: [
      { text: 'ES6', link: '/es6/index', activeMath: '/es6/' },
      { text: 'TypeScript', link: '/ts/index', activeMatch: '/ts/' }
    ]
  },
  {
    text: '配置',
    items: [
      { text: '包管理', link: '/package/index', activeMath: '/package/' },
      { text: '脚手架', link: '/cli/index', activeMath: '/cli/' },
      { text: '个人配置', link: '/custom/index', activeMath: '/custom/' }
    ]
  },
  {
    text: '实战',
    items: [
      { text: '框架实战', link: '/devlog/index', activeMath: '/devlog/' },
      { text: '错误收集', link: '/error/index', activeMath: '/error/' },
      { text: 'tk库', link: '/tk/index', activeMath: '/tk/' }
    ]
  }
]

const addPrefix = (link: string) => {
  return pageRoot + link
}

const endNav = nav.map((i) => {
  const items = i.items?.map((i) => {
    return {
      ...i,
      link: addPrefix(i.link)
    }
  })
  const hasItems = i.items?.length > 0
  const isLink = i.link?.length > 0
  const baseRes = isLink ? { ...i, link: i.external ? i.link : addPrefix(i.link) } : { ...i }
  return hasItems ? { ...baseRes, items } : { ...baseRes }
})

export default endNav
