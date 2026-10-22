import { useState } from 'react'
import GameCanvas from './components/GameCanvas.jsx'
import Modal from './components/Modal.jsx'
import Welcome from './components/Welcome.jsx'
import RoomDecor from './components/RoomDecor.jsx'
import { SpotifyPlayerProvider } from './components/SpotifyPlayerContext.jsx'
import { CONTENT } from './content.js'

const LINKS = ['about', 'projects', 'experience', 'education', 'contact']

// TODO: main. change projects section, add rooms, change character, think about RoomDecor, make about me more interactive and fun,  work on pixel art of rooms 

export default function App() {
  const [open, setOpen] = useState(null)
  const [welcome, setWelcome] = useState(true)

  return (
    <SpotifyPlayerProvider>
      <>
      <header className="nav">
        <nav className="pill" aria-label="Main">
          <div className="logo">Ma<span id="logo2">.Kro</span></div>
          {LINKS.map((id) => (
            <button key={id} data-id={id} className={open === id ? 'active' : ''} onClick={() => setOpen(id)}>{id}</button>
          ))}
        </nav>
      </header>

      <main>
        <div className="room-scene">
          {/* <RoomDecor /> */}

          <GameCanvas
            paused={!!open || welcome}
            onOpen={(id) => CONTENT[id] && setOpen(id)}
          />
        </div>
      </main>

      {open && <Modal id={open} onClose={() => setOpen(null)} />}
      {welcome && <Welcome onClose={() => setWelcome(false)} />}
      {!welcome && !open && (
        <button className="help-btn" onClick={() => setWelcome(true)} aria-label="Show the welcome message" title="Show intro">?</button>
      )}
      </>
    </SpotifyPlayerProvider>
  )
}