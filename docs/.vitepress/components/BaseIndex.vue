<template>
  <div class="base-layout">
    <template v-if="isRoot">
      <h1>{{ title }}</h1>
      <div v-for="(lst, key) in rootList" class="base-section" :key="key">
        <h2 class="base-section-title">{{ lst.text }}</h2>
        <div>
          <div v-for="(value, idx) of lst.value" :key="idx" class="base-groups">
            <h3>{{ value.text }}</h3>
            <ul class="base-group">
              <li v-for="(it, groupIdx) of value.items" :key="it.link">
                <a href="javascript:;" @click="skipLink(it.link)">{{ groupIdx + 1 }}. {{ it.text }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <h1 class="base-title">{{ title }}</h1>
      <div class="base-groups">
        <div v-for="(item, idx) of endList" :key="idx" class="base-group">
          <h3>{{ item.text }}</h3>
          <ul>
            <li v-for="it of item.items" :key="it.link">
              <a href="javascript:;" @click="skipLink(it.link)">{{ it.text }}</a>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress'
import { computed, onMounted, ref } from 'vue'
import { obj2Array } from '../../../lib/tools'
import { baseURL, pageRoot } from '../../../themeConfig/constants'
const route = useRoute()
const router = useRouter()
const list = ref([])
const pageInfo = ref({})
defineProps(['title'])
const isRoot = computed(() => {
  return route.path === `${baseURL}${pageRoot}/`
})

const rootList = computed(() => {
  const newVal = obj2Array(list.value).map((i) => {
    return {
      ...i,
      ...pageInfo.value[i.key]
    }
  })
  return newVal.sort(({ order: aOrder = 999 }, { order: bOrder = 999 }) => aOrder - bOrder)
})

const endList = computed(() => {
  const supportKeys = Object.keys(list.value)
  const currentKey = route.path
  const keyIndex = supportKeys.findIndex((val) => {
    return currentKey.startsWith(baseURL + val)
  })
  if (keyIndex !== -1) {
    return list.value[supportKeys[keyIndex]]
  } else {
    return []
  }
})

const fetchSideBar = async () => {
  const res = await fetch(`${baseURL}/sidebar.json`).then((res) => {
    return res.json()
  })
  const result = {}
  Object.entries(res).forEach(([key, value]) => {
    if (value.length > 0) {
      result[key] = value
    }
  })

  list.value = result
}

const fetchPageInfo = async () => {
  const res = await fetch(`${baseURL}/pageInfo.json`).then((res) => {
    return res.json()
  })

  pageInfo.value = res
}

const skipLink = (link: string) => {
  router.go(baseURL + link)
}

onMounted(async () => {
  await fetchPageInfo()
  fetchSideBar()
})
</script>

<style lang="scss" scoped>
h1,
h2,
h3 {
  font-weight: 600;
  line-height: 1;
}

h1,
h2 {
  letter-spacing: -0.02em;
}

h1 {
  font-size: 38px;
}

h2 {
  font-size: 24px;
  // color: var(--vp-c-text-1);
  margin: 24px 0;
  transition: color 0.5s;
  padding-top: 36px;
  border-top: 1px solid var(--vp-c-divider-light);
}

h3 {
  letter-spacing: -0.01em;
  color: var(--vp-c-brand);
  font-size: 18px;
  margin-bottom: 1em;
  transition: color 0.5s;
}

.base-layout {
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
}

.base-section {
  display: flex;
  flex-direction: column;

  .base-groups {
    flex-direction: column;

    .base-group {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      margin-left: 0;

      li {
        margin: 0;
        width: 25%;
      }
    }
  }
}

.base-groups {
  padding: 20px 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;

  .base-group {
    list-style: none;
    break-inside: avoid;
    margin: 0;
    padding: 20px;
    border-radius: 8px;
    background-color: var(--vp-c-bg-soft);
    width: 22%;
    margin-left: 4%;

    &:nth-child(n + 5) {
      margin-top: 20px;
    }

    &:nth-child(4n + 1) {
      margin-left: 0;
    }
  }

  a {
    font-size: 15px;
    font-weight: 500;
    line-height: 2;
    // color: var(--vp-c-text-code);
    transition: color 0.5s;

    &:hover {
      color: var(--vp-c-brand);
      transition: none;
    }
  }
}

@media (max-width: 768px) {
  h1 {
    font-size: 32px;
    margin-bottom: 24px;
  }

  h2 {
    font-size: 22px;
    margin: 16px 0;
    padding-top: 32px;
  }

  .base-groups {
    flex-direction: column;

    .base-group {
      width: 100%;
      margin: 0;

      &:nth-child(n + 2) {
        margin-top: 30px;
      }

      li {
        width: 100%;
      }
    }

    a {
      font-size: 14px;
    }
  }

  .base-section {
    .base-groups {
      .base-group {
        margin-top: 0px;

        li {
          width: 100%;
        }
      }

      a {
        font-size: 14px;
      }
    }
  }
}
</style>
