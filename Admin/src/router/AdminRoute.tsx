import { Navigate, Outlet } from 'react-router-dom'
import AuthStore from '../store/Auth.Store'

const AdminRoute = () => {
  const { user, isAuthenticated } = AuthStore()
  const isAdmin = user && isAuthenticated && user.role === 'admin'
  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />
}

export default AdminRoute
