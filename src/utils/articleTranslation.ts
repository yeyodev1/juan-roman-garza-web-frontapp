// Estado de la versión en inglés de un artículo, tal como lo muestra el panel (en español).
// El artículo se escribe una sola vez en español; el backend guarda la traducción dentro del
// mismo documento (translations.en) con el hash del español del que salió. Este helper acepta
// varias formas de respuesta para funcionar aunque el backend todavía no exponga todos los campos.
import type { AdminTranslationStatus, Article } from '@/services/articles.service'

export interface TranslationBadge {
  status: AdminTranslationStatus
  label: string
  /** Texto de ayuda (tooltip) */
  hint: string
}

// Un "pending" más viejo que esto se considera interrumpido (el backend retoma el bloqueo a los 5 min)
const STALE_PENDING_MS = 10 * 60 * 1000

const LABELS: Record<AdminTranslationStatus, string> = {
  ready: 'Traducido',
  pending: 'Pendiente',
  stale: 'Desactualizado',
  failed: 'Error',
  none: 'Sin traducir',
}

const HINTS: Record<AdminTranslationStatus, string> = {
  ready: 'La versión en inglés está al día con el texto en español.',
  pending: 'La traducción al inglés se está generando.',
  stale: 'El texto en español cambió después de traducirlo; conviene regenerar la traducción.',
  failed: 'La última traducción falló.',
  none: 'Todavía no tiene versión en inglés.',
}

function normalize(value: unknown): AdminTranslationStatus | null {
  switch (value) {
    case 'ready':
    case 'pending':
    case 'stale':
    case 'failed':
    case 'none':
      return value
    case 'outdated':
      return 'stale'
    case 'unavailable':
    case 'error':
      return 'failed'
    case 'missing':
      return 'none'
    default:
      return null
  }
}

/**
 * sha256 del español (título + resumen + contenido), igual que el backend.
 * Solo sirve cuando tenemos el contenido (editor); la lista del panel no lo trae.
 */
export async function spanishSourceHash(a: Pick<Article, 'title' | 'excerpt' | 'content'>): Promise<string | null> {
  try {
    if (typeof crypto === 'undefined' || !crypto.subtle) return null
    const bytes = new TextEncoder().encode(`${a.title ?? ''}\u0000${a.excerpt ?? ''}\u0000${a.content ?? ''}`)
    const digest = await crypto.subtle.digest('SHA-256', bytes)
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('')
  } catch {
    return null
  }
}

export function translationStatus(a: Article, currentHash?: string | null): AdminTranslationStatus {
  // 1) Estado ya calculado por el backend (compara el hash con el contenido real): manda
  const direct = normalize(a.translationStatus) ?? normalize(a.translation?.status)
  if (direct === 'ready' && a.translation?.fresh === false) return 'stale'
  if (direct) return direct

  // 2) Sub-documento translations.en
  const en = a.translations?.en
  if (!en || !en.status) return direct ?? 'none'
  if (en.status === 'pending') {
    const started = en.startedAt ? new Date(en.startedAt).getTime() : NaN
    return !Number.isNaN(started) && Date.now() - started > STALE_PENDING_MS ? 'failed' : 'pending'
  }
  if (en.status === 'failed') return 'failed'
  // ready: ¿sigue correspondiendo al español actual?
  if (en.stale === true || en.fresh === false || en.isFresh === false) return 'stale'
  if (en.fresh === true || en.isFresh === true) return 'ready'
  if (currentHash && en.sourceHash) return currentHash === en.sourceHash ? 'ready' : 'stale'
  return 'ready'
}

export function translationBadge(a: Article, currentHash?: string | null): TranslationBadge {
  const status = translationStatus(a, currentHash)
  let hint = HINTS[status]
  const en = a.translations?.en
  if (status === 'failed' && en?.error) hint = `${hint} (${en.error})`
  return { status, label: LABELS[status], hint }
}

/** Texto del botón para (re)generar la traducción. */
export function translateActionLabel(status: AdminTranslationStatus): string {
  return status === 'ready' || status === 'stale' ? 'Regenerar traducción' : 'Traducir al inglés'
}
