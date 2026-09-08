<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articlesService, type Article, type Pagination } from '@/services/articles.service'
import type { ApiError } from '@/types'
import ShareModal from '@/components/admin/ShareModal.vue'
import ArticlesPager from '@/components/ArticlesPager.vue'

const route = useRoute()
const router = useRouter()
const publicBase = 'https://juanromangarza.com'

type Status = '' | 'published' | 'draft'
const STATUS_PARAM: Record<string, Status> = { publicados: 'published', borradores: 'draft' }
const STATUS_SLUG: Record<Status, string> = { '': '', published: 'publicados', draft: 'borradores' }

const articles = ref<Article[]>([])
const pagination = ref<Pagination>({ page: 1, limit: 20, total: 0, pages: 1 })
const loading = ref(false)
const error = ref<string | null>(null)
const toast = ref<string | null>(null)
const sharing = ref<Article | null>(null)
const deleting = ref<Article | null>(null)
const listTop = ref<HTMLElement | null>(null)

// ── Estado de la lista = query de la URL (?pagina=2&q=texto&estado=borradores) ──
const page = computed(() => Math.max(1, parseInt(String(route.query.pagina || '1'), 10) || 1))
const search = computed(() => (typeof route.query.q === 'string' ? route.query.q : ''))
const status = computed<Status>(() => STATUS_PARAM[String(route.query.estado || '')] ?? '')
const searchInput = ref(search.value)

function setQuery(patch: Record<string, string | undefined>) {
  const q: Record<string, string> = {}
  const next = { pagina: String(page.value), q: search.value, estado: STATUS_SLUG[status.value], ...patch }
  if (next.pagina && next.pagina !== '1') q.pagina = next.pagina
  if (next.q) q.q = next.q
  if (next.estado) q.estado = next.estado
  router.push({ name: 'AdminList', query: q })
}

