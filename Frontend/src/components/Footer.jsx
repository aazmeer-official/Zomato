function Footer({ variant = 'default' }) {
  return (
    <footer className={`site-footer ${variant === 'partner' ? 'partner-footer' : ''}`}>
      <div>
        <p>{variant === 'partner' ? 'Zesty Partners' : 'Zesty'}</p>
        <span>{variant === 'partner' ? 'Restaurant tools for food reel uploads.' : 'A polished MERN food delivery frontend.'}</span>
      </div>
      <div className="footer-links" aria-label="Footer links">
        <a href={variant === 'partner' ? '/partner' : '/'}>{variant === 'partner' ? 'Partner Home' : 'Home'}</a>
        <a href={variant === 'partner' ? '/partner/login' : '/feed'}>{variant === 'partner' ? 'Login' : 'Feed'}</a>
        <a href={variant === 'partner' ? '/' : '/partner'}>{variant === 'partner' ? 'Food App' : 'For Partners'}</a>
      </div>
    </footer>
  )
}

export default Footer
