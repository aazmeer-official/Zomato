import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FoodCard from '../components/FoodCard'
import { SkeletonGrid } from '../components/Loader'
import { getFoods } from '../services/foodService'
import { useAuth } from '../utils/useAuth'
import heroImage from '../assets/food-hero.png'

const categories = [
  { name: 'Biryani', meta: 'Royal bowls', color: '#e23744' },
  { name: 'Burgers', meta: 'Stacked grills', color: '#0e7c66' },
  { name: 'Rolls', meta: 'Street wraps', color: '#d98b11' },
  { name: 'Desserts', meta: 'Sweet finishes', color: '#7257d8' },
  { name: 'Pizza', meta: 'Hot slices', color: '#3f6fb5' },
  { name: 'Healthy', meta: 'Fresh plates', color: '#16804f' },
]

const popularDishes = [
  { name: 'Lahori chicken bowl', tag: 'Spicy', price: 'Rs. 780', gradient: 'dish-red' },
  { name: 'Smash burger stack', tag: 'Trending', price: 'Rs. 620', gradient: 'dish-green' },
  { name: 'Creamy pasta bake', tag: 'Comfort', price: 'Rs. 690', gradient: 'dish-gold' },
  { name: 'Chocolate lava cup', tag: 'Dessert', price: 'Rs. 420', gradient: 'dish-indigo' },
]

const howItWorks = [
  { title: 'Search cravings', text: 'Start from cuisine, dish, or mood.' },
  { title: 'Watch food reels', text: 'Preview texture, portions, and freshness.' },
  { title: 'Choose faster', text: 'Keep the journey visual and decisive.' },
]

function Home() {
  const { isUser } = useAuth()
  const [previewFoods, setPreviewFoods] = useState([])
  const [isLoadingPreview, setIsLoadingPreview] = useState(false)

  useEffect(() => {
    let isMounted = true

    const loadPreview = async () => {
      if (!isUser) {
        setPreviewFoods([])
        return
      }

      setIsLoadingPreview(true)

      try {
        const data = await getFoods()

        if (isMounted) {
          setPreviewFoods(Array.isArray(data.foodItems) ? data.foodItems.slice(0, 3) : [])
        }
      } catch {
        if (isMounted) {
          setPreviewFoods([])
        }
      } finally {
        if (isMounted) {
          setIsLoadingPreview(false)
        }
      }
    }

    loadPreview()

    return () => {
      isMounted = false
    }
  }, [isUser])

  return (
    <>
      <section className="home-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(18, 15, 13, 0.94), rgba(18, 15, 13, 0.72), rgba(18, 15, 13, 0.18)), url(${heroImage})` }}>
        <div className="hero-content">
          <span className="section-kicker">Premium food discovery</span>
          <h1>Zesty cravings, delivered visually.</h1>
          <p>Explore short food reels, find dishes by mood, and discover what local kitchens are uploading today.</p>
          <form className="hero-search" onSubmit={(event) => event.preventDefault()}>
            <span aria-hidden="true">Search</span>
            <input type="search" placeholder="Search biryani, burgers, desserts..." />
            <button type="submit">Explore</button>
          </form>
          <div className="hero-actions">
            <Link className="primary-button" to="/feed">
              Open Feed
            </Link>
            <Link className="outline-button light" to="/register">
              Create Account
            </Link>
          </div>
        </div>

        <div className="hero-showcase" aria-label="Featured food experience">
          <div className="hero-phone-card">
            <span>Live reel</span>
            <h2>Smoky paneer tikka bowl</h2>
            <p>Rich, grilled, and plated for the evening rush.</p>
          </div>
          <div className="hero-stat-card">
            <strong>2.4k</strong>
            <span>weekly reel views</span>
          </div>
        </div>
      </section>

      <section className="section-block explore-section" id="explore">
        <div className="section-heading wide-heading">
          <span className="section-kicker">Search / Explore</span>
          <h2>Browse by craving</h2>
          <p>Category shortcuts keep the user app fast, visual, and familiar.</p>
        </div>
        <div className="category-grid">
          {categories.map((category) => (
            <Link className="category-card" to="/feed" key={category.name} style={{ '--category-color': category.color }}>
              <span>{category.name.slice(0, 1)}</span>
              <h3>{category.name}</h3>
              <p>{category.meta}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-block featured-preview-section">
        <div className="section-heading">
          <span className="section-kicker">Featured reels</span>
          <h2>Food videos with a richer preview</h2>
          <p>{isUser ? 'Showing real backend food items for your signed-in session.' : 'Login to unlock the protected backend feed.'}</p>
        </div>

        {isLoadingPreview ? <SkeletonGrid count={3} /> : null}

        {!isLoadingPreview && previewFoods.length ? (
          <div className="food-grid">
            {previewFoods.map((food, index) => (
              <FoodCard food={food} index={index} key={food._id || `${food.name}-${index}`} />
            ))}
          </div>
        ) : null}

        {!isLoadingPreview && !previewFoods.length ? (
          <div className="preview-lock-grid">
            {popularDishes.slice(0, 3).map((dish) => (
              <article className={`visual-dish-card ${dish.gradient}`} key={dish.name}>
                <span>{dish.tag}</span>
                <h3>{dish.name}</h3>
                <p>{dish.price}</p>
              </article>
            ))}
            <div className="preview-login-card">
              <h3>{isUser ? 'No backend reels yet' : 'Unlock live reels'}</h3>
              <p>{isUser ? 'Partner uploads will appear here after successful creation.' : 'The real feed is protected by the existing user cookie route.'}</p>
              <Link className="primary-button" to={isUser ? '/partner' : '/login'}>
                {isUser ? 'Invite Partners' : 'Login to Feed'}
              </Link>
            </div>
          </div>
        ) : null}
      </section>

      <section className="section-block how-section">
        <div className="section-heading centered-heading">
          <span className="section-kicker">How it works</span>
          <h2>From craving to choice</h2>
        </div>
        <div className="feature-band">
          {howItWorks.map((item, index) => (
            <div className="feature-item" key={item.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block popular-section">
        <div className="section-heading wide-heading">
          <span className="section-kicker">Popular dishes</span>
          <h2>Restaurant-style visual cards</h2>
          <p>Dummy display cards fill the discovery surface until a public dishes API exists.</p>
        </div>
        <div className="popular-grid">
          {popularDishes.map((dish) => (
            <article className={`visual-dish-card ${dish.gradient}`} key={dish.name}>
              <span>{dish.tag}</span>
              <h3>{dish.name}</h3>
              <p>{dish.price}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-block partner-cta-section">
        <div>
          <span className="section-kicker">For restaurants</span>
          <h2>Turn dishes into video-first demand.</h2>
          <p>Partners get a dedicated dashboard for video uploads and session menu tracking.</p>
        </div>
        <Link className="primary-button" to="/partner">
          Explore Partner App
        </Link>
      </section>
    </>
  )
}

export default Home
