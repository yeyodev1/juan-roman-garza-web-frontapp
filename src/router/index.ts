import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Inicio | Juan Román Garza' },
  },
  {
    path: '/sobre-mi',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'Sobre Mí | Juan Román Garza' },
  },
  {
    path: '/powerhouse',
    name: 'Powerhouse',
    component: () => import('../views/PowerhouseView.vue'),
    meta: { title: 'Powerhouse Biotech | Juan Román Garza' },
  },
  {
    path: '/longevidad-regenerativa',
    name: 'Approach',
    component: () => import('../views/ApproachView.vue'),
    meta: { title: 'Longevidad Regenerativa | Juan Román Garza' },
  },
  {
    path: '/empresas',
    name: 'Ecosystem',
    component: () => import('../views/EcosystemView.vue'),
    meta: { title: 'Empresas | Juan Román Garza' },
  },
  {
    path: '/prensa-y-eventos',
    name: 'Press',
    component: () => import('../views/PressView.vue'),
    meta: { title: 'Prensa y Eventos | Juan Román Garza' },
  },
  {
    path: '/contacto',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'Contacto | Juan Román Garza' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { left: 0, top: 0, behavior: 'smooth' }
  },
})

router.beforeEach((to, _from, next) => {
  if (to.meta?.title) {
    document.title = to.meta.title as string
  }
  next()
})

export default router
