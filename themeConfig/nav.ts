import { pages_root } from '../lib/static'
const nav = [
  {
    text: 'Packages',
    items: [
      { text: 'Package', link: '/package/cli/npm', activeMath: '/package/cli' },
      { text: 'Git & Github', link: '/package/git-github/git', activeMatch: '/package/git-github/' }
    ]
  },
  {
    text: 'Vue',
    items: [
      { text: 'vue2', link: '/vue2/guide/instance', activeMath: '/vue2/' },
      { text: 'vue3', link: '/vue3/guide/index', activeMatch: '/vue3/' }
    ]
  },
  {
    text: 'JavaScript',
    items: [
      { text: 'ES6', link: '/js/es6/1.babel', activeMath: '/js/es6/' },
      { text: 'TypeScript', link: '/js/ts/1.intro', activeMatch: '/js/ts/' }
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
