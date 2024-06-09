import axios from 'axios'
import qs from 'qs'

const api = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === 'production'
      ? (import.meta.env.VITE_BACKEND_URL as string)
      : (import.meta.env.VITE_BACKEND_URL_LOCAL as string),
})

api.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => qs.stringify(params, { arrayFormat: 'repeat' })
  return config
})

export default api
