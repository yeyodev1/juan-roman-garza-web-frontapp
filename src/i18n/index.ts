// i18n ligero sin dependencias: ES (idioma original) + EN.
// - `locale` es un ref a nivel de módulo → todo componente que use t()/tm() se re-renderiza al cambiar.
// - t('a.b.c', { name }) soporta claves con puntos e interpolación {name}; cae a ES y luego a la clave.
// - tm('a.b') devuelve el valor crudo (arrays/objetos) del idioma activo, con fallback a ES.
// - rt('a.b', params) parte un texto con **negritas** en segmentos para pintarlos con <strong> en la plantilla
//   (evita v-html y conserva los estilos scoped del componente).
import { ref } from 'vue'
import es, { type Messages } from './es'
import en from './en'

export type Locale = 'es' | 'en'
export type { Messages }
export type Params = Record<string, string | number>
export interface RichSegment {
  text: string
  bold: boolean
}

export const LOCALES: Locale[] = ['es', 'en']
const STORAGE_KEY = 'lang'
const messages: Record<Locale, Messages> = { es, en }

function isLocale(value: unknown): value is Locale {
  return value === 'es' || value === 'en'
}

function detectInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'es'
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('lang')?.toLowerCase()
    if (isLocale(fromUrl)) return fromUrl
  } catch {
    /* URL no disponible */
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (isLocale(stored)) return stored
  } catch {
    /* localStorage bloqueado (modo privado, etc.) */
  }
  const nav = (typeof navigator !== 'undefined' && navigator.language) || ''
  if (nav.toLowerCase().startsWith('en')) return 'en'
  return 'es'
}

export const locale = ref<Locale>(detectInitialLocale())

function syncDocumentLang(value: Locale) {
  if (typeof document !== 'undefined') document.documentElement.lang = value
}
syncDocumentLang(locale.value)

function lookup(dict: unknown, key: string): unknown {
  let node: unknown = dict
  for (const part of key.split('.')) {
    if (node === null || node === undefined || typeof node !== 'object') return undefined
    node = (node as Record<string, unknown>)[part]
  }
  return node
}

function interpolate(text: string, params?: Params): string {
  if (!params) return text
  return text.replace(/\{(\w+)\}/g, (match, name: string) =>
    Object.prototype.hasOwnProperty.call(params, name) ? String(params[name]) : match,
  )
}

/** Traduce `key` en un idioma concreto (sin depender del idioma activo). */
export function translate(lang: Locale, key: string, params?: Params): string {
  const value = lookup(messages[lang], key)
  if (typeof value === 'string') return interpolate(value, params)
  const fallback = lookup(messages.es, key)
  if (typeof fallback === 'string') return interpolate(fallback, params)
  return key
}

/** Traduce `key` en el idioma activo. */
export function t(key: string, params?: Params): string {
  return translate(locale.value, key, params)
}

/** Valor crudo (arrays / objetos) del diccionario activo, con fallback a ES. */
export function tm<T = unknown>(key: string, lang: Locale = locale.value): T {
  const value = lookup(messages[lang], key)
  return (value !== undefined ? value : lookup(messages.es, key)) as T
}

/** Parte un texto con **negritas** en segmentos. */
export function toRich(text: string): RichSegment[] {
  return text
    .split(/(\*\*[^*]+\*\*)/g)
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith('**') && chunk.endsWith('**')
        ? { text: chunk.slice(2, -2), bold: true }
        : { text: chunk, bold: false },
    )
}

/** t() + toRich(). */
export function rt(key: string, params?: Params): RichSegment[] {
  return toRich(t(key, params))
}

export function setLocale(value: Locale) {
  if (!isLocale(value) || value === locale.value) return
  locale.value = value
  try {
    window.localStorage.setItem(STORAGE_KEY, value)
  } catch {
    /* sin persistencia disponible */
  }
  // useSeoMeta observa `locale` y re-aplica título + meta de la ruta actual
  syncDocumentLang(value)
}

export function toggleLocale() {
  setLocale(locale.value === 'es' ? 'en' : 'es')
}

/** Formatea fechas con Intl según el idioma activo. */
export function formatDate(value: string | number | Date, options?: Intl.DateTimeFormatOptions, lang: Locale = locale.value): string {
  const date = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'es-MX', options ?? { year: 'numeric', month: 'long', day: 'numeric' }).format(date)
}

export function useI18n() {
  return { locale, t, tm, rt, setLocale, toggleLocale, formatDate }
}
