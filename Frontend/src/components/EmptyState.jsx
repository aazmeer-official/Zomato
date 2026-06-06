function EmptyState({ title, message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-mark" aria-hidden="true">
        --
      </div>
      <h3>{title}</h3>
      {message ? <p>{message}</p> : null}
      {action ? <div className="empty-action">{action}</div> : null}
    </div>
  )
}

export default EmptyState
