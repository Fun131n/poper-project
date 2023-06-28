<template>
  <div class="wrapper">
    <div class="header">
      <SelectTag
        v-model="selectedTag"
        class="header-select"
        :options="selectOptions"
        @input="debounceSearchInput"
      />
      <button class="header-search" @click="onSearch">搜索</button>
    </div>
    <div v-if="isListEmpty" class="empty">暂无数据</div>
    <VirtualScroller v-else class="list" :items="articles" :item-height="200">
      <template v-slot="{ item }">
        <ArticleCard :article="item" @click="toDetail(item.id)" style="margin: 8px">
        </ArticleCard>
      </template>
      <template #footer>
        <button v-if="isShowLoadMore" class="list-btn" @click="onLoadMore">
          下一页
        </button>
      </template>
    </VirtualScroller>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import SelectTag from '@/components/select-tag/select-tag.vue'
import ArticleCard from './components/ArticleCard.vue'
import type { Article } from '@/type'
import { getArticles } from '@/api/api'
import { debounce } from 'lodash-unified'
import VirtualScroller from '@/components/virtual-scroller/virtual-scroller.vue'

const DEFAULT_PAGE_SIZE = 20

const router = useRouter()
const selectOptions = ref<{ label: string; value: string }[]>([])
let articles = ref<Article[]>([])
let selectedTag = ref<string[]>([])
let rawSuggestion = ref<string[]>([])
let isShowLoadMore = ref(false)
let curPageNum = 1

const isListEmpty = computed(() => {
  return curPageNum === 1 && articles.value.length === 0
})

onMounted(() => {
  init()
})

function init() {
  initSelectOptions()
  initArticles()
}

function initSelectOptions() {
  // TEST: fake local data
  rawSuggestion.value.push('ShangHai')
  rawSuggestion.value.push('Tokyo')
  rawSuggestion.value.push('Newyork')
  for (let index = 0; index < 20; index++) {
    rawSuggestion.value.push('KeyWord' + index)
  }
}

async function initArticles() {
  articles.value = await _getArticles(curPageNum, DEFAULT_PAGE_SIZE)
}

async function _getArticles(
  curPageNum: number,
  pageSize = DEFAULT_PAGE_SIZE,
  searchVal?: string
) {
  const res = await getArticles(
    {
      pageNum: curPageNum,
      pageSize: pageSize,
    },
    searchVal
  )
  let articles = []
  if (res.data.rows) {
    articles = res.data.rows
    if (pageSize * curPageNum >= res.data.pagination.total) {
      isShowLoadMore.value = false
    } else {
      isShowLoadMore.value = true
    }
  }

  return articles
}

const debounceSearchInput = debounce(onSearchInput, 500)

async function onSearchInput(value: string) {
  if (!value) {
    return
  }
  selectOptions.value.length = 0
  const filterSuggestion = rawSuggestion.value.filter((item) => {
    return item.includes(value)
  })
  const notSelectedSuggestion = filterSuggestion.filter((item) => {
    return !selectedTag.value.includes(item)
  })
  notSelectedSuggestion.forEach((item) => {
    selectOptions.value.push({
      label: item,
      value: item,
    })
  })
}

async function onSearch() {
  curPageNum = 1
  const searchVal = selectedTag.value.join()
  articles.value.length = 0
  articles.value = await _getArticles(curPageNum, DEFAULT_PAGE_SIZE, searchVal)
}

async function onLoadMore() {
  curPageNum++
  const searchVal = selectedTag.value.join()
  const newArticles = await _getArticles(
    curPageNum,
    DEFAULT_PAGE_SIZE,
    searchVal
  )
  articles.value = [...articles.value, ...newArticles]
}

function toDetail(id: string) {
  router.push({
    path: `/article/${id}`,
  })
}
</script>

<style scoped lang="less">
.wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  margin: 4px;
  display: flex;

  &-select {
    flex: 1;
    max-height: 32px;
    border-radius: 24px 0 0 0;
  }

  &-search {
    border-radius: 0 24px 0 0;
  }
}

.list {
  flex: 1;

  &-item {
    cursor: pointer;
    padding: 8px;
  }

  &-btn {
    width: 100%;
    height: 40px;
    background-color: #fff;
    color: grey;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    margin: 16px 0;
  }
}

@media screen and (min-width: 800px) {
  .wrapper {
    width: 50vw;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .header {
    width: 100%;
  }
}
</style>
