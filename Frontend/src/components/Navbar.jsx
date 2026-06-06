import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../utils/useAuth'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { auth, isAuthenticated, isFoodPartner, isUser, signOut } = useAuth()
  const navigate = useNavigate()

  const closeMenu = () => setIsOpen(false)
  const getLinkClass = ({ isActive }) => `nav-link${isActive ? ' active' : ''}`

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await signOut()
      closeMenu()
      navigate('/')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/" onClick={closeMenu}>
        <span>Z</span>
        Zesty
      </Link>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav className={`nav-menu${isOpen ? ' open' : ''}`} aria-label="Primary navigation">
        <NavLink className={getLinkClass} to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink className={getLinkClass} to="/feed" onClick={closeMenu}>
          Feed
        </NavLink>
        <Link className="nav-link" to="/#explore" onClick={closeMenu}>
          Search / Explore
        </Link>
        <Link className="nav-link partner-link" to="/partner" onClick={closeMenu}>
          For Partners
        </Link>

        {isFoodPartner ? (
          <NavLink className={getLinkClass} to="/partner/dashboard" onClick={closeMenu}>
            Partner Dashboard
          </NavLink>
        ) : null}
      </nav>

      <div className={`nav-actions${isOpen ? ' open' : ''}`}>
        {isAuthenticated ? (
          <>
            <span className="account-chip">{isUser ? auth.profile.fullName : 'Partner account'}</span>
            <button className="ghost-button" type="button" onClick={handleLogout} disabled={isLoggingOut}>
              {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <Link className="primary-button small" to="/login" onClick={closeMenu}>
            Login
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
