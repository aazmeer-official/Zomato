import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuth'

function PartnerNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { auth, isFoodPartner, signOut } = useAuth()
  const navigate = useNavigate()

  const closeMenu = () => setIsOpen(false)
  const getLinkClass = ({ isActive }) => `partner-nav-link${isActive ? ' active' : ''}`

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await signOut()
      closeMenu()
      navigate('/partner')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="partner-header">
      <Link className="partner-brand" to="/partner" onClick={closeMenu}>
        <span>Z</span>
        <strong>Zesty Partners</strong>
      </Link>

      <button
        className="nav-toggle partner-toggle"
        type="button"
        aria-label="Toggle partner navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`partner-nav-menu${isOpen ? ' open' : ''}`} aria-label="Partner navigation">
        <NavLink className={getLinkClass} to="/partner" end onClick={closeMenu}>
          Partner Home
        </NavLink>
        {isFoodPartner ? (
          <NavLink className={getLinkClass} to="/partner/dashboard" onClick={closeMenu}>
            Dashboard
          </NavLink>
        ) : null}
        <Link className="partner-nav-link" to="/" onClick={closeMenu}>
          Food App
        </Link>
      </nav>

      <div className={`partner-nav-actions${isOpen ? ' open' : ''}`}>
        {isFoodPartner ? (
          <>
            <span className="partner-account-chip">{auth.profile.fullName}</span>
            <button className="partner-ghost-button" type="button" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <Link className="partner-ghost-button" to="/partner/login" onClick={closeMenu}>
              Login
            </Link>
            <Link className="partner-primary-button" to="/partner/register" onClick={closeMenu}>
              Start selling
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default PartnerNav
