<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8100/api'

interface Article {
  _id: string
  slug: string
  title: string
  excerpt: string
  date: string
  featuredImage: string
  sourceUrl: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const search = ref('')
const searchInput = ref('')
const currentPage = ref(1)
const pagination = ref<Pagination>({ page: 1, limit: 12, total: 0, pages: 1 })
const LIMIT = 12

async function fetchArticles(page = 1) {
  loading.value = true
  error.value = null
  try {
    const qs = new URLSearchParams({
      page: String(page),
      limit: String(LIMIT),
      source: 'drjuangarza',
    })
    if (search.value) qs.set('search', search.value)

    const res = await fetch(`${API_BASE}/articles?${qs}`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()
    articles.value = data.data
    pagination.value = data.pagination
    currentPage.value = page
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al cargar artículos'
    articles.value = []
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  search.value = searchInput.value
  fetchArticles(1)
}

function clearSearch() {
  searchInput.value = ''
  search.value = ''
  fetchArticles(1)
}

function goToPage(page: number) {
  if (page < 1 || page > pagination.value.pages) return
  fetchArticles(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const pageRange = computed(() => {
  const range: number[] = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(pagination.value.pages, currentPage.value + 2)
  for (let i = start; i <= end; i++) range.push(i)
  return range
})

onMounted(() => fetchArticles(1))
</script>

<template>
  <div class="inv-page">
    <!-- Hero -->
    <section class="inv-hero">
      <div class="inv-wrap">
        <span class="inv-hero__tag">Investigaciones Médicas</span>
        <h1 class="inv-hero__title">
          Artículos de <span class="inv-hero__cyan">Medicina Regenerativa</span>
        </h1>
        <p class="inv-hero__desc">
          Investigaciones, avances y conocimiento sobre células madre, longevidad
          y terapias regenerativas del Centro Médico Eternal.
        </p>

        <!-- Search bar -->
        <div class="inv-search">
          <input
            v-model="searchInput"
            type="text"
            class="inv-search__input"
            placeholder="Buscar artículos..."
            @keydown.enter="handleSearch"
          />
          <button class="inv-search__btn" @click="handleSearch">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>
          <button v-if="search" class="inv-search__clear" @click="clearSearch">✕</button>
        </div>
      </div>
    </section>

    <!-- Articles -->
    <section class="inv-body">
      <div class="inv-wrap">
        <!-- Count -->
        <p v-if="!loading" class="inv-count">
          {{ search ? `${pagination.total} resultados para "${search}"` : `${pagination.total} artículos` }}
        </p>

        <!-- Loading skeleton -->
        <div v-if="loading" class="inv-grid">
          <div v-for="i in 6" :key="i" class="inv-card inv-card--skeleton">
            <div class="inv-card__img-default"></div>
            <div class="inv-card__body">
              <div class="sk-line sk-line--sm"></div>
              <div class="sk-line sk-line--lg"></div>
              <div class="sk-line"></div>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="inv-message">
          <p>{{ error }}</p>
          <button class="inv-btn" @click="fetchArticles(currentPage)">Reintentar</button>
        </div>

        <!-- Empty -->
        <div v-else-if="articles.length === 0" class="inv-message">
          <p>No se encontraron artículos.</p>
          <button v-if="search" class="inv-btn inv-btn--ghost" @click="clearSearch">Ver todos</button>
        </div>

        <!-- Cards -->
        <div v-else class="inv-grid">
          <a
            v-for="a in articles"
            :key="a._id"
            :href="a.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inv-card"
          >
            <div class="inv-card__img-wrap">
              <img
                v-if="a.featuredImage"
                :src="a.featuredImage"
                :alt="a.title"
                class="inv-card__img"
                loading="lazy"
              />
              <div v-else class="inv-card__img-default">
                <svg width="48" height="48" fill="none" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="30" stroke="rgba(56,182,255,0.25)" stroke-width="1.5"/>
                  <circle cx="32" cy="32" r="20" stroke="rgba(56,182,255,0.15)" stroke-width="1"/>
                  <path d="M20 32 Q26 22 32 32 Q38 42 44 32" stroke="rgba(56,182,255,0.6)" stroke-width="1.8" fill="none" stroke-linecap="round"/>
                  <path d="M20 28 Q26 18 32 28 Q38 38 44 28" stroke="rgba(56,182,255,0.35)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
                  <path d="M20 36 Q26 26 32 36 Q38 46 44 36" stroke="rgba(56,182,255,0.35)" stroke-width="1.2" fill="none" stroke-linecap="round"/>
                  <circle cx="20" cy="32" r="2.5" fill="rgba(56,182,255,0.5)"/>
                  <circle cx="32" cy="32" r="2.5" fill="rgba(56,182,255,0.7)"/>
                  <circle cx="44" cy="32" r="2.5" fill="rgba(56,182,255,0.5)"/>
                </svg>
              </div>
            </div>
            <div class="inv-card__body">
              <time class="inv-card__date">{{ formatDate(a.date) }}</time>
              <h3 class="inv-card__title">{{ a.title }}</h3>
              <p class="inv-card__excerpt">{{ a.excerpt }}</p>
              <span class="inv-card__cta">Leer más →</span>
            </div>
          </a>
        </div>

        <!-- Pagination -->
        <nav v-if="!loading && pagination.pages > 1" class="inv-pager">
          <button class="inv-pager__btn" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">←</button>
          <button v-if="(pageRange[0] ?? 1) > 1" class="inv-pager__btn" @click="goToPage(1)">1</button>
          <span v-if="(pageRange[0] ?? 1) > 2" class="inv-pager__dots">…</span>
          <button
            v-for="p in pageRange"
            :key="p"
            class="inv-pager__btn"
            :class="{ 'inv-pager__btn--active': p === currentPage }"
            @click="goToPage(p)"
          >{{ p }}</button>
          <span v-if="(pageRange[pageRange.length - 1] ?? 1) < pagination.pages - 1" class="inv-pager__dots">…</span>
          <button
            v-if="(pageRange[pageRange.length - 1] ?? 1) < pagination.pages"
            class="inv-pager__btn"
            @click="goToPage(pagination.pages)"
          >{{ pagination.pages }}</button>
          <button class="inv-pager__btn" :disabled="currentPage === pagination.pages" @click="goToPage(currentPage + 1)">→</button>
        </nav>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
/* ---- Wrapper propio — NO usa .container global ---- */
.inv-wrap {
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 2.5rem;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 1.25rem;
  }
}

/* ---- Page ---- */
.inv-page {
  background: var(--bg);
  min-height: 100vh;
  padding-bottom: 6rem;
  /* espacio para el header fijo (80px) */
  padding-top: 80px;
}

/* ---- Hero ---- */
.inv-hero {
  padding: 4rem 0 4rem;
  background:
    radial-gradient(ellipse 70% 60% at 5% 0%, rgba($primary, 0.2) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 90% 70%, rgba($secondary, 0.1) 0%, transparent 60%),
    var(--bg);

  &__tag {
    display: inline-block;
    padding: 0.35rem 1rem;
    border: 1px solid rgba($primary, 0.35);
    border-radius: 2rem;
    font-size: 0.75rem;
    font-family: var(--font-secondary);
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1.5rem;
  }

  &__title {
    font-family: var(--font-principal);
    font-size: clamp(2rem, 5vw, 3.2rem);
    font-weight: 700;
    color: var(--text);
    line-height: 1.2;
    margin-bottom: 1.25rem;
  }

  &__cyan {
    color: var(--accent);
  }

  &__desc {
    font-size: 1.05rem;
    color: var(--text-muted);
    line-height: 1.75;
    max-width: 580px;
    margin-bottom: 2.5rem;
  }
}

/* ---- Search ---- */
.inv-search {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 520px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 3rem;
  overflow: hidden;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: var(--accent);
  }

  &__input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    padding: 0.9rem 1.25rem;
    font-size: 0.95rem;
    color: var(--text);
    &::placeholder { color: var(--text-muted); }
  }

  &__btn {
    padding: 0 1.2rem;
    background: transparent;
    border: none;
    color: var(--accent);
    cursor: pointer;
    display: flex;
    align-items: center;
    transition: opacity 0.2s;
    &:hover { opacity: 0.8; }
  }

  &__clear {
    padding: 0 1rem;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 0.85rem;
    &:hover { color: var(--text); }
  }
}

/* ---- Body ---- */
.inv-body {
  padding-top: 3rem;
}

.inv-count {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

/* ---- Grid ---- */
.inv-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

/* ---- Card ---- */
.inv-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1rem;
  overflow: hidden;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;

  &:hover {
    transform: translateY(-5px);
    border-color: rgba($primary, 0.4);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
  }

  &__img-wrap {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s;
    .inv-card:hover & { transform: scale(1.05); }
  }

  /* imagen por defecto — gradiente + DNA SVG */
  &__img-default {
    width: 100%;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1a254a 0%, #243261 50%, #1a3060 100%);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 60% 60% at 20% 30%, rgba(56,182,255,0.12) 0%, transparent 70%),
        radial-gradient(ellipse 50% 50% at 80% 70%, rgba(56,182,255,0.07) 0%, transparent 70%);
    }

    svg {
      position: relative;
      z-index: 1;
    }
  }

  &__body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  &__date {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0.75rem;
  }

  &__title {
    font-family: var(--font-principal);
    font-size: 1rem;
    font-weight: 700;
    color: var(--text);
    line-height: 1.5;
    margin-bottom: 0.75rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__excerpt {
    font-size: 0.875rem;
    color: var(--text-muted);
    line-height: 1.65;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-bottom: 1.25rem;
  }

  &__cta {
    font-size: 0.825rem;
    color: var(--accent);
    font-weight: 600;
    transition: opacity 0.2s;
    .inv-card:hover & { opacity: 0.8; }
  }

  /* Skeleton */
  &--skeleton { pointer-events: none; }
}

/* Skeleton animation */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.sk-line {
  height: 0.8rem;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--bg-offset) 0%, rgba(255,255,255,0.05) 50%, var(--bg-offset) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  margin-bottom: 0.6rem;
  &--sm { width: 35%; }
  &--lg { width: 80%; height: 1rem; }
}

/* Buttons */
.inv-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background: var(--accent);
  color: var(--bg);
  transition: opacity 0.2s, transform 0.2s;
  &:hover { opacity: 0.85; transform: translateY(-2px); }

  &--ghost {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    &:hover { border-color: var(--accent); color: var(--accent); }
  }
}

.inv-message {
  width: 100%;
  text-align: center;
  padding: 5rem 0;
  color: var(--text-muted);
  p { margin-bottom: 1.5rem; font-size: 1.05rem; }
}

/* Pagination */
.inv-pager {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3.5rem;
  flex-wrap: wrap;

  &__btn {
    min-width: 2.5rem;
    height: 2.5rem;
    padding: 0 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid var(--border);
    background: var(--card-bg);
    color: var(--text-muted);
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      border-color: var(--accent);
      color: var(--accent);
    }

    &--active {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--bg);
      font-weight: 700;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  &__dots {
    color: var(--text-muted);
    padding: 0 0.25rem;
  }
}

@media (max-width: 768px) {
  .inv-hero { padding: 5rem 0 3rem; }
  .inv-grid { grid-template-columns: 1fr; }
}
</style>
