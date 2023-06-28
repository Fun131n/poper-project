<template>
  <div class="menus-wrapper">
    <div class="menu-item" v-for="(menu, index) in menus" @mouseover="onMouseOver(index)" @mouseout="onMouseOut()">
      <div class="menu-title">{{ menu.label }}<span v-if="menu.value" class="arrow"></span></div>
      <div v-show="index === activeMenuIndex" class="options-container">
        <ul class="options">
          <li v-for="(menuItem, subIndex) in menu.value" @mouseover="onMouseOver(subIndex, true)" @mouseout="onMouseOut(true)">
            {{ menuItem.label }}
            <Icon v-if="menuItem.value" class="sub-menu-icon" name="caret_right"/>
            <div v-show="menuItem.value && subIndex === activeSubMenuIndex" class="sub-options-container">
              <ul class="sub-options">
                <li v-for="subItem in menuItem.value">{{ subItem.label }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Icon from '@/components/icon/icon.vue'

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
  }
]

const activeMenuIndex = ref(-1)
const activeSubMenuIndex = ref(-1)

function onMouseOver(index: number, isSubMenu = false) {
  if (isSubMenu) {
    activeSubMenuIndex.value = index
  }else {
    activeMenuIndex.value = index
  }
}

function onMouseOut(isSubMenu = false) {
  if (isSubMenu) {
    activeSubMenuIndex.value = -1
  }else {
    activeMenuIndex.value = -1
  }
}

</script>

<style lang="less" scoped>
.menus-wrapper {
  display: flex;
}

.menu-item {
  margin-right: 24px;
  padding: 5px 8px;
  padding-right: 24px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ececee;

    .arrow {
      transform: rotate(-45deg);
      top: 8px;
    }
  }
}
.menu-title {
  position: relative;
  color: #493b32;
  font-weight: 700;
}

.arrow {
  position: absolute;
  width: 6px;
  height: 6px;
  top: 6px;
  margin-left: 5px;
  border-top: 2px solid #493b32;
  border-right: 2px solid #493b32;
  transition: transform .3s;
  transform: rotate(135deg);
}

.options-container,.sub-options-container {
  display: flex;
  position: absolute;
}

.sub-options-container {
  top: 0;
  left: 150px;
  padding-left: 24px;
}

.options,.sub-options {
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(26,26,26,.2);
  padding: 4px 0;
  list-style: none;

  li {
    position: relative;
    line-height: 2.5em;
    padding: 0 2em;
    color: #493b32;
    white-space: nowrap;

    &:hover {
      background-color: #16bfb7;
      color: #fff;
    }
  }
}

.sub-menu-icon {
  height: 16px;
  width: 16px;
  vertical-align: middle;
}


</style>
