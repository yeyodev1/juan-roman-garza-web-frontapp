import APIBase from './httpBase'

export type ArticleSource = 'drjuangarza' | 'phb'

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
}

export interface AdminListParams {
  page?: number
  limit?: number
  search?: string
  source?: ArticleSource | ''
  status?: 'published' | 'draft' | ''
}

class ArticlesService extends APIBase {
  // ── Público ────────────────────────────────────────────────────────────────
  async list(params: { page?: number; limit?: number; search?: string; source?: string } = {}) {
    const qs = new URLSearchParams()
    if (params.page) qs.set('page', String(params.page))
    if (params.limit) qs.set('limit', String(params.limit))
    if (params.search) qs.set('search', params.search)
    if (params.source) qs.set('source', params.source)
    const res = await this.get<ArticlesResponse>(`articles?${qs.toString()}`)
    return res.data
  }

  async getBySlug(slug: string) {
    const res = await this.get<{ data: Article }>(`articles/${encodeURIComponent(slug)}`)
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

  // image: data URI (data:image/...;base64,...)
  async uploadImage(image: string, filename: string) {
    const res = await this.post<{ data: { url: string; provider: string } }>('media', { image, filename })
    return res.data.data
  }
}

export const articlesService = new ArticlesService()
