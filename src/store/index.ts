import { createPinia } from 'pinia'

const store = createPinia()

export default store

export * from './modules/menus'
export * from './modules/setting'
export * from './modules/user'
