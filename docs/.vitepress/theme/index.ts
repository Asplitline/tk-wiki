import DefaultTheme from 'vitepress/theme'
import BaseIndex from '../components/BaseIndex.vue'
import './styles/index.css'
export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('base-index', BaseIndex)
    // console.log('router :', router)
    // console.log('app, router, siteData :', app, router, siteData)
    // register global components
    // console.log(siteData.value.themeConfig.sidebar)
    // console.log(JSON.stringify(siteData.value.themeConfig.sidebar, null, '\t'))
  }
}
