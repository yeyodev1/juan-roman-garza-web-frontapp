<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { articlesService, type Article, type ArticleInput } from '@/services/articles.service'
import type { ApiError } from '@/types'
import { spanishSourceHash, translationBadge, translateActionLabel } from '@/utils/articleTranslation'

const props = defineProps<{ article: Article | null }>()
const emit = defineEmits<{ saved: [article: Article]; cancel: [] }>()

const MAX_IMAGE_MB = 4

function slugify(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
}

function toDateInput(iso?: string) {
  const d = iso ? new Date(iso) : new Date()
  return d.toISOString().slice(0, 10)
}

const form = ref({
  title: props.article?.title ?? '',
  slug: props.article?.slug ?? '',
  excerpt: props.article?.excerpt ?? '',
  content: props.article?.content ?? '',
  date: toDateInput(props.article?.date),
  featuredImage: props.article?.featuredImage ?? '',
  sourceUrl: props.article?.sourceUrl ?? '',
  isPublished: props.article?.isPublished ?? true,
})

const slugTouched = ref(!!props.article)
const saving = ref(false)
const uploading = ref(false)
const errorMsg = ref<string | null>(null)
const imageUrlInput = ref('')
const htmlMode = ref(false)
const editorEl = ref<HTMLDivElement | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const dragging = ref(false)

const isEdit = computed(() => !!props.article)
const canSave = computed(() => form.value.title.trim().length > 2 && !saving.value && !uploading.value)

watch(() => form.value.title, (t) => {
  if (!slugTouched.value) form.value.slug = slugify(t)
})

onMounted(async () => {
  await nextTick()
  if (editorEl.value) editorEl.value.innerHTML = form.value.content
})

// ── Editor de texto enriquecido (contenteditable) ─────────────────────────────
function syncFromEditor() {
  if (editorEl.value) form.value.content = editorEl.value.innerHTML
}

function exec(command: string, value?: string) {
  editorEl.value?.focus()
  document.execCommand(command, false, value)
  syncFromEditor()
}

function addLink() {
  const href = window.prompt('Pega el enlace (https://...)')
  if (href) exec('createLink', href)
}

function addImageInBody() {
  const src = window.prompt('Pega la URL de la imagen')
  if (src) exec('insertImage', src)
}

function toggleHtmlMode() {
  if (htmlMode.value) {
    // volviendo al modo visual: pintar el HTML editado
    htmlMode.value = false
    nextTick(() => { if (editorEl.value) editorEl.value.innerHTML = form.value.content })
  } else {
    syncFromEditor()
    htmlMode.value = true
  }
}

// ── Imagen de portada ─────────────────────────────────────────────────────────
function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('No se pudo leer el archivo'))
    reader.readAsDataURL(file)
  })
}

async function handleFile(file: File | undefined) {
  if (!file) return
  errorMsg.value = null
  if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) {
    errorMsg.value = 'Formato no soportado. Usa JPG, PNG, WEBP o GIF.'
    return
  }
  if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
    errorMsg.value = `La imagen pesa más de ${MAX_IMAGE_MB} MB. Redúcela antes de subirla.`
    return
  }
  uploading.value = true
  try {
    const dataUrl = await readAsDataUrl(file)
    const { url } = await articlesService.uploadImage(dataUrl, file.name)
    form.value.featuredImage = url
  } catch (e) {
    errorMsg.value = (e as ApiError).message || 'No se pudo subir la imagen.'
  } finally {
    uploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}

function onDrop(e: DragEvent) {
  dragging.value = false
  handleFile(e.dataTransfer?.files?.[0])
}

function useImageUrl() {
  const u = imageUrlInput.value.trim()
  if (!/^https?:\/\//.test(u)) {
    errorMsg.value = 'La URL de la imagen debe empezar con http:// o https://'
    return
  }
  form.value.featuredImage = u
  imageUrlInput.value = ''
  errorMsg.value = null
}

function removeImage() {
  form.value.featuredImage = ''
}

// ── Versión en inglés (se genera sola a partir del español guardado) ─────────
const trArticle = ref<Article | null>(props.article)
const savedHash = ref<string | null>(null)
const translating = ref(false)
const trError = ref<string | null>(null)
let trPoll: ReturnType<typeof setTimeout> | null = null
let trPollUntil = 0

const trBadge = computed(() => (trArticle.value ? translationBadge(trArticle.value, savedHash.value) : null))
const trEn = computed(() => trArticle.value?.translations?.en ?? null)
// ¿El formulario tiene cambios en el español sin guardar? (la traducción se hará al guardar)
const spanishDirty = computed(() => {
  const a = props.article
  if (!a) return false
  return form.value.title.trim() !== (a.title ?? '').trim() || form.value.excerpt.trim() !== (a.excerpt ?? '').trim() || form.value.content !== (a.content ?? '')
})

function formatDateTime(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' })
}

function stopTrPoll() {
  if (trPoll) clearTimeout(trPoll)
  trPoll = null
}

// Mientras la traducción está en curso, refrescar su estado cada 5 s (máx. 3 min)
function watchPending() {
  stopTrPoll()
  if (!trArticle.value || trBadge.value?.status !== 'pending' || Date.now() > trPollUntil) return
  trPoll = setTimeout(async () => {
    try {
      trArticle.value = await articlesService.adminGet(trArticle.value!._id)
    } catch { /* se reintenta */ }
    watchPending()
  }, 5000)
}

async function forceTranslate() {
  if (!trArticle.value || translating.value) return
  translating.value = true
  trError.value = null
  try {
    const updated = await articlesService.translate(trArticle.value._id)
    trArticle.value = updated ?? (await articlesService.adminGet(trArticle.value._id))
    trPollUntil = Date.now() + 3 * 60 * 1000
    watchPending()
  } catch (e) {
    trError.value = (e as ApiError).message || 'No se pudo traducir el artículo.'
    // En un 502 el backend devuelve el artículo con el estado del fallo
    const failed = ((e as ApiError).data as { data?: Article } | undefined)?.data
    if (failed?._id) trArticle.value = failed
  } finally {
    translating.value = false
  }
}

onMounted(async () => {
  if (props.article) savedHash.value = await spanishSourceHash(props.article)
  if (trBadge.value?.status === 'pending') {
    trPollUntil = Date.now() + 3 * 60 * 1000
    watchPending()
  }
})
onBeforeUnmount(stopTrPoll)

