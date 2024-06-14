import { jwtDecode } from 'jwt-decode'
import { toast } from 'react-toastify'
import { create } from 'zustand'

export enum Role {
  ADMIN = 'admin',
}
export interface IUser {
  username: string
  email: string
  role: Role
  iat: number
  exp: number
}

interface IAuthStore {
  accessToken: string | null
  refreshToken: string | null
  user: IUser | null
  setTokens: ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string | null
    refreshToken: string | null
  }) => void
  clearTokens: () => void
  isAuthenticated: boolean
  loading: boolean
  error: string | null
}

const AuthStore = create<IAuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  user: null,
  setTokens: ({ accessToken, refreshToken }) => {
    if (!accessToken || !refreshToken) {
      toast.error('Invalid tokens')
      return set({ accessToken: null, refreshToken: null, isAuthenticated: false })
    }
    let decodedAccessToken
    try {
      decodedAccessToken = jwtDecode(accessToken) as IUser
    } catch (error) {
      toast.error('Invalid access token')
      return set({ accessToken: null, refreshToken: null, isAuthenticated: false })
    }

    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    set({ accessToken, refreshToken, isAuthenticated: true, user: decodedAccessToken })
  },
  clearTokens: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    set({ accessToken: null, refreshToken: null, isAuthenticated: false })
  },
  isAuthenticated: false,
  loading: false,
  error: null,
}))

export default AuthStore

const accessToken = localStorage.getItem('accessToken')
const refreshToken = localStorage.getItem('refreshToken')

if (refreshToken) {
  AuthStore.setState({ refreshToken })
}

if (accessToken && refreshToken) {
  AuthStore.getState().setTokens({ accessToken, refreshToken })
}
