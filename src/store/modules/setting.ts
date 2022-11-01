import { menuTagActions } from '@/config/static'
import router from '@/router'
import { defineStore } from 'pinia'

interface AsideType {
  aside: 'open' | 'close' // 正常展开、缩小显示图标
  isMobile: boolean
  mobileDrawer: boolean
}

export type Themes = 'dark' | 'light'

export interface MenuTag {
  title: string
  path: string
  // 是否是当前路由
  curr: boolean
}
// 移除标签类型，当前|目标|非当前|全部
export type MenuTagActions = 'rmCurr' | 'rmTarget' | 'rmOther' | 'rmAll'

export interface SettingStateType extends AsideType {
  // 当前激活的菜单
  selectedKey: string
  // 当前展开菜单key
  // openKeys: Array<string>
  // 面包屑
  breadcrumbs: Array<string>
  // 主题
  theme: Themes
  // 缓存路由名称列表
  cacheList: Array<string>
  // 当前打开的菜单标签
  menuTags: Array<MenuTag>
  // 设置抽屉状态
  settingDrawerVisible: boolean

  openKeys: string[]
}

const cacheTheme = localStorage.getItem('theme')

const adjustHtmlClass = (theme: Themes) => {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

adjustHtmlClass(cacheTheme as Themes)

const fixedTags = [{ path: '/role', title: '角色管理' }]

// 判断当前操作标签是不是固定标签
const checkFixedTag = (tag: MenuTag) => {
  return fixedTags.findIndex(item => item.path === tag.path) !== -1
}

const defaultState: SettingStateType = {
  aside: 'open',
  mobileDrawer: false,
  selectedKey: '/',
  breadcrumbs: [],
  theme: 'light',
  cacheList: [],
  isMobile: document.body.offsetWidth < 970,
  settingDrawerVisible: false,
  openKeys: [],
  menuTags: fixedTags.map(tag => ({ curr: false, ...tag }))
}

export const useSettingStore = defineStore('setting-store', {
  state: () => defaultState,
  actions: {
    adjustMobileDrawer(mobileDrawer: boolean): void {
      this.mobileDrawer = mobileDrawer
    },
    asideState(payload: AsideType['aside']): void {
      this.aside = payload
    },
    themeChanged(payload: { theme: Themes }): void {
      adjustHtmlClass(payload.theme)
      this.theme = payload.theme
      localStorage.setItem('theme', payload.theme)
    },
    removeMenuTag(payload: { type: MenuTagActions; route: Partial<MenuTag> }) {
      switch (payload.type) {
        case menuTagActions.rmTarget: {
          this.menuTags = this.menuTags.filter(
            tag => tag.path !== payload.route.path
          )
          break
        }
        case menuTagActions.rmCurr: {
          this.menuTags = this.menuTags.filter(tag => {
            if (tag.curr && !checkFixedTag(tag)) {
              return false
            }
            return true
          })
          break
        }
        case menuTagActions.rmOther: {
          this.menuTags = this.menuTags.filter(tag => {
            if (!tag.curr && !checkFixedTag(tag)) {
              return false
            }
            return true
          })
          break
        }
        case menuTagActions.rmAll: {
          this.menuTags = fixedTags.map(tag => ({ curr: false, ...tag }))
        }
      }

      // 定位到最后一个标签
      router.push(this.menuTags[this.menuTags.length - 1].path)
    },
    // 调整设置抽屉显示状态
    settingDrawerVisibleChanged() {
      this.settingDrawerVisible = !this.settingDrawerVisible
    },
    routeChanged(payload: { path: string; breadcrumbs: Array<string> }) {
      // ['index','data']
      const levels = payload.path.match(/[^/]+/g) || []

      // 删除最后一个Item，展开其他的所有父级菜单
      levels.pop()

      const openKeysTemp: string[] = []

      // 解决一级路由不能正确展开菜单
      if (levels.length === 0) {
        levels.push('')
      }
      levels.reduce((prev: string, curr): string => {
        openKeysTemp.push(prev + '/' + curr)
        return prev + '/' + curr
      }, '')

      this.selectedKey = payload.path
      this.openKeys = openKeysTemp
      this.breadcrumbs = payload.breadcrumbs
    },
    routerChanged(payload: { route: MenuTag }) {
      const { menuTags } = this
      const savedTag = menuTags.find(item => item.path === payload.route.path)

      if (savedTag) {
        menuTags.forEach(item => {
          if (item === savedTag) {
            item.curr = true
          } else {
            item.curr = false
          }
        })
      } else {
        menuTags.forEach(item => {
          item.curr = false
        })

        menuTags.push({
          ...payload.route,
          curr: true
        })
      }

      this.menuTags = menuTags
    },
    reSized(payload: { isMobile: boolean }) {
      this.isMobile = payload.isMobile
    }
  }
})
