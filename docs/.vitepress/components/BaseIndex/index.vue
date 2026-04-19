<template>
  <div class="base-layout">
    <template v-if="isRoot">
      <section class="page-hero">
        <p class="page-hero__eyebrow">知识总索引</p>
        <h1>{{ title }}</h1>
        <p class="page-hero__description">
          按主题进入，不用先记住目录结构。先选一个大类，再在下一级继续收窄到具体专题。
        </p>
      </section>

      <section class="search-shell">
        <label class="search-shell__field">
          <span class="search-shell__label">导航搜索</span>
          <input
            v-model.trim="searchQuery"
            type="search"
            placeholder="搜索分类、分组或文章标题"
          />
        </label>
        <button
          v-if="searchQuery"
          class="search-shell__clear"
          type="button"
          @click="searchQuery = ''"
        >
          清空
        </button>
      </section>

      <section class="search-panel">
        <div class="search-panel__header">
          <div>
            <p class="search-panel__eyebrow">独立搜索面板</p>
            <h2>看看现在有哪些导航</h2>
          </div>
          <p class="search-panel__meta">
            {{ searchQuery ? `找到 ${filteredNavItems.length} 个结果` : `共 ${rootList.length} 个一级导航` }}
          </p>
        </div>

        <template v-if="searchQuery">
          <div v-if="groupedSearchResults.length" class="search-result-groups">
            <article
              v-for="group in groupedSearchResults"
              :key="group.key"
              class="search-result-group"
            >
              <div class="search-result-group__header">
                <strong>{{ group.label }}</strong>
                <span>{{ group.items.length }} 条</span>
              </div>
              <ul class="search-result-list">
                <li v-for="item in group.items" :key="item.link">
                  <a :href="resolveLink(item.link)" @click.prevent="skipLink(item.link)">
                    <span>{{ item.text }}</span>
                    <small>{{ item.section }}</small>
                  </a>
                </li>
              </ul>
            </article>
          </div>
          <p v-else class="search-panel__empty">没有匹配的导航，换个关键词试试。</p>
        </template>

        <div v-else class="nav-overview">
          <a
            v-for="item in rootList"
            :key="item.key"
            class="nav-overview__card"
            :href="resolveLink(item.link || `${item.key}/index`)"
            @click.prevent="skipLink(item.link || `${item.key}/index`)"
          >
            <span class="nav-overview__eyebrow">{{ getSectionMeta(item.key).eyebrow }}</span>
            <strong>{{ item.text }}</strong>
            <p>{{ getSectionMeta(item.key).description }}</p>
            <span class="nav-overview__meta">{{ getSectionCount(item.key) }} 个子导航</span>
          </a>
        </div>
      </section>

      <div v-if="!searchQuery" class="index-grid">
        <a
          v-for="(lst, key) in rootList"
          :key="key"
          class="index-card"
          :href="resolveLink(lst.link || `${lst.key}/index`)"
          @click.prevent="skipLink(lst.link || `${lst.key}/index`)"
        >
          <span class="index-card__eyebrow">{{ getSectionMeta(lst.key).eyebrow }}</span>
          <strong>{{ lst.text }}</strong>
          <p>{{ getSectionMeta(lst.key).description }}</p>
          <span class="index-card__meta">{{ getSectionCount(lst.key) }} 个专题入口</span>
        </a>
      </div>
    </template>
    <template v-else>
      <section class="page-hero page-hero--compact">
        <p class="page-hero__eyebrow">{{ currentItem?.text || "专题索引" }}</p>
        <h1 class="base-title">{{ title }}</h1>
        <p class="page-hero__description">
          {{ currentDescription }}
        </p>
      </section>

      <section class="search-shell">
        <label class="search-shell__field">
          <span class="search-shell__label">导航搜索</span>
          <input
            v-model.trim="searchQuery"
            type="search"
            placeholder="搜索当前页或全站导航"
          />
        </label>
        <button
          v-if="searchQuery"
          class="search-shell__clear"
          type="button"
          @click="searchQuery = ''"
        >
          清空
        </button>
      </section>

      <section class="search-panel">
        <div class="search-panel__header">
          <div>
            <p class="search-panel__eyebrow">独立搜索面板</p>
            <h2>快速定位导航</h2>
          </div>
          <p class="search-panel__meta">
            {{ searchQuery ? `找到 ${filteredNavItems.length} 个结果` : `当前收录 ${allNavItems.length} 个导航项` }}
          </p>
        </div>

        <template v-if="searchQuery">
          <div v-if="groupedSearchResults.length" class="search-result-groups">
            <article
              v-for="group in groupedSearchResults"
              :key="group.key"
              class="search-result-group"
            >
              <div class="search-result-group__header">
                <strong>{{ group.label }}</strong>
                <span>{{ group.items.length }} 条</span>
              </div>
              <ul class="search-result-list">
                <li v-for="item in group.items" :key="item.link">
                  <a :href="resolveLink(item.link)" @click.prevent="skipLink(item.link)">
                    <span>{{ item.text }}</span>
                    <small>{{ item.section }}</small>
                  </a>
                </li>
              </ul>
            </article>
          </div>
          <p v-else class="search-panel__empty">没有匹配的导航，换个关键词试试。</p>
        </template>

        <div v-else class="nav-overview nav-overview--compact">
          <a
            v-for="item in rootList"
            :key="item.key"
            class="nav-overview__card"
            :href="resolveLink(item.link || `${item.key}/index`)"
            @click.prevent="skipLink(item.link || `${item.key}/index`)"
          >
            <span class="nav-overview__eyebrow">{{ getSectionMeta(item.key).eyebrow }}</span>
            <strong>{{ item.text }}</strong>
            <p>{{ getSectionMeta(item.key).description }}</p>
            <span class="nav-overview__meta">{{ getSectionCount(item.key) }} 个子导航</span>
          </a>
        </div>
      </section>

      <template v-if="!searchQuery && hasGroup">
        <section v-for="group of groupList" :key="group.key || 'default'" class="group-section">
          <div class="group-section__header">
            <span v-if="group.title" class="group-tag">{{ group.title }}</span>
            <p class="group-section__meta">{{ group.children.length }} 个子类</p>
          </div>

          <div class="group-grid">
            <article
              v-for="(item, idx) of group.children"
              :key="idx"
              class="group-item"
            >
              <div class="group-item__header">
                <h3>{{ item.text }}</h3>
                <span class="group-item__count">{{ item.items.length }} 篇</span>
              </div>

              <ul class="link-list">
                <li v-for="it of getVisibleItems(item)" :key="it.link">
                  <a :href="resolveLink(it.link)" @click.prevent="skipLink(it.link)">
                    <span>{{ it.text }}</span>
                    <span class="link-arrow" aria-hidden="true">↗</span>
                  </a>
                </li>
              </ul>

              <button
                v-if="item.items.length > DEFAULT_VISIBLE_COUNT"
                class="group-item__toggle"
                type="button"
                @click="toggleItem(item)"
              >
                {{ isExpanded(item) ? "收起" : `展开剩余 ${item.items.length - DEFAULT_VISIBLE_COUNT} 项` }}
              </button>
            </article>
          </div>
        </section>
      </template>
      <template v-else-if="!searchQuery">
        <div class="group-grid">
          <article v-for="(item, idx) of endList" :key="idx" class="group-item">
            <div class="group-item__header">
              <h3>{{ item.text }}</h3>
              <span class="group-item__count">{{ item.items.length }} 篇</span>
            </div>

            <ul class="link-list">
              <li v-for="it of getVisibleItems(item)" :key="it.link">
                <a :href="resolveLink(it.link)" @click.prevent="skipLink(it.link)">
                  <span>{{ it.text }}</span>
                  <span class="link-arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>

            <button
              v-if="item.items.length > DEFAULT_VISIBLE_COUNT"
              class="group-item__toggle"
              type="button"
              @click="toggleItem(item)"
            >
              {{ isExpanded(item) ? "收起" : `展开剩余 ${item.items.length - DEFAULT_VISIBLE_COUNT} 项` }}
            </button>
          </article>
        </div>
      </template>
    </template>

    <div v-if="!isRoot && !endList.length" class="empty-state">
      <p>当前分类还没有可展示的内容。</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress';
