export function PageLoader({ label = 'Loading...' }) {
  return (
    <div className="page-loader" role="status">
      <span />
      <p>{label}</p>
    </div>
  )
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <div className="food-grid" aria-label="Loading food cards">
      {Array.from({ length: count }).map((_, index) => (
        <div className="food-card skeleton-card" key={index}>
          <div className="food-video-frame video-skeleton" />
          <div className="food-card-body">
            <span />
            <h3 />
            <p />
          </div>
        </div>
      ))}
    </div>
  )
}
