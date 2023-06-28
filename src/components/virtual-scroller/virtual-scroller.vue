<template>
  <div ref="list" class="virtual-scroller-wrapper" @scroll="onScroll">
    <div class="virtual-scroller-box" :style="`height: ${totalHeight}px`"></div>
    <div ref="content" class="virtual-scroller-content">
      <div
        ref="item22"
        class="virtual-scroller-item"
        v-for="item in visibleItems"
      >
        <slot ref="slot" :item="item"></slot>
      </div>
        <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, shallowRef } from 'vue'

const props = defineProps<{
  items: any[]
  itemHeight: number
}>()

//Use radio rather than fixed values for prevent scroll empty data
const DEFAULT_BUFFER_RATIO = 1

const list = shallowRef<HTMLElement | null>(null)
const content = shallowRef<HTMLElement | null>(null)
const screenHeight = ref(0)
const startIndex = ref(0)
const endIndex = ref(0)

const totalHeight = computed(() => {
  return props.items.length * props.itemHeight
})

const visibleCount = computed(() => {
  return Math.ceil(screenHeight.value / props.itemHeight)
})

const startBufferCount = computed(() => {
  return Math.min(startIndex.value, DEFAULT_BUFFER_RATIO * visibleCount.value)
})

const endBufferCount = computed(() => {
  return Math.min(props.items.length - endIndex.value, DEFAULT_BUFFER_RATIO * visibleCount.value)
})

const visibleItems = computed(() => {
  let start = startIndex.value - startBufferCount.value
  let end = endIndex.value + endBufferCount.value
  return props.items.slice(start, end)
})

onMounted(() => {
  screenHeight.value = list.value!.clientHeight
  startIndex.value = 0
  endIndex.value = startIndex.value + visibleCount.value
})


function onScroll() {
  requestAnimationFrame(() => {
    let scrollTop = list.value!.scrollTop
    startIndex.value = Math.floor(scrollTop / props.itemHeight)
    endIndex.value = startIndex.value + visibleCount.value
    content.value!.style.transform = `translateY(${startIndex.value * props.itemHeight}px)`
  })
}
</script>

<style scoped>
.virtual-scroller-wrapper {
  height: 100%;
  overflow-y: scroll;
  position: relative;
}

.virtual-scroller-box {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.virtual-scroller-content {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
}
</style>
