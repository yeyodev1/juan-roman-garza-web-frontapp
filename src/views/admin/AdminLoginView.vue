<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { ApiError } from '@/types'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)
const errorMsg = ref<string | null>(null)

const canSubmit = computed(() => !!email.value && password.value.length >= 6 && !loading.value)

async function submit() {
  if (!canSubmit.value) return
  loading.value = true
  errorMsg.value = null
  try {
    const user = await auth.login(email.value.trim(), password.value)
    if (user.accountType !== 'admin') {
      auth.logout()
      errorMsg.value = 'Esta cuenta no tiene permisos de administrador.'
      return
    }
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : null
    router.push(redirect || { name: 'Admin' })
  } catch (e) {
    const err = e as ApiError
    errorMsg.value = err.status === 401 ? 'Correo o contraseña incorrectos.' : err.message || 'No se pudo iniciar sesión.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="adm-login">
    <div class="adm-login__card">
      <div class="adm-login__head">
        <span class="adm-login__badge"><i class="fa-solid fa-lock"></i> Acceso privado</span>
        <h1 class="adm-login__title">Panel de Blogs</h1>
        <p class="adm-login__sub">Crea, edita y comparte los blogs del sitio.</p>
      </div>

      <form class="adm-login__form" @submit.prevent="submit" novalidate>
        <label class="adm-field">
          <span class="adm-field__label">Correo electrónico</span>
          <input v-model="email" class="adm-input" type="email" autocomplete="username" placeholder="correo@ejemplo.com" :disabled="loading" />
        </label>

        <label class="adm-field">
          <span class="adm-field__label">Contraseña</span>
          <span class="adm-input-wrap">
            <input v-model="password" class="adm-input" :type="showPassword ? 'text' : 'password'" autocomplete="current-password" placeholder="••••••••" :disabled="loading" />
            <button type="button" class="adm-eye" :aria-label="showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'" @click="showPassword = !showPassword">
              <i :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"></i>
            </button>
          </span>
        </label>

        <p v-if="errorMsg" class="adm-login__error"><i class="fa-solid fa-circle-exclamation"></i> {{ errorMsg }}</p>

        <button type="submit" class="adm-btn adm-btn--primary adm-login__submit" :disabled="!canSubmit">
          <span v-if="!loading">Entrar</span>
          <span v-else class="adm-spinner"></span>
        </button>
      </form>

      <router-link :to="{ name: 'Investigaciones' }" class="adm-login__back">
        <i class="fa-solid fa-arrow-left"></i> Volver a Blogs
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.adm-login {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 1.25rem 4rem;
  background:
    radial-gradient(ellipse 60% 50% at 10% 0%, rgba(var(--color-cyan-rgb), 0.16) 0%, transparent 60%),
    var(--bg);

  &__card {
    width: 100%;
    max-width: 420px;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 1.25rem;
    padding: 2.5rem 2.25rem;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);

    @media (max-width: 480px) { padding: 2rem 1.5rem; }
  }

  &__head { text-align: center; margin-bottom: 2rem; }

  &__badge {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    border: 1px solid rgba(var(--color-cyan-rgb), 0.35);
    border-radius: 2rem;
    padding: 0.3rem 0.8rem;
    margin-bottom: 1rem;
  }

  &__title {
    font-family: var(--font-principal);
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text);
    margin-bottom: 0.4rem;
  }

  &__sub { color: var(--text-muted); font-size: 0.9rem; line-height: 1.5; }

  &__form { display: flex; flex-direction: column; gap: 1.1rem; }

  &__error {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: #f87171;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 0.6rem;
    padding: 0.7rem 0.9rem;
  }

  &__submit { width: 100%; margin-top: 0.4rem; min-height: 3rem; }

  &__back {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    color: var(--text-muted);
    font-size: 0.85rem;
    text-decoration: none;
    &:hover { color: var(--accent); }
  }
}

.adm-field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  &__label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }
}

.adm-input-wrap { position: relative; display: block; }

.adm-input {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  border-radius: 0.7rem;
  padding: 0.85rem 1rem;
  font-family: var(--font-secondary);
  font-size: 0.95rem;
  color: var(--text);
  outline: none;
  transition: border-color 0.2s;
  &::placeholder { color: var(--text-muted); opacity: 0.7; }
  &:focus { border-color: var(--accent); }
  &:disabled { opacity: 0.6; }
}

.adm-eye {
  position: absolute;
  right: 0.9rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  &:hover { color: var(--text); }
}

.adm-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.85rem 1.5rem;
  border-radius: 0.7rem;
  font-family: var(--font-principal);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
  transition: opacity 0.2s, transform 0.2s;

  &--primary {
    background: var(--accent);
    color: #0b1631;
    &:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
  }
  &:disabled { opacity: 0.5; cursor: not-allowed; }
}

.adm-spinner {
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid rgba(11, 22, 49, 0.3);
  border-top-color: #0b1631;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
