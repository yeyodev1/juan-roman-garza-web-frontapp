// composables/useSeoMeta.ts
// Updates <head> meta tags dynamically per route and per language (ES/EN)
import { onUnmounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { locale, t, tm, type Locale } from '@/i18n'

interface SeoCopy {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
}

interface SeoMeta extends SeoCopy {
  ogImage?: string
  canonical?: string
}

const DEFAULT_OG = 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg'

// Datos no traducibles por ruta; los textos viven en src/i18n (seo.<key>)
const pageMetaMap: Record<string, { key: string; ogImage: string; canonical: string }> = {
  '/': { key: 'home', ogImage: DEFAULT_OG, canonical: 'https://juanromangarza.com/' },
  '/sobre-mi': {
    key: 'about',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095164/assets-juan/5e7c35cb-17e2-4244-ab47-c3f4d3edff54.jpg',
    canonical: 'https://juanromangarza.com/sobre-mi',
  },
  '/powerhouse': {
    key: 'powerhouse',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095166/assets-juan/c875b275-008f-42eb-8828-799b8d573ae1.jpg',
    canonical: 'https://juanromangarza.com/powerhouse',
  },
  '/longevidad-regenerativa': { key: 'approach', ogImage: DEFAULT_OG, canonical: 'https://juanromangarza.com/longevidad-regenerativa' },
  '/empresas': { key: 'ecosystem', ogImage: DEFAULT_OG, canonical: 'https://juanromangarza.com/empresas' },
  '/prensa-y-eventos': { key: 'press', ogImage: DEFAULT_OG, canonical: 'https://juanromangarza.com/prensa-y-eventos' },
  '/investigaciones': { key: 'blog', ogImage: DEFAULT_OG, canonical: 'https://juanromangarza.com/investigaciones' },
  '/contacto': { key: 'contact', ogImage: DEFAULT_OG, canonical: 'https://juanromangarza.com/contacto' },
}

const OG_LOCALE: Record<Locale, { current: string; alternate: string }> = {
  es: { current: 'es_MX', alternate: 'en_US' },
  en: { current: 'en_US', alternate: 'es_MX' },
}

function setMetaContent(selector: string, content: string, property = false) {
  const querySelectorStr = property ? `meta[property="${selector}"]` : `meta[name="${selector}"]`
  let el = document.querySelector(querySelectorStr) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    if (property) {
      el.setAttribute('property', selector)
    } else {
      el.setAttribute('name', selector)
    }
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function updateMeta(meta: SeoMeta) {
  document.title = meta.title

  setMetaContent('description', meta.description)
  if (meta.ogTitle) setMetaContent('og:title', meta.ogTitle, true)
  if (meta.ogDescription) setMetaContent('og:description', meta.ogDescription, true)
  if (meta.ogImage) setMetaContent('og:image', meta.ogImage, true)
  setMetaContent('twitter:title', meta.ogTitle || meta.title)
  setMetaContent('twitter:description', meta.ogDescription || meta.description)
  if (meta.ogImage) setMetaContent('twitter:image', meta.ogImage)

  if (meta.canonical) {
    let canonEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonEl) {
      canonEl = document.createElement('link')
      canonEl.setAttribute('rel', 'canonical')
      document.head.appendChild(canonEl)
    }
    canonEl.setAttribute('href', meta.canonical)
  }
}

function updateLanguageMeta(lang: Locale) {
  setMetaContent('og:locale', OG_LOCALE[lang].current, true)
  setMetaContent('og:locale:alternate', OG_LOCALE[lang].alternate, true)
  const contentLanguage = document.querySelector('meta[http-equiv="Content-Language"]')
  if (contentLanguage) contentLanguage.setAttribute('content', lang === 'en' ? 'en-US' : 'es-MX')
}

export function useSeoMeta() {
  const route = useRoute()
  const router = useRouter()
  const applyMeta = () => {
    updateLanguageMeta(locale.value)
    const page = pageMetaMap[route.path]
    if (page) {
      const copy = tm<SeoCopy>(`seo.${page.key}`)
      updateMeta({ ...copy, ogImage: page.ogImage, canonical: page.canonical })
      return
    }
    // Rutas sin SEO propio: título traducible de la ruta, salvo las que fijan su título en la vista (artículo)
    if (route.meta?.titleKey && !route.meta?.dynamicTitle) {
      document.title = t(route.meta.titleKey as string)
    }
  }
  // afterEach corre después del beforeEach del router (que fija el título corto de la ruta),
  // así el SEO completo de la página prevalece también en la primera carga
  const removeHook = router.afterEach(() => applyMeta())
  onUnmounted(removeHook)
  watch(locale, applyMeta, { immediate: true })
  return { applyMeta }
}
