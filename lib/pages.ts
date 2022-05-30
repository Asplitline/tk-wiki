import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'
import { pages_root } from './static'

const joinPath = (arr: string[], prefix = '.') => {
  return path.resolve(__dirname, `../docs${pages_root}`, [prefix, ...arr].join('/'))
}

const joinLink = (arr: string[], root = true) => (root ? [...arr].join('/') : [pages_root, ...arr].join('/'))
const isDir = (path: string) => path.indexOf('.') === -1

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
export function getFileList(path: string) {
  const dirList = fs.readdirSync(path)
  return dirList.filter((i) => !isDir(i))
}
export function getDirList(item: string[] = []) {
  const dirList = fs.readdirSync(joinPath(item))
  return dirList.filter((i) => isDir(i))
}

export function getPathList(path: string) {
  // console.log('joinPath(item) :', joinPath(item))
  return fs.readdirSync(path)
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
  const filePath = joinPath([dir, file], '..')
  const {
    data: { order = 0, title = '-/-' }
  } = parseRemarkVar(filePath)
  const fileName = file.replace(/\.md$/i, '')
  // const path = `${pages_root}/${dir}/${fileName}`
  const path = joinLink([dir, fileName])
  const isReadme = path.toLowerCase() === 'index'
  return {
    text: title,
    link: isReadme ? '' : path,
    order
  }
}

export function handlePages(dir: string, filePrefix: string = pages_root) {
  const pathList = getFileList(joinPath([dir], '..'))
  const result = pathList.map((path) => {
    if (isDir(path)) {
      const res = getMarkdownInfo(`${dir}/${path}`, 'index.md')
      return {
        ...res
      }
    } else {
      return getMarkdownInfo(dir, path)
    }
  })

  const sortResult = sortPages(result)
  return {
    text: dir.split('/').pop(),
    collapsable: true,
    children: sortResult
  }
}

function dir2Obj(dir: string[], parent = pages_root, current = '') {
  return dir.map((i) => ({ path: i, parent: parent, current: current ? [current, i].join('/') : [parent, i].join('/') }))
}

export function initSideBar() {
  try {
    const dirList = getDirList()
    let dir = getDeepDir(dir2Obj(dirList))
    const endPages = {}
    dir.forEach((i) => {
      const item = handlePages(i.current)
      if (i.parent === pages_root) {
        endPages[i.current] = [item]
      } else {
        const parent = dir.find((j) => j.path === i.parent)
        endPages[parent.current].push(item)
      }
    })
    return endPages
  } catch (error) {
    console.log('error :', error)
    return {}
  }
}
