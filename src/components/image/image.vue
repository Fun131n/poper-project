<template>
  <div ref="image" :class="['image-wrapper', $attrs.class]">
    <template v-if="src !== undefined">
      <img
        v-if="imageSrc !== undefined"
        v-bind="$attrs"
        :src="imageSrc"
        @load="onImageLoad"
        @error="onImageError"
      />
      <div class="image-loading" v-if="isLoading"></div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    lazy?: boolean
  }>(),
  {
    lazy: true,
  }
)

let isLoading = ref(true)
let isLoadError = ref(false)
let imageSrc = ref<string | undefined>()
const image = shallowRef<HTMLElement | null>(null)
let LazyLoadObserver: IntersectionObserver

onMounted(() => {
  if (props.lazy) {
    LazyLoadObserver = initLazyLoadIntersectionObserver(
      image.value as HTMLElement
    )
  } else {
    loadImage()
  }
})

onUnmounted(() => {
  LazyLoadObserver.disconnect()
})

function loadImage() {
  isLoading.value = true
  isLoadError.value = false
  imageSrc.value = props.src
}

function onImageLoad() {
  isLoading.value = false
  isLoadError.value = false
}

function onImageError() {
  isLoading.value = false
  isLoadError.value = true
}

function initLazyLoadIntersectionObserver(el: HTMLElement) {
  const observer = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      loadImage()
      observer.unobserve(el)
    }
  })
  observer.observe(el)
  return observer
}
</script>

<style lang="less">
.image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
.image-loading {
  height: 20%;
  width: 20%;
  border: 5px solid #ddd;
  border-radius: 50%;
  border-top-color: #0077ff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
