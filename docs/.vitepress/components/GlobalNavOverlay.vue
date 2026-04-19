<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress'
import { computed, onMounted, ref, watch } from 'vue'
import { obj2Array } from '../../../lib/tools'
import { baseURL } from '../../../themeConfig/constants'
import { orderArr, orderConfig } from './BaseIndex/constants'
import { useGlobalNav } from '../theme/useGlobalNav'

const route = useRoute()
const router = useRouter()
const { isOpen, close } = useGlobalNav()

const list = ref<Record<string, any[]>>({})
const pageInfo = ref<Record<string, any>>({})
const expandedItems = ref<Record<string, boolean>>({})
const DEFAULT_VISIBLE_COUNT = 10

const sectionMetaMap: Record<string, { eyebrow: string; description: string }> = {
  '/pages/base': {
    eyebrow: '基础',
    description: '从 HTML、CSS、JavaScript 到浏览器机制，适合系统补基础。',
  },
  '/pages/advance': {
    eyebrow: '进阶',
    description: '面向框架、工程和复杂场景，把常见技术专题放在一处集中查阅。',
  },
  '/pages/common': {
    eyebrow: '通识',
    description: '聚焦部署、版本控制、命令行等日常高频问题。',
  },
  '/pages/cli': {
    eyebrow: '工具',
    description: '围绕构建工具和脚手架，把配置项与常见问题拆开整理。',
  },
  '/pages/custom': {
    eyebrow: '配置',
    description: '记录个人常用环境与效率配置，方便随时回查。',
  },
  '/pages/expand': {
    eyebrow: '扩展',
    description: '补充通用技能、规则和非主线知识点。',
  },
  '/pages/devlog': {
    eyebrow: '日志',
    description: '把真实问题和修复过程沉淀成可复用的经验。',
  },
  '/pages/reproduce': {
    eyebrow: '转载',
    description: '归档值得保留和二次阅读的内容。',
  },
  '/pages/tk': {
    eyebrow: '工具库',
    description: '沉淀自有工具方法与配套说明。',
  },
}

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
  const keyIndex = supportKeys.findIndex((val) => currentKey.startsWith(baseURL + val))

  if (keyIndex !== -1) {
    return list.value[supportKeys[keyIndex]]
  }

  return []
})

const currentItem = computed(() => {
  return rootList.value.find(item => route.path.includes(item.key))
})

const hasGroup = computed(() => {
  return endList.value.some(item => orderArr.includes(item.group))
})

const groupList = computed(() => {
  if (!hasGroup.value) {
    return []
  }

  const groupKeys = Array.from(new Set(endList.value.map(item => item.group)))
  const result = groupKeys.map(key => {
    const children = endList.value.filter(item => item.group === key)
    return {
      key,
      title: orderConfig[key]?.title || key,
      children,
    }
  })

  const noGroupList = endList.value.filter(item => !item?.group)
  if (noGroupList.length > 0) {
    result.push({
      key: '',
      title: '',
      children: noGroupList,
    })
  }

  return result.sort((a, b) => {
    let aOrder = orderArr.findIndex(key => a.key === key)
    let bOrder = orderArr.findIndex(key => b.key === key)
    aOrder = aOrder === -1 ? Infinity : aOrder
    bOrder = bOrder === -1 ? Infinity : bOrder
    return aOrder - bOrder
  })
})

const currentDescription = computed(() => {
  if (!currentItem.value?.key) {
    return '先看一级导航，再进入专题页继续浏览。'
  }

  return getSectionMeta(currentItem.value.key).description
})

const fetchSideBar = async () => {
  const res = await fetch(`${baseURL}/sidebar.json`).then((response) => response.json())
  const result: Record<string, any[]> = {}

  Object.entries(res).forEach(([key, value]: [string, any]) => {
    if (value.length > 0) {
      result[key] = value
    }
  })

  list.value = result
}

const fetchPageInfo = async () => {
  pageInfo.value = await fetch(`${baseURL}/pageInfo.json`).then((response) => response.json())
}

const resolveLink = (link: string) => {
  return baseURL + link
}

const getSectionCount = (key: string) => {
  return (list.value[key] || []).length
}

const getSectionMeta = (key: string) => {
  return sectionMetaMap[key] || {
    eyebrow: '专题',
    description: '按分类继续浏览，逐步进入具体内容。',
  }
}

const getItemId = (item: any) => {
  return item.items?.[0]?.link || item.text
}

const isExpanded = (item: any) => {
  return !!expandedItems.value[getItemId(item)]
}

const toggleItem = (item: any) => {
  const itemId = getItemId(item)
  expandedItems.value[itemId] = !expandedItems.value[itemId]
}

const getVisibleItems = (item: any) => {
  if (isExpanded(item)) {
    return item.items
  }

  return item.items.slice(0, DEFAULT_VISIBLE_COUNT)
}

const skipLink = (link: string) => {
  close()
  router.go(resolveLink(link))
}

watch(() => route.path, () => {
  close()
})

onMounted(async () => {
  await Promise.all([fetchPageInfo(), fetchSideBar()])
})
</script>

