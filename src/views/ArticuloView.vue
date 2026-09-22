<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from '@/i18n'
import { articlesService, type Article, type ServedLang } from '@/services/articles.service'
import type { ApiError } from '@/types'

const route = useRoute()
const router = useRouter()
const { t, locale, formatDate: formatLocaleDate } = useI18n()
const slug = computed(() => route.params.slug as string)

// Artículo tal como lo sirvió el backend en el idioma activo (EN si ya está traducido)
const article = ref<Article | null>(null)
// Original en español, solo cuando el lector pulsa "Ver original" estando en EN
const original = ref<Article | null>(null)
const showOriginal = ref(false)
const loadingOriginal = ref(false)
const loading = ref(true)
// Código de error (se traduce en la plantilla para seguir el idioma activo)
const error = ref<'notFound' | 'loadError' | null>(null)

// ── Estado de la traducción (sin campos del backend = español, sin aviso de traducción) ──
const servedLang = computed<ServedLang>(() => (article.value?.lang === 'en' ? 'en' : 'es'))
const polling = ref(false)
const isTranslated = computed(() => locale.value === 'en' && servedLang.value === 'en')
const isPending = computed(() => locale.value === 'en' && servedLang.value === 'es' && polling.value)
// Lo que se pinta: el original si el lector lo pidió, si no la versión servida
const viewingOriginal = computed(() => isTranslated.value && showOriginal.value && !!original.value)
const shown = computed(() => (viewingOriginal.value ? original.value : article.value))
const shownLang = computed<ServedLang>(() => (viewingOriginal.value ? 'es' : servedLang.value))

// ── Sondeo mientras la traducción se genera en segundo plano ──────────────────
const POLL_EVERY_MS = 5000
const POLL_MAX_MS = 120000
let pollTimer: ReturnType<typeof setTimeout> | null = null
let pollStartedAt = 0
// Cada carga/sondeo lleva un número; las respuestas de cargas anteriores se descartan
let requestId = 0

function stopPolling() {
  if (pollTimer) clearTimeout(pollTimer)
  pollTimer = null
  polling.value = false
}

function schedulePoll() {
  if (Date.now() - pollStartedAt >= POLL_MAX_MS) {
    stopPolling()
    return
  }
  pollTimer = setTimeout(pollOnce, POLL_EVERY_MS)
}

async function pollOnce() {
  pollTimer = null
  const id = requestId
  try {
    const fresh = await articlesService.getBySlug(slug.value, 'en')
    if (id !== requestId || locale.value !== 'en') return
    if (fresh.lang === 'en') {
      // Cambio sin recargar: misma página, ahora en inglés
      article.value = fresh
      applyArticleMeta(fresh)
      stopPolling()
      return
    }
    if (fresh.translation?.status !== 'pending') {
      // Falló o dejó de estar en cola: nos quedamos con el español
      article.value = fresh
      stopPolling()
      return
    }
  } catch {
    if (id !== requestId) return
    // error puntual de red: se reintenta en el siguiente ciclo
  }
  schedulePoll()
}

async function fetchArticle() {
  const id = ++requestId
  stopPolling()
  showOriginal.value = false
  original.value = null
  loading.value = true
  error.value = null
  const lang = locale.value
  try {
    const data = await articlesService.getBySlug(slug.value, lang)
    if (id !== requestId) return
    article.value = data
    applyArticleMeta(data)
    if (lang === 'en' && data.lang !== 'en' && data.translation?.status === 'pending') {
      polling.value = true
      pollStartedAt = Date.now()
      schedulePoll()
    }
  } catch (e: unknown) {
    if (id !== requestId) return
    console.error('Error al cargar el artículo:', e)
    error.value = (e as ApiError)?.status === 404 ? 'notFound' : 'loadError'
  } finally {
    if (id === requestId) loading.value = false
  }
}

