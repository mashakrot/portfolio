// Shared retro-window pieces used by every popup (About, Projects, Experience, ...).
// Tab ids must match the keys of CONTENT in content.js.
// `short` is the label used on very narrow screens so all tabs fit in one row.

export const TABS = [
  { id: 'about', label: 'About', short: 'about' },
  { id: 'projects', label: 'Projects', short: 'projects' },
  { id: 'experience', label: 'Experience', short: 'work' },
  { id: 'education', label: 'Education', short: 'school' },
  { id: 'contact', label: 'Contact', short: 'contact' },
]

export function WindowBar({ address, onClose }) {
  return (
    <div className="win-bar">
      <span className="win-dots">
        <button className="win-dot" onClick={onClose} aria-label="Close" title="Close" />
        <span className="win-dot" aria-hidden="true" />
        <span className="win-dot" aria-hidden="true" />
      </span>
      <span className="win-nav" aria-hidden="true">‹ ›</span>
      <div className="win-address">{address}</div>
    </div>
  )
}

export function WindowTabs({ active, onTab }) {
  return (
    <div className="win-tabs" role="tablist">
      {TABS.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={t.id === active}
          className={`win-tab${t.id === active ? ' active' : ''}`}
          onClick={() => onTab?.(t.id)}
        >
          <span className="tab-full">{t.label}</span>
          <span className="tab-short" aria-hidden="true">{t.short}</span>
        </button>
      ))}
    </div>
  )
}

// bar + tabs in one sticky block so the tabs stay reachable while the page scrolls
export function WindowHeader({ address, active, onClose, onTab }) {
  return (
    <div className="win-head">
      <WindowBar address={address} onClose={onClose} />
      <WindowTabs active={active} onTab={onTab} />
    </div>
  )
}