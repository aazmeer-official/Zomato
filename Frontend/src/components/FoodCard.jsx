import { useEffect, useRef, useState } from 'react'

function FoodCard({ food, index = 0, variant = 'card' }) {
  const [isVideoReady, setIsVideoReady] = useState(false)
  const [hasVideoError, setHasVideoError] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef(null)
  const cardRef = useRef(null)

  const isReel = variant === 'reel'
  const animationDelay = `${Math.min(index * 80, 480)}ms`
  const title = food?.name || 'Untitled food'
  const description = food?.description || 'No description available.'

  useEffect(() => {
    if (!isReel || !cardRef.current || !videoRef.current) {
      return undefined
    }

    const currentCard = cardRef.current
    const currentVideo = videoRef.current

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          currentVideo.play().catch(() => undefined)
          return
        }

        currentVideo.pause()
      },
      {
        root: document.querySelector('.reels-layout'),
        threshold: 0.68,
      },
    )

    observer.observe(currentCard)

    return () => {
      observer.unobserve(currentCard)
      currentVideo.pause()
    }
  }, [isReel])

  const handleVideoClick = () => {
    if (!isReel || !videoRef.current) {
      return
    }

    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => undefined)
    } else {
      videoRef.current.pause()
    }
  }

  return (
    <article ref={cardRef} className={`food-card${isReel ? ' reel-card' : ''}`} style={{ animationDelay }}>
      <div className={`food-video-frame${isReel ? ' reel-video-frame' : ''}`}>
        {!isVideoReady && !hasVideoError ? <div className="video-skeleton" /> : null}

        {food?.video && !hasVideoError ? (
          <video
            ref={videoRef}
            src={food.video}
            autoPlay={isReel}
            controls={!isReel}
            muted={isMuted}
            loop
            playsInline
            preload={isReel ? 'auto' : 'metadata'}
            onCanPlay={() => setIsVideoReady(true)}
            onError={() => setHasVideoError(true)}
            onClick={handleVideoClick}
          />
        ) : (
          <div className="video-fallback">
            <span>Video unavailable</span>
          </div>
        )}
      </div>

      <div className={`food-card-body${isReel ? ' reel-overlay' : ''}`}>
        <span className="food-pill">Food reel</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      {isReel && food?.video && !hasVideoError ? (
        <div className="reel-actions" aria-label="Reel actions">
          <button type="button" onClick={() => setIsMuted((currentValue) => !currentValue)}>
            {isMuted ? 'Muted' : 'Sound'}
          </button>
          <span>{index + 1}</span>
        </div>
      ) : null}
    </article>
  )
}

export default FoodCard
