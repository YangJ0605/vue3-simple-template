import { createApp } from 'vue'
import 'uno.css'
import 'nprogress/nprogress.css'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/styles/element.scss'

import './styles/common.scss'

import App from './App.vue'
import router from '@/router'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})
app.use(router)

app.mount('#app')
