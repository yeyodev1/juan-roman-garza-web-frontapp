<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articlesService, type Article } from '@/services/articles.service'
import type { ApiError } from '@/types'
import ArticleEditor from '@/components/admin/ArticleEditor.vue'

const route = useRoute()
const router = useRouter()

const article = ref<Article | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const isNew = () => route.name === 'AdminNew'

async function loadArticle() {
  error.value = null
  article.value = null
  if (isNew()) return
  const id = String(route.params.id || '')
  loading.value = true
  try {
    article.value = await articlesService.adminGet(id)
    document.title = `Editar: ${article.value.title} | Panel de Blogs`
  } catch (e) {
    error.value = (e as ApiError).status === 404 ? 'Este artículo ya no existe.' : (e as ApiError).message || 'No se pudo abrir el artículo.'
  } finally {
    loading.value = false
  }
}

function onSaved(saved: Article) {
  // Volvemos a la lista (conservando sus filtros) y abrimos "Compartir" del artículo guardado
  const back = typeof route.query.back === 'string' ? route.query.back : null
  const q = new URLSearchParams(back ? back.split('?')[1] || '' : '')
  q.set('compartir', saved._id)
  q.set('msg', isNew() ? 'creado' : 'guardado')
  router.push(`/admin?${q.toString()}`)
}

function onCancel() {
  const back = typeof route.query.back === 'string' ? route.query.back : null
  router.push(back || { name: 'AdminList' })
}

watch(() => [route.name, route.params.id], loadArticle, { immediate: true })
</script>

<template>
  <div v-if="loading" class="adm__loading"><span class="adm-spinner"></span></div>

  <div v-else-if="error" class="adm__error">
    <i class="fa-solid fa-circle-exclamation"></i> {{ error }}
    <router-link :to="{ name: 'AdminList' }" class="adm-btn adm-btn--ghost adm-btn--sm" style="margin-left:auto">Volver a la lista</router-link>
  </div>

  <ArticleEditor v-else :key="article?._id || 'new'" :article="article" @saved="onSaved" @cancel="onCancel" />
</template>
