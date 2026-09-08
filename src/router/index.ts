import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

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
  {
    path: '/investigaciones',
    name: 'Investigaciones',
    component: () => import('../views/InvestigacionesView.vue'),
    meta: { title: 'Blogs | Juan Román Garza' },
  },
  {
    path: '/investigaciones/:slug',
    name: 'Articulo',
    component: () => import('../views/ArticuloView.vue'),
    meta: { title: 'Artículo | Juan Román Garza' },
  },
  // Alias amigables: /blogs → /investigaciones (se mantiene la URL original por SEO y enlaces ya compartidos)
  { path: '/blogs', redirect: { name: 'Investigaciones' } },
  { path: '/blogs/:slug', redirect: (to) => ({ name: 'Articulo', params: { slug: to.params.slug } }) },
  // ── Panel de blogs (privado) ─────────────────────────────────────────────
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../views/admin/AdminLoginView.vue'),
    meta: { title: 'Acceso | Panel de Blogs', noindex: true },
  },
  {
    path: '/admin',
    component: () => import('../views/admin/AdminView.vue'),
    meta: { requiresAdmin: true, noindex: true },
    children: [
      {
        path: '',
        name: 'AdminList',
        component: () => import('../views/admin/AdminListView.vue'),
        meta: { title: 'Blogs | Panel de Blogs' },
      },
      {
        path: 'nuevo',
        name: 'AdminNew',
        component: () => import('../views/admin/AdminEditorView.vue'),
        meta: { title: 'Nuevo artículo | Panel de Blogs' },
      },
      {
        path: 'editar/:id',
        name: 'AdminEdit',
        component: () => import('../views/admin/AdminEditorView.vue'),
        meta: { title: 'Editar artículo | Panel de Blogs' },
      },
    ],
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

  // Las páginas privadas no deben indexarse
  let robots = document.querySelector<HTMLMetaElement>('meta[name="robots"][data-dynamic]')
  if (to.meta?.noindex) {
    if (!robots) {
      robots = document.createElement('meta')
      robots.name = 'robots'
      robots.setAttribute('data-dynamic', '')
      document.head.appendChild(robots)
    }
    robots.content = 'noindex, nofollow'
  } else if (robots) {
    robots.remove()
  }

  if (to.meta?.requiresAdmin) {
    const auth = useAuthStore()
    if (!auth.isAdmin) {
      next({ name: 'AdminLogin', query: { redirect: to.fullPath } })
      return
    }
  }
  next()
})

export default router
