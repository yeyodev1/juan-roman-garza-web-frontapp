<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articlesService, type Article, type Pagination } from '@/services/articles.service'
import type { ApiError } from '@/types'
import ShareModal from '@/components/admin/ShareModal.vue'
import ArticlesPager from '@/components/ArticlesPager.vue'
import { translationBadge, translateActionLabel } from '@/utils/articleTranslation'

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

// ── Traducción al inglés ──────────────────────────────────────────────────────
const translatingIds = ref<Set<string>>(new Set())
// Pendientes de traducir (null = desconocido hasta la primera respuesta del backend)
const backlogRemaining = ref<number | null>(null)
const backlogRunning = ref(false)
const backlogStop = ref(false)
const backlogDone = ref(0)
const BACKLOG_BATCH = 3

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
    if (typeof res.translationStats?.remaining === 'number') backlogRemaining.value = res.translationStats.remaining
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

function replaceRow(a: Article) {
  const idx = articles.value.findIndex((x) => x._id === a._id)
  if (idx >= 0) articles.value[idx] = { ...articles.value[idx], ...a }
}

async function translateOne(a: Article) {
  if (translatingIds.value.has(a._id)) return
  translatingIds.value = new Set(translatingIds.value).add(a._id)
  error.value = null
  try {
    const updated = await articlesService.translate(a._id)
    if (updated) {
      replaceRow(updated)
    } else {
      // El backend aceptó la petición pero no devolvió el artículo: queda en curso
      replaceRow({ ...a, translations: { en: { ...(a.translations?.en ?? {}), status: 'pending', startedAt: new Date().toISOString() } } })
    }
    const status = updated ? translationBadge(updated).status : 'pending'
    showToast(status === 'ready' ? 'Traducción al inglés lista' : 'Traducción al inglés en curso')
  } catch (e) {
    error.value = (e as ApiError).message || 'No se pudo traducir el artículo.'
  } finally {
    const next = new Set(translatingIds.value)
    next.delete(a._id)
    translatingIds.value = next
  }
}

