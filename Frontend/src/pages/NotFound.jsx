import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <section className="page-shell not-found-page">
      <span className="section-kicker">404</span>
      <h1>Page not found</h1>
      <p>The route you opened is not part of this food delivery frontend.</p>
      <Link className="primary-button" to="/">
        Back Home
      </Link>
    </section>
  )
}

export default NotFound
