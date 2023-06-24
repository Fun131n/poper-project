<template>
  <div ref="detailContainer" class="detail-wrapper">
    <div class="detail-header">
      <div class="back" @click="goBack">返回</div>
    </div>
    <template v-if="article">
      <video class="detail-video" :src="article.videoSrc" controls></video>
      <div class="detail-title">{{ article.title }}</div>
      <div class="detail-content">{{ article.content }}</div>
    </template>
  </div>
  <div v-show="isShowScrollTop" class="scroll-top" @click="scrollToTop">
    回到顶部
  </div>
</template>

<script setup lang="ts">
import { Article } from '@/type'
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getArticle } from '@/api/api'

const detailContainer = shallowRef<HTMLElement | null>(null)
const router = useRouter()
const route = useRoute()

let article = ref<Article>()
const isShowScrollTop = ref(false)

onMounted(() => {
  initData()
  detailContainer.value?.addEventListener('scroll', showScrollTop)
})

onUnmounted(() => {
  detailContainer.value?.removeEventListener('scroll', showScrollTop)
})

function showScrollTop(e: Event) {
  const target = e.target as HTMLElement
  if (target.scrollTop > 200) {
    isShowScrollTop.value = true
  } else {
    isShowScrollTop.value = false
  }
}

function initData() {
  getArticleInfo()
}

async function getArticleInfo() {
  const articleId = route.params.id as string
  const res = await getArticle(articleId)
  if (res.data) {
    article.value = res.data
  }
}

function scrollToTop() {
  if (detailContainer.value?.scrollTop) {
    detailContainer!.value.scrollTop = 0
  }
}

function goBack() {
  router.back()
}
</script>

<style scoped lang="less">
.detail-wrapper {
  height: 100vh;
  text-align: left;
  overflow: scroll;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  height: 40px;
  padding: 0 8px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);

  .back {
    background-color: #fff;
    color: #000;
    line-height: 40px;
  }
}

.detail-video {
  width: 100%;
  height: 250px;
}

.detail-title {
  font-size: 18px;
  font-weight: 700;
}

.detail-content {
  margin-top: 8px;
  line-height: 1.8;
  padding: 8px;
}

.scroll-top {
  position: fixed;
  bottom: 16px;
  right: 16px;
  height: 64px;
  width: 64px;
  line-height: 64px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  background-color: aquamarine;
  border-radius: 50%;
  text-align: center;
  font-size: 14px;
  color: #000;
  cursor: pointer;
}

@media screen and (min-width: 800px) {
  .detail-wrapper {
    width: 50vw;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #fff;
    flex-direction: column;
  }

  .detail-header {
    display: none;
  }
}
</style>
