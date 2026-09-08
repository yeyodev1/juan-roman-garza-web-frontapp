<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const publicBase = 'https://juanromangarza.com'

function logout() {
  auth.logout()
  router.push({ name: 'AdminLogin' })
}

// Sesión expirada (httpBase emite este evento ante un 401)
function onTokenExpired() {
  auth.logout()
  router.push({ name: 'AdminLogin', query: { redirect: router.currentRoute.value.fullPath } })
}
onMounted(() => window.addEventListener('auth:token-expired', onTokenExpired))
onBeforeUnmount(() => window.removeEventListener('auth:token-expired', onTokenExpired))
</script>

<template>
  <div class="adm">
    <div class="adm__wrap">
      <header class="adm__head">
        <div>
          <span class="adm__kicker"><i class="fa-solid fa-pen-nib"></i> Panel de Blogs</span>
          <h1 class="adm__title">
            <router-link :to="{ name: 'AdminList' }" class="adm__title-link">Blogs</router-link>
          </h1>
        </div>
        <div class="adm__user">
          <span class="adm__user-name"><i class="fa-regular fa-user"></i> {{ auth.user?.name || auth.user?.email }}</span>
          <a :href="`${publicBase}/investigaciones`" target="_blank" rel="noopener" class="adm-btn adm-btn--ghost adm-btn--sm"><i class="fa-solid fa-arrow-up-right-from-square"></i> Ver sitio</a>
          <button class="adm-btn adm-btn--ghost adm-btn--sm" @click="logout"><i class="fa-solid fa-right-from-bracket"></i> Salir</button>
        </div>
      </header>

      <router-view />
    </div>
  </div>
</template>

<style lang="scss">
/* Estilos compartidos del panel (no scoped: los usan las vistas hijas) */
.adm {
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  padding: 110px 0 5rem;

  &__wrap {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    padding: 0 2rem;
    @media (max-width: 768px) { padding: 0 1.25rem; }
  }

  &__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 2rem;
  }

  &__kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.4rem;
  }

  &__title { font-family: var(--font-principal); font-size: clamp(1.6rem, 3vw, 2.2rem); font-weight: 700; }
  &__title-link { color: inherit; text-decoration: none; &:hover { color: var(--accent); } }

  &__user { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
  &__user-name { font-size: 0.85rem; color: var(--text-muted); display: inline-flex; gap: 0.4rem; align-items: center; margin-right: 0.5rem; }

  &__error {
    display: flex; align-items: center; gap: 0.5rem;
    font-size: 0.85rem; color: #f87171;
    background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 0.6rem; padding: 0.7rem 0.9rem; margin-bottom: 1rem;
  }

  &__loading { display: flex; justify-content: center; padding: 4rem 0; }

  &__toast {
    position: fixed;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 900;
    background: #10b981;
    color: #04261a;
    font-weight: 600;
    font-size: 0.9rem;
    padding: 0.75rem 1.25rem;
    border-radius: 2rem;
    display: inline-flex;
    gap: 0.5rem;
    align-items: center;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  }
}

.adm-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.75rem 1.3rem; border-radius: 0.7rem;
  font-family: var(--font-principal); font-size: 0.9rem; font-weight: 600;
  cursor: pointer; border: 1px solid transparent; text-decoration: none; white-space: nowrap;
  transition: opacity 0.2s, transform 0.2s;
  &--primary { background: var(--accent); color: #0b1631; &:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); } }
  &--ghost { background: transparent; border-color: var(--border); color: var(--text); &:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); } }
  &--danger { background: #ef4444; color: #fff; &:hover:not(:disabled) { opacity: 0.9; } }
  &--sm { padding: 0.5rem 0.9rem; font-size: 0.8rem; }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.adm-spinner {
  width: 1.6rem; height: 1.6rem; border-radius: 50%;
  border: 2px solid rgba(var(--color-cyan-rgb), 0.25); border-top-color: var(--accent);
  animation: adm-spin 0.7s linear infinite;
}
@keyframes adm-spin { to { transform: rotate(360deg); } }

.adm-fade-enter-active, .adm-fade-leave-active { transition: opacity 0.25s; }
.adm-fade-enter-from, .adm-fade-leave-to { opacity: 0; }
</style>
