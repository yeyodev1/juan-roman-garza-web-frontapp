import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { authService, type AuthUser } from '@/services/auth.service'

// httpBase lee el token de localStorage('access_token') para el header Authorization.
const TOKEN_KEY = 'access_token'
const USER_KEY = 'auth_user'

function readUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const user = ref<AuthUser | null>(readUser())

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => isAuthenticated.value && user.value?.accountType === 'admin')

  async function login(email: string, password: string) {
    const res = await authService.login(email, password)
    token.value = res.token
    user.value = res.user
    localStorage.setItem(TOKEN_KEY, res.token)
    localStorage.setItem(USER_KEY, JSON.stringify(res.user))
    return res.user
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return { token, user, isAuthenticated, isAdmin, login, logout }
})
