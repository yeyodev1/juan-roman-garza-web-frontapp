<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.slug as string)

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8100/api'

interface Article {
  _id: string
  slug: string
  title: string
  excerpt: string
  content: string
  date: string
  featuredImage: string
  sourceUrl: string
}

const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

async function fetchArticle() {
  loading.value = true
  error.value = null
  try {
    const res = await fetch(`${API_BASE}/articles/${slug.value}`)
    if (!res.ok) throw new Error('Artículo no encontrado')
    const data = await res.json()
    article.value = data.data
  } catch (e: unknown) {
    error.value = e instanceof Error ? e.message : 'Error al cargar el artículo'
  } finally {
    loading.value = false
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function goBack() {
  router.push({ name: 'Investigaciones' })
}

onMounted(fetchArticle)
</script>

<template>
  <div class="art-page">

    <!-- Loading -->
    <div v-if="loading" class="art-loading">
      <div class="art-spinner"></div>
      <p>Cargando artículo...</p>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="art-error">
      <p>{{ error }}</p>
      <button class="art-btn art-btn--ghost" @click="goBack">← Volver a investigaciones</button>
    </div>

    <!-- Content -->
    <template v-else-if="article">
      <!-- Hero -->
      <section class="art-hero">
        <div class="art-wrap">
          <button class="art-back" @click="goBack">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Investigaciones
          </button>

          <div class="art-meta">
            <span class="art-meta__badge">Medicina Regenerativa</span>
            <time class="art-meta__date">{{ formatDate(article.date) }}</time>
          </div>

          <h1 class="art-title">{{ article.title }}</h1>
          <p v-if="article.excerpt" class="art-excerpt">{{ article.excerpt }}</p>
        </div>
      </section>

      <!-- Cover image -->
      <div class="art-wrap art-cover-wrap">
        <div v-if="article.featuredImage" class="art-cover">
          <img :src="article.featuredImage" :alt="article.title" class="art-cover__img" />
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
            v-if="article.content"
            class="art-content"
            v-html="article.content"
          ></div>
          <div v-else class="art-content">
            <p>{{ article.excerpt }}</p>
          </div>

          <!-- Source -->
          <div class="art-source">
            <span class="art-source__label">Fuente original</span>
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
            ← Volver a Investigaciones
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
