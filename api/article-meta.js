// Vercel Serverless Function — sirve el index.html del SPA con las etiquetas
// Open Graph / Twitter del artículo (título, descripción, portada) para que al
// compartir /investigaciones/:slug en WhatsApp, Facebook, LinkedIn, etc. se vea
// la portada de ese artículo y no la genérica del sitio.
//
// Se activa por la rewrite de vercel.json:  /investigaciones/:slug → /api/article-meta?slug=:slug

const API_BASE = (process.env.VITE_API_BASE_URL || 'https://phb-web-backapp.vercel.app/api').replace(/\/+$/, '')
const SITE_NAME = 'Juan Román Garza'

function escapeAttr(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function stripHtml(html = '') {
  return String(html).replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncate(text, max = 200) {
  if (text.length <= max) return text
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…'
}

// Reemplaza (o inserta) una etiqueta <meta property|name="key" content="...">
function setMeta(html, attr, key, content) {
  const re = new RegExp(`<meta\\s+[^>]*${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'i')
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}">`
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function removeMeta(html, attr, key) {
  const re = new RegExp(`\\s*<meta\\s+[^>]*${attr}=["']${key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'][^>]*>`, 'gi')
  return html.replace(re, '')
}

function setTitle(html, title) {
  const tag = `<title>${escapeAttr(title)}</title>`
  return /<title>[\s\S]*?<\/title>/i.test(html) ? html.replace(/<title>[\s\S]*?<\/title>/i, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

function setCanonical(html, href) {
  const tag = `<link rel="canonical" href="${escapeAttr(href)}">`
  const re = /<link\s+[^>]*rel=["']canonical["'][^>]*>/i
  return re.test(html) ? html.replace(re, tag) : html.replace('</head>', `    ${tag}\n  </head>`)
}

export default async function handler(req, res) {
  const slug = String(req.query.slug || '').trim()
  const proto = req.headers['x-forwarded-proto'] || 'https'
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const origin = `${proto}://${host}`

  // 1) index.html del build (es un archivo estático, no pasa por las rewrites)
  let html
  try {
    const r = await fetch(`${origin}/index.html`, { headers: { 'user-agent': 'article-meta' } })
    html = await r.text()
  } catch {
    res.statusCode = 502
    res.end('No se pudo cargar la página')
    return
  }

  // 2) Datos del artículo
  let article = null
  if (slug) {
    try {
      const r = await fetch(`${API_BASE}/articles/${encodeURIComponent(slug)}`)
      if (r.ok) article = (await r.json()).data
    } catch {
      /* si la API falla se sirve el HTML genérico */
    }
  }

  if (article) {
    const url = `${origin}/investigaciones/${encodeURIComponent(article.slug)}`
    const title = `${article.title} | ${SITE_NAME}`
    const description = truncate(stripHtml(article.excerpt || article.content || ''), 200)

    html = setTitle(html, title)
    html = setMeta(html, 'name', 'description', description)
    html = setMeta(html, 'property', 'og:type', 'article')
    html = setMeta(html, 'property', 'og:url', url)
    html = setMeta(html, 'property', 'og:title', article.title)
    html = setMeta(html, 'property', 'og:description', description)
    html = setMeta(html, 'name', 'twitter:card', 'summary_large_image')
    html = setMeta(html, 'name', 'twitter:title', article.title)
    html = setMeta(html, 'name', 'twitter:description', description)
    html = setMeta(html, 'name', 'twitter:url', url)
    html = setCanonical(html, url)
    if (article.date) html = setMeta(html, 'property', 'article:published_time', new Date(article.date).toISOString())

    if (article.featuredImage) {
      html = removeMeta(html, 'property', 'og:image:width')
      html = removeMeta(html, 'property', 'og:image:height')
      html = setMeta(html, 'property', 'og:image', article.featuredImage)
      html = setMeta(html, 'property', 'og:image:secure_url', article.featuredImage)
      html = setMeta(html, 'property', 'og:image:alt', article.title)
      html = setMeta(html, 'name', 'twitter:image', article.featuredImage)
    }
  }

  res.statusCode = article ? 200 : 404
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  // CDN de Vercel: 5 min fresco, hasta 1 día sirviendo stale mientras revalida
  res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=86400')
  res.end(html)
}
