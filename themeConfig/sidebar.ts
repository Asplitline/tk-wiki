import { handlePages, getDirList } from '../lib/pages'
const dirList = getDirList()
const sidebar = handlePages(dirList)
export default sidebar
// export default []
