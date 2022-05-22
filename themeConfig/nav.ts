import { pages_root } from '../lib/static'
const nav = [
  {
    text: '首页',
    link: '/guide/'
  },
  {
    text: 'Vue',
    link: '/vue/'
  },
  {
    text: '技术',
    items: [{ text: 'vue2文档', link: '/vue/vue2' }]
  },
  {
    text: 'github',
    link: 'https://github.com/Asplitline',
    external: true
  }
]

const addPrefix = (link) => {
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
  const baseRes = {
    ...i,
    link: i.external ? i.link : addPrefix(i.link)
  }
  return hasItems ? { ...baseRes, items } : { ...baseRes }
})

export default endNav
