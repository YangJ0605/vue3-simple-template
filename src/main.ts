import { createApp } from 'vue'
import 'uno.css'
import 'nprogress/nprogress.css'

import '@/assets/iconfonts/login/iconfont'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/element.scss'

import './styles/common.scss'

import App from './App.vue'
import router from '@/router'
import store, { useMenuStore } from './store'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})

app.use(store)

app.use(router)

app.mount('#app')

if (sessionStorage.getItem('token')) {
  const meunStore = useMenuStore()
  meunStore.resetMenu({ newRoutes: [] })
}
