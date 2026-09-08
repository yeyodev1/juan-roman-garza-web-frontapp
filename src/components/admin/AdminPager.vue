<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { Pagination } from '@/services/articles.service'

const props = defineProps<{ pagination: Pagination; loading?: boolean }>()
const emit = defineEmits<{ change: [page: number] }>()

const pageInput = ref(String(props.pagination.page))
watch(() => props.pagination.page, (p) => (pageInput.value = String(p)))

const from = computed(() => (props.pagination.total === 0 ? 0 : (props.pagination.page - 1) * props.pagination.limit + 1))
const to = computed(() => Math.min(props.pagination.total, props.pagination.page * props.pagination.limit))

const pages = computed(() => {
  const { page, pages: total } = props.pagination
  const out: (number | '…')[] = []
  const add = (n: number) => { if (!out.includes(n)) out.push(n) }
  add(1)
  for (let i = page - 2; i <= page + 2; i++) if (i > 1 && i < total) add(i)
  if (total > 1) add(total)
  // insertar puntos suspensivos donde haya saltos
  const withGaps: (number | '…')[] = []
  out.forEach((n, i) => {
    const prev = out[i - 1]
    if (typeof prev === 'number' && typeof n === 'number' && n - prev > 1) withGaps.push('…')
    withGaps.push(n)
  })
  return withGaps
})

function go(page: number) {
  if (props.loading) return
  const p = Math.min(Math.max(1, page), props.pagination.pages)
  if (p !== props.pagination.page) emit('change', p)
}

function goInput() {
  const n = parseInt(pageInput.value, 10)
  if (Number.isNaN(n)) { pageInput.value = String(props.pagination.page); return }
  go(n)
}
</script>

<template>
  <nav class="pg" aria-label="Paginación de artículos">
    <p class="pg__summary">
      Mostrando <strong>{{ from }}–{{ to }}</strong> de <strong>{{ pagination.total }}</strong> artículos
      <span class="pg__sep">·</span>
      Página <strong>{{ pagination.page }}</strong> de <strong>{{ pagination.pages }}</strong>
    </p>

    <div v-if="pagination.pages > 1" class="pg__controls">
      <button class="pg__btn" :disabled="pagination.page === 1 || loading" title="Primera página" @click="go(1)"><i class="fa-solid fa-angles-left"></i></button>
      <button class="pg__btn pg__btn--text" :disabled="pagination.page === 1 || loading" @click="go(pagination.page - 1)"><i class="fa-solid fa-chevron-left"></i> Anterior</button>

      <template v-for="(p, i) in pages" :key="i">
        <span v-if="p === '…'" class="pg__gap">…</span>
        <button v-else class="pg__btn" :class="{ 'pg__btn--active': p === pagination.page }" :disabled="loading" @click="go(p)">{{ p }}</button>
      </template>

      <button class="pg__btn pg__btn--text" :disabled="pagination.page === pagination.pages || loading" @click="go(pagination.page + 1)">Siguiente <i class="fa-solid fa-chevron-right"></i></button>
      <button class="pg__btn" :disabled="pagination.page === pagination.pages || loading" title="Última página" @click="go(pagination.pages)"><i class="fa-solid fa-angles-right"></i></button>

      <label class="pg__jump">
        Ir a
        <input v-model="pageInput" type="number" min="1" :max="pagination.pages" inputmode="numeric" @keydown.enter.prevent="goInput" @blur="goInput" />
      </label>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.pg {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 0.9rem;
  padding: 0.75rem 1rem;

  &__summary { font-size: 0.85rem; color: var(--text-muted); strong { color: var(--text); font-weight: 600; } }
  &__sep { margin: 0 0.5rem; opacity: 0.5; }

  &__controls { display: flex; align-items: center; gap: 0.3rem; flex-wrap: wrap; }

  &__btn {
    min-width: 36px;
    height: 36px;
    padding: 0 0.6rem;
    border-radius: 0.55rem;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    transition: border-color 0.15s, background 0.15s;
    &:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); }
    &--active { background: var(--accent); color: #0b1631; border-color: var(--accent); font-weight: 700; }
    &--text { padding: 0 0.8rem; }
    &:disabled { opacity: 0.35; cursor: not-allowed; }
  }

  &__gap { color: var(--text-muted); padding: 0 0.2rem; }

  &__jump {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin-left: 0.5rem;
    font-size: 0.8rem;
    color: var(--text-muted);
    input {
      width: 58px;
      height: 36px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: 0.55rem;
      color: var(--text);
      text-align: center;
      font-size: 0.85rem;
      outline: none;
      &:focus { border-color: var(--accent); }
    }
  }

  @media (max-width: 640px) {
    justify-content: center;
    &__summary { width: 100%; text-align: center; }
    &__controls { justify-content: center; }
    &__btn--text span { display: none; }
  }
}
</style>