function applySearch() { setQuery({ q: searchInput.value.trim(), pagina: '1' }) }
function clearSearch() { searchInput.value = ''; setQuery({ q: '', pagina: '1' }) }
function setStatus(s: Status) { setQuery({ estado: STATUS_SLUG[s], pagina: '1' }) }
function changePage(p: number) {
  setQuery({ pagina: String(p) })
  listTop.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Enlace de vuelta para que el editor regrese a esta misma página/filtro
const backLink = computed(() => route.fullPath)
const editLink = (a: Article) => ({ name: 'AdminEdit', params: { id: a._id }, query: { back: backLink.value } })
const newLink = computed(() => ({ name: 'AdminNew', query: { back: backLink.value } }))

async function load() {
  loading.value = true
  error.value = null
  try {
    const res = await articlesService.adminList({ page: page.value, limit: 20, search: search.value, status: status.value })
    articles.value = res.data
    pagination.value = res.pagination
    // Si la página pedida ya no existe (p. ej. tras borrar), volver a la última
    if (res.pagination.pages > 0 && page.value > res.pagination.pages) setQuery({ pagina: String(res.pagination.pages) })
  } catch (e) {
    error.value = (e as ApiError).message || 'No se pudieron cargar los artículos.'
  } finally {
    loading.value = false
  }
}

function showToast(msg: string) {
  toast.value = msg
  setTimeout(() => (toast.value = null), 2500)
}

// Al volver del editor: mensaje + abrir "Compartir" del artículo guardado
async function handleReturnFromEditor() {
  const msg = route.query.msg
  const shareId = route.query.compartir
  if (!msg && !shareId) return
  if (msg === 'creado') showToast('Artículo creado')
  if (msg === 'guardado') showToast('Cambios guardados')
  if (typeof shareId === 'string') {
    try { sharing.value = await articlesService.adminGet(shareId) } catch { /* ignorar */ }
  }
  // limpiar los parámetros de un solo uso sin recargar
  const q = { ...route.query }
  delete q.msg
  delete q.compartir
  router.replace({ name: 'AdminList', query: q })
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
    load()
  } catch (e) {
    error.value = (e as ApiError).message || 'No se pudo eliminar.'
    deleting.value = null
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-MX', { year: 'numeric', month: 'short', day: 'numeric' })
}

watch(
  () => [page.value, search.value, status.value],
  () => { searchInput.value = search.value; load() },
  { immediate: true },
)
watch(() => [route.query.msg, route.query.compartir], handleReturnFromEditor, { immediate: true })
</script>

<template>
  <div>
    <transition name="adm-fade">
      <div v-if="toast" class="adm__toast"><i class="fa-solid fa-check"></i> {{ toast }}</div>
    </transition>

    <div class="lst__toolbar">
      <form class="lst__search" @submit.prevent="applySearch">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input v-model="searchInput" type="search" placeholder="Buscar por título…" />
        <button v-if="searchInput || search" type="button" class="lst__search-clear" aria-label="Limpiar" @click="clearSearch"><i class="fa-solid fa-xmark"></i></button>
      </form>

      <div class="lst__filters">
        <button :class="['lst__chip', { 'lst__chip--on': status === '' }]" @click="setStatus('')">Todos</button>
        <button :class="['lst__chip', { 'lst__chip--on': status === 'published' }]" @click="setStatus('published')">Publicados</button>
        <button :class="['lst__chip', { 'lst__chip--on': status === 'draft' }]" @click="setStatus('draft')">Borradores</button>
      </div>

      <router-link :to="newLink" class="adm-btn adm-btn--primary"><i class="fa-solid fa-plus"></i> Nuevo artículo</router-link>
    </div>

    <div ref="listTop" class="lst__anchor"></div>
    <ArticlesPager v-if="!loading && articles.length" class="lst__pager-top" :pagination="pagination" :loading="loading" @change="changePage" />

    <p v-if="error" class="adm__error"><i class="fa-solid fa-circle-exclamation"></i> {{ error }}</p>

    <div v-if="loading" class="adm__loading"><span class="adm-spinner"></span></div>

    <div v-else-if="!articles.length" class="lst__empty">
      <i class="fa-regular fa-newspaper"></i>
      <p>No hay artículos{{ search ? ` para "${search}"` : '' }}.</p>
      <router-link :to="newLink" class="adm-btn adm-btn--primary">Crear el primero</router-link>
    </div>

    <ul v-else class="lst">
      <li v-for="a in articles" :key="a._id" class="lst__row" :class="{ 'lst__row--draft': !a.isPublished }">
        <router-link :to="editLink(a)" class="lst__thumb" :class="{ 'lst__thumb--empty': !a.featuredImage }">
          <img v-if="a.featuredImage" :src="a.featuredImage" :alt="a.title" loading="lazy" />
          <i v-else class="fa-regular fa-image"></i>
        </router-link>

        <div class="lst__info">
          <div class="lst__badges">
            <span :class="['lst__badge', a.isPublished ? 'lst__badge--ok' : 'lst__badge--draft']">{{ a.isPublished ? 'Publicado' : 'Borrador' }}</span>
            <span v-if="!a.featuredImage" class="lst__badge lst__badge--warn" title="Al compartir se usará la imagen genérica del sitio">Sin portada</span>
            <time class="lst__date">{{ formatDate(a.date) }}</time>
          </div>
          <h2 class="lst__row-title"><router-link :to="editLink(a)">{{ a.title }}</router-link></h2>
          <p class="lst__row-excerpt">{{ a.excerpt }}</p>
        </div>

        <div class="lst__row-actions">
          <router-link class="lst__icon-btn" title="Editar" :to="editLink(a)"><i class="fa-solid fa-pen"></i><span>Editar</span></router-link>
          <button class="lst__icon-btn" title="Compartir" @click="sharing = a"><i class="fa-solid fa-share-nodes"></i><span>Compartir</span></button>
          <a class="lst__icon-btn" title="Ver en el sitio" :href="`${publicBase}/investigaciones/${a.slug}`" target="_blank" rel="noopener"><i class="fa-solid fa-eye"></i><span>Ver</span></a>
          <button class="lst__icon-btn" :title="a.isPublished ? 'Pasar a borrador' : 'Publicar'" @click="togglePublish(a)">
            <i :class="a.isPublished ? 'fa-solid fa-eye-slash' : 'fa-solid fa-upload'"></i><span>{{ a.isPublished ? 'Ocultar' : 'Publicar' }}</span>
          </button>
          <button class="lst__icon-btn lst__icon-btn--danger" title="Eliminar" @click="deleting = a"><i class="fa-solid fa-trash"></i><span>Eliminar</span></button>
        </div>
      </li>
    </ul>

    <ArticlesPager v-if="!loading && articles.length" class="lst__pager-bottom" :pagination="pagination" :loading="loading" @change="changePage" />

    <ShareModal v-if="sharing" :article="sharing" @close="sharing = null" />

    <div v-if="deleting" class="lst__backdrop" @click.self="deleting = null">
      <div class="lst__dialog" role="alertdialog" aria-modal="true">
        <h3>¿Eliminar este artículo?</h3>
        <p>"{{ deleting.title }}" se borrará de forma permanente y el enlace dejará de funcionar.</p>
        <div class="lst__dialog-actions">
          <button class="adm-btn adm-btn--ghost" @click="deleting = null">Cancelar</button>
          <button class="adm-btn adm-btn--danger" @click="confirmDelete"><i class="fa-solid fa-trash"></i> Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lst {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  &__toolbar { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }

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
      flex: 1; min-width: 0; background: transparent; border: none; outline: none;
      color: var(--text); font-size: 0.9rem;
      &::placeholder { color: var(--text-muted); }
    }
  }
  &__search-clear { background: transparent; border: none; color: var(--text-muted); cursor: pointer; }

  &__filters { display: flex; gap: 0.4rem; }
  &__chip {
    background: transparent; border: 1px solid var(--border); color: var(--text-muted);
    border-radius: 2rem; padding: 0.45rem 0.9rem; font-size: 0.8rem; cursor: pointer;
    &--on { border-color: var(--accent); color: var(--accent); }
  }

  &__anchor { scroll-margin-top: 100px; }
  &__pager-top { margin-bottom: 1rem; }
  &__pager-bottom { margin-top: 1rem; }

  &__empty {
    text-align: center; padding: 4rem 1rem; color: var(--text-muted);
    display: flex; flex-direction: column; align-items: center; gap: 1rem;
    i { font-size: 2.5rem; opacity: 0.5; }
  }

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
      .lst__row-actions { grid-column: 1 / -1; justify-content: flex-start; }
    }
  }

  &__thumb {
    aspect-ratio: 1.91 / 1; border-radius: 0.6rem; overflow: hidden; background: var(--bg-offset);
    display: flex; align-items: center; justify-content: center; color: var(--text-muted);
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
  &__row-title {
    font-family: var(--font-principal); font-size: 1.05rem; font-weight: 600; line-height: 1.3;
    a { color: inherit; text-decoration: none; &:hover { color: var(--accent); } }
  }
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
    font-family: inherit;
    i { font-size: 0.95rem; }
    &:hover { background: rgba(255, 255, 255, 0.06); color: var(--text); }
    &--danger:hover { color: #f87171; background: rgba(239, 68, 68, 0.1); }
  }

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
</style>
