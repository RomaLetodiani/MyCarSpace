import api from '../utils/api'

const authService = {
  login: (body: { username: string; password: string }) => api.post('auth/login', body),
  register: (body: { username: string; password: string }) => api.post('auth/register', body),
  refreshTokens: (body: { refreshToken: string }) => api.post('auth/refresh-tokens', body),
  logout: () => api.post('auth/logout'),
}

export default authService
