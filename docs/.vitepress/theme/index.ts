import mediumZoom from 'medium-zoom'
import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick } from 'vue'
import BaseIndex from '../components/BaseIndex.vue'
import './styles/index.css'
import { useRoute } from 'vitepress'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('base-index', BaseIndex)
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