async function toggleOriginal() {
  if (showOriginal.value) {
    showOriginal.value = false
    if (article.value) applyArticleMeta(article.value)
    return
  }
  if (!original.value) {
    const id = requestId
    loadingOriginal.value = true
    try {
      const es = await articlesService.getBySlug(slug.value, 'es')
      if (id !== requestId) return
      original.value = es
    } catch (e) {
      console.error('Error al cargar el original:', e)
      return
    } finally {
      loadingOriginal.value = false
    }
  }
  showOriginal.value = true
  applyArticleMeta(original.value!)
}

// Mantiene <head> coherente al navegar dentro del SPA (el HTML inicial ya viene
// con estas etiquetas desde api/article-meta.js para los crawlers).
function applyArticleMeta(a: Article) {
  const set = (attr: 'name' | 'property', key: string, content: string) => {
    let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute(attr, key)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }
  const url = `${location.origin}/investigaciones/${a.slug}`
  document.title = `${a.title} | Juan Román Garza`
  set('name', 'description', a.excerpt)
  set('property', 'og:type', 'article')
  set('property', 'og:url', url)
  set('property', 'og:title', a.title)
  set('property', 'og:description', a.excerpt)
  set('name', 'twitter:title', a.title)
  set('name', 'twitter:description', a.excerpt)
  if (a.featuredImage) {
    set('property', 'og:image', a.featuredImage)
    set('name', 'twitter:image', a.featuredImage)
  }
  let canon = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!canon) {
    canon = document.createElement('link')
    canon.rel = 'canonical'
    document.head.appendChild(canon)
  }
  canon.href = url
}

function formatDate(dateStr: string) {
  return formatLocaleDate(dateStr, { year: 'numeric', month: 'long', day: 'numeric' })
}

function goBack() {
  router.push({ name: 'Investigaciones' })
}

onMounted(fetchArticle)
// Cambio de idioma o de artículo: recargar (y cortar cualquier sondeo en curso)
watch([locale, slug], () => {
  if (slug.value) fetchArticle()
})
onBeforeUnmount(() => {
  requestId++
  stopPolling()
})
</script>

