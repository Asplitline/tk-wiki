import { pages_root } from '../lib/static'
const nav = [
  {
    text: 'Vue',
    items: [
      { text: 'Vue2', link: '/vue2/', activeMath: '/vue2/' },
      { text: 'Vue3', link: '/vue3/', activeMatch: '/vue3/' }
    ]
  },
  {
    text: 'JavaScript',
    items: [
      { text: 'ES6', link: '/es6/', activeMath: '/es6/' },
      { text: 'TypeScript', link: '/ts/', activeMatch: '/ts/' }
    ]
  },
  {
    text: '包管理',
    items: [
      { text: 'Cli', link: '/package/cli/npm', activeMath: '/package/cli/' },
      { text: 'Git & Github', link: '/package/git-github/git', activeMatch: '/package/git-github/' }
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
