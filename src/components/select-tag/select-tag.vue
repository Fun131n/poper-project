<template>
  <div class="select-tags-wrapper">
    <div class="tags-wrapper" v-if="selected.length">
      <Tag class="tag-item" v-for="item in selected" @close="onTagClose(item)">
        <span class="tag-content">{{ item }}</span>
      </Tag>
    </div>
    <input
      class="select-tags-input"
      list="tag-list"
      v-model="inputValue"
      @input="onInput"
      @blur="onInputBlur"
      @change="onInputChange"
    />
    <div id="suggestion-wrapper" v-show="isShowSuggestion">
      <ul>
        <li
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          @click="onSuggestionClick(option.value)"
        >
          {{ option.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Tag from './tag.vue'
import type { Option } from './select-tag'

const props = defineProps<{
  options: Option[]
  modelValue: string[]
}>()
const emit = defineEmits(['update:modelValue', 'input'])

const selected = ref<string[]>([])
const isShowSuggestion = ref(false)
const inputValue = ref()

watch(props.options, (val) => {
  if (val.length > 0) {
    isShowSuggestion.value = true
  }
})

onMounted(() => {
  setSelected()
})

function setSelected() {
  if (Array.isArray(props.modelValue)) {
    selected.value = props.modelValue
  }
}

function onInputChange(e: Event) {
  const focusEl = document.activeElement
  const target = e.target as HTMLInputElement
  // avoid input illegal dataset when blur
  if (focusEl !== target) {
    inputClear()
    return
  }
  const value = target.value
  const index = selected.value.indexOf(value)
  const isInOptions = props.options.some((option) => {
    return option.label === value
  })
  if (isInOptions && index < 0) {
    selected.value.push(value)
  }
  inputClear()
}

function validateSelectedValue() {
  const index = selected.value.indexOf(inputValue.value)
  const isInOptions = props.options.some((option) => {
    return option.label === inputValue.value
  })
  if (isInOptions && index < 0) {
    selected.value.push(inputValue.value)
  }
  inputClear()
}

function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('input', target.value)
}

function onTagClose(item: string) {
  const index = selected.value.indexOf(item)
  if (index > -1) {
    selected.value.splice(index, 1)
  }
}

function inputClear() {
  inputValue.value = null
}

function onSuggestionClick(value: string) {
  inputValue.value = value
  isShowSuggestion.value = false
  validateSelectedValue()
}

function onInputBlur() {
  // this timeout make the 'onSuggestionClick' in time to execute
  setTimeout(() => {
    isShowSuggestion.value = false
  }, 500)
}
</script>

<style scoped lang="less">
.select-tags-wrapper {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  background-color: #fff;
  border: 1px solid #000;
  padding: 4px;
  overflow-y: hidden;
  overflow-x: scroll;
}
.tags-wrapper {
  display: inline-flex;
  align-items: center;
  height: 32px;
  margin: 0 8px;
  .tag-item {
    background-color: #dbdbdb;
    margin-right: 8px;
  }
  .tag-content {
    margin: 0 4px;
    height: 24px;
    min-width: 40px;
    max-width: 80px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.select-tags-input {
  height: 32px;
  border: none;
  outline: none;
  padding: 0;
  flex-grow: 1;
}

#suggestion-wrapper {
  position: absolute;
  top: 48px;
  max-height: 30vh;
  background: #fff;
  z-index: 1000;
  border: 1px solid #000;
  border-radius: 8px;
  overflow-y: scroll;

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    height: 40px;
    padding: 0 20px;
    margin: 0;
    line-height: 40px;
    cursor: pointer;
    color: #000;
    list-style: none;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

</style>
