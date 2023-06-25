<template>
  <div class="card-wrapper">
    <div class="card-content">
      <div class="card-header">
        <BImage class="card-header-icon" :src="article.titleIcon" />
        <div class="card-header-title">{{ article.title }}</div>
      </div>
      <div class="card-description">{{ article.content }}</div>
      <div class="card-footer">{{ article.date }}</div>
    </div>
    <BImage class="card-image" :src="article.contentImg" />
  </div>
</template>

<script setup lang="ts">
import BImage from '@/components/image/image.vue'

import type { ArticleCardProps } from './ArticleCard'
import { onMounted } from 'vue'

defineProps<ArticleCardProps>()

onMounted(() => {})
</script>

<style scoped lang="less">
.card-wrapper {
  display: flex;
  align-items: center;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);
  padding: 8px;
}

.card-content {
  display: flex;
  flex: 1;
  flex-flow: row wrap;
  margin-right: 8px;
  overflow: hidden;
}

.card-header {
  display: flex;
  align-items: center;

  &-icon {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }

  &-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 60%;
  }
}

.card-description {
  width: 100%;
  margin: 8px 0;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}

.card-footer {
  color: gray;
  font-size: 14px;
}

.card-image {
  width: 80px;
  min-width: 80px;
  height: 80px;
}

@media screen and (min-width: 800px) {
  .card-description {
    -webkit-line-clamp: 5;
  }

  .card-image {
    width: 160px;
    min-width: 160px;
    height: 160px;
  }
}
</style>
