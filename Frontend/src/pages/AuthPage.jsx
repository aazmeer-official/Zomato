import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import { getApiError } from '../services/api'
import { loginFoodPartner, loginUser, registerFoodPartner, registerUser } from '../services/authService'
import { useAuth } from '../utils/useAuth'

const initialValues = {
  fullName: '',
  email: '',
  password: '',
}

function AuthPage({ mode, role }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [serverMessage, setServerMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const isRegister = mode === 'register'
  const isFoodPartner = role === 'foodPartner'
  const roleLabel = isFoodPartner ? 'Food Partner' : 'Food Lover'
  const alternatePath = isRegister
    ? isFoodPartner ? '/partner/login' : '/login'
    : isFoodPartner ? '/partner/register' : '/register'
  const alternateText = isRegister ? 'Already have an account?' : 'Need an account?'
  const alternateAction = isRegister ? 'Login' : 'Register'

  const validate = () => {
    const nextErrors = {}

    if (isRegister && !values.fullName.trim()) {
      nextErrors.fullName = 'Full name is required.'
    }

    if (!values.email.trim()) {
      nextErrors.email = 'Email is required.'
    }

    if (values.email.trim() && !/^\S+@\S+\.\S+$/.test(values.email.trim())) {
      nextErrors.email = 'Please enter a valid email.'
    }

    if (!values.password) {
      nextErrors.password = 'Password is required.'
    }

    if (values.password && values.password.length < 6) {
      nextErrors.password = 'Password must be at least 6 characters.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((currentValues) => ({ ...currentValues, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: '' }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setServerMessage('')

    if (!validate()) {
      return
    }

    const payload = {
      email: values.email.trim(),
      password: values.password,
    }

    if (isRegister) {
      payload.fullName = values.fullName.trim()
    }

    const request = isFoodPartner
      ? isRegister ? registerFoodPartner : loginFoodPartner
      : isRegister ? registerUser : loginUser

    setIsSubmitting(true)

    try {
      const data = await request(payload)
      const profile = isFoodPartner ? data.foodPartner : data.user

      signIn({
        role: isFoodPartner ? 'foodPartner' : 'user',
        profile,
      })

      const fallbackPath = isFoodPartner ? '/partner/dashboard' : '/feed'
      const nextPath = location.state?.from?.pathname || fallbackPath
      navigate(nextPath, { replace: true })
    } catch (error) {
      setServerMessage(getApiError(error, 'Authentication failed.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className={`auth-page ${isFoodPartner ? 'partner-auth' : 'user-auth'}`}>
      <div className="auth-shell">
        <div className="auth-visual-panel">
          <span className="section-kicker">{roleLabel}</span>
          <h1>{isRegister ? `Create your ${roleLabel.toLowerCase()} account` : `Welcome back, ${roleLabel.toLowerCase()}`}</h1>
          <p>
            {isFoodPartner
              ? 'Upload high-converting food reels, track your session items, and keep your menu ready for demand.'
              : 'Sign in to unlock the protected reel feed and discover food videos from real backend uploads.'}
          </p>
          <div className="auth-proof-grid" aria-label="Account benefits">
            <span>{isFoodPartner ? 'Multipart uploads' : 'Real food reels'}</span>
            <span>{isFoodPartner ? 'Partner dashboard' : 'Cookie sessions'}</span>
            <span>{isFoodPartner ? 'Session menu' : 'Mobile-ready feed'}</span>
          </div>
        </div>

        <div className="auth-panel">
          <span className="section-kicker">{isRegister ? 'Create account' : 'Login'}</span>
          <h2>{isRegister ? 'Enter your details' : 'Continue to Zesty'}</h2>
          <p>{isFoodPartner ? 'Use your partner credentials.' : 'Use your food lover account.'}</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            <Alert message={serverMessage} type="error" />

            {isRegister ? (
              <label className="field">
                <span>Full name</span>
                <input
                  name="fullName"
                  type="text"
                  value={values.fullName}
                  onChange={handleChange}
                  placeholder="Ayesha Khan"
                  autoComplete="name"
                />
                {errors.fullName ? <small>{errors.fullName}</small> : null}
              </label>
            ) : null}

            <label className="field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email ? <small>{errors.email}</small> : null}
            </label>

            <label className="field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                autoComplete={isRegister ? 'new-password' : 'current-password'}
              />
              {errors.password ? <small>{errors.password}</small> : null}
            </label>

            <button className={isFoodPartner ? 'partner-primary-button full-width' : 'primary-button full-width'} type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Please wait...' : isRegister ? 'Create account' : 'Login'}
            </button>
          </form>

          <div className="auth-switch">
            <span>{alternateText}</span>
            <Link to={alternatePath}>{alternateAction}</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthPage
