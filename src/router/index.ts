import { createRouter, createWebHashHistory } from "vue-router"
import Articles from '@/pages/Articles/Articles.vue'
import ArticleDetail from '@/pages/ArticleDetail/ArticleDetail.vue'
import Login from '@/pages/Login/Login.vue'

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '/article/:id',
    component: ArticleDetail
  },
  {
    path: '/articles',
    component: Articles
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router