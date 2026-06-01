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

const pageMetaMap: Record<string, SeoMeta> = {
  '/': {
    title: 'Juan Román Garza | Longevidad Regenerativa y Medicina de Frontera',
    description: 'Juan Román Garza conecta Psicología, Tecnología y Medicina Regenerativa para ayudarte a optimizar tu salud celular. Células Madre, Exosomas, evaluación de viabilidad. Para quien lo necesite.',
    ogTitle: 'Juan Román Garza | Longevidad Regenerativa',
    ogDescription: 'Evaluación de Viabilidad Regenerativa™. Medicina de frontera para cualquiera que busque optimizar su salud celular y vivir con más claridad.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/'
  },
  '/sobre-mi': {
    title: 'Sobre Juan Román Garza | Medicina Regenerativa y Longevidad',
    description: '15+ años de experiencia en medicina regenerativa. +100K casos analizados. Psicólogo Organizacional del Tecnológico de Monterrey. Powerhouse Biotech — Health Decision Platform.',
    ogTitle: 'Sobre Juan Román Garza | Medicina Regenerativa',
    ogDescription: 'Conoce la trayectoria de Juan Román Garza: psicología organizacional, medicina regenerativa y la visión de salud celular que fundó Powerhouse Biotech.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095164/assets-juan/5e7c35cb-17e2-4244-ab47-c3f4d3edff54.jpg',
    canonical: 'https://juanromangarza.com/sobre-mi'
  },
  '/powerhouse': {
    title: 'Powerhouse Biotech | Health Decision Platform — Evaluación de Viabilidad Regenerativa',
    description: 'La primera Health Decision Platform enfocada en Evaluación de Viabilidad Regenerativa™. No somos una clínica tradicional; somos una entidad tecnológica-médica. Evaluación brutalmente honesta.',
    ogTitle: 'Powerhouse Biotech | Health Decision Platform',
    ogDescription: 'Evaluación de Viabilidad Regenerativa™ — Determinamos si tu cuerpo está verdaderamente listo para repararse a nivel celular. Eliminamos conjeturas.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095166/assets-juan/c875b275-008f-42eb-8828-799b8d573ae1.jpg',
    canonical: 'https://juanromangarza.com/powerhouse'
  },
  '/longevidad-regenerativa': {
    title: 'Longevidad Regenerativa | Células Madre, Exosomas y Medicina de Precisión',
    description: 'Psicología + Tecnología + Medicina Regenerativa. Un enfoque integral para optimizar tu salud celular. Células Madre, Exosomas, evaluación de viabilidad. Para todos.',
    ogTitle: 'Longevidad Regenerativa | Medicina de Frontera',
    ogDescription: 'Medicina Regenerativa al servicio de tu salud. Células madre, exosomas y ciencia de última generación para cualquiera que busque vivir mejor.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/longevidad-regenerativa'
  },
  '/empresas': {
    title: 'Ecosystem | Powerhouse Biotech — Health Decision Platform para Equipos',
    description: 'Ecosistema completo: Health Decision Platform, conferencias, contenido educativo y programas de longevity para equipos. Powerhouse Biotech y comunidad de salud celular.',
    ogTitle: 'Ecosystem | Health Decision Platform',
    ogDescription: 'Ecosistema de Juan Román Garza: Health Decision Platform, conferencias y programas de longevidad para equipos y organizaciones.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/empresas'
  },
  '/prensa-y-eventos': {
    title: 'Prensa y Eventos | Juan Román Garza — Longevidad Regenerativa en Medios',
    description: 'Entrevistas, podcasts y apariciones en medios sobre longevidad regenerativa, salud celular y medicina regenerativa. Juan Román Garza en medios nacionales e internacionales.',
    ogTitle: 'Prensa y Eventos | Juan Román Garza',
    ogDescription: 'Cobertura de medios, entrevistas y apariciones de Juan Román Garza sobre longevidad regenerativa, medicina de precisión y salud celular.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/prensa-y-eventos'
  },
  '/contacto': {
    title: 'Contacto | Juan Román Garza — Health Decision Platform',
    description: 'Consulta sobre Medicina Regenerativa, evaluación de viabilidad y salud celular. Comunícate directamente para resolver tus dudas sobre Células Madre, Exosomas y más.',
    ogTitle: 'Contacto | Juan Román Garza',
    ogDescription: 'Comunícate directamente con Juan Román Garza para consultas sobre Medicina Regenerativa, evaluación de viabilidad y salud celular.',
    ogImage: 'https://res.cloudinary.com/drw5sn8qw/image/upload/v1780095169/assets-juan/profile-og.jpg',
    canonical: 'https://juanromangarza.com/contacto'
  }
}

function updateMeta(meta: SeoMeta) {
  document.title = meta.title

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

export function useSeoMeta() {
  const route = useRoute()
  const applyMeta = () => {
    const path = route.path
    const pageMeta = pageMetaMap[path]
    if (pageMeta) updateMeta(pageMeta)
  }
  watch(() => route.path, applyMeta, { immediate: true })
  return { applyMeta }
}