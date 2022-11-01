<template>
  <section :class="wrapperClass">
    <el-drawer
      v-if="store.isMobile"
      :model-value="store.mobileDrawer"
      direction="ltr"
      size="auto"
      :with-header="false"
      custom-class="mobile-menu-drawer"
      @close="adjustMobileDrawer"
    >
      <div class="layout-aside">
        <header class="logo">
          <img :src="LogoImg" />
          <span>kube-auth</span>
        </header>
        <div class="menu-container">
          <admin-menu />
        </div>
        <footer class="copyright">
          <span>@2020 imzbf.cc</span>
        </footer>
      </div>
    </el-drawer>
    <div v-else class="layout-aside">
      <header class="logo">
        <img :src="LogoImg" />
        <span v-if="asideOpen">kube-auth</span>
      </header>
      <div class="menu-container">
        <admin-menu />
      </div>
      <footer v-if="asideOpen" class="copyright">
        <span>@2022 kube-auth-manager</span>
      </footer>
    </div>
    <div class="layout">
      <va-header />
      <va-bar />
      <main class="layout-main">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="store.cacheList">
              <component :is="Component" />
            </keep-alive>
          </transition>
        </router-view>
      </main>
    </div>
    <div class="drawer">
      <va-setting />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'

  import { useSettingStore } from '@/store'

  import AdminMenu from '@/layout/Menu/index.vue'
  import VaHeader from './Header/index.vue'
  import './style.scss'

  import LogoImg from '../assets/logo.png'
  import VaBar from './Bar/index.vue'
  import VaSetting from './Setting/index.vue'

  const store = useSettingStore()

  // 侧边栏样式
  const wrapperClass = computed(() => {
    const classList = ['wrapper']

    if (store.aside !== 'open') {
      classList.push('aside-close')
    }

    if (store.isMobile) {
      classList.push('is-mobile')
    }
    return classList
  })

  // 侧边栏展开状态
  const asideOpen = computed(() => {
    return store.aside === 'open'
  })

  const adjustMobileDrawer = () => {
    console.log('close')
    store.adjustMobileDrawer(!store.mobileDrawer)
  }
</script>

<script lang="ts">
  export default { name: 'Layout' }
</script>

<style lang="scss">
  .is-mobile {
    .mobile-menu-drawer {
      .el-drawer__body {
        padding: 0;
      }
    }
  }
</style>
