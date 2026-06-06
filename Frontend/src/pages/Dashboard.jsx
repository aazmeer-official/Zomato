import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import FoodCard from '../components/FoodCard'
import FoodForm from '../components/FoodForm'
import { getStoredPartnerFoods, setStoredPartnerFoods } from '../utils/authStorage'
import { useAuth } from '../utils/useAuth'

function Dashboard() {
  const { auth } = useAuth()
  const partner = auth?.profile
  const [partnerFoods, setPartnerFoods] = useState(() => getStoredPartnerFoods(partner?._id))
  const activeVideos = partnerFoods.filter((food) => Boolean(food.video)).length
  const stats = [
    { label: 'Total Uploads', value: partnerFoods.length },
    { label: 'Active Videos', value: activeVideos },
    { label: 'Session Items', value: partnerFoods.length },
  ]

  const handleCreated = (food) => {
    const nextFoods = [food, ...partnerFoods]
    setPartnerFoods(nextFoods)
    setStoredPartnerFoods(partner?._id, nextFoods)
  }

  return (
    <section className="dashboard-shell">
      <aside className="dashboard-sidebar">
        <div>
          <span className="section-kicker">Partner</span>
          <h2>{partner?.fullName}</h2>
          <p>{partner?.email}</p>
        </div>
        <nav aria-label="Dashboard sections">
          <a href="#overview">Overview</a>
          <a href="#add-food">Add Food</a>
          <a href="#uploads">Uploads</a>
        </nav>
      </aside>

      <div className="dashboard-content">
        <header className="dashboard-topline" id="overview">
          <div>
            <span className="section-kicker">Dashboard</span>
            <h1>Menu operations</h1>
            <p>Upload food reels and monitor what this session has created.</p>
          </div>
        </header>

        <div className="stats-grid">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </div>

        <div className="dashboard-work-grid">
          <section className="surface-panel add-food-panel" id="add-food">
            <div className="panel-heading">
              <span className="section-kicker">Add food</span>
              <h2>Publish a new reel</h2>
              <p>Fields match the backend model exactly: name, description, and video.</p>
            </div>
            <FoodForm onCreated={handleCreated} />
          </section>

          <aside className="profile-panel">
            <h2>Account</h2>
            <dl>
              <div>
                <dt>Partner ID</dt>
                <dd>{partner?._id}</dd>
              </div>
              <div>
                <dt>Name</dt>
                <dd>{partner?.fullName}</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>{partner?.email}</dd>
              </div>
            </dl>
          </aside>
        </div>

        <section className="uploads-section" id="uploads">
          <div className="section-heading">
            <span className="section-kicker">Uploaded foods</span>
            <h2>Session-created food reels</h2>
            <p>These are stored locally after the backend confirms creation because no partner-foods API exists yet.</p>
          </div>

          {partnerFoods.length ? (
            <div className="food-grid compact-grid">
              {partnerFoods.map((food, index) => (
                <FoodCard food={food} index={index} key={food._id || `${food.name}-${index}`} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No uploads in this session"
              message="Create your first reel from the upload panel and it will appear here."
            />
          )}
        </section>
      </div>
    </section>
  )
}

export default Dashboard
