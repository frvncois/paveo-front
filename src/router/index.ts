import { createRouter, createWebHistory } from 'vue-router'
import { lenis } from '@/main'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:service(amenagement|construction|renovation)',
      name: 'service',
      component: () => import('../views/ServiceView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticlesView.vue'),
    },
    {
      path: '/articles/:slug',
      name: 'article',
      component: () => import('../views/SingleView.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue'),
    },
    {
      path: '/soumission',
      name: 'soumission',
      component: () => import('../views/SoumissionView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (from.name) {
    lenis.scrollTo(0, { immediate: true })
  }
  next()
})

export default router
