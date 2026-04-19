<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import GlobalNavButton from '../components/GlobalNavButton.vue'
import GlobalNavOverlay from '../components/GlobalNavOverlay.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #nav-bar-title-after>
      <GlobalNavButton />
    </template>
    <template #nav-screen-content-after>
      <GlobalNavButton mobile />
    </template>
  </Layout>
  <GlobalNavOverlay />
</template>