import { computed, onMounted, ref } from 'vue';

import { orderArr, orderConfig } from './constants'
import { obj2Array } from '../../../../lib/tools';
import { baseURL, pageRoot } from '../../../../themeConfig/constants';
const route = useRoute()
const router = useRouter()
const list = ref<Record<string, any[]>>({})
const pageInfo = ref<Record<string, any>>({})
const searchQuery = ref('')
const expandedItems = ref<Record<string, boolean>>({})
defineProps(['title'])
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

const currentItem = computed(() => {
  const item = rootList.value.find(item => route.path.includes(item.key))
  return item
})

const currentDescription = computed(() => {
  if (!currentItem.value?.key) {
    return '按专题浏览内容，优先看分组，再进入具体文章。'
  }

  return getSectionMeta(currentItem.value.key).description
})

const hasGroup = computed(() => {
  return endList.value.some(item => orderArr.includes(item.group))
})

const allNavItems = computed(() => {
  return Object.entries(list.value).flatMap(([key, groups]) => {
    const rootLabel = pageInfo.value[key]?.text || key

    return groups.flatMap((group: any) => {
      const sectionLabel = group.text || group.group || rootLabel

      return (group.items || []).map((entry: any) => ({
        key: `${key}-${entry.link}`,
        rootKey: key,
        rootLabel,
        section: sectionLabel,
        text: entry.text,
        link: entry.link,
        keyword: [rootLabel, sectionLabel, entry.text].join(' ').toLowerCase(),
      }))
    })
  })
})

