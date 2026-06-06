import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from '../components/Alert'
import EmptyState from '../components/EmptyState'
import FoodCard from '../components/FoodCard'
import { SkeletonGrid } from '../components/Loader'
import { getApiError } from '../services/api'
import { getFoods } from '../services/foodService'
import { useAuth } from '../utils/useAuth'

function Feed() {
  const [foods, setFoods] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const { isUser } = useAuth()

  const loadFoods = async () => {
    setIsLoading(true)
    setError('')

    try {
      const data = await getFoods()
      setFoods(Array.isArray(data.foodItems) ? data.foodItems : [])
    } catch (requestError) {
      setError(getApiError(requestError, 'Unable to fetch food feed.'))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    let isMounted = true

    const loadInitialFoods = async () => {
      if (!isUser) {
        return
      }

      try {
        const data = await getFoods()

        if (isMounted) {
          setFoods(Array.isArray(data.foodItems) ? data.foodItems : [])
        }
      } catch (requestError) {
        if (isMounted) {
          setError(getApiError(requestError, 'Unable to fetch food feed.'))
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadInitialFoods()

    return () => {
      isMounted = false
    }
  }, [isUser])

  if (!isUser) {
    return (
      <section className="page-shell feed-lock-page">
        <div className="feed-lock-copy">
          <span className="section-kicker">Food feed</span>
          <h1>Login to unlock live food reels.</h1>
          <p>The feed uses the existing protected backend route, so user login is required before videos load.</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/login">
              Login
            </Link>
            <Link className="outline-button" to="/register">
              Create Account
            </Link>
          </div>
        </div>
        <div className="feed-lock-visual" aria-label="Reel preview">
          <article className="mini-reel-card">
            <span>Protected reel</span>
            <h2>Fresh uploads appear here</h2>
          </article>
          <article className="mini-reel-card offset">
            <span>Cookie session</span>
            <h2>Backend-powered feed</h2>
          </article>
        </div>
      </section>
    )
  }

  return (
    <section className="page-shell feed-page">
      <div className="feed-header">
        <div>
          <span className="section-kicker">Food feed</span>
          <h1>Fresh reels from the kitchen</h1>
        </div>
        <p>Short food videos from real backend food items.</p>
      </div>

      {isLoading ? <SkeletonGrid count={6} /> : null}

      {!isLoading && error ? (
        <div className="state-stack">
          <Alert message={error} type="error" />
          <button className="outline-button" type="button" onClick={loadFoods}>
            Retry
          </button>
        </div>
      ) : null}

      {!isLoading && !error && foods.length ? (
        <div className="reels-layout">
          {foods.map((food, index) => (
            <FoodCard food={food} index={index} variant="reel" key={food._id || `${food.name}-${index}`} />
          ))}
        </div>
      ) : null}

      {!isLoading && !error && !foods.length ? (
        <EmptyState title="No food reels yet" message="Once a food partner uploads a video, it will show up here." />
      ) : null}
    </section>
  )
}

export default Feed
