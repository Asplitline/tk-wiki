import { pages_root } from '../lib/static'
const nav = [
  {
    text: '首页',
    link: '/'
  },
  {
    text: 'github',
    link: 'https://github.com/Asplitline',
    external: true
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
