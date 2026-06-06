import { useCallback, useMemo, useState } from 'react'
import { logoutFoodPartner, logoutUser } from '../services/authService'
import { clearStoredAuth, getStoredAuth, setStoredAuth } from './authStorage'
import { AuthContext } from './authCore'

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => getStoredAuth())

  const signIn = useCallback(({ role, profile }) => {
    const nextAuth = { role, profile }
    setStoredAuth(nextAuth)
    setAuth(nextAuth)
  }, [])

  const signOut = useCallback(async () => {
    const currentRole = auth?.role

    try {
      if (currentRole === 'foodPartner') {
        await logoutFoodPartner()
      }

      if (currentRole === 'user') {
        await logoutUser()
      }
    } finally {
      clearStoredAuth()
      setAuth(null)
    }
  }, [auth?.role])

  const value = useMemo(
    () => ({
      auth,
      isAuthenticated: Boolean(auth?.profile),
      isUser: auth?.role === 'user',
      isFoodPartner: auth?.role === 'foodPartner',
      signIn,
      signOut,
    }),
    [auth, signIn, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
