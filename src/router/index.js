import { createRouter, createWebHistory } from 'vue-router'
import { onPageEnter, onPageLeave } from '../utils/analytics'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页' }
  },
  {
    path: '/quiz',
    name: 'Quiz',
    component: () => import('../views/Quiz.vue'),
    meta: { title: '测评页' }
  },
  {
    path: '/result',
    name: 'Result',
    component: () => import('../views/Result.vue'),
    meta: { title: '结果页' }
  },
  {
    path: '/course',
    name: 'Course',
    component: () => import('../views/Course.vue'),
    meta: { title: '领课页' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫 - 自动统计页面停留时长
router.beforeEach((to, from, next) => {
  // 离开上一个页面时记录停留时长
  if (from.name) {
    onPageLeave()
  }
  next()
})

router.afterEach((to) => {
  // 进入新页面时记录
  if (to.meta?.title) {
    onPageEnter(to.meta.title)
  }
})

// 页面关闭时统计最后一个页面的停留时长
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    onPageLeave()
  })
}

export default router
