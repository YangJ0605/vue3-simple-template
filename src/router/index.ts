import {
  createWebHistory,
  createRouter,
  type RouteRecordRaw,
  type RouteLocation,
  type RouteLocationNormalized,
  type NavigationGuardNext
} from 'vue-router'

import NProgress from 'nprogress'

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   meta: { title: '首页' }
  //   // component: () => import('')
  // },
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

    if (token) {
      if (/^\/login.*/.test(to.path)) {
        if (to.query.redirect) {
          // 存在登录跳转回页面
          next(to.query.redirect as string)
        } else {
          next('/')
        }
      } else {
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

router.afterEach(() => {
  NProgress.done()
})

export default router
