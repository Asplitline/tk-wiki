<script setup lang="ts">
import { useGlobalNav } from '../theme/useGlobalNav'

defineProps<{
  mobile?: boolean
}>()

const { open } = useGlobalNav()
</script>

<template>
  <button class="global-nav-button" :class="{ mobile }" type="button" @click="open()">
    <span class="global-nav-button__eyebrow">导航</span>
    <span class="global-nav-button__text">{{ mobile ? '打开导航面板' : '总导航' }}</span>
  </button>
</template>

<style scoped>
.global-nav-button {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 12px;
  padding: 0 14px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: color-mix(in srgb, var(--vp-c-bg-soft) 84%, var(--vp-c-brand-soft) 16%);
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: border-color 0.2s ease, transform 0.2s ease;
}

.global-nav-button:hover {
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 28%, var(--vp-c-divider));
}

.global-nav-button__eyebrow {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.global-nav-button__text {
  font-size: 14px;
  font-weight: 600;
}

.mobile {
  justify-content: flex-start;
  margin: 16px 24px 0;
  width: calc(100% - 48px);
  height: 44px;
}

@media (max-width: 959px) {
  .global-nav-button:not(.mobile) {
    display: none;
  }
}
</style>
