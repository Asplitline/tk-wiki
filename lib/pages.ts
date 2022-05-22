import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { pages_root } from './static'

const joinPath = (arr = []) => path.resolve(__dirname, '../docs/pages', ...arr)

const isDir = (v) => v.indexOf('.') === -1
export function getDirList(...item) {
  const dirList = fs.readdirSync(joinPath(item))
  return dirList.filter((i) => isDir(i))
}
export function getFileList(...item) {
  const dirList = fs.readdirSync(joinPath(item))
  return dirList.filter((i) => !isDir(i))
}

export function parseRemarkVar(filePath) {
  const fileStr = fs.readFileSync(filePath, 'utf8')
  const parseData = matter(fileStr)
  return parseData
}

export function handlePages(pages) {
  const endPages = {}
  pages.forEach((item) => {
    const children = getFileList(item)
    console.log(item)
    const result = children.map((i, index) => {
      const filePath = joinPath([item, i])
      const { data } = parseRemarkVar(filePath)
      // const path = i.match(/([^\s]*).md$/, '$1')[1]
      const path = i.replace(/\.md$/i, '')
      const isReadme = path.toLowerCase() === 'readme'
      return {
        path: isReadme ? '' : path,
        title: data.title || 'no title'
        // id: `${item}_${index + 1}`
      }
    })
    endPages[`${pages_root}/${item}/`] = [
      {
        title: item,
        children: [...result],
        collapsable: false
      }
    ]
  })
  console.log(JSON.stringify(endPages))
  return endPages
}
