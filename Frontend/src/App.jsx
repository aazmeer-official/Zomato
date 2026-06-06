import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import PartnerNav from './components/PartnerNav'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './utils/AuthContext'
import CreateFood from './pages/CreateFood'
import Dashboard from './pages/Dashboard'
import Feed from './pages/Feed'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PartnerLanding from './pages/PartnerLanding'
import PartnerLogin from './pages/PartnerLogin'
import PartnerRegister from './pages/PartnerRegister'
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'

function AppShell() {
  const location = useLocation()
  const isPartnerArea = location.pathname.startsWith('/partner')

  return (
    <>
      {isPartnerArea ? <PartnerNav /> : <Navbar />}
      <main className={isPartnerArea ? 'partner-main' : 'consumer-main'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/user/login" element={<Navigate to="/login" replace />} />
          <Route path="/user/register" element={<Navigate to="/register" replace />} />
          <Route path="/partner" element={<PartnerLanding />} />
          <Route path="/partner/login" element={<PartnerLogin />} />
          <Route path="/partner/register" element={<PartnerRegister />} />
          <Route path="/food-partner/login" element={<Navigate to="/partner/login" replace />} />
          <Route path="/food-partner/register" element={<Navigate to="/partner/register" replace />} />
          <Route
            path="/partner/dashboard"
            element={<ProtectedRoute requiredRole="foodPartner"><Dashboard /></ProtectedRoute>}
          />
          <Route
            path="/partner/create-food"
            element={<ProtectedRoute requiredRole="foodPartner"><CreateFood /></ProtectedRoute>}
          />
          <Route
            path="/create-food"
            element={<ProtectedRoute requiredRole="foodPartner"><CreateFood /></ProtectedRoute>}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer variant={isPartnerArea ? 'partner' : 'default'} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
