import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../utils/useAuth'

function ProtectedRoute({ children, requiredRole }) {
  const { auth, isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const loginPath = requiredRole === 'foodPartner' ? '/partner/login' : '/login'
    return <Navigate to={loginPath} replace state={{ from: location }} />
  }

  if (requiredRole && auth.role !== requiredRole) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute
