import APIBase from './httpBase'

export type ArticleSource = 'drjuangarza' | 'phb'

/** Idioma en el que el backend sirvió realmente el artículo (sin el campo = español). */
export type ServedLang = 'es' | 'en'

/**
 * Estado de la versión en inglés en las respuestas públicas (?lang=en):
 * - ready: el artículo viene traducido
 * - pending: se sirve el español y la traducción se está generando en segundo plano
 * - unavailable: la traducción falló hace poco; se sirve el español
 */
export type PublicTranslationStatus = 'ready' | 'pending' | 'unavailable'

/** Sub-documento translations.en tal como lo guarda el backend (solo lo ve el admin). */
export interface ArticleTranslationEn {
  title?: string
  excerpt?: string
  content?: string
  sourceHash?: string
  summaryHash?: string
  status?: 'ready' | 'pending' | 'failed'
  model?: string
  translatedAt?: string
  startedAt?: string
  error?: string
  /** Opcional: el backend puede calcular si sigue vigente (hash igual al del español actual). */
  fresh?: boolean
  isFresh?: boolean
  stale?: boolean
}

export interface Article {
  _id: string
  slug: string
  title: string
  excerpt: string
  content?: string
  date: string
  featuredImage: string
  sourceUrl: string
  source: ArticleSource
  isPublished?: boolean
  categories?: string[]
  tags?: string[]
  createdAt?: string
  updatedAt?: string
  // ── Traducción automática (todo opcional: el backend puede no soportarlo aún) ──
  lang?: ServedLang
  translation?: { status?: PublicTranslationStatus | AdminTranslationStatus | string; fresh?: boolean }
  translations?: { en?: ArticleTranslationEn | null }
  translationStatus?: AdminTranslationStatus | string
}

/** Estado de la traducción tal como lo muestra el panel. */
export type AdminTranslationStatus = 'ready' | 'pending' | 'stale' | 'failed' | 'none'

export interface TranslateBacklogResult {
  processed?: number
  /** Traducidos con éxito en este lote */
  succeeded?: number
  /** Total del sitio con inglés vigente (no es por lote) */
  translated?: number
  failed?: number
  remaining?: number | null
  results?: { slug: string; status: string; error?: string }[]
}

export type ArticleInput = Partial<
  Pick<
    Article,
    'title' | 'slug' | 'excerpt' | 'content' | 'date' | 'featuredImage' | 'sourceUrl' | 'source' | 'isPublished' | 'categories' | 'tags'
  >
>

export interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export interface ArticlesResponse {
  data: Article[]
  pagination: Pagination
  /** Opcional (admin): artículos publicados que aún no tienen inglés vigente */
  translationStats?: { remaining?: number; total?: number; translated?: number }
}

export interface AdminListParams {
  page?: number
  limit?: number
  search?: string
  source?: ArticleSource | ''
  status?: 'published' | 'draft' | ''
}

/** Solo 'en' activa la traducción; 'es' = comportamiento de siempre (sin parámetro). */
export type ArticleLang = 'es' | 'en'

// Con ?lang=en el backend puede traducir títulos/resúmenes al vuelo (~20 s máx.)
const EN_LIST_TIMEOUT = 30000

class ArticlesService extends APIBase {
  // ── Público ────────────────────────────────────────────────────────────────
  async list(params: { page?: number; limit?: number; search?: string; source?: string; lang?: ArticleLang } = {}) {
    const qs = new URLSearchParams()
    if (params.page) qs.set('page', String(params.page))
    if (params.limit) qs.set('limit', String(params.limit))
    if (params.search) qs.set('search', params.search)
    if (params.source) qs.set('source', params.source)
    if (params.lang === 'en') qs.set('lang', 'en')
    const res = await this.get<ArticlesResponse>(
      `articles?${qs.toString()}`,
      undefined,
      params.lang === 'en' ? { timeout: EN_LIST_TIMEOUT } : undefined,
    )
    return res.data
  }

  async getBySlug(slug: string, lang: ArticleLang = 'es') {
    const qs = lang === 'en' ? '?lang=en' : ''
    const res = await this.get<{ data: Article }>(`articles/${encodeURIComponent(slug)}${qs}`)
    return res.data.data
  }

  // ── Admin (requiere token con accountType admin) ───────────────────────────
  async adminList(params: AdminListParams = {}) {
    const qs = new URLSearchParams()
    if (params.page) qs.set('page', String(params.page))
    if (params.limit) qs.set('limit', String(params.limit))
    if (params.search) qs.set('search', params.search)
    if (params.source) qs.set('source', params.source)
    if (params.status) qs.set('status', params.status)
    const res = await this.get<ArticlesResponse>(`articles/admin?${qs.toString()}`)
    return res.data
  }

  async adminGet(id: string) {
    const res = await this.get<{ data: Article }>(`articles/admin/${id}`)
    return res.data.data
  }

  async create(body: ArticleInput) {
    const res = await this.post<{ data: Article }>('articles', body)
    return res.data.data
  }

  async update(id: string, body: ArticleInput) {
    const res = await this.put<{ data: Article }>(`articles/${id}`, body)
    return res.data.data
  }

  async remove(id: string) {
    const res = await this.delete<{ data: { id: string; deleted: boolean } }>(`articles/${id}`)
    return res.data.data
  }

  /** Fuerza (re)generar la traducción al inglés de un artículo. */
  async translate(id: string) {
    const res = await this.post<{ data?: Article; message?: string }>(`articles/admin/${id}/translate`, {}, undefined, { timeout: 90000 })
    return res.data?.data ?? null
  }

  /** Traduce un lote de artículos publicados sin versión en inglés vigente. */
  async translateBacklog(limit = 3): Promise<TranslateBacklogResult> {
    const res = await this.post<{ data?: TranslateBacklogResult } & TranslateBacklogResult>(
      `articles/admin/translate-backlog?limit=${Math.min(10, Math.max(1, limit))}`,
      {},
      undefined,
      { timeout: 290000 },
    )
    const body = res.data ?? {}
    return { ...body, ...(body.data ?? {}) }
  }

  // image: data URI (data:image/...;base64,...)
  async uploadImage(image: string, filename: string) {
    const res = await this.post<{ data: { url: string; provider: string } }>('media', { image, filename })
    return res.data.data
  }
}

export const articlesService = new ArticlesService()
