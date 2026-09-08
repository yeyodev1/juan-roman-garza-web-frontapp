<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Article } from '@/services/articles.service'

const props = defineProps<{ article: Article }>()
const emit = defineEmits<{ close: [] }>()

const SITES = [
  { key: 'juan', label: 'juanromangarza.com', base: 'https://juanromangarza.com' },
  { key: 'phb', label: 'powerhousebiotech.com', base: 'https://powerhousebiotech.com' },
]

const selected = ref(SITES[0]!)
const copied = ref(false)

const url = computed(() => `${selected.value.base}/investigaciones/${props.article.slug}`)
const encodedUrl = computed(() => encodeURIComponent(url.value))
const encodedTitle = computed(() => encodeURIComponent(props.article.title))

const shareLinks = computed(() => [
  { name: 'WhatsApp', icon: 'fa-brands fa-whatsapp', href: `https://wa.me/?text=${encodedTitle.value}%0A${encodedUrl.value}` },
  { name: 'Facebook', icon: 'fa-brands fa-facebook-f', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl.value}` },
  { name: 'LinkedIn', icon: 'fa-brands fa-linkedin-in', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl.value}` },
  { name: 'X', icon: 'fa-brands fa-x-twitter', href: `https://twitter.com/intent/tweet?text=${encodedTitle.value}&url=${encodedUrl.value}` },
  { name: 'Correo', icon: 'fa-solid fa-envelope', href: `mailto:?subject=${encodedTitle.value}&body=${encodedUrl.value}` },
])

const debuggerUrl = computed(() => `https://developers.facebook.com/tools/debug/?q=${encodedUrl.value}`)

async function copy() {
  try {
    await navigator.clipboard.writeText(url.value)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    window.prompt('Copia el enlace:', url.value)
  }
}
</script>

<template>
  <div class="share-backdrop" @click.self="emit('close')">
    <div class="share" role="dialog" aria-modal="true" aria-label="Compartir artículo">
      <button class="share__close" aria-label="Cerrar" @click="emit('close')"><i class="fa-solid fa-xmark"></i></button>

      <h2 class="share__title">Compartir artículo</h2>

      <div v-if="!article.isPublished" class="share__warn">
        <i class="fa-solid fa-triangle-exclamation"></i>
        Este artículo está como borrador: el enlace no funcionará hasta publicarlo.
      </div>

      <!-- Vista previa tal como aparecerá en redes -->
      <div class="share__preview">
        <div class="share__preview-img" :class="{ 'share__preview-img--empty': !article.featuredImage }">
          <img v-if="article.featuredImage" :src="article.featuredImage" :alt="article.title" />
          <span v-else><i class="fa-regular fa-image"></i> Sin imagen de portada (se usará la del sitio)</span>
        </div>
        <div class="share__preview-body">
          <span class="share__preview-domain">{{ selected.label }}</span>
          <strong class="share__preview-title">{{ article.title }}</strong>
          <p class="share__preview-desc">{{ article.excerpt }}</p>
        </div>
      </div>

      <div class="share__sites">
        <button
          v-for="s in SITES"
          :key="s.key"
          class="share__site"
          :class="{ 'share__site--active': selected.key === s.key }"
          @click="selected = s"
        >{{ s.label }}</button>
      </div>

      <div class="share__url">
        <input class="share__url-input" :value="url" readonly @focus="($event.target as HTMLInputElement).select()" />
        <button class="share__copy" @click="copy">
          <i :class="copied ? 'fa-solid fa-check' : 'fa-regular fa-copy'"></i>
          {{ copied ? 'Copiado' : 'Copiar' }}
        </button>
      </div>

      <div class="share__links">
        <a v-for="l in shareLinks" :key="l.name" :href="l.href" target="_blank" rel="noopener noreferrer" class="share__link">
          <i :class="l.icon"></i> {{ l.name }}
        </a>
      </div>

      <p class="share__hint">
        ¿Cambiaste la portada y WhatsApp o Facebook siguen mostrando la anterior?
        <a :href="debuggerUrl" target="_blank" rel="noopener noreferrer">Actualiza la vista previa aquí</a>
        (botón "Scrape again").
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.share-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(5, 10, 30, 0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.share {
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: 92vh;
  overflow-y: auto;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 2rem;
  color: var(--text);

  @media (max-width: 480px) { padding: 1.5rem 1.25rem; }

  &__close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 1.2rem;
    cursor: pointer;
    &:hover { color: var(--text); }
  }

  &__title {
    font-family: var(--font-principal);
    font-size: 1.35rem;
    font-weight: 700;
    margin-bottom: 1.25rem;
  }

  &__warn {
    display: flex;
    gap: 0.6rem;
    align-items: center;
    font-size: 0.85rem;
    color: #fbbf24;
    background: rgba(245, 158, 11, 0.12);
    border: 1px solid rgba(245, 158, 11, 0.35);
    border-radius: 0.6rem;
    padding: 0.7rem 0.9rem;
    margin-bottom: 1rem;
  }

  &__preview {
    border: 1px solid var(--border);
    border-radius: 0.9rem;
    overflow: hidden;
    background: var(--bg-offset);
    margin-bottom: 1.25rem;
  }

  &__preview-img {
    aspect-ratio: 1.91 / 1;
    background: rgba(255, 255, 255, 0.04);
    display: flex;
    align-items: center;
    justify-content: center;
    img { width: 100%; height: 100%; object-fit: cover; display: block; }
    &--empty span { color: var(--text-muted); font-size: 0.85rem; display: inline-flex; gap: 0.5rem; align-items: center; }
  }

  &__preview-body { padding: 0.9rem 1rem 1rem; display: flex; flex-direction: column; gap: 0.3rem; }
  &__preview-domain { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--text-muted); }
  &__preview-title { font-size: 1rem; line-height: 1.3; }
  &__preview-desc {
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.45;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  &__sites { display: flex; gap: 0.5rem; margin-bottom: 0.75rem; flex-wrap: wrap; }
  &__site {
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: 2rem;
    padding: 0.4rem 0.9rem;
    font-size: 0.8rem;
    cursor: pointer;
    &--active { border-color: var(--accent); color: var(--accent); }
  }

  &__url { display: flex; gap: 0.5rem; margin-bottom: 1.25rem; }
  &__url-input {
    flex: 1;
    min-width: 0;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    border-radius: 0.6rem;
    color: var(--text);
    padding: 0.7rem 0.9rem;
    font-size: 0.85rem;
  }
  &__copy {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--accent);
    color: #0b1631;
    border: none;
    border-radius: 0.6rem;
    padding: 0 1rem;
    font-weight: 600;
    font-size: 0.85rem;
    cursor: pointer;
    white-space: nowrap;
  }

  &__links { display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 0.5rem; }
  &__link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.7rem 0.6rem;
    border: 1px solid var(--border);
    border-radius: 0.6rem;
    color: var(--text);
    text-decoration: none;
    font-size: 0.85rem;
    &:hover { border-color: var(--accent); color: var(--accent); }
  }

  &__hint {
    margin-top: 1.25rem;
    font-size: 0.78rem;
    color: var(--text-muted);
    line-height: 1.5;
    a { color: var(--accent); }
  }
}
</style>