<template>
  <div class="art-page">

    <!-- Loading -->
    <div v-if="loading" class="art-loading">
      <div class="art-spinner"></div>
      <p>{{ t('blog.article.loading') }}</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="art-error">
      <p>{{ t(`blog.article.${error}`) }}</p>
      <button class="art-btn art-btn--ghost" @click="goBack">{{ t('blog.article.back') }}</button>
    </div>

    <!-- Content -->
    <template v-else-if="article && shown">
      <!-- Hero -->
      <section class="art-hero">
        <div class="art-wrap">
          <button class="art-back" @click="goBack">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            {{ t('blog.article.backShort') }}
          </button>

          <div class="art-meta">
            <span class="art-meta__badge">{{ t('blog.article.badge') }}</span>
            <time class="art-meta__date" :datetime="shown.date">{{ formatDate(shown.date) }}</time>
            <!-- EN, ya traducido: aviso + alternar con el original -->
            <span v-if="isTranslated" class="art-meta__lang">
              <i class="fa-solid fa-language" aria-hidden="true"></i>
              <span>{{ showOriginal ? t('blog.article.originalNote') : t('blog.article.translatedNote') }}</span>
              <span class="art-meta__sep" aria-hidden="true">·</span>
              <button
                type="button"
                class="art-meta__toggle"
                :disabled="loadingOriginal"
                :aria-pressed="showOriginal"
                @click="toggleOriginal"
              >{{ showOriginal ? t('blog.article.viewTranslation') : t('blog.article.viewOriginal') }}</button>
            </span>
            <!-- EN, sin traducción (fallida, no disponible o backend sin soporte) -->
            <span v-else-if="locale === 'en' && !isPending" class="art-meta__lang">
              <i class="fa-solid fa-language" aria-hidden="true"></i> {{ t('blog.article.spanishNote') }}
            </span>
          </div>

          <!-- EN, traducción en curso: se muestra el español y se cambia solo al terminar -->
          <p v-if="isPending" class="art-translating" role="status" aria-live="polite">
            <span class="art-translating__dot" aria-hidden="true"></span>
            {{ t('blog.article.translating') }}
          </p>

          <h1 class="art-title" :lang="shownLang">{{ shown.title }}</h1>
          <p v-if="shown.excerpt" class="art-excerpt" :lang="shownLang">{{ shown.excerpt }}</p>
        </div>
      </section>

      <!-- Cover image -->
      <div class="art-wrap art-cover-wrap">
        <div v-if="shown.featuredImage" class="art-cover">
          <img :src="shown.featuredImage" :alt="shown.title" class="art-cover__img" />
        </div>
        <div v-else class="art-cover art-cover--default">
          <svg width="64" height="64" fill="none" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="30" stroke="rgba(56,182,255,0.25)" stroke-width="1.5"/>
            <path d="M20 32 Q26 22 32 32 Q38 42 44 32" stroke="rgba(56,182,255,0.6)" stroke-width="2" fill="none" stroke-linecap="round"/>
            <path d="M20 28 Q26 18 32 28 Q38 38 44 28" stroke="rgba(56,182,255,0.3)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <path d="M20 36 Q26 26 32 36 Q38 46 44 36" stroke="rgba(56,182,255,0.3)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <circle cx="20" cy="32" r="3" fill="rgba(56,182,255,0.5)"/>
            <circle cx="32" cy="32" r="3" fill="rgba(56,182,255,0.7)"/>
            <circle cx="44" cy="32" r="3" fill="rgba(56,182,255,0.5)"/>
          </svg>
        </div>
      </div>

      <!-- Body -->
      <section class="art-body">
        <div class="art-wrap">
          <div
            v-if="shown.content"
            :key="shownLang"
            class="art-content"
            :lang="shownLang"
            v-html="shown.content"
          ></div>
          <div v-else class="art-content" :lang="shownLang">
            <p>{{ shown.excerpt }}</p>
          </div>

          <!-- Source -->
          <div class="art-source">
            <span class="art-source__label">{{ t('blog.article.source') }}</span>
            <a :href="article.sourceUrl" target="_blank" rel="noopener noreferrer" class="art-source__link">
              {{ article.sourceUrl }}
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
            </a>
          </div>

          <button class="art-btn art-btn--primary" @click="goBack">
            {{ t('blog.article.back') }}
          </button>
        </div>
      </section>
    </template>
  </div>
</template>

<style lang="scss" scoped>
/* Page */
.art-page {
  min-height: 100vh;
  background: var(--bg);
  padding-top: 80px;
  padding-bottom: 6rem;
}

/* Loading */
.art-loading {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: var(--text-muted);
  font-family: var(--font-secondary);
}

.art-spinner {
  width: 2.5rem;
  height: 2.5rem;
  border: 2px solid var(--border);
  border-top-color: var(--accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

/* Error */
.art-error {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  color: var(--text-muted);
  font-family: var(--font-secondary);
  text-align: center;
}

/* Wrapper */
.art-wrap {
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) { padding: 0 1.25rem; }
}

/* Hero */
.art-hero {
  padding: 3rem 0 2.5rem;
  background:
    radial-gradient(ellipse 70% 60% at 5% 0%, rgba($primary, 0.18) 0%, transparent 60%),
    var(--bg);
}

/* Back */
.art-back {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  border: none;
  color: var(--accent);
  font-family: var(--font-secondary);
  font-size: 0.82rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  padding: 0;
  margin-bottom: 2rem;
  transition: opacity 0.2s;
  &:hover { opacity: 0.7; }
}

/* Meta */
.art-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;

  &__badge {
    display: inline-block;
    padding: 0.3rem 0.9rem;
    border: 1px solid rgba($primary, 0.35);
    border-radius: 2rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
  }

  &__date {
    font-size: 0.85rem;
    color: var(--text-muted);
  }

  &__lang {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.4rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    font-style: italic;

    i {
      color: var(--accent);
      font-style: normal;
    }
  }

  &__sep {
    font-style: normal;
    opacity: 0.6;
  }

  &__toggle {
    background: transparent;
    border: none;
    padding: 0;
    font: inherit;
    font-style: normal;
    font-weight: 600;
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;
    transition: opacity 0.2s;
    &:hover { opacity: 0.75; }
    &:disabled { opacity: 0.5; cursor: progress; }
  }
}

