// composables/useSeoMeta.ts
// Updates <head> meta tags dynamically per route
import { watch } from 'vue'
import { useRoute } from 'vue-router'

interface SeoMeta {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  canonical?: string
}

const defaultMeta: SeoMeta = {
  title: 'Juan Román Garza | Longevidad Regenerativa para CEOs y Líderes Empresariales',
  description: 'Juan Román Garza conecta Psicología Organizacional, Tecnología y Medicina Regenerativa para potenciar el rendimiento físico e intelectual de CEOs y líderes empresariales.',
  ogTitle: 'Juan Román Garza | Longevidad Regenerativa para Líderes Empresariales',
  ogDescription: 'Health Decision Platform enfocada en Medicina Regenerativa. Potencia tu rendimiento como CEO con ciencia de última generación.',
  ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
  canonical: 'https://juanromangarza.com/'
}

const pageMetaMap: Record<string, SeoMeta> = {
  '/': {
    title: 'Juan Román Garza | Longevidad Regenerativa para CEOs y Líderes Empresariales',
    description: 'Juan Román Garza conecta Psicología Organizacional, Tecnología y Medicina Regenerativa para potenciar el rendimiento de CEOs. Health Decision Platform, Células Madre, Exosomas.',
    ogTitle: 'Juan Román Garza | Longevidad Regenerativa para Líderes',
    ogDescription: 'La primera Health Decision Platform enfocada en Medicina Regenerativa para líderes empresariales. Ciencia de frontera al servicio del rendimiento.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/'
  },
  '/sobre-mi': {
    title: 'Sobre Juan Román Garza | Líder en Medicina Regenerativa y longevity',
    description: '15+ años de liderazgo en medicina regenerativa. +100K casos analizados. Powerhouse Biotech — la primera Health Decision Platform en su clase. Psicólogo Organizacional, Tecnológico de Monterrey.',
    ogTitle: 'Sobre Juan Román Garza | Medicine Regenerativa',
    ogDescription: 'Conoce la trayectoria de Juan Román Garza: Psicología Organizacional, medicina regenerativa y la visión que fundó Powerhouse Biotech.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095164/assets-juan/5e7c35cb-17e2-4244-ab47-c3f4d3edff54.jpg',
    canonical: 'https://juanromangarza.com/sobre-mi'
  },
  '/powerhouse': {
    title: 'Powerhouse Biotech | Health Decision Platform — Longevidad Regenerativa',
    description: 'La primera Health Decision Platform enfocada en Evaluación de Viabilidad Regenerativa™. Ciencia al servicio del rendimiento de CEOs. No somos una clínica tradicional; somos una entidad tecnológica-médica.',
    ogTitle: 'Powerhouse Biotech | Health Decision Platform',
    ogDescription: 'La primera Health Decision Platform enfocada en Medicina Regenerativa. Evaluación de Viabilidad Regenerativa™ — Eliminamos conjeturas para proteger tu inversión biológica.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095166/assets-juan/c875b275-008f-42eb-8828-799b8d573ae1.jpg',
    canonical: 'https://juanromangarza.com/powerhouse'
  },
  '/longevidad-regenerativa': {
    title: 'Longevidad Regenerativa | Medicina de Frontera para CEOs',
    description: 'Psicología Organizacional + Tecnología + Medicina Regenerativa. Un enfoque integral para el rendimiento del líder moderno. Células Madre, Exosomas, Health Decision Platform.',
    ogTitle: 'Longevidad Regenerativa | Enfoque Integral para el Rendimiento',
    ogDescription: 'Medicina Regenerativa al servicio del liderazgo. Células madre, exosomas y ciencia de última generación para CEOs y líderes empresariales.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/longevidad-regenerativa'
  },
  '/empresas': {
    title: 'Empresas | Ecosystem JRG — Health Decision Platform',
    description: 'Ecosistema completo: Health Decision Platform, conferencias, contenido educativo y comunidad de líderes de alto rendimiento. Powerhouse Biotech, medios y programas para empresas.',
    ogTitle: 'Ecosystem | Health Decision Platform para Empresas',
    ogDescription: 'Ecosistema de Juan Román Garza: Powerhouse Biotech, conferencias y programas para el rendimiento de equipos empresariales.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/empresas'
  },
  '/prensa-y-eventos': {
    title: 'Prensa y Eventos | Juan Román Garza — Cobertura y Medios',
    description: 'Entrevistas, podcasts y apariciones en medios sobre longevidad regenerativa y rendimiento humano. Encuentra a Juan Román Garza en medios nacionales e internacionales.',
    ogTitle: 'Prensa y Eventos | Juan Román Garza',
    ogDescription: 'Cobertura de medios, entrevistas y apariciones de Juan Román Garza en podcasts y foros empresariales sobre longevidad regenerativa.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/prensa-y-eventos'
  },
  '/contacto': {
    title: 'Contacto | Juan Román Garza — Health Decision Platform',
    description: 'Contacto directo para consultas sobre Medicina Regenerativa, partnerships y evaluación de viabilidad regenerativa. Health Decision Platform para CEOs y líderes.',
    ogTitle: 'Contacto | Juan Román Garza',
    ogDescription: 'Comunícate directamente con Juan Román Garza para consultas sobre Medicina Regenerativa, evaluación de viabilidad y partnerships.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/contacto'
  }
}

function updateMeta(meta: SeoMeta) {
  // Update document title
  document.title = meta.title

  // Helper to find or create meta tag
  const setMetaContent = (selector: string, content: string, property = false) => {
    let el = document.querySelector(selector) as HTMLMetaElement | null
    if (!el) {
      el = document.createElement('meta')
      if (property) {
        el.setAttribute('property', selector.split(':')[1] || selector)
      } else {
        el.setAttribute('name', selector)
      }
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  // Description
  setMetaContent('description', meta.description)

  // OG tags
  if (meta.ogTitle) setMetaContent('og:title', meta.ogTitle, true)
  if (meta.ogDescription) setMetaContent('og:description', meta.ogDescription, true)
  if (meta.ogImage) setMetaContent('og:image', meta.ogImage, true)

  // Twitter
  setMetaContent('twitter:title', meta.ogTitle || meta.title)
  setMetaContent('twitter:description', meta.ogDescription || meta.description)
  if (meta.ogImage) setMetaContent('twitter:image', meta.ogImage)

  // Canonical
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

export function useSeoMeta() {
  const route = useRoute()

  const applyMeta = () => {
    const path = route.path
    const pageMeta = pageMetaMap[path]
    updateMeta(pageMeta || defaultMeta)
  }

  watch(() => route.path, applyMeta, { immediate: true })

  return { applyMeta }
}