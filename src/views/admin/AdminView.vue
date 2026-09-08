<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { articlesService, type Article, type Pagination } from '@/services/articles.service'
import type { ApiError } from '@/types'
import ArticleEditor from '@/components/admin/ArticleEditor.vue'
import ShareModal from '@/components/admin/ShareModal.vue'
import ArticlesPager from '@/components/ArticlesPager.vue'

const router = useRouter()
const auth = useAuthStore()

type Mode = 'list' | 'edit'
const mode = ref<Mode>('list')
const editing = ref<Article | null>(null)
const sharing = ref<Article | null>(null)

const articles = ref<Article[]>([])
const pagination = ref<Pagination>({ page: 1, limit: 20, total: 0, pages: 1 })
const loading = ref(false)
const loadingArticle = ref(false)
const error = ref<string | null>(null)
const toast = ref<string | null>(null)

const searchInput = ref('')
const search = ref('')
const status = ref<'' | 'published' | 'draft'>('')
const deleting = ref<Article | null>(null)

const publicBase = 'https://juanromangarza.com'

const listTop = ref<HTMLElement | null>(null)

function changePage(page: number) {
  load(page)
  listTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

async function load(page = 1) {
  loading.value = true
  error.value = null
  try {
    const res = await articlesService.adminList({ page, limit: 20, search: search.value, status: status.value })
    articles.value = res.data
    pagination.value = res.pagination
  } catch (e) {
    error.value = (e as ApiError).message || 'No se pudieron cargar los artículos.'
  } finally {
    loading.value = false
  }
}

function applySearch() {
  search.value = searchInput.value.trim()
  load(1)
}

watch(status, () => load(1))

function showToast(msg: string) {
  toast.value = msg
  setTimeout(() => (toast.value = null), 2500)
}

function startCreate() {
  editing.value = null
  mode.value = 'edit'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

async function startEdit(a: Article) {
  loadingArticle.value = true
  try {
    editing.value = await articlesService.adminGet(a._id) // trae el contenido completo
    mode.value = 'edit'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e) {
    error.value = (e as ApiError).message || 'No se pudo abrir el artículo.'
  } finally {
    loadingArticle.value = false
  }
}

function onSaved(saved: Article) {
  const wasNew = !editing.value
  mode.value = 'list'
  editing.value = null
  load(pagination.value.page)
  showToast(wasNew ? 'Artículo creado' : 'Cambios guardados')
  sharing.value = saved
}

function cancelEdit() {
  mode.value = 'list'
  editing.value = null
}

async function togglePublish(a: Article) {
  try {
    const updated = await articlesService.update(a._id, { isPublished: !a.isPublished })
    const idx = articles.value.findIndex((x) => x._id === a._id)
    if (idx >= 0) articles.value[idx] = { ...articles.value[idx], ...updated }
    showToast(updated.isPublished ? 'Artículo publicado' : 'Artículo pasado a borrador')
  } catch (e) {
    error.value = (e as ApiError).message || 'No se pudo actualizar.'
  }
}

async function confirmDelete() {
  if (!deleting.value) return
  try {
    await articlesService.remove(deleting.value._id)
    deleting.value = null
    showToast('Artículo eliminado')
    load(pagination.value.page)
  } catch (e) {
    error.value = (e as ApiError).message || 'No se pudo eliminar.'
    deleting.value = null
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })
}

function logout() {
  auth.logout()
  router.push({ name: 'AdminLogin' })
}

// Sesión expirada (httpBase emite este evento ante un 401)
function onTokenExpired() {
  auth.logout()
  router.push({ name: 'AdminLogin', query: { redirect: '/admin' } })
}

onMounted(() => {
  window.addEventListener('auth:token-expired', onTokenExpired)
  load(1)
})
onBeforeUnmount(() => window.removeEventListener('auth:token-expired', onTokenExpired))
</script>

<template>
  <div class="adm">
    <div class="adm__wrap">
      <!-- Cabecera -->
      <header class="adm__head">
        <div>
          <span class="adm__kicker"><i class="fa-solid fa-pen-nib"></i> Panel de Blogs</span>
          <h1 class="adm__title">Blogs</h1>
        </div>
        <div class="adm__user">
          <span class="adm__user-name"><i class="fa-regular fa-user"></i> {{ auth.user?.name || auth.user?.email }}</span>
          <a :href="`${publicBase}/investigaciones`" target="_blank" rel="noopener" class="adm-btn adm-btn--ghost adm-btn--sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Ver sitio</a>
          <button class="adm-btn adm-btn--ghost adm-btn--sm" @click="logout"><i class="fa-solid fa-right-from-bracket"></i> Salir</button>
        </div>
      </header>

      <transition name="fade">
        <div v-if="toast" class="adm__toast"><i class="fa-solid fa-check"></i> {{ toast }}</div>
      </transition>

      <!-- Editor -->
      <ArticleEditor v-if="mode === 'edit'" :article="editing" @saved="onSaved" @cancel="cancelEdit" />

      <!-- Lista -->
      <template v-else>
        <div class="adm__toolbar">
          <form class="adm__search" @submit.prevent="applySearch">
            <i class="fa-solid fa-magnifying-glass"></i>
            <input v-model="searchInput" type="search" placeholder="Buscar por título…" />
            <button v-if="searchInput" type="button" class="adm__search-clear" aria-label="Limpiar" @click="searchInput = ''; applySearch()"><i class="fa-solid fa-xmark"></i></button>
          </form>

          <div class="adm__filters">
            <button :class="['adm__chip', { 'adm__chip--on': status === '' }]" @click="status = ''">Todos</button>
            <button :class="['adm__chip', { 'adm__chip--on': status === 'published' }]" @click="status = 'published'">Publicados</button>
            <button :class="['adm__chip', { 'adm__chip--on': status === 'draft' }]" @click="status = 'draft'">Borradores</button>
          </div>

          <button class="adm-btn adm-btn--primary" @click="startCreate"><i class="fa-solid fa-plus"></i> Nuevo artículo</button>
        </div>

        <div ref="listTop" class="adm__anchor"></div>
        <ArticlesPager v-if="!loading && articles.length" class="adm__pager-top" :pagination="pagination" :loading="loading" @change="changePage" />

        <p v-if="error" class="adm__error"><i class="fa-solid fa-circle-exclamation"></i> {{ error }}</p>

        <div v-if="loading" class="adm__loading"><span class="adm-spinner adm-spinner--accent"></span></div>

        <div v-else-if="!articles.length" class="adm__empty">
          <i class="fa-regular fa-newspaper"></i>
          <p>No hay artículos{{ search ? ` para "${search}"` : '' }}.</p>
          <button class="adm-btn adm-btn--primary" @click="startCreate">Crear el primero</button>
        </div>

        <ul v-else class="adm__list">
          <li v-for="a in articles" :key="a._id" class="adm__row" :class="{ 'adm__row--draft': !a.isPublished }">
            <div class="adm__thumb" :class="{ 'adm__thumb--empty': !a.featuredImage }">
              <img v-if="a.featuredImage" :src="a.featuredImage" :alt="a.title" loading="lazy" />
              <i v-else class="fa-regular fa-image"></i>
            </div>

            <div class="adm__info">
              <div class="adm__badges">
                <span :class="['adm__badge', a.isPublished ? 'adm__badge--ok' : 'adm__badge--draft']">{{ a.isPublished ? 'Publicado' : 'Borrador' }}</span>
                <span v-if="!a.featuredImage" class="adm__badge adm__badge--warn" title="Al compartir se usará la imagen genérica del sitio">Sin portada</span>
                <time class="adm__date">{{ formatDate(a.date) }}</time>
              </div>
              <h2 class="adm__row-title">{{ a.title }}</h2>
              <p class="adm__row-excerpt">{{ a.excerpt }}</p>
            </div>

            <div class="adm__row-actions">
              <button class="adm__icon-btn" title="Editar" :disabled="loadingArticle" @click="startEdit(a)"><i class="fa-solid fa-pen"></i><span>Editar</span></button>
              <button class="adm__icon-btn" title="Compartir" @click="sharing = a"><i class="fa-solid fa-share-nodes"></i><span>Compartir</span></button>
              <a class="adm__icon-btn" title="Ver en el sitio" :href="`${publicBase}/investigaciones/${a.slug}`" target="_blank" rel="noopener"><i class="fa-solid fa-eye"></i><span>Ver</span></a>
              <button class="adm__icon-btn" :title="a.isPublished ? 'Pasar a borrador' : 'Publicar'" @click="togglePublish(a)">
                <i :class="a.isPublished ? 'fa-solid fa-eye-slash' : 'fa-solid fa-upload'"></i><span>{{ a.isPublished ? 'Ocultar' : 'Publicar' }}</span>
              </button>
              <button class="adm__icon-btn adm__icon-btn--danger" title="Eliminar" @click="deleting = a"><i class="fa-solid fa-trash"></i><span>Eliminar</span></button>
            </div>
          </li>
        </ul>

        <ArticlesPager v-if="!loading && articles.length" class="adm__pager-bottom" :pagination="pagination" :loading="loading" @change="changePage" />
      </template>
    </div>

    <ShareModal v-if="sharing" :article="sharing" @close="sharing = null" />

    <!-- Confirmar eliminación -->
    <div v-if="deleting" class="adm__backdrop" @click.self="deleting = null">
      <div class="adm__dialog" role="alertdialog" aria-modal="true">
        <h3>¿Eliminar este artículo?</h3>
        <p>"{{ deleting.title }}" se borrará de forma permanente y el enlace dejará de funcionar.</p>
        <div class="adm__dialog-actions">
          <button class="adm-btn adm-btn--ghost" @click="deleting = null">Cancelar</button>
          <button class="adm-btn adm-btn--danger" @click="confirmDelete"><i class="fa-solid fa-trash"></i> Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.adm {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  padding: 110px 0 5rem;

  &__wrap {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 2rem;
    @media (max-width: 768px) { padding: 0 1.25rem; }
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  &__kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.4rem;
  }

  &__title { font-family: var(--font-principal); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; }

  &__user { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
  &__user-name { font-size: 0.85rem; color: var(--text-muted); display: inline-flex; gap: 0.4rem; align-items: center; margin-right: 0.5rem; }

  &__toast {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 900;
    background: #10b981;
    color: #04261a;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.75rem 1.25rem;
    border-radius: 2rem;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }

  &__toolbar {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1.5rem;
  }

  &__search {
    flex: 1 1 260px;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 0.7rem;
    padding: 0 0.9rem;
    height: 44px;
    color: var(--text-muted);
    &:focus-within { border-color: var(--accent); }
    input {
      flex: 1;
      min-width: 0;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text);
      font-size: 0.9rem;
      &::placeholder { color: var(--text-muted); }
    }
  }
  &__search-clear { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }

  &__filters { display: flex; gap: 0.4rem; }
  &__chip {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: 2rem;
    padding: 0.45rem 0.9rem;
    font-size: 0.8rem;
    cursor: pointer;
    &--on { border-color: var(--accent); color: var(--accent); }
  }

  &__error {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.85rem; color: #f87171;
    background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 0.6rem; padding: 0.7rem 0.9rem; margin-bottom: 1rem;
  }

  &__loading { display: flex; justify-content: center; padding: 4rem 0; }

  &__empty {
    text-align: center;
    padding: 4rem 1rem;
    color: var(--text-muted);
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
    i { font-size: 2.5rem; opacity: 0.5; }
  }

  &__list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }

  &__row {
    display: grid;
    grid-template-columns: 150px minmax(0, 1fr) auto;
    gap: 1.25rem;
    align-items: center;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 1rem;
    transition: border-color 0.2s;
    &:hover { border-color: rgba(var(--color-cyan-rgb), 0.4); }
    &--draft { opacity: 0.85; }

    @media (max-width: 900px) {
      grid-template-columns: 110px minmax(0, 1fr);
      .adm__row-actions { grid-column: 1 / -1; justify-content: flex-start; }
    }
  }

  &__thumb {
    aspect-ratio: 1.91 / 1;
    border-radius: 0.6rem;
    overflow: hidden;
    background: var(--bg-offset);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted);
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
    &--empty { border: 1px dashed var(--border); }
  }

  &__info { min-width: 0; display: flex; flex-direction: column; gap: 0.35rem; }
  &__badges { display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
  &__badge {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 0.2rem 0.55rem; border-radius: 2rem;
    &--ok { background: rgba(16, 185, 129, 0.15); color: #34d399; }
    &--draft { background: rgba(255, 255, 255, 0.08); color: var(--text-muted); }
    &--warn { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
  }
  &__date { font-size: 0.75rem; color: var(--text-muted); }
  &__row-title { font-family: var(--font-principal); font-size: 1.05rem; font-weight: 600; line-height: 1.3; }
  &__row-excerpt {
    font-size: 0.85rem; color: var(--text-muted); line-height: 1.45;
    display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }

  &__row-actions { display: flex; gap: 0.25rem; flex-wrap: wrap; justify-content: flex-end; }
  &__icon-btn {
    display: inline-flex; flex-direction: column; align-items: center; gap: 0.25rem;
    min-width: 62px; padding: 0.5rem 0.4rem;
    background: transparent; border: 1px solid transparent; border-radius: 0.6rem;
    color: var(--text-muted); font-size: 0.68rem; text-decoration: none; cursor: pointer;
    i { font-size: 0.95rem; }
    &:hover { background: rgba(255, 255, 255, 0.06); color: var(--text); }
    &--danger:hover { color: #f87171; background: rgba(239, 68, 68, 0.1); }
    &:disabled { opacity: 0.5; cursor: wait; }
  }

  &__anchor { scroll-margin-top: 100px; }
  &__pager-top { margin-bottom: 1rem; }
  &__pager-bottom { margin-top: 1rem; }

  &__backdrop {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(5, 10, 30, 0.7); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center; padding: 1rem;
  }
  &__dialog {
    width: 100%; max-width: 420px;
    background: var(--card-bg); border: 1px solid var(--border); border-radius: 1rem; padding: 1.75rem;
    h3 { font-family: var(--font-principal); font-size: 1.15rem; margin-bottom: 0.6rem; }
    p { color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem; }
  }
  &__dialog-actions { display: flex; gap: 0.6rem; justify-content: flex-end; }
}

.adm-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.75rem 1.3rem; border-radius: 0.7rem;
  font-family: var(--font-principal); font-size: 0.9rem; font-weight: 600;
  cursor: pointer; border: 1px solid transparent; text-decoration: none; white-space: nowrap;
  transition: opacity 0.2s, transform 0.2s;
  &--primary { background: var(--accent); color: #0b1631; &:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); } }
  &--ghost { background: transparent; border-color: var(--border); color: var(--text); &:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); } }
  &--danger { background: #ef4444; color: #fff; &:hover:not(:disabled) { opacity: 0.9; } }
  &--sm { padding: 0.5rem 0.9rem; font-size: 0.8rem; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.adm-spinner {
  width: 1.6rem; height: 1.6rem; border-radius: 50%;
  border: 2px solid rgba(var(--color-cyan-rgb), 0.25); border-top-color: var(--accent);
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.fade-enter-active, .fade-leave-active { transition: opacity 0.25s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
