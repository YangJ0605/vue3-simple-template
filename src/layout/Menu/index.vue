<script lang="ts" setup>
  import { computed } from 'vue'
  import { useMenuStore, useSettingStore } from '@/store'
  import SubMenu from './SubMenu.vue'
  import './style.scss'

  const settingStore = useSettingStore()
  const menuStore = useMenuStore()

  const aside = computed(
    () => !settingStore.isMobile && settingStore.aside === 'close'
  )
</script>

<script lang="ts">
  export default { name: 'IzMenu' }
</script>

<template>
  <el-menu
    class="aside-menu dark-menu"
    :collapse-transition="false"
    :collapse="aside"
    :default-active="settingStore.selectedKey"
    :default-openeds="settingStore.openKeys"
  >
    <sub-menu :menu-list="menuStore.menuList" />
  </el-menu>
</template>
