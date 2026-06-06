import { useState } from 'react'
import FoodCard from '../components/FoodCard'
import FoodForm from '../components/FoodForm'
import { getStoredPartnerFoods, setStoredPartnerFoods } from '../utils/authStorage'
import { useAuth } from '../utils/useAuth'

function CreateFood() {
  const [createdFood, setCreatedFood] = useState(null)
  const { auth } = useAuth()

  const handleCreated = (food) => {
    const partnerId = auth?.profile?._id
    const storedFoods = getStoredPartnerFoods(partnerId)
    setStoredPartnerFoods(partnerId, [food, ...storedFoods])
    setCreatedFood(food)
  }

  return (
    <section className="page-shell split-page create-food-page">
      <div className="page-copy">
        <span className="section-kicker">Create food</span>
        <h1>Upload a new food reel</h1>
        <p>The backend accepts name, description, and a video file for each food item.</p>
      </div>

      <div className="surface-panel">
        <FoodForm onCreated={handleCreated} />
      </div>

      {createdFood ? (
        <div className="created-preview">
          <h2>Latest upload</h2>
          <FoodCard food={createdFood} />
        </div>
      ) : null}
    </section>
  )
}

export default CreateFood