/* Aviso discreto mientras se genera la versión en inglés */
.art-translating {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin: -0.5rem 0 1.5rem;
  padding: 0.45rem 1rem;
  border-radius: 2rem;
  border: 1px solid rgba(56, 182, 255, 0.25);
  background: rgba(56, 182, 255, 0.08);
  color: var(--text-muted);
  font-size: 0.82rem;
  line-height: 1.4;

  &__dot {
    flex-shrink: 0;
    width: 0.85rem;
    height: 0.85rem;
    border: 2px solid rgba(56, 182, 255, 0.3);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

@media (prefers-reduced-motion: reduce) {
  .art-translating__dot { animation-duration: 2.4s; }
}

/* Title */
.art-title {
  font-family: var(--font-principal);
  font-size: clamp(1.75rem, 4vw, 2.8rem);
  font-weight: 700;
  color: var(--text);
  line-height: 1.2;
  margin-bottom: 1.25rem;
}

/* Excerpt */
.art-excerpt {
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.75;
  max-width: 680px;
}

/* Cover */
.art-cover-wrap {
  margin-bottom: 0;
}

.art-cover {
  border-radius: 1rem;
  overflow: hidden;
  margin: 1.5rem auto 0;

  &__img {
    width: 100%;
    max-height: 440px;
    object-fit: cover;
    display: block;
  }

  &--default {
    background: linear-gradient(135deg, var(--card-bg) 0%, var(--bg-offset) 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    border: 1px solid var(--border);
  }
}

/* Body */
.art-body {
  padding-top: 3rem;
}

/* Article HTML */
.art-content {
  font-family: var(--font-secondary);
  font-size: 1.05rem;
  color: var(--text-muted);
  line-height: 1.85;
  margin-bottom: 3rem;

  :deep(h1), :deep(h2), :deep(h3), :deep(h4) {
    font-family: var(--font-principal);
    color: var(--text);
    font-weight: 700;
    line-height: 1.3;
    margin: 2rem 0 1rem;
  }
  :deep(h2) { font-size: 1.5rem; }
  :deep(h3) { font-size: 1.25rem; }

  :deep(p) { margin-bottom: 1.4rem; }

  :deep(strong), :deep(b) {
    color: var(--text);
    font-weight: 700;
  }

  :deep(ul), :deep(ol) {
    margin: 1rem 0 1.4rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  :deep(a) {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 3px;
    &:hover { opacity: 0.8; }
  }

  :deep(img) {
    width: 100%;
    border-radius: 0.75rem;
    margin: 1.5rem 0;
  }

  :deep(blockquote) {
    border-left: 3px solid var(--accent);
    padding: 0.75rem 1.5rem;
    margin: 1.5rem 0;
    background: rgba(56, 182, 255, 0.04);
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
  }

  :deep(figure) {
    margin: 1.5rem 0;
    figcaption {
      font-size: 0.82rem;
      color: var(--text-muted);
      text-align: center;
      margin-top: 0.5rem;
    }
  }

  :deep(hr) {
    border: none;
    border-top: 1px solid var(--border);
    margin: 2rem 0;
  }
}

/* Source */
.art-source {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  border-top: 1px solid var(--border);
  padding-top: 1.5rem;
  margin-bottom: 2.5rem;

  &__label {
    font-size: 0.8rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-weight: 600;
  }

  &__link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.85rem;
    color: var(--accent);
    text-decoration: none;
    word-break: break-all;
    transition: opacity 0.2s;
    &:hover { opacity: 0.75; }
  }
}

/* Buttons */
.art-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 2rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: var(--font-secondary);

  &--primary {
    background: var(--accent);
    color: var(--bg);
    border: none;
    &:hover { opacity: 0.85; transform: translateY(-2px); }
  }

  &--ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    &:hover { border-color: var(--accent); color: var(--accent); }
  }
}
</style>
