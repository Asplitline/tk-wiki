<template>
  <div class="base-layout">
    <template v-if="isRoot">
      <div class="index-page">
        <h1>{{ title }}</h1>
        <div class="index-list">
          <div v-for="(lst, key) in  rootList " class="index-item" :key="key" @click="router.go(`${lst.key}/index`)">
            {{ lst.text }}
          </div>
        </div>

      </div>
    </template>
    <template v-else>
      <template v-if="hasGroup">
        <div class="group-title" v-if="currentItem?.text"> {{ currentItem.text }}</div>
        <div class="group-list union" v-for=" group  of  groupList ">
          <span v-if="group.title" class="group-tag"> {{ group.title }}</span>
          <div v-for="( item, idx ) of  group.children " :key="idx" class="group-item">
            <h3>{{ item.text }}</h3>
            <ul>
              <li v-for=" it  of  item.items " :key="it.link">
                <a href="javascript:;" @click="skipLink(it.link)">{{ it.text }}</a>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <template v-else>
        <h1 class="base-title">{{ title }}</h1>
        <div class="group-list">
          <div v-for="( item, idx ) of  endList " :key="idx" class="group-item">
            <h3>{{ item.text }}</h3>
            <ul>
              <li v-for=" it  of  item.items " :key="it.link">
                <a href="javascript:;" @click="skipLink(it.link)">{{ it.text }}</a>
              </li>
            </ul>
          </div>
        </div>
      </template>

    </template>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vitepress';
import { computed, onMounted, ref, watch } from 'vue';

import { orderArr, orderConfig } from './constants'
import { obj2Array } from '../../../../lib/tools';
import { baseURL, pageRoot } from '../../../../themeConfig/constants';
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

const currentItem = computed(() => {

  const item = rootList.value.find(item => route.path.includes(item.key))
  return item
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

watch(() => currentItem.value, (v) => {
  console.log('v', v)
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
  color: var(--vp-c-brand-3);
  font-size: 18px;
  margin-bottom: 1em;
  transition: color 0.5s;
}

.base-layout {
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.group-list {
  padding: 20px 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  position: relative;


  &.union {
    border: 1px dashed #e0e0e0;
    border-radius: 4px;
    padding: 20px 10px;
  }



  .group-tag {
    position: absolute;
    left: 20px;
    top: -12px;
    display: inline-block;
    padding: 2px 20px;
    border-radius: 4px;
    background-color: var(--vp-c-brand);
    color: #fff;

  }


  .group-item {
    margin: 0;
    padding: 20px;
    border-radius: 8px;
    background-color: var(--vp-c-bg-soft);
    flex: 1;
    min-width: 24%;
    max-width: 25%;



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


.group-title {
  font-size: 24px;
  line-height: 36px;
  font-weight: 700;
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

  .group-list {
    flex-direction: column;

    .group-item {
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
    .group-list {
      .group-item {
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


.index-page {
  display: flex;
  flex-direction: column;
  padding: 20px 10px;

  h1 {
    margin-bottom: 20px;
  }

  .index-list {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    .index-item {
      padding: 4px 10px;
      border: 1px solid var(--vp-c-brand);
      color: var(--vp-c-brand-3);
      border-radius: 4px;

      &:hover {
        background-color: var(--vp-c-brand);
        color: var(--vp-c-white);
        cursor: pointer;
      }

    }
  }

}
</style>
