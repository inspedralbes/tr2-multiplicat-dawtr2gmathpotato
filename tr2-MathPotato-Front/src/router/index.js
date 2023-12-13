import { createRouter, createWebHistory } from 'vue-router'
import tauler from '../components/tauler.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'guest',
      component: () => import('../components/GuestView.vue') 
    },
    {
      path: '/play',
      name: 'play',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/tauler.vue')
    },
    {
      path: '/waiting',
      name: 'waiting',
      component: () => import('../components/WaitingView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../components/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../components/Register.vue')
    }


  ]
})

export default router
