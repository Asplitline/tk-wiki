// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'
import Button from '../components/Button.vue'
export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('TButton', Button)
    // console.log('router :', router)
    // console.log('app, router, siteData :', app, router, siteData)
    // register global components
    // console.log(siteData.value.themeConfig.sidebar)
    // console.log(JSON.stringify(siteData.value.themeConfig.sidebar, null, '\t'))
  }
}
