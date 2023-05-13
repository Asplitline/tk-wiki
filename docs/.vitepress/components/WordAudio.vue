<template>
  <div class="word-audio">
    <button href="javascript:;" class="word-audio__text" :style="`font-size: ${props.size}px;`" @click="playAudio">🔊</button>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface IWordAudio {
  src?: string
  type?: 0 | 1
  word: string
  size?: number
}

const props = withDefaults(defineProps<IWordAudio>(), {
  src: 'https://dict.youdao.com/dictvoice',
  type: 0,
  size: 16
})

const audioSrc = computed(() => {
  return `${props.src}?audio=${props.word}&type=${props.type}`
})

const audio = ref<HTMLAudioElement>()

const playAudio = () => {
  if (!audio.value) {
    audio.value = new Audio(audioSrc.value)
  }
  audio.value.play()
}
</script>

<style lang="scss" scoped>
.word-audio {
  &__text {
    transition: transform 0.2s ease-in-out;
    appearance: none;
    &:hover {
      transform: scale(1.2);
    }
  }
}
</style>
