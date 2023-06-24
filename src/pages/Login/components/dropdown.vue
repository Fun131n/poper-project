<template>
  <el-menu class="menu" mode="horizontal" :ellipsis="false">
    <el-sub-menu index="1">
      <template #title>サービス</template>
      <el-menu-item index="1-1">サービス一覧</el-menu-item>
      <el-menu-item index="1-2">ComiruBASIC</el-menu-item>
      <el-menu-item index="1-3">ComiruFREE</el-menu-item>
      <el-menu-item index="1-4">ComiruAir</el-menu-item>
      <el-menu-item index="1-5">ComiruHR</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>基本機能</template>
      <el-sub-menu index="2-1">
        <template #title>Comiru</template>
        <el-menu-item index="2-1-1">専用アプリ＆LINE連携</el-menu-item>
        <el-menu-item index="2-1-2">指導報告書</el-menu-item>
        <el-menu-item index="2-1-3">入退室管理</el-menu-item>
        <el-menu-item index="2-1-4">請求書</el-menu-item>
        <el-menu-item index="2-1-5">口座振替</el-menu-item>
        <el-menu-item index="2-1-6">カード決済</el-menu-item>
        <el-menu-item index="2-1-7">成績管理</el-menu-item>
        <el-menu-item index="2-1-8">座席管理</el-menu-item>
        <el-menu-item index="2-1-9">見込顧客獲得</el-menu-item>
        <el-menu-item index="2-1-10">Web申込み</el-menu-item>
        <el-menu-item index="2-1-11">口コミ収集＆掲載</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2-2">
        <template #title>ComiruAir</template>
        <el-menu-item index="2-2-1">オンライン授業支援</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="2-3">
        <template #title>ComiruHR</template>
        <el-menu-item index="2-3-1">講師人事労務管理</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>ヘルプ</template>
      <el-sub-menu index="3-1">
        <template #title>Comiru</template>
        <el-menu-item index="3-1-1">導入までの流れ</el-menu-item>
        <el-menu-item index="3-1-2">よくある質問</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="3-2">
        <template #title>ComiruAir</template>
        <el-menu-item index="3-2-1">よくある質問</el-menu-item>
      </el-sub-menu>
      <el-menu-item index="3-3">
        <template #title>お問い合わせ</template>
      </el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.el-menu--horizontal {
  border-bottom: none;
}
.el-sub-menu {
  height: 40px;
  --el-menu-text-color: #493b32;
  --el-menu-hover-text-color: #493b32;
  --el-menu-hover-bg-color: #ececee;
}

.el-menu--horizontal:deep(.el-sub-menu .el-sub-menu__title:hover) {
  background-color: #ececee;
  border-radius: 4px;
}

.el-menu-item {
  --el-menu-text-color: #493b32;
  --el-menu-hover-text-color: #fff;
  --el-menu-hover-bg-color: #16bfb7;
}
</style>
