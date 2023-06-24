<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const selectOptions = ref([{}])

onMounted(() => {
  init()
})

function init() {
  initData()
}

function initData() {
  for (let index = 0; index < 200; index++) {
    selectOptions.value.push({
      label: 'option' + index,
      value: 'option' + index,
    })
  }
}

function onSearch() {}
</script>

<style scoped>
.header {
  display: flex;
}

.header-select {
  flex: 1;
  max-height: 32px;
  margin-right: 8px;
}
</style>
