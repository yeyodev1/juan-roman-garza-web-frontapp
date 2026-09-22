// Traducción por lotes del backlog (panel admin). El estado vive a nivel de módulo para que el
// proceso sobreviva a la navegación: si el admin abre un artículo y vuelve, la lista sigue viendo
// el mismo proceso (y su botón "Detener") en lugar de poder lanzar un segundo bucle en paralelo.
import { ref } from 'vue'
import { articlesService } from '@/services/articles.service'
import type { ApiError } from '@/types'

export const BACKLOG_BATCH = 3

/** Pendientes de traducir (null = desconocido hasta la primera respuesta del backend) */
export const backlogRemaining = ref<number | null>(null)
export const backlogRunning = ref(false)
export const backlogStop = ref(false)
/** Traducidos con éxito en esta ejecución */
export const backlogDone = ref(0)

export interface BacklogOutcome {
  done: number
  error: string | null
}

const listeners = new Set<(o: BacklogOutcome) => void>()

/** Suscribe una vista al final del proceso; devuelve la función para desuscribirse. */
export function onBacklogFinished(fn: (o: BacklogOutcome) => void) {
  listeners.add(fn)
  return () => listeners.delete(fn)
}

/** Inicia el proceso, o pide detenerlo tras el lote actual si ya está en marcha. */
export async function toggleBacklog() {
  if (backlogRunning.value) {
    backlogStop.value = true
    return
  }
  backlogRunning.value = true
  backlogStop.value = false
  backlogDone.value = 0
  let error: string | null = null
  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const r = await articlesService.translateBacklog(BACKLOG_BATCH)
      const processed = r.processed ?? 0
      // succeeded = traducidos en ESTE lote (translated es el total del sitio, no sirve aquí)
      const ok = r.succeeded ?? (r.results ? r.results.filter((x) => x.status === 'ready').length : 0)
      backlogDone.value += ok
      if (typeof r.remaining === 'number') backlogRemaining.value = r.remaining
      // Un lote que procesa artículos pero no traduce ninguno (créditos agotados, límite de
      // peticiones, etc.) detiene el proceso: seguir solo marcaría todos como fallidos.
      if (processed > 0 && ok === 0) {
        const firstError = r.results?.find((x) => x.error)?.error
        error = `No se pudo traducir ningún artículo del lote${firstError ? `: ${firstError}` : '.'}`
        break
      }
      const nothingLeft = r.remaining === 0 || r.remaining === undefined || r.remaining === null
      if (nothingLeft || processed === 0 || backlogStop.value) break
    }
  } catch (e) {
    error = (e as ApiError).message || 'No se pudieron traducir los pendientes.'
  } finally {
    backlogRunning.value = false
    backlogStop.value = false
  }
  const outcome = { done: backlogDone.value, error }
  listeners.forEach((fn) => fn(outcome))
}
