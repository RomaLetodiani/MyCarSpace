import axios from 'axios'
import qs from 'qs'
import AuthStore from '../store/Auth.Store'
import authService from '../services/Auth.Service'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === 'production'
      ? (import.meta.env.VITE_BACKEND_URL as string)
      : (import.meta.env.VITE_BACKEND_URL_LOCAL as string),
})

api.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' })
  const accessToken = AuthStore.getState().accessToken
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    if (error.config && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem('refreshToken')
        if (!refreshToken) {
          return Promise.reject(error)
        }

        const { data } = await authService.refreshTokens({ refreshToken })

        AuthStore.getState().setTokens(data)
        originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`

        return api(originalRequest)
      } catch (error) {
        console.error('Failed to refresh tokens')

        AuthStore.getState().clearTokens()

        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  },
)
export default api
