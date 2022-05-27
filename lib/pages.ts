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

const sortPages = (data) => {
  return data.sort((a, b) => a - b)
}

export function handlePages(pages) {
  const endPages = {}
  pages.forEach((item) => {
    const children = getFileList(item)
    // const result = []
    const result = children.map((i, index) => {
      const filePath = joinPath([item, i])
      // console.log(filePath)
      const {
        data: { order = 0, title = '-/-' }
      } = parseRemarkVar(filePath)
      // const path = i.match(/([^\s]*).md$/, '$1')[1]
      const path = `${pages_root}/${item}/` + i.replace(/\.md$/i, '')
      const isReadme = path.toLowerCase() === 'readme'
      return {
        text: title,
        link: isReadme ? '' : path,
        order
      }
    })
    const sortResult = sortPages(result)
    // console.log(sortResult)
    endPages[`${pages_root}/${item}/`] = [
      {
        text: item,
        collapsable: true,
        children: [...sortResult]
      }
    ]
  })
  return endPages
}