// ── Guardar ───────────────────────────────────────────────────────────────────
async function save() {
  if (!canSave.value) return
  if (!htmlMode.value) syncFromEditor()
  saving.value = true
  errorMsg.value = null
  const body: ArticleInput = {
    title: form.value.title.trim(),
    slug: slugify(form.value.slug || form.value.title),
    excerpt: form.value.excerpt.trim(),
    content: form.value.content,
    date: new Date(form.value.date + 'T12:00:00').toISOString(),
    featuredImage: form.value.featuredImage,
    sourceUrl: form.value.sourceUrl.trim(),
    isPublished: form.value.isPublished,
    source: props.article?.source ?? 'drjuangarza',
  }
  try {
    const saved = props.article
      ? await articlesService.update(props.article._id, body)
      : await articlesService.create(body)
    emit('saved', saved)
  } catch (e) {
    errorMsg.value = (e as ApiError).message || 'No se pudo guardar el artículo.'
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <form class="ed" @submit.prevent="save">
    <div class="ed__top">
      <button type="button" class="ed__back" @click="emit('cancel')"><i class="fa-solid fa-arrow-left"></i> Volver a la lista</button>
      <div class="ed__actions">
        <label class="ed__switch">
          <input v-model="form.isPublished" type="checkbox" />
          <span class="ed__switch-track"><span class="ed__switch-thumb"></span></span>
          <span>{{ form.isPublished ? 'Publicado' : 'Borrador' }}</span>
        </label>
        <button type="submit" class="adm-btn adm-btn--primary" :disabled="!canSave">
          <span v-if="saving" class="adm-spinner"></span>
          <template v-else><i class="fa-solid fa-floppy-disk"></i> {{ isEdit ? 'Guardar cambios' : 'Crear artículo' }}</template>
        </button>
      </div>
    </div>

    <p v-if="errorMsg" class="ed__error"><i class="fa-solid fa-circle-exclamation"></i> {{ errorMsg }}</p>

    <div class="ed__grid">
      <!-- Columna principal -->
      <div class="ed__main">
        <label class="adm-field">
          <span class="adm-field__label">Título</span>
          <input v-model="form.title" class="adm-input adm-input--lg" type="text" placeholder="Título del artículo" required />
        </label>

        <label class="adm-field">
          <span class="adm-field__label">Resumen <small>(aparece en la lista y al compartir)</small></span>
          <textarea v-model="form.excerpt" class="adm-input" rows="3" maxlength="300" placeholder="Dos o tres líneas que resuman el artículo"></textarea>
          <span class="adm-field__count">{{ form.excerpt.length }}/300</span>
        </label>

        <div class="adm-field">
          <span class="adm-field__label">Contenido</span>

          <div class="ed__toolbar">
            <button type="button" title="Negrita" @click="exec('bold')"><i class="fa-solid fa-bold"></i></button>
            <button type="button" title="Cursiva" @click="exec('italic')"><i class="fa-solid fa-italic"></i></button>
            <button type="button" title="Subrayado" @click="exec('underline')"><i class="fa-solid fa-underline"></i></button>
            <span class="ed__sep"></span>
            <button type="button" title="Título" @click="exec('formatBlock', 'H2')">H2</button>
            <button type="button" title="Subtítulo" @click="exec('formatBlock', 'H3')">H3</button>
            <button type="button" title="Párrafo" @click="exec('formatBlock', 'P')"><i class="fa-solid fa-paragraph"></i></button>
            <button type="button" title="Cita" @click="exec('formatBlock', 'BLOCKQUOTE')"><i class="fa-solid fa-quote-left"></i></button>
            <span class="ed__sep"></span>
            <button type="button" title="Lista" @click="exec('insertUnorderedList')"><i class="fa-solid fa-list-ul"></i></button>
            <button type="button" title="Lista numerada" @click="exec('insertOrderedList')"><i class="fa-solid fa-list-ol"></i></button>
            <span class="ed__sep"></span>
            <button type="button" title="Enlace" @click="addLink"><i class="fa-solid fa-link"></i></button>
            <button type="button" title="Imagen en el texto" @click="addImageInBody"><i class="fa-regular fa-image"></i></button>
            <button type="button" title="Quitar formato" @click="exec('removeFormat')"><i class="fa-solid fa-eraser"></i></button>
            <span class="ed__spacer"></span>
            <button type="button" class="ed__html-toggle" :class="{ 'ed__html-toggle--on': htmlMode }" @click="toggleHtmlMode">
              <i class="fa-solid fa-code"></i> HTML
            </button>
          </div>

          <textarea v-if="htmlMode" v-model="form.content" class="adm-input ed__html" rows="18" spellcheck="false"></textarea>
          <div
            v-show="!htmlMode"
            ref="editorEl"
            class="ed__editor"
            contenteditable="true"
            data-placeholder="Escribe aquí el contenido del artículo..."
            @input="syncFromEditor"
            @blur="syncFromEditor"
          ></div>
        </div>
      </div>

      <!-- Columna lateral -->
      <aside class="ed__side">
        <div class="ed__card">
          <span class="adm-field__label">Imagen de portada</span>
          <p class="ed__help">Es la imagen que se muestra al compartir el enlace en WhatsApp, Facebook, LinkedIn, etc. Recomendado 1200 × 630 px.</p>

          <div v-if="form.featuredImage" class="ed__cover">
            <img :src="form.featuredImage" alt="Portada" />
            <div class="ed__cover-actions">
              <button type="button" class="adm-btn adm-btn--ghost adm-btn--sm" @click="fileInput?.click()"><i class="fa-solid fa-rotate"></i> Cambiar</button>
              <button type="button" class="adm-btn adm-btn--danger adm-btn--sm" @click="removeImage"><i class="fa-solid fa-trash"></i> Quitar</button>
            </div>
          </div>

          <div
            v-else
            class="ed__drop"
            :class="{ 'ed__drop--active': dragging, 'ed__drop--busy': uploading }"
            @click="fileInput?.click()"
            @dragover.prevent="dragging = true"
            @dragleave.prevent="dragging = false"
            @drop.prevent="onDrop"
          >
            <span v-if="uploading" class="adm-spinner adm-spinner--accent"></span>
            <template v-else>
              <i class="fa-solid fa-cloud-arrow-up"></i>
              <strong>Subir imagen</strong>
              <span>Arrastra aquí o haz clic · JPG, PNG, WEBP · máx. {{ MAX_IMAGE_MB }} MB</span>
            </template>
          </div>
          <input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden @change="handleFile(($event.target as HTMLInputElement).files?.[0])" />

          <div class="ed__url-row">
            <input v-model="imageUrlInput" class="adm-input adm-input--sm" type="url" placeholder="…o pega la URL de una imagen" @keydown.enter.prevent="useImageUrl" />
            <button type="button" class="adm-btn adm-btn--ghost adm-btn--sm" :disabled="!imageUrlInput" @click="useImageUrl">Usar</button>
          </div>
        </div>

        <div v-if="isEdit && trArticle && trBadge" class="ed__card ed__tr">
          <div class="ed__tr-head">
            <span class="adm-field__label"><i class="fa-solid fa-language"></i> Versión en inglés</span>
            <span :class="['ed__tr-badge', `ed__tr-badge--${trBadge.status}`]" :title="trBadge.hint">{{ trBadge.label }}</span>
          </div>
          <p class="ed__help ed__tr-help">
            Escribe solo en español: la traducción se genera automáticamente al guardar un artículo publicado y se guarda en este mismo artículo.
          </p>
          <p v-if="trEn?.title && trBadge.status !== 'none'" class="ed__tr-preview" lang="en">“{{ trEn.title }}”</p>
          <p v-if="trEn?.translatedAt && (trBadge.status === 'ready' || trBadge.status === 'stale')" class="ed__tr-meta">
            Traducido el {{ formatDateTime(trEn.translatedAt) }}
          </p>
          <p v-if="trBadge.status === 'failed' && trEn?.error" class="ed__tr-meta ed__tr-meta--err">{{ trEn.error }}</p>
          <p v-if="spanishDirty && form.isPublished" class="ed__tr-meta">Hay cambios sin guardar: al guardar se volverá a traducir.</p>
          <p v-if="!trArticle.isPublished" class="ed__tr-meta">Se traduce cuando el artículo está publicado.</p>
          <p v-if="trError" class="ed__tr-meta ed__tr-meta--err">{{ trError }}</p>
          <button
            v-if="trArticle.isPublished"
            type="button"
            class="adm-btn adm-btn--ghost adm-btn--sm"
            :disabled="translating || trBadge.status === 'pending'"
            @click="forceTranslate"
          >
            <span v-if="translating" class="adm-spinner adm-spinner--accent ed__tr-spinner"></span>
            <i v-else class="fa-solid" :class="trBadge.status === 'ready' || trBadge.status === 'stale' ? 'fa-rotate' : 'fa-language'"></i>
            {{ translating ? 'Traduciendo…' : trBadge.status === 'pending' ? 'Traducción en curso…' : translateActionLabel(trBadge.status) }}
          </button>
        </div>

        <div class="ed__card">
          <label class="adm-field">
            <span class="adm-field__label">Fecha de publicación</span>
            <input v-model="form.date" class="adm-input adm-input--sm" type="date" />
          </label>

          <label class="adm-field">
            <span class="adm-field__label">Enlace (slug)</span>
            <input v-model="form.slug" class="adm-input adm-input--sm" type="text" @input="slugTouched = true" @blur="form.slug = slugify(form.slug)" />
            <span class="ed__slug-preview">/investigaciones/{{ form.slug || '…' }}</span>
          </label>

          <label class="adm-field">
            <span class="adm-field__label">Fuente original <small>(opcional)</small></span>
            <input v-model="form.sourceUrl" class="adm-input adm-input--sm" type="url" placeholder="https://…" />
          </label>
        </div>
      </aside>
    </div>
  </form>
</template>

<style lang="scss" scoped>
.ed {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  &__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }

  &__back {
    background: transparent;
    border: none;
    color: var(--text-muted);
    font-size: 0.85rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0;
    &:hover { color: var(--accent); }
  }

  &__actions { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; }

  &__switch {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.85rem;
    color: var(--text);
    cursor: pointer;
    input { display: none; }
    &-track {
      width: 40px;
      height: 22px;
      border-radius: 11px;
      background: rgba(255, 255, 255, 0.15);
      position: relative;
      transition: background 0.2s;
    }
    &-thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s;
    }
    input:checked + .ed__switch-track { background: #10b981; }
    input:checked + .ed__switch-track .ed__switch-thumb { transform: translateX(18px); }
  }

  &__error {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #f87171;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 0.6rem;
    padding: 0.7rem 0.9rem;
  }

  &__grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    gap: 1.5rem;
    align-items: start;
    @media (max-width: 960px) { grid-template-columns: 1fr; }
  }

  &__main { display: flex; flex-direction: column; gap: 1.25rem; min-width: 0; }
  &__side { display: flex; flex-direction: column; gap: 1.25rem; }

  &__card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 1rem;
    padding: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__help { font-size: 0.78rem; color: var(--text-muted); line-height: 1.5; margin-top: -0.5rem; }

  &__cover {
    border-radius: 0.75rem;
    overflow: hidden;
    border: 1px solid var(--border);
    img { width: 100%; aspect-ratio: 1.91 / 1; object-fit: cover; display: block; }
    &-actions { display: flex; gap: 0.5rem; padding: 0.6rem; background: var(--bg-offset); }
  }

  &__drop {
    border: 1.5px dashed rgba(var(--color-cyan-rgb), 0.4);
    border-radius: 0.75rem;
    padding: 1.75rem 1rem;
    text-align: center;
    color: var(--text-muted);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.78rem;
    transition: border-color 0.2s, background 0.2s;
    i { font-size: 1.6rem; color: var(--accent); }
    strong { color: var(--text); font-size: 0.9rem; }
    &:hover, &--active { border-color: var(--accent); background: rgba(var(--color-cyan-rgb), 0.06); }
    &--busy { pointer-events: none; }
  }

  &__url-row { display: flex; gap: 0.5rem; }

  &__tr { gap: 0.7rem; }
  &__tr-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; flex-wrap: wrap; }
  &__tr-help { margin-top: 0; }
  &__tr-badge {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 0.2rem 0.55rem; border-radius: 2rem;
    &--ready { background: rgba(56, 182, 255, 0.14); color: var(--accent); }
    &--pending { background: rgba(245, 158, 11, 0.15); color: #fbbf24; }
    &--stale { background: rgba(249, 115, 22, 0.15); color: #fb923c; }
    &--failed { background: rgba(239, 68, 68, 0.14); color: #f87171; }
    &--none { background: rgba(255, 255, 255, 0.08); color: var(--text-muted); }
  }
  &__tr-preview { font-size: 0.85rem; color: var(--text); line-height: 1.45; font-style: italic; }
  &__tr-meta { font-size: 0.75rem; color: var(--text-muted); line-height: 1.45; &--err { color: #f87171; } }
  &__tr-spinner { width: 0.95rem; height: 0.95rem; }

  &__slug-preview { font-size: 0.75rem; color: var(--text-muted); word-break: break-all; }

  &__toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.25rem;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-bottom: none;
    border-radius: 0.7rem 0.7rem 0 0;
    padding: 0.45rem;

    button {
      background: transparent;
      border: 1px solid transparent;
      color: var(--text);
      min-width: 32px;
      height: 32px;
      border-radius: 0.4rem;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
      &:hover { background: rgba(255, 255, 255, 0.08); }
    }
  }
  &__sep { width: 1px; height: 20px; background: var(--border); margin: 0 0.25rem; }
  &__spacer { flex: 1; }
  &__html-toggle {
    display: inline-flex; align-items: center; gap: 0.4rem; padding: 0 0.6rem;
    &--on { color: var(--accent) !important; border-color: var(--accent) !important; }
  }

  &__editor,
  &__html {
    min-height: 420px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 0 0 0.7rem 0.7rem;
    padding: 1.25rem 1.4rem;
    color: var(--text);
    font-family: var(--font-secondary);
    font-size: 1rem;
    line-height: 1.75;
    outline: none;
    &:focus { border-color: var(--accent); }
  }

  &__html { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 0.85rem; resize: vertical; }

  &__editor {
    &:empty::before { content: attr(data-placeholder); color: var(--text-muted); opacity: 0.7; }
    :deep(h2) { font-size: 1.5rem; margin: 1.5rem 0 0.75rem; font-family: var(--font-principal); }
    :deep(h3) { font-size: 1.2rem; margin: 1.25rem 0 0.6rem; font-family: var(--font-principal); }
    :deep(p) { margin: 0 0 1rem; }
    :deep(ul), :deep(ol) { margin: 0 0 1rem 1.5rem; }
    :deep(a) { color: var(--accent); text-decoration: underline; }
    :deep(img) { max-width: 100%; border-radius: 0.5rem; margin: 1rem 0; }
    :deep(blockquote) { border-left: 3px solid var(--accent); padding: 0.5rem 1.25rem; margin: 1rem 0; color: var(--text-muted); font-style: italic; }
  }
}

.adm-field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  position: relative;
  &__label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
    small { text-transform: none; letter-spacing: 0; font-weight: 400; }
  }
  &__count { align-self: flex-end; font-size: 0.72rem; color: var(--text-muted); }
}

.adm-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  padding: 0.85rem 1rem;
  font-family: var(--font-secondary);
  font-size: 0.95rem;
  color: var(--text);
  outline: none;
  resize: vertical;
  transition: border-color 0.2s;
  &::placeholder { color: var(--text-muted); opacity: 0.7; }
  &:focus { border-color: var(--accent); }
  &--lg { font-size: 1.25rem; font-weight: 600; font-family: var(--font-principal); }
  &--sm { padding: 0.6rem 0.8rem; font-size: 0.88rem; }
}

.adm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.4rem;
  border-radius: 0.7rem;
  font-family: var(--font-principal);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: opacity 0.2s, transform 0.2s;
  white-space: nowrap;

  &--primary { background: var(--accent); color: #0b1631; min-width: 170px; min-height: 2.8rem; &:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); } }
  &--ghost { background: transparent; border-color: var(--border); color: var(--text); &:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); } }
  &--danger { background: transparent; border-color: rgba(239, 68, 68, 0.4); color: #f87171; &:hover:not(:disabled) { background: rgba(239, 68, 68, 0.12); } }
  &--sm { padding: 0.5rem 0.9rem; font-size: 0.8rem; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.adm-spinner {
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid rgba(11, 22, 49, 0.3);
  border-top-color: #0b1631;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  &--accent { border-color: rgba(var(--color-cyan-rgb), 0.25); border-top-color: var(--accent); width: 1.6rem; height: 1.6rem; }
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
