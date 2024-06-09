import api from '../utils/api'

export const authService = {
  login: (body: { username: string; password: string }) => api.post('auth/login', body),
  refreshTokens: (body: { refreshToken: string }) => api.post('auth/refresh-tokens', body),
}
