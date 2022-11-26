import { pages_root } from '../lib/static'
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
    text: 'Package',
    items: [
      { text: '包管理', link: '/package/cli/npm', activeMath: '/package/cli/' },
      { text: '应用', link: '/package/apply/apply', activeMath: '/package/apply/' }
    ]
  },
  {
    text: 'Config',
    items: [
      { text: 'webpack', link: '/config/webpack/index', activeMath: '/config/webpack/' },
      { text: 'vitepress', link: '/config/vitepress/index', activeMatch: '/config/vitepress/' }
    ]
  },
  {
    text: 'Other',
    items: [
      { text: 'Git & Github', link: '/other/version-control/git', activeMatch: '/other/version-control/' },
      { text: 'Keyboard', link: '/other/custom/keyboard', activeMath: '/other/custom/' }
    ]
  }
]

const addPrefix = (link: string) => {
  return pages_root + link
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
