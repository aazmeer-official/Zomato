import { Link } from 'react-router-dom'

const partnerBenefits = [
  {
    title: 'Video-first menu',
    text: 'Upload dishes as short reels using the existing multipart food API.',
  },
  {
    title: 'Session dashboard',
    text: 'Track uploads created during this browser session with clean stats.',
  },
  {
    title: 'Food app visibility',
    text: 'Approved food items flow into the protected customer feed.',
  },
]

function PartnerLanding() {
  return (
    <section className="partner-landing">
      <div className="partner-hero">
        <div className="partner-hero-copy">
          <span className="section-kicker">For Partners</span>
          <h1>Grow with short food videos.</h1>
          <p>Give every dish a visual moment. Zesty Partners helps restaurants and creators upload food reels directly into the MERN backend.</p>
          <div className="hero-actions">
            <Link className="partner-primary-button" to="/partner/register">
              Start selling
            </Link>
            <Link className="partner-ghost-button" to="/partner/login">
              Partner Login
            </Link>
          </div>
        </div>

        <div className="partner-hero-card" aria-label="Partner dashboard preview">
          <span>Today's menu health</span>
          <strong>92%</strong>
          <p>Videos ready for discovery</p>
          <div className="partner-card-bars">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="partner-benefit-grid">
        {partnerBenefits.map((benefit, index) => (
          <article className="partner-benefit-card" key={benefit.title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h2>{benefit.title}</h2>
            <p>{benefit.text}</p>
          </article>
        ))}
      </div>

      <div className="partner-start-panel">
        <div>
          <span className="section-kicker">Ready</span>
          <h2>Set up your partner account and publish your first reel.</h2>
        </div>
        <Link className="partner-primary-button" to="/partner/register">
          Start selling
        </Link>
      </div>
    </section>
  )
}

export default PartnerLanding
