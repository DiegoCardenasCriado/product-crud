import { createRouter, createWebHashHistory } from 'vue-router'
import Product from '@/views/product/Product.vue';
import Login from '@/views/login/Login.vue'
import NoPage from '@/views/NoPage.vue'

const routes = [
  {
    path: '/',
    name: 'Product',
    component: Product
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:catchAll(.*)',
    name: 'NoPage',
    component: NoPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
