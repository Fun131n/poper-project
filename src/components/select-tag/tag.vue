<template>
  <span class="tag">
    <slot />
    <div class="icon-close" @click="onClose"></div>
  </span>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

function onClose() {
  emit('close')
}
</script>

<style scoped>
.tag {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  padding: 0 4px;
  border-radius: 8px;
}

.icon-close {
  position: relative;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

.icon-close:before,
.icon-close:after {
  content: '';
  position: absolute;
  top: 50%;
  width: 8px;
  height: 1px;
  background-color: #000;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}

.icon-close:after {
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
</style>
