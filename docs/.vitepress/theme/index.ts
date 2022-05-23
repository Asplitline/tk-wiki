// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme'

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // register global components
    // console.log(JSON.stringify(siteData.value.themeConfig.sidebar, null, '\t'))
  }
}
