import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { pages_root } from './static'

const joinPath = (arr: string[], prefix = '.') => {
  return path.resolve(__dirname, `../docs${pages_root}`, [prefix, ...arr].join('/'))
}

const joinLink = (arr: string[], root = true) => (root ? [...arr].join('/') : [pages_root, ...arr].join('/'))

/**
 * 是否为文件夹
 * @param path
 * @returns
 */
const isDir = (path: string) => path.indexOf('.md') === -1

/**
 * 获取路径下文件
 * @param path
 * @returns
 */
export function getFileList(path: string) {
  const dirList = fs.readdirSync(path)
  return dirList.filter((i) => !isDir(i))
}

/**
 * 获取路径下文件夹
 * @param item
 * @returns
 */
export function getDirList(item: string[] = []) {
  const dirList = fs.readdirSync(joinPath(item))
  return dirList.filter((i) => isDir(i))
}

/**
 * 解析markdown 头部信息
 * @param filePath
 * @returns
 */
export function parseRemarkVar(filePath: string) {
  const fileStr = fs.readFileSync(filePath, 'utf8')
  const parseData = matter(fileStr)
  return parseData
}

const sortPages = (data: any[]) => {
  return data.sort((a, b) => a.order - b.order)
}

/**
 * 读取 markdown 头部信息
 * @param dir
 * @param file
 * @returns
 */
function getMarkdownInfo(dir: string, file: string, isAll = false) {
  const filePath = joinPath([dir, file], '..')
  const { data } = parseRemarkVar(filePath)
  const fileName = file.replace(/\.md$/i, '')
  const path = joinLink([dir, fileName])
  const isReadme = path.toLowerCase() === 'index'
  //
  if (!isAll) {
    const { order = 0, parentOrder, title = '-/-' } = data
    return Object.assign({ text: title, link: isReadme ? '' : path, order }, typeof parentOrder === 'number' ? { parentOrder } : {})
  } else {
    const { title, ..._data } = data
    return {
      text: title,
      link: isReadme ? '' : path,
      ..._data
    }
  }
}

/**
 * 根据头部信息拼装数据
 * @param dir
 * @param filePrefix
 * @returns
 */
export function handlePages(dir: string, filePrefix: string = pages_root) {
  const pathList = getFileList(joinPath([dir], '..'))
  let groupName = 'unTitle'
  let indexInfo = {}
  const result = pathList.map((path) => {
    const info = getMarkdownInfo(dir, path)
    if (path.includes('index.md')) {
      indexInfo = info
      groupName = info.text
      return null
    } else {
      return info
    }
  })
  const sortResult = sortPages(result.filter((i) => i))
  return {
    text: groupName,
    collapsible: true,
    items: sortResult,
    order: indexInfo?.parentOrder
  }
}

/**
 * @param dir
 * @param parent
 * @param current
 * @returns
 */
function dir2Obj(dir: string[], parent = pages_root, current = '') {
  return dir.map((i) => ({ path: i, parent: parent, current: current ? [current, i].join('/') : [parent, i].join('/') }))
}

/**
 * 深度遍历获取文件夹
 * @param dir
 * @param result
 * @returns
 */
export function getDeepDir(dir: any[] = [], result: any[] = []): string[] {
  if (dir.length === 0) {
    return result
  }
  const currentObj = dir.shift()
  result.push(currentObj)
  const fullPath = joinPath([currentObj.path!])
  if (isDir(fullPath)) {
    const dirList = getDirList([currentObj.path!])
    if (dirList.length) {
      const newDirObj = dir2Obj(dirList, currentObj.path, currentObj.current)
      result.push(...newDirObj)
    }
  }
  return getDeepDir(dir, result)
}

export function initSideBar() {
  try {
    const dirList = getDirList()
    let dir = getDeepDir(dir2Obj(dirList))
    const endPages = {}
    dir.forEach((i) => {
      const item = handlePages(i.current)
      if (i.parent === pages_root) {
        endPages[i.current] = item.items.length ? [item] : []
      } else {
        const parent = dir.find((j) => j.path === i.parent)
        item.items.length && endPages[parent.current].push(item)
      }
    })
    Object.keys(endPages).forEach((key) => {
      sortPages(endPages[key])
    })
    return endPages
  } catch (error) {
    return {}
  }
}

export function initPageInfo() {
  const dirList = getDirList()
  const resObj = {}
  dirList.forEach((i) => {
    const path = `${pages_root}/${i}`
    const res = getMarkdownInfo(path, 'index.md', true)
    resObj[path] = res
  })
  return resObj
}
