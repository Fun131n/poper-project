<template>
  <div class="drawer-wrapper">
    <div :class="['menu', isOpenMenu ? 'is-opened' : '']">
      <div
        :class="['menu-item', index === activeMenuIndex ? 'is-actived' : '']"
        v-for="(menu, index) in menus"
        @click="onMenuItemClick(index)"
      >
        <div>{{ menu.label }}</div>
        <el-icon v-if="menu.value && menu.value.length > 0"
          ><i-ep-arrow-right
        /></el-icon>
      </div>
    </div>
    <template v-if="activeMenuIndex > -1">
      <div v-show="isOpenMenu" class="sub-menu">
        <template v-for="(subMenu, index) in menus[activeMenuIndex].value">
          <div
            :class="[
              'sub-menu-wrapper',
              activeSubMenuIndex === index ? 'is-opened' : '',
            ]"
            @click="onSubMenuItemClick(index)"
          >
            <div>{{ subMenu.label }}</div>
            <template v-if="subMenu.value && subMenu.value.length > 0">
              <el-icon v-if="activeSubMenuIndex === index"
                ><i-ep-caret-bottom
              /></el-icon>
              <el-icon v-else><i-ep-caret-right /></el-icon>
            </template>
          </div>
          <div class="sub-menu-container" v-if="activeSubMenuIndex === index">
            <div class="sub-menu-item" v-for="subMenuItem in subMenu.value">
              {{ subMenuItem.label }}
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpenMenu = ref(false)
const activeMenuIndex = ref(-1)
const activeSubMenuIndex = ref(-1)

const menus = [
  {
    label: 'サービス',
    value: [
      {
        label: 'サービス一覧',
        value: null,
      },
      {
        label: 'ComiruBASIC',
        value: null,
      },
      {
        label: 'ComiruFREE',
        value: null,
      },
      {
        label: 'ComiruAir',
        value: null,
      },
      {
        label: 'ComiruHR',
        value: null,
      },
    ],
  },
  {
    label: 'プラン一覧',
    value: null,
  },
  {
    label: '基本機能',
    value: [
      {
        label: 'Comiru',
        value: [
          {
            label: '専用アプリ＆LINE連携',
            value: null,
          },
          {
            label: '指導報告書',
            value: null,
          },
          {
            label: '入退室管理',
            value: null,
          },
          {
            label: '請求書',
            value: null,
          },
          {
            label: '口座振替',
            value: null,
          },
          {
            label: 'カード決済',
            value: null,
          },
          {
            label: '成績管理',
            value: null,
          },
          {
            label: '座席管理',
            value: null,
          },
          {
            label: '見込顧客獲得',
            value: null,
          },
          {
            label: 'Web申込み',
            value: null,
          },
          {
            label: '口コミ収集＆掲載',
            value: null,
          },
        ],
      },
      {
        label: 'ComiruAir',
        value: [
          {
            label: 'オンライン授業支援',
            value: null,
          },
        ],
      },
      {
        label: 'ComiruHR',
        value: [
          {
            label: '講師人事労務管理',
            value: null,
          },
        ],
      },
    ],
  },
  {
    label: '導入事例',
    value: null,
  },
  {
    label: 'お役立ち資料',
    value: null,
  },
  {
    label: 'セミナー一覧',
    value: null,
  },
  {
    label: '塾講師ログイン',
    value: null,
  },
]

function onMenuItemClick(index: number) {
  const menu = menus[index]
  if (menu.value && menu.value.length > 0) {
    isOpenMenu.value = true
    activeMenuIndex.value = index
    activeSubMenuIndex.value = -1
  }
}

function onSubMenuItemClick(index: number) {
  activeSubMenuIndex.value = index
}
</script>

<style lang="less" scoped>
.drawer-wrapper {
  box-sizing: border-box;
  position: absolute;
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  padding-top: 44px;
}

.menu {
  height: 100%;
  width: 100%;
}

.menu.is-opened {
  width: 50%;
}

.menu-item,
.sub-menu-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 28px;
  padding: 16px;
  color: #493b32;
  font-weight: 700;
  border-bottom: 0.5px solid #d0d0d5;
  cursor: pointer;
}

.menu-item.is-actived {
  background-color: #f8f8f8;
}

.sub-menu {
  width: 50%;
  height: 100%;
  background-color: #f8f8f8;
}
.sub-menu-item {
  padding: 8px 16px;
  font-size: 14px;
  line-height: 24px;
  border-bottom: 0.5px solid #d0d0d5;
}

.sub-menu-wrapper.is-opened {
  background-color: #16bfb7;
  color: #fff;
}
</style>
