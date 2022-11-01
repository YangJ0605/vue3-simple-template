<template>
  <el-drawer
    :model-value="store.settingDrawerVisible"
    direction="rtl"
    size="280px"
    :with-header="false"
    @close="store.settingDrawerVisibleChanged"
  >
    <el-divider>其他设置</el-divider>
    <iz-other />
  </el-drawer>
</template>

<script lang="ts">
  export default { name: 'IzSetting' }
</script>

<script setup lang="ts">
  import { useSettingStore } from '@/store'
  import IzOther from './Other.vue'

  const store = useSettingStore()
</script>
