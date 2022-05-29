import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { pages_root } from './static'

const joinPath = (arr: string[]) => path.resolve(__dirname, '../docs/pages', ...arr)

const isDir = (path: string) => path.indexOf('.') === -1
export function getDirList(...item: string[]) {
  const dirList = fs.readdirSync(joinPath(item))
  return dirList.filter((i) => isDir(i))
}

export function getDeepDir(dir: string[] = [], result: string[] = []) {
  if (dir.length === 0) {
    return result
  }
  const currentDir = dir.shift()
  const fullPath = joinPath([currentDir!])
  if (isDir(fullPath)) {
    const dirList = getDirList(fullPath)
    if (dirList.length) {
      const newDirList = dirList.map((i) => `${currentDir}/${i}`)
      dir.push(...newDirList)
    }
  }
  getDeepDir(dir, [...result, currentDir!])
}
export function getFileList(...item: string[]) {
  // console.log('item :', item)
  // console.log('joinPath(item) :', joinPath(item))
  const dirList = fs.readdirSync(joinPath(item))
  return dirList.filter((i) => !isDir(i))
}

export function getPathList(...item: string[]) {
  return fs.readdirSync(joinPath(item))
}

export function parseRemarkVar(filePath: string) {
  const fileStr = fs.readFileSync(filePath, 'utf8')
  const parseData = matter(fileStr)
  return parseData
}

const sortPages = (data: any[]) => {
  return data.sort((a, b) => a - b)
}

function getMarkdownInfo(dir: string, file: string) {
  const filePath = joinPath([dir, file])
  const {
    data: { order = 0, title = '-/-' }
  } = parseRemarkVar(filePath)
  const fileName = file.replace(/\.md$/i, '')
  const path = `${pages_root}/${dir}/${fileName}`
  const isReadme = path.toLowerCase() === 'index'
  return {
    text: title,
    link: isReadme ? '' : path,
    order
  }
}

export function handlePages(pages: [], filePrefix) {
  const endPages = {}
  pages.forEach((dir) => {
    const pathList = getPathList(dir)
    // console.log('dir :', dir)
    // const fileList = getFileList(dir)
    // const dirList = getDirList(dir)
    const result = pathList.map((path) => {
      if (isDir(path)) {
        const res = getMarkdownInfo(`${dir}/${path}`, 'index.md')
        // console.log('res :', res)
        // const childrenPathList = getFileList(dir, path)
        // const children = childrenPathList.map((childPath) => {
        //   return getMarkdownInfo(dir + '/' + path, childPath)
        // })
        return {
          ...res
        }
      } else {
        return getMarkdownInfo(dir, path)
      }
    })

    const sortResult = sortPages(result)
    // console.log('sortResult :', sortResult)
    endPages[`${filePrefix}/${dir}/`] = [
      {
        text: dir,
        collapsable: true,
        children: sortResult
      }
    ]
  })
  console.log('endPages :', endPages)
  return endPages
}

export function initSideBar() {
  const dirList = getDirList()
  const dir = getDeepDir(dirList)
  console.log('dir :', dir)
  // const sidebar = handlePages(dirList, pages_root)
  // console.log('sidebar :', sidebar)
}