<template>
  <Teleport to="body">
    <section v-if="isOpen" class="global-nav-overlay" @click.self="close()">
      <div class="global-nav-overlay__panel">
        <div class="global-nav-overlay__header">
          <div>
            <p class="global-nav-overlay__eyebrow">BaseIndex 导航</p>
            <h2>快速进入知识导航</h2>
            <p class="global-nav-overlay__description">{{ currentDescription }}</p>
          </div>
          <button class="global-nav-overlay__close" type="button" @click="close()">关闭</button>
        </div>

        <div class="global-nav-overview">
          <a
            v-for="item in rootList"
            :key="item.key"
            class="global-nav-overview__card"
            :href="resolveLink(item.link || `${item.key}/index`)"
            @click.prevent="skipLink(item.link || `${item.key}/index`)"
          >
            <span class="global-nav-overview__eyebrow">{{ getSectionMeta(item.key).eyebrow }}</span>
            <strong>{{ item.text }}</strong>
            <p>{{ getSectionMeta(item.key).description }}</p>
            <span class="global-nav-overview__meta">{{ getSectionCount(item.key) }} 个专题入口</span>
          </a>
        </div>

        <div v-if="endList.length" class="global-nav-overlay__divider"></div>

        <template v-if="hasGroup">
          <section v-for="group in groupList" :key="group.key || 'default'" class="global-nav-section">
            <div class="global-nav-section__header">
              <span v-if="group.title" class="global-nav-section__tag">{{ group.title }}</span>
              <p class="global-nav-section__meta">{{ group.children.length }} 个子类</p>
            </div>

            <div class="global-nav-section__grid">
              <article v-for="(item, idx) in group.children" :key="idx" class="global-nav-item">
                <div class="global-nav-item__header">
                  <h3>{{ item.text }}</h3>
                  <span>{{ item.items.length }} 篇</span>
                </div>

                <ul class="global-nav-links">
                  <li v-for="it in getVisibleItems(item)" :key="it.link">
                    <a :href="resolveLink(it.link)" @click.prevent="skipLink(it.link)">
                      <span>{{ it.text }}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </li>
                </ul>

                <button
                  v-if="item.items.length > DEFAULT_VISIBLE_COUNT"
                  class="global-nav-item__toggle"
                  type="button"
                  @click="toggleItem(item)"
                >
                  {{ isExpanded(item) ? "收起" : `展开剩余 ${item.items.length - DEFAULT_VISIBLE_COUNT} 项` }}
                </button>
              </article>
            </div>
          </section>
        </template>

        <div v-else-if="endList.length" class="global-nav-section__grid">
          <article v-for="(item, idx) in endList" :key="idx" class="global-nav-item">
            <div class="global-nav-item__header">
              <h3>{{ item.text }}</h3>
              <span>{{ item.items.length }} 篇</span>
            </div>

            <ul class="global-nav-links">
              <li v-for="it in getVisibleItems(item)" :key="it.link">
                <a :href="resolveLink(it.link)" @click.prevent="skipLink(it.link)">
                  <span>{{ it.text }}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>

            <button
              v-if="item.items.length > DEFAULT_VISIBLE_COUNT"
              class="global-nav-item__toggle"
              type="button"
              @click="toggleItem(item)"
            >
              {{ isExpanded(item) ? "收起" : `展开剩余 ${item.items.length - DEFAULT_VISIBLE_COUNT} 项` }}
            </button>
          </article>
        </div>
      </div>
    </section>
  </Teleport>
</template>

<style scoped>
.global-nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 72px 20px 20px;
  background: color-mix(in srgb, var(--vp-c-bg) 74%, transparent);
  backdrop-filter: blur(8px);
}

.global-nav-overlay__panel {
  width: min(1120px, 100%);
  max-height: calc(100vh - 92px);
  overflow: auto;
  padding: 24px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-divider));
  border-radius: 28px;
  background: var(--vp-c-bg);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.16);
}

.global-nav-overlay__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.global-nav-overlay__eyebrow {
  margin: 0 0 6px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.global-nav-overlay__header h2 {
  margin: 0;
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  letter-spacing: -0.02em;
}

.global-nav-overlay__description {
  margin: 8px 0 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.global-nav-overlay__close,
.global-nav-item__toggle {
  min-height: 38px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.global-nav-overview,
.global-nav-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}

.global-nav-overview__card,
.global-nav-item,
.global-nav-section {
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-divider));
  border-radius: 20px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--vp-c-bg-soft) 90%, var(--vp-c-brand-soft) 10%), var(--vp-c-bg));
}

.global-nav-overview__card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 200px;
  padding: 20px;
  color: inherit;
  text-decoration: none;
}

.global-nav-overview__card strong,
.global-nav-item h3 {
  font-size: 1.1rem;
  letter-spacing: -0.02em;
}

.global-nav-overview__card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.global-nav-overview__eyebrow,
.global-nav-overview__meta,
.global-nav-section__meta,
.global-nav-item__header span {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.global-nav-overview__meta {
  margin-top: auto;
}

.global-nav-overlay__divider {
  margin: 24px 0;
  border-top: 1px solid var(--vp-c-divider-light);
}

.global-nav-section {
  padding: 18px;
}

.global-nav-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.global-nav-section__tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.85rem;
  font-weight: 700;
}

.global-nav-item {
  padding: 18px;
}

.global-nav-item__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.global-nav-item h3 {
  margin: 0;
}

.global-nav-links {
  margin: 0;
  padding: 0;
  list-style: none;
}

.global-nav-links li + li {
  margin-top: 6px;
}

.global-nav-links a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-height: 40px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  line-height: 1.6;
}

.global-nav-item__toggle {
  margin-top: 12px;
}

@media (max-width: 959px) {
  .global-nav-overlay {
    padding: 56px 12px 12px;
  }

  .global-nav-overlay__panel {
    padding: 16px;
    border-radius: 20px;
  }

  .global-nav-overlay__header,
  .global-nav-section__header,
  .global-nav-item__header {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
