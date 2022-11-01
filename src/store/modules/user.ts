import { defineStore } from 'pinia'
import router from '@/router'

export interface UserStateType {
  info?: {
    username: string
    email: string
  }
  token?: string
}

const initInfo = {
  username: '',
  email: ''
}

export const useUserStore = defineStore('user-store', {
  state: (): UserStateType => ({
    info: {
      username: '',
      email: ''
    },
    token: sessionStorage.getItem('token') || ''
  }),
  actions: {
    setToken(payload: { token: string }) {
      this.token = payload.token
    },
    reset() {
      this.token = ''
      this.info = initInfo
      sessionStorage.removeItem('token')
    },
    setUserInfo(payload: { info: typeof initInfo }) {
      this.info = payload.info
    },
    logout() {
      this.reset()
      router.push(
        `/login?redirect=${encodeURIComponent(
          router.currentRoute.value.fullPath
        )}`
      )
    }
  }
})
