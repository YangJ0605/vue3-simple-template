import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
  type RouteLocation,
  type RouteLocationNormalized,
  type NavigationGuardNext
} from 'vue-router'

import NProgress from 'nprogress'
import { useSettingStore } from '@/store'

NProgress.configure({ minimum: 0.1 })

interface OverrideRecordRaw {
  // 是否展示在左侧菜单栏
  menu?: boolean
  outLink?: string
  meta?: {
    title?: string
    // 阿里矢量图标js标准，使用svg创建，以#开头
    iconHref?: string
    [propName: string]: any
  }
  children?: Array<RouteRecordRaw & OverrideRecordRaw>
  // 所需角色列表
  roles?: Array<number | string>
  [propName: string]: any
}

export type AdminRouteRecordRaw = RouteRecordRaw & OverrideRecordRaw

export const routes: AdminRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    meta: { title: '首页' },
    component: () => import('../layout/index.vue'),
    redirect: '/role',
    menu: true,
    children: [
      {
        path: 'role',
        name: 'RolePage',
        menu: true,
        meta: {
          title: '角色管理',
          iconName: 'DataBoard'
        },
        component: () => import('../pages/role/index')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('../pages/login/index.vue')
  },
  {
    path: '/404',
    name: 'Global404',
    meta: { title: '页面不见啦.' },
    component: () => import('../pages/error/404.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'All',
    redirect: (to: RouteLocation) => {
      return { path: '/404', query: { redirect: to.path } }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(
  (to: RouteLocationNormalized, _, next: NavigationGuardNext) => {
    NProgress.start()
    document.title = `${to.meta?.title || ''} - 管理系统`

    const token = sessionStorage.getItem('token')
    const settingStore = useSettingStore()
    if (token) {
      if (/^\/login.*/.test(to.path)) {
        if (to.query.redirect) {
          // 存在登录跳转回页面
          next(to.query.redirect as string)
        } else {
          next('/')
        }
      } else {
        settingStore.routeChanged({
          path: to.path,
          breadcrumbs: to.matched
            .filter(item => item.meta?.title)
            .map((item: AdminRouteRecordRaw) => item.meta?.title || '')
        })
        next()
      }
    } else {
      // 没有token

      // 判断是否是登录页，防止死循环
      if (/^\/login.*/.test(to.path)) {
        next()
      } else if (/^\/404/.test(to.path)) {
        const redirect = to.query.redirect
        next(redirect ? `/login?redirect=${redirect}` : `/login`)
      } else {
        next(`/login?redirect=${to.path}`)
      }
    }
  }
)

const list = [/^\/login/, /^\/redirect\/.*/]

const excludeTag = (path: string) => {
  for (let i = 0; i < list.length; i++) {
    if (list[i].test(path)) {
      return true
    }
  }

  return false
}

router.afterEach(to => {
  if (!excludeTag(to.path)) {
    const settingStore = useSettingStore()
    settingStore.routerChanged({
      route: {
        title: to.meta.title as string,
        path: to.path,
        curr: false
      }
    })
  }
  NProgress.done()
})

export default router