const filteredNavItems = computed(() => {
  if (!searchQuery.value) {
    return allNavItems.value
  }

  const keyword = searchQuery.value.toLowerCase()
  return allNavItems.value.filter(item => item.keyword.includes(keyword))
})

const groupedSearchResults = computed(() => {
  const groupMap = new Map<string, { key: string; label: string; items: typeof filteredNavItems.value }>()

  filteredNavItems.value.forEach((item) => {
    if (!groupMap.has(item.rootKey)) {
      groupMap.set(item.rootKey, {
        key: item.rootKey,
        label: item.rootLabel,
        items: [],
      })
    }

    groupMap.get(item.rootKey)!.items.push(item)
  })

  return Array.from(groupMap.values())
})

const groupList = computed(() => {
  if (!hasGroup.value) {
    return []
  }
  const groupKeys = Array.from(new Set(endList.value.map(item => item.group)))
  const result = groupKeys.map(key => {
    const list = endList.value.filter(item => item.group === key)
    return {
      key,
      title: orderConfig[key]?.title || key,
      children: list
    }
  })
  const noGroupList = endList.value.filter(item => !item?.group)
  if (noGroupList.length > 0) {
    result.push({
      key: '',
      title: '',
      children: noGroupList
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

const resolveLink = (link: string) => {
  return baseURL + link
}

const skipLink = (link: string) => {
  router.go(resolveLink(link))
}

const getSectionCount = (key: string) => {
  const items = list.value[key] || []
  return items.length
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

onMounted(async () => {
  await Promise.all([fetchPageInfo(), fetchSideBar()])
})
</script>

<style lang="scss" scoped>
h1,
h2,
h3 {
  font-weight: 700;
  line-height: 1.1;
}

h1,
h2 {
  letter-spacing: -0.02em;
}

h1 {
  font-size: clamp(2rem, 4vw, 3.2rem);
}

h2 {
  font-size: 24px;
  margin: 24px 0;
  transition: color 0.5s;
  padding-top: 36px;
  border-top: 1px solid var(--vp-c-divider-light);
}

h3 {
  letter-spacing: -0.015em;
  color: var(--vp-c-text-1);
  font-size: 1.05rem;
  margin: 0;
}

.base-layout {
  max-width: 1160px;
  margin: 0 auto;
  padding: 24px 20px 56px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-hero {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px 0 8px;
}

.page-hero__eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vp-c-brand-2);
}

.page-hero__description {
  max-width: 62ch;
  font-size: 1rem;
  line-height: 1.75;
  color: var(--vp-c-text-2);
}

.search-shell {
  display: flex;
  align-items: end;
  gap: 12px;
}

.search-shell__field {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 8px;
}

.search-shell__label,
.search-panel__eyebrow {
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-text-3);
}

.search-shell input {
  width: 100%;
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 14%, var(--vp-c-divider));
  border-radius: 14px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.search-shell input:focus {
  outline: 2px solid color-mix(in srgb, var(--vp-c-brand-1) 35%, transparent);
  outline-offset: 2px;
}

.search-shell__clear,
.group-item__toggle {
  min-height: 40px;
  padding: 0 12px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  background: transparent;
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.search-panel {
  padding: 18px;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 10%, var(--vp-c-divider));
  border-radius: 20px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--vp-c-bg-soft) 92%, var(--vp-c-brand-soft) 8%), var(--vp-c-bg));
}

.search-panel__header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.search-panel__header h2 {
  margin: 4px 0 0;
  padding: 0;
  border: 0;
  font-size: 1.3rem;
}

.search-panel__meta,
.search-panel__empty {
  color: var(--vp-c-text-3);
}

.nav-overview,
.search-result-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
}

