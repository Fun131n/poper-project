<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="_name" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{name: string}>()

const _name = computed(() => {
  return `#icon-${props.name}`
})
</script>

<style lang="less">
.svg-icon {
  width: 24px;
  height: 24px;
}
</style>