// Traduce por lotes pequeños (cada lote es una petición corta) hasta terminar o detener
async function runBacklog() {
  if (backlogRunning.value) {
    backlogStop.value = true
    return
  }
  backlogRunning.value = true
  backlogStop.value = false
  backlogDone.value = 0
  error.value = null
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const r = await articlesService.translateBacklog(BACKLOG_BATCH)
      const ok = r.translated ?? r.processed ?? 0
      backlogDone.value += ok
      if (typeof r.remaining === 'number') backlogRemaining.value = r.remaining
      const nothingLeft = r.remaining === 0 || r.remaining === undefined || r.remaining === null
      const noProgress = (r.processed ?? ok) === 0
      if (nothingLeft || noProgress || backlogStop.value) break
    }
    showToast(backlogDone.value ? `${backlogDone.value} artículo(s) traducido(s)` : 'No había artículos pendientes de traducir')
  } catch (e) {
    error.value = (e as ApiError).message || 'No se pudieron traducir los pendientes.'
  } finally {
    backlogRunning.value = false
    backlogStop.value = false
    load()
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

      <button
        type="button"
        class="adm-btn adm-btn--ghost lst__backlog"
        :title="backlogRunning ? 'Detener después del lote actual' : 'Traduce al inglés los artículos publicados que aún no tienen versión en inglés'"
        :disabled="backlogRunning && backlogStop"
        @click="runBacklog"
      >
        <template v-if="backlogRunning">
          <span class="adm-spinner lst__btn-spinner"></span>
          {{ backlogStop ? 'Deteniendo…' : 'Detener' }}
          <span v-if="backlogRemaining !== null" class="lst__count">quedan {{ backlogRemaining }}</span>
        </template>
        <template v-else>
          <i class="fa-solid fa-language"></i> Traducir pendientes
          <span v-if="backlogRemaining !== null" class="lst__count">{{ backlogRemaining }}</span>
        </template>
      </button>

      <router-link :to="newLink" class="adm-btn adm-btn--primary"><i class="fa-solid fa-plus"></i> Nuevo artículo</router-link>
    </div>

    <p v-if="backlogRunning" class="lst__progress" role="status">
      <i class="fa-solid fa-language"></i>
      Traduciendo al inglés por lotes de {{ BACKLOG_BATCH }}… {{ backlogDone }} listo(s)<template v-if="backlogRemaining !== null">, quedan {{ backlogRemaining }}</template>.
      Puedes seguir usando el panel; no cierres esta pestaña.
    </p>

    <div ref="listTop" class="lst__anchor"></div>
    <ArticlesPager v-if="!loading && articles.length" class="lst__pager-top" :pagination="pagination" :loading="loading" locale="es" @change="changePage" />

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
            <span
              v-if="a.isPublished || a.translations?.en"
              :class="['lst__badge', 'lst__badge--tr', `lst__badge--tr-${translationBadge(a).status}`]"
              :title="translationBadge(a).hint"
            ><i class="fa-solid fa-language"></i> EN · {{ translationBadge(a).label }}</span>
            <time class="lst__date">{{ formatDate(a.date) }}</time>
          </div>
          <h2 class="lst__row-title"><router-link :to="editLink(a)">{{ a.title }}</router-link></h2>
          <p class="lst__row-excerpt">{{ a.excerpt }}</p>
        </div>

        <div class="lst__row-actions">
          <router-link class="lst__icon-btn" title="Editar" :to="editLink(a)"><i class="fa-solid fa-pen"></i><span>Editar</span></router-link>
          <button
            v-if="a.isPublished"
            class="lst__icon-btn"
            :title="translateActionLabel(translationBadge(a).status)"
            :disabled="translatingIds.has(a._id) || translationBadge(a).status === 'pending'"
            @click="translateOne(a)"
          >
            <span v-if="translatingIds.has(a._id)" class="adm-spinner lst__btn-spinner"></span>
            <i v-else :class="translationBadge(a).status === 'ready' || translationBadge(a).status === 'stale' ? 'fa-solid fa-rotate' : 'fa-solid fa-language'"></i>
            <span>{{ translationBadge(a).status === 'pending' ? 'En curso' : translationBadge(a).status === 'ready' || translationBadge(a).status === 'stale' ? 'Regenerar' : 'Traducir' }}</span>
          </button>
          <button class="lst__icon-btn" title="Compartir" @click="sharing = a"><i class="fa-solid fa-share-nodes"></i><span>Compartir</span></button>
          <a class="lst__icon-btn" title="Ver en el sitio" :href="`${publicBase}/investigaciones/${a.slug}`" target="_blank" rel="noopener"><i class="fa-solid fa-eye"></i><span>Ver</span></a>
          <button class="lst__icon-btn" :title="a.isPublished ? 'Pasar a borrador' : 'Publicar'" @click="togglePublish(a)">
            <i :class="a.isPublished ? 'fa-solid fa-eye-slash' : 'fa-solid fa-upload'"></i><span>{{ a.isPublished ? 'Ocultar' : 'Publicar' }}</span>
          </button>
          <button class="lst__icon-btn lst__icon-btn--danger" title="Eliminar" @click="deleting = a"><i class="fa-solid fa-trash"></i><span>Eliminar</span></button>
        </div>
      </li>
    </ul>

    <ArticlesPager v-if="!loading && articles.length" class="lst__pager-bottom" :pagination="pagination" :loading="loading" locale="es" @change="changePage" />

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
// El reset global (* { padding: 0 }) que inyecta additionalData llega aquí como [data-v-…] y
// anulaba el padding de los botones compartidos del panel; se restablece para este componente.
.adm-btn {
  padding: 0.75rem 1.3rem;
  &--sm { padding: 0.5rem 0.9rem; }
}

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
    &--tr { display: inline-flex; align-items: center; gap: 0.3rem; i { font-size: 0.7rem; } }
    &--tr-ready { background: rgba(56, 182, 255, 0.14); color: var(--accent); }
    &--tr-pending { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    &--tr-stale { background: rgba(249, 115, 22, 0.15); color: #fb923c; }
    &--tr-failed { background: rgba(239, 68, 68, 0.14); color: #f87171; }
    &--tr-none { background: rgba(255, 255, 255, 0.08); color: var(--text-muted); }
  }

  &__backlog { gap: 0.5rem; }
  &__count {
    min-width: 1.4rem; padding: 0.05rem 0.45rem; border-radius: 2rem;
    background: rgba(255, 255, 255, 0.1); font-size: 0.72rem; font-weight: 700; text-align: center;
  }
  &__btn-spinner { width: 0.95rem; height: 0.95rem; }
  &__progress {
    display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
    margin: -0.75rem 0 1.25rem; padding: 0.6rem 0.9rem;
    border: 1px solid rgba(56, 182, 255, 0.25); background: rgba(56, 182, 255, 0.06);
    border-radius: 0.6rem; font-size: 0.82rem; color: var(--text-muted);
    i { color: var(--accent); }
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
    &:disabled { opacity: 0.6; cursor: progress; }
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