.nav-overview__card,
.search-result-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
  border: 1px solid var(--vp-c-divider-light);
  border-radius: 16px;
  background: var(--vp-c-bg);
  color: inherit;
  text-decoration: none;
}

.nav-overview__card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.65;
}

.nav-overview__eyebrow,
.nav-overview__meta {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.search-result-group__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
}

.search-result-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.search-result-list a {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 0;
  color: inherit;
  text-decoration: none;
}

.search-result-list small {
  color: var(--vp-c-text-3);
}

.index-grid,
.group-grid {
  display: grid;
  gap: 16px;
}

.index-grid {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.index-card,
.group-item,
.group-section {
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 12%, var(--vp-c-divider));
  border-radius: 20px;
  background:
    linear-gradient(180deg, color-mix(in srgb, var(--vp-c-bg-soft) 86%, var(--vp-c-brand-soft) 14%), var(--vp-c-bg));
}

.index-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 220px;
  padding: 22px;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.index-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--vp-c-brand-1) 32%, var(--vp-c-divider));
}

.index-card strong {
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}

.index-card p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.7;
}

.index-card__eyebrow,
.index-card__meta,
.group-item__count,
.group-section__meta {
  font-size: 0.82rem;
  color: var(--vp-c-text-3);
}

.index-card__meta {
  margin-top: auto;
}

.group-section {
  padding: 18px;
}

.group-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.group-tag {
  display: inline-flex;
  align-items: center;
  min-height: 32px;
  padding: 0 12px;
  border-radius: 999px;
  background-color: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
  font-size: 0.85rem;
  font-weight: 700;
}

.group-grid {
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.group-item {
  padding: 18px;
}

.group-item__header {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 12px;
  margin-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.link-list a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 42px;
  padding: 8px 0;
  color: var(--vp-c-text-2);
  text-decoration: none;
  line-height: 1.6;
  transition: color 0.2s ease;
}

.link-list a:hover {
  color: var(--vp-c-brand-1);
}

.link-list a:hover .link-arrow {
  transform: translateX(2px);
}

.group-item__toggle {
  margin-top: 12px;
}

.link-arrow {
  flex: none;
  color: var(--vp-c-brand-2);
  transition: transform 0.2s ease;
}

.empty-state {
  padding: 28px 20px;
  border: 1px dashed var(--vp-c-divider);
  border-radius: 16px;
  color: var(--vp-c-text-3);
  text-align: center;
}

@media (max-width: 768px) {
  .base-layout {
    padding: 20px 16px 40px;
  }

  .page-hero {
    gap: 8px;
  }

  .page-hero__description {
    font-size: 0.95rem;
    line-height: 1.7;
  }

  .search-shell,
  .search-panel__header,
  .group-section__header,
  .group-item__header {
    align-items: flex-start;
    flex-direction: column;
  }

  .group-section {
    padding: 14px;
  }

  .index-card,
  .group-item,
  .search-panel,
  .nav-overview__card,
  .search-result-group {
    padding: 16px;
    border-radius: 16px;
  }
}
</style>
