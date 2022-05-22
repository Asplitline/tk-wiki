import { handlePages, getDirList } from '../lib/pages'
const dirList = getDirList()
console.log(dirList)
const endPages = handlePages(dirList)
const sidebar = endPages
export default sidebar
// export default []
