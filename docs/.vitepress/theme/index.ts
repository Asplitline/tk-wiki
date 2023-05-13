import mediumZoom from 'medium-zoom'
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import BaseIndex from '../components/BaseIndex.vue'
import WordList from '../components/WordList.vue'
import './styles/index.css'
import { useRoute } from 'vitepress'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('base-index', BaseIndex)
    app.component('word-list', WordList)
    // console.log('router :', router)
    // console.log('app, router, siteData :', app, router, siteData)
    // register global components
    // console.log(siteData.value.themeConfig.sidebar)
    // console.log(JSON.stringify(siteData.value.themeConfig.sidebar, null, '\t'))
  },
  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.main img', { background: 'var(--vp-c-bg)', margin: 10 })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => {
        nextTick(() => {
          initZoom()
        })
      }
    )
  }
}
