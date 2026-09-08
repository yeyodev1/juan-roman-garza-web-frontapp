import APIBase from './httpBase'

export interface AuthUser {
  id: string
  name: string
  email: string
  accountType: 'admin' | 'user' | string
}

export interface AuthResponse {
  token: string
  user: AuthUser
}

class AuthService extends APIBase {
  async login(email: string, password: string) {
    const res = await this.post<AuthResponse>('auth/login', { email, password })
    return res.data
  }

  async me() {
    const res = await this.get<{ data: AuthUser & { _id?: string } }>('auth/me')
    return res.data.data
  }
}

export const authService = new AuthService()
