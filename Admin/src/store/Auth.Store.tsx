import { JwtPayload } from 'jwt-decode'
import { create } from 'zustand'

interface IAuthStore {
  accessToken: JwtPayload | null
  setToken: (accessToken: JwtPayload) => void
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const AuthStore = create<IAuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  setToken: (accessToken) => set({ accessToken, isAuthenticated: true }),
  isAuthenticated: false,
  loading: false,
  error: null,
}))

export default AuthStore
