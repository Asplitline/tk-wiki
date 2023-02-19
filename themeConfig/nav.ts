import { pageRoot } from './constants'
const nav = [
  {
    text: 'JavaScript',
    items: [
      { text: 'JavaScript', link: '/js/index', activeMath: '/js/' },
      { text: 'TypeScript', link: '/ts/index', activeMatch: '/ts/' }
    ]
  },
  {
    text: 'CSS',
    items: [{ text: 'CSS', link: '/css/index', activeMath: '/css/' }]
  },
  {
    text: 'Vue',
    items: [
      { text: 'Vue2', link: '/vue2/index', activeMath: '/vue2/' },
      { text: 'Vue3', link: '/vue3/index', activeMatch: '/vue3/' },
      { text: 'uniapp', link: '/uniapp/index', activeMath: '/uniapp/' }
    ]
  },
  {
    text: 'React',
    items: [{ text: 'React', link: '/react/index', activeMatch: '/react/' }]
  },
  {
    text: '配置',
    items: [
      { text: '包管理', link: '/package/index', activeMath: '/package/' },
      { text: '脚手架', link: '/cli/index', activeMath: '/cli/' },
      { text: '个人配置', link: '/custom/index', activeMath: '/custom/' },
      { text: '知识扩展', link: '/expand/index', activeMath: '/expand/' }
    ]
  },
  {
    text: '实战',
    items: [
      { text: '框架实战', link: '/devlog/index', activeMath: '/devlog/' },
      { text: '错误收集', link: '/error/index', activeMath: '/error/' },
      { text: 'QA', link: '/qa/index', activeMath: '/qa/' },
      { text: 'tk库', link: '/tk/index', activeMath: '/tk/' }
    ]
  },
  {
    text: '其他框架',
    items: [
      { text: 'electron', link: '/electron/index', activeMath: '/electron/' },
      { text: 'next - pending', link: '/next/index', activeMath: '/next/' }
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
