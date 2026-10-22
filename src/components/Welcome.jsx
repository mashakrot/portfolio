import { useEffect, useRef, useState } from 'react'

// TODO: check on phone
const touch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
const PAGES = [
  'Hei! My name is Marija. Welcome to my place!',
  touch
    ? 'Use the arrows on the screen to walk around and the E button to look closer at things. Stairs take you to the next floor.'
    : 'To walk around use W A S D or the arrow keys. Press E (or click an object) to look closer. Stairs take you to the next floor, and the menu on top works too.',
]
const MS_PER_CHAR = 25

export default function Welcome({ onClose }) {
  const [page, setPage] = useState(0)
  const [n, setN] = useState(0)
  const [portraitOk, setPortraitOk] = useState(true)
  const text = PAGES[page]
  const done = n >= text.length
  const last = page === PAGES.length - 1

  // typewriter effect (instant if the user prefers reduced motion)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return setN(text.length)
    setN(0)
    const id = setInterval(() => setN((v) => (v >= text.length ? v : v + 1)), MS_PER_CHAR)
    return () => clearInterval(id)
  }, [text])

  const next = () => {
    if (!done) return setN(text.length) // first press finishes the line
    last ? onClose() : setPage(page + 1)
  }

  // keyboard: Enter / Space = continue, Esc = skip
  const nextRef = useRef(next)
  nextRef.current = next
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); nextRef.current() }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  return (
    <div className="dialog-overlay" onClick={next}>
      <div className="dialog" role="dialog" aria-label="Welcome">
        <span className="dialog-name">Marija</span>
        <div className="portrait">
          {portraitOk
            ? <img src={`${import.meta.env.BASE_URL}assets/portrait.png`} alt="Portrait of Marija" onError={() => setPortraitOk(false)} />
            : <span aria-hidden="true">M</span>}
        </div>
        <div className="dialog-main">
          <p className="dialog-text">{text.slice(0, n)}</p>
          <div className="dialog-actions">
            <button className="skip" onClick={(e) => { e.stopPropagation(); onClose() }}>Skip</button>
            {done && <button className="dialog-btn" onClick={(e) => { e.stopPropagation(); next() }}>{last ? "Let's go!" : 'Next'} ▶</button>}
          </div>
        </div>
      </div>
    </div>
  )
}