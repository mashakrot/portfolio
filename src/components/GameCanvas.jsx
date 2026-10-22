import { useEffect, useRef } from 'react'
import { Game, VIEW_W, VIEW_H } from '../game/engine.js'

export default function GameCanvas({ paused, onOpen }) {
  const canvasRef = useRef(null)
  const gameRef = useRef(null)
  const openRef = useRef(onOpen)
  openRef.current = onOpen

  useEffect(() => {
    const canvas = canvasRef.current
    // TODO: change to *3
    const DISPLAY_W = 320*2.5
    const DISPLAY_H = 280*2.5
    const fit = () => { // whole-number scaling keeps pixels crisp
      const s = Math.max(1, Math.floor(Math.min(window.innerWidth / DISPLAY_W, (window.innerHeight - 64) / DISPLAY_H)))
      canvas.style.width = DISPLAY_W * s + 'px'
      canvas.style.height = DISPLAY_H * s + 'px'
    }
    fit()
    window.addEventListener('resize', fit)
    const game = new Game(canvas, { onInteract: (id) => openRef.current(id), onNear: () => {} })
    gameRef.current = game
    game.start()
    return () => { window.removeEventListener('resize', fit); game.destroy() }
  }, [])

  useEffect(() => { gameRef.current?.setPaused(paused) }, [paused])

  const hold = (x, y) => ({
    onPointerDown: (e) => { e.preventDefault(); gameRef.current?.setVirtual(x, y) },
    onPointerUp: () => gameRef.current?.setVirtual(0, 0),
    onPointerLeave: () => gameRef.current?.setVirtual(0, 0),
  })

  return (
    <div className="stage">
      <canvas ref={canvasRef} width={VIEW_W} height={VIEW_H} className="game" />
      <div className="touch">
        <div className="dpad">
          <button className="up" {...hold(0, -1)}>▲</button>
          <button className="left" {...hold(-1, 0)}>◀</button>
          <button className="right" {...hold(1, 0)}>▶</button>
          <button className="down" {...hold(0, 1)}>▼</button>
        </div>
        <button className="act" onClick={() => gameRef.current?.interact()}>E</button>
      </div>
      <p className="hint">WASD / arrows to walk, E to interact (stairs too)</p>
    </div>
  )
}
