<script lang="ts">
  export default { name: 'HeaderIndex' }
</script>

<script setup lang="ts">
  import { reactive } from 'vue'
  import { RouterLink } from 'vue-router'
  import screenfull from 'screenfull'
  import { DEMO_USER_HEAD } from '@/config/urls'

  import {
    Fold,
    Expand,
    FullScreen,
    SwitchButton,
    Setting,
    User,
    Bell,
    ReadingLamp
  } from '@element-plus/icons-vue'
  import IconFont from '@/components/IconFont.vue'

  import './index.scss'

  import Message from './Message.vue'
  import Notification from './Notification.vue'
  import Todo from './Todo.vue'
  import { Themes } from '@/store/modules/setting'
  import { useSettingStore, useUserStore } from '@/store'

  const settingStore = useSettingStore()
  const userStore = useUserStore()

  const configData = reactive({
    // 全屏状态
    isFullscreen: false,
    // 通知内容显示
    bellContent: false
  })

  const adjustMenu = () => {
    if (settingStore.isMobile) {
      settingStore.adjustMobileDrawer(!settingStore.mobileDrawer)
    } else {
      settingStore.asideState(settingStore.aside === 'open' ? 'close' : 'open')
    }
  }

  // 调整主题
  const adjustTheme = (theme: Themes) => {
    settingStore.themeChanged({ theme })
  }

  const fullScreen = () => {
    if (screenfull.isEnabled) {
      if (screenfull.isFullscreen) {
        screenfull.exit()
      } else screenfull.request()
    } else {
      window.$message?.error('浏览器不支持全屏')
    }
  }

  // 退出登录
  const logout = () => {
    userStore.logout()
  }

  if (screenfull.isEnabled) {
    screenfull.on('change', () => {
      configData.isFullscreen = !configData.isFullscreen
    })
  }
</script>

<template>
  <header class="layout-header">
    <ul class="layout-header-left">
      <li class="cper" @click="adjustMenu">
        <el-icon v-if="settingStore.aside === 'open'" :size="18"
          ><Fold
        /></el-icon>
        <el-icon v-else :size="18"><Expand /></el-icon>
      </li>
      <li class="breadcrumb-help">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="breadcrumb of settingStore.breadcrumbs"
            :key="breadcrumb"
            >{{ breadcrumb }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </li>
    </ul>
    <ul class="layout-header-right">
      <el-popover>
        <template #reference>
          <li>
            <el-badge :value="12">
              <el-icon><Bell /></el-icon>
            </el-badge>
          </li>
        </template>
        <el-tabs model-value="notice">
          <el-tab-pane name="notice" label="通知">
            <Notification />
          </el-tab-pane>
          <el-tab-pane name="message" label="消息">
            <Message />
          </el-tab-pane>
          <el-tab-pane name="todo" label="代办">
            <Todo />
          </el-tab-pane>
        </el-tabs>
      </el-popover>
      <el-dropdown>
        <li>
          <el-icon>
            <reading-lamp />
          </el-icon>
        </li>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="adjustTheme('light')">
              <icon-font type="icon-sun" />
              <span style="padding-left: 4px">默认主题</span>
            </el-dropdown-item>
            <el-dropdown-item @click="adjustTheme('dark')">
              <icon-font type="icon-moon" />
              <span style="padding-left: 4px">暗黑主题</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <li @click="fullScreen">
        <el-icon><FullScreen /></el-icon>
      </li>

      <el-dropdown>
        <template #dropdown>
          <el-dropdown-menu>
            <!-- <el-dropdown-item :icon="User">
              <RouterLink to="/user" class="layout-header-link">
                个人中心
              </RouterLink>
            </el-dropdown-item>
            <el-dropdown-item :icon="Setting">
              <router-link to="/user/setting" class="layout-header-link">
                个人设置
              </router-link>
            </el-dropdown-item> -->
            <el-dropdown-item :icon="SwitchButton" @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
        <li>
          <el-avatar size="small" :src="DEMO_USER_HEAD" />
        </li>
      </el-dropdown>
      <!-- <li @click="store.commit('setting/settingDrawerVisibleChanged')">
        <el-icon style="transform: rotate(90deg)"><MoreFilled /></el-icon>
      </li> -->
    </ul>
  </header>
</template>
