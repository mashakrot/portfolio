export const VIEW_W = 1280, VIEW_H = 1080
const ASSET_EXTENSIONS = ['.png', '.svg', '.webp', '.jpg', '.jpeg']
const SCALE = 6

const N = 6
const FS = 180 * SCALE
const WH = 67 * SCALE
const TOP = 75 * SCALE
const OX = VIEW_W / 2
const WORLD_H = FS * 3

const R = 0.2, SPEED = 2.2
const WALLC = ['#f6b93b', '#ea9f4a', '#d98a58']
const FLOORC = ['#c9a06a', '#b8c99a', '#b3a9c9']
const ROOM_W = 1280

// TODO: why do I have this?
const PAD_TOP = 7, PAD_BOTTOM = 4

const mk = (floor, x, y, w, d, h, color, extra = {}) => ({ floor, x, y, w, d, h, color, ...extra })

const OBJS = [
  mk(0, 4.8, -0.5, 1, 1, 155, '#a07850', { id: 'down', steps: 'x', opacity: 0, }),
  mk(0, -0.5, -0.5, 4.8, 0.7, 5, '#5a4a42', { opacity: 0 }),
  mk(0, -0.5, 0.6, 0.6, 0.9, 5, '#5a4a42', { opacity: 0 }),
  mk(0, -0.5, 4.9, 3.7, 0.5, 5, '#5a4a42', { opacity: 0 }),
  mk(0, -0.5, 1.8, 1.6, 3.9, 5, '#5a4a42', { opacity: 0 }),


  mk(0, 2.8, 3.4, 0.8, 1.3, 50, '#7a4a3a', { id: 'about', label: 'About', arrowColor: '#5a7a45', z: 80, reach: 1.3, opacity: 0 }),

  mk(0, 2, 2.5, 1.8, 3.2, 50, '#7a4a3a', { sprite: 'table1', ox: 72, oy: 9, opacity: 1 }),
  mk(0, 2.3, 1.1, 1.2, 0.9, 5, '#4f7a45', { sprite: 'chair', ox: -37, oy: 25, }),

  // second fl
  // TODO: 
  mk(1, 1, -0.5, 1, 1, 155, '#a07850', { id: 'up', steps: 'y', opacity: 0 }),
  // mk(1, 5, 0.3, 1.8, 1, 22, '#a07850', { id: 'down', label: 'Down', steps: 'x', sprite: 'stairs_down1' }),
  mk(1, -0.3, 3.8, 1, 1.4, 120, '#3c6e8b', {
    id: 'experience', label: 'Experience', opacity: 0, arrowColor: '#5a7a45', z: 80
  }),
  mk(1, -0.3, 0.3, 1, 1.7, 120, '#3c6e8b', {
    id: 'projects', label: 'Projects', opacity: 0, arrowColor: '#5a7a45', z: 80
  }),
  mk(1, -0.3, 2.5, 1.2, 3.2, 40, '#7a4a3a', { opacity: 0 }),
  mk(1, -0.3, -0.2, 1.2, 2.7, 40, '#7a4a3a', { opacity: 0, }),
  mk(1, 2.7, -0.3, 1.9, 2.5, 5, '#7a4a3a', { opacity: 0 }),
  mk(1, 4.6, -0.3, 1.2, 0.8, 5, '#5a4a42', { opacity: 0 }),


  // mk(2, 2.4, 2.4, 3.2, 2.4, 0, '#4a7a8a', { flat: true, sprite: 'rug1' }),
  // mk(2, 0.3, 1, 1, 2, 22, '#a07850', { id: 'up', label: 'Up', steps: 'y', sprite: 'stairs_up2' }),
  // mk(2, 3.8, 2.6, 1.8, 1.2, 14, '#8b3c5e', { id: 'contact', label: 'Contact', sprite: 'contact' }),
  // mk(2, 1.5, 5.2, 2.6, 1.2, 12, '#5a4a42', { sprite: 'sofa2' }),
  // mk(2, 6, 1, 0.6, 0.6, 26, '#4f7a45', { sprite: 'plant2' }),
  // mk(2, 2.8, 1.8, 3.4, 2.8, 0, '#7a4a6a', { flat: true, sprite: 'rug2' }),
]


const BASE = import.meta.env.BASE_URL + 'assets/'
const PLAYER = {
  cols: 4,
  rows: 4,
  fps: 8,
  scale: 0.4,

  animations: {
    idle: { row: 0, frames: 1 },
    forward: { row: 1, frames: 4 },
    right: { row: 2, frames: 4 },
    back: { row: 3, frames: 4 },
  },
}
const PLAYER_ROWS = {
  idle: 0,
  forward: 1,
  right: 2,
  back: 3,
}
const loadImg = (path) => new Promise((res) => {
  const i = new Image()
  i.onload = () => res(i)
  i.onerror = () => res(null)
  i.src = BASE + path
})
const loadAsset = async (folder, name) => {
  for (const ext of ASSET_EXTENSIONS) {
    const img = await loadImg(`${folder}/${name}${ext}`)
    if (img) return img
  }

  return null
}
async function loadAssets() {
  const A = { rooms: [], sprites: {}, player: null }

  await Promise.all([
    ...[0, 1, 2].map(async (f) => {
      A.rooms[f] = await loadAsset('rooms', `room${f}`)
    }),

    ...OBJS.map(async (o) => {
      A.sprites[o.sprite] = await loadAsset('furniture', o.sprite)
    }),

    loadAsset('', 'player').then((i) => {
      A.player = i
    }),
  ])

  return A
}
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))
const proj = (f, x, y, z = 0) => [
  Math.round(OX + (x - y) * 16 * SCALE),
  Math.round(f * FS + TOP + (x + y) * 8 * SCALE - z)
]
function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16)
  return `rgb(${[n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(Math.min(255, v * k)))})`
}
function poly(c, pts, fill) {
  c.fillStyle = fill; c.beginPath()
  pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)))
  c.closePath(); c.fill()
}
function box(c, f, x0, y0, x1, y1, h, col, z0 = 0) {
  const P = (x, y, z) => proj(f, x, y, z + z0)
  poly(c, [P(x0, y1, 0), P(x1, y1, 0), P(x1, y1, h), P(x0, y1, h)], shade(col, 0.85))
  poly(c, [P(x1, y0, 0), P(x1, y1, 0), P(x1, y1, h), P(x1, y0, h)], shade(col, 0.65))
  poly(c, [P(x0, y0, h), P(x1, y0, h), P(x1, y1, h), P(x0, y1, h)], shade(col, 1.1))
}
function drawPlaceholderObj(c, o) {
  if (!o.steps) return box(c, o.floor, o.x, o.y, o.x + o.w, o.y + o.d, o.h, o.color, o.z || 0)
  const n = 4
  for (let i = 0; i < n; i++) {
    const a = o.steps === 'x' ? [o.x + (o.w / n) * i, o.y, o.x + (o.w / n) * (i + 1), o.y + o.d] : [o.x, o.y + (o.d / n) * i, o.x + o.w, o.y + (o.d / n) * (i + 1)]
    box(c, o.floor, ...a, o.h * (1 - i / n), o.color)
  }
}
function drawPlaceholderRoom(c, f) {
  const P = (x, y, z = 0) => proj(f, x, y, z)
  poly(c, [P(0, 0), P(0, N), P(0, N, WH), P(0, 0, WH)], WALLC[f])
  poly(c, [P(0, 0), P(N, 0), P(N, 0, WH), P(0, 0, WH)], shade(WALLC[f], 0.85))
  poly(c, [P(0, N), P(N, N), P(N, N, -6), P(0, N, -6)], '#5a3a2a')
  poly(c, [P(N, 0), P(N, N), P(N, N, -6), P(N, 0, -6)], '#3f281c')
  for (let x = 0; x < N; x++) for (let y = 0; y < N; y++)
    poly(c, [P(x, y), P(x + 1, y), P(x + 1, y + 1), P(x, y + 1)], shade(FLOORC[f], (x + y) % 2 ? 1 : 0.94))
  poly(c, [P(4.5, 0, 18), P(6.5, 0, 18), P(6.5, 0, 36), P(4.5, 0, 36)], '#bfe3f2')
}

function drawSprite(c, o, img) {
  const [fx, fy] = proj(
    o.floor,
    o.x + o.w,
    o.y + o.d,
    o.z || 0
  )

  const w = img.naturalWidth
  const h = img.naturalHeight

  c.drawImage(
    img,
    fx - Math.round(w / 2) + (o.ox || 0),
    fy - h + (o.oy || 0),
    w,
    h
  )
}
function objRect(o, A) {
  const img = A.sprites[o.sprite]
  const z = o.z || 0
  const [fx, fy] = proj(o.floor, o.x + o.w, o.y + o.d, z)
  if (img) return { x: fx - Math.round(img.naturalWidth / 2) + (o.ox || 0), y: fy - img.naturalHeight + (o.oy || 0), w: img.naturalWidth, h: img.naturalHeight }
  const [lx] = proj(o.floor, o.x, o.y + o.d, z), [rx] = proj(o.floor, o.x + o.w, o.y, z), [, ty] = proj(o.floor, o.x, o.y, o.h + z)
  return { x: lx, y: ty, w: rx - lx, h: fy - ty }
}
function drawObj(c, o, A) {
  const img = A.sprites[o.sprite]

  c.save()
  c.globalAlpha = o.opacity ?? 1

  if (img) drawSprite(c, o, img)
  else drawPlaceholderObj(c, o)

  c.restore()
}
function drawRoom(c, f, A) {
  const shell = A.rooms[f]

  if (shell) {
    const w = ROOM_W
    const h = shell.height * (w / shell.width)

    c.drawImage(
      shell,
      Math.round(OX - w / 2),
      f * FS,
      w,
      h
    )
  } else {
    drawPlaceholderRoom(c, f)
  }
  for (const o of OBJS) {
    if (o.floor !== f || !o.flat) continue
    const img = A.sprites[o.sprite], P = (x, y) => proj(f, x, y)
    if (img) drawSprite(c, o, img)
    else if (!shell) poly(c, [P(o.x, o.y), P(o.x + o.w, o.y), P(o.x + o.w, o.y + o.d), P(o.x, o.y + o.d)], o.color)
  }
}

export class Game {
  constructor(canvas, { onInteract, onNear }) {
    this.ctx = canvas.getContext('2d')
    this.ctx.imageSmoothingEnabled = false
    this.onInteract = onInteract
    this.onNear = onNear
    this.p = {
      x: 1,
      y: 1,
      floor: 0,
      dir: 'forward',
      flip: false,
    }
    this.keys = new Set()
    this.virtual = { x: 0, y: 0 }
    this.paused = false
    this.near = null
    this.t = 0
    this.cam = 0
    this.moving = false
    this.assets = { rooms: [], sprites: {}, player: null }
    this.debug = false // press H to show footprints
    this.dead = false
    this.seen = new Set()
    this.onKeyDown = (e) => {
      if (this.paused) return
      const k = e.key.toLowerCase()
      if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' '].includes(k)) e.preventDefault()
      if (k === 'h') { this.debug = !this.debug; return }
      if (k === 'e' || k === 'enter' || k === ' ') return this.interact()
      this.keys.add(k)
    }
    this.onKeyUp = (e) => this.keys.delete(e.key.toLowerCase())
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)


    this.canvas = canvas
    this.free = false
    this.camGoal = 0
    const toWorld = (e) => {
      const r = canvas.getBoundingClientRect()
      return [(e.clientX - r.left) * VIEW_W / r.width, (e.clientY - r.top) * VIEW_H / r.height + this.cam]
    }
    let drag = null
    this.onDown = (e) => { drag = { y: e.clientY, cam: this.cam, moved: false }; canvas.setPointerCapture(e.pointerId) }
    this.onMove = (e) => {
      if (!drag) { canvas.style.cursor = this.hitTest(...toWorld(e)) ? 'pointer' : 'default'; return }
      const dy = e.clientY - drag.y
      if (Math.abs(dy) > 6) drag.moved = true
      if (drag.moved) this.scrollTo(drag.cam - dy * VIEW_H / canvas.clientHeight)
    }
    this.onUp = (e) => {
      if (drag && !drag.moved && !this.paused) {
        const o = this.hitTest(...toWorld(e))
        if (o) {
          if (o.id === 'up' || o.id === 'down') this.useStairs(o)
          else { this.seen.add(o.id); this.onInteract(o.id) }
        }
      }
      drag = null
    }
    this.onWheel = (e) => {
      if (this.paused) return
      e.preventDefault()
      this.scrollTo((this.free ? this.camGoal : this.cam) + e.deltaY * VIEW_H / canvas.clientHeight)
    }
    canvas.addEventListener('pointerdown', this.onDown)
    canvas.addEventListener('pointermove', this.onMove)
    canvas.addEventListener('pointerup', this.onUp)
    canvas.addEventListener('wheel', this.onWheel, { passive: false })
  }

  async start() {
    this.assets = await loadAssets()
    if (this.dead) return
    let last = performance.now()
    const frame = (now) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      this.update(dt)
      this.draw()
      this.raf = requestAnimationFrame(frame)
    }
    this.raf = requestAnimationFrame(frame)
  }
  scrollTo(y) { this.free = true; this.camGoal = clamp(y, -PAD_TOP, WORLD_H - VIEW_H + PAD_BOTTOM) }

  hitTest(x, y) {
    let best = null
    for (const o of OBJS) {
      // if (!o.id || o.id === 'up' || o.id === 'down') continue
      if (!o.id) continue
      const r = objRect(o, this.assets)
      if (x < r.x || x > r.x + r.w || y < r.y || y > r.y + r.h) continue
      if (!best || o.x + o.y + o.w + o.d > best.x + best.y + best.w + best.d) best = o
    }
    return best
  }

  destroy() {
    this.dead = true
    cancelAnimationFrame(this.raf)
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keyup', this.onKeyUp)

    this.canvas.removeEventListener('pointerdown', this.onDown)
    this.canvas.removeEventListener('pointermove', this.onMove)
    this.canvas.removeEventListener('pointerup', this.onUp)
    this.canvas.removeEventListener('wheel', this.onWheel)

  }

  setPaused(v) { this.paused = v; if (v) { this.keys.clear(); this.virtual = { x: 0, y: 0 } } }
  setVirtual(x, y) { this.virtual = { x, y } }

  useStairs(o) {
    const p = this.p
    if (o.id === 'down') { p.floor = o.floor + 1; p.x = 2.3; p.y = 1 }
    else if (o.id === 'up') { p.floor = o.floor - 1; p.x = 5.5; p.y = 1 }
    this.free = false
  }

  // interact() {
  //   const p = this.p, id = this.near
  //   if (this.paused || !id) return
  //   if (id === 'down') { p.floor++; p.x = 2.3; p.y = 1 }
  //   else if (id === 'up') { p.floor--; p.x = 5.5; p.y = 1 }
  //   else { this.seen.add(id); this.onInteract(id) }
  // }

  interact() {
    const id = this.near
    if (this.paused || !id) return
    const o = OBJS.find((o) => o.id === id && o.floor === this.p.floor)
    if (id === 'down' || id === 'up') this.useStairs(o)
    else { this.seen.add(id); this.onInteract(id) }
  }

  hits(p) {
    return OBJS.some((o) =>
      o.floor === p.floor && !o.flat &&
      p.x + R > o.x && p.x - R < o.x + o.w &&
      p.y + R > o.y && p.y - R < o.y + o.d)
  }

  move(dx, dy) { // axis-separated, so you still slide along walls
    const p = this.p
    const stuck = this.hits(p) // already overlapping? let them walk out

    const ox = p.x
    p.x = clamp(p.x + dx, R, N - R)
    if (!stuck && this.hits(p)) p.x = ox

    const oy = p.y
    p.y = clamp(p.y + dy, R, N - R)
    if (!stuck && this.hits(p)) p.y = oy
  }

  update(dt) {
    const p = this.p, k = this.keys, v = this.virtual
    this.moving = false
    if (!this.paused) {
      const key = (...n) => n.some((x) => k.has(x))
      const sx = clamp((key('d', 'arrowright') ? 1 : 0) - (key('a', 'arrowleft') ? 1 : 0) + v.x, -1, 1)
      const sy = clamp((key('s', 'arrowdown') ? 1 : 0) - (key('w', 'arrowup') ? 1 : 0) + v.y, -1, 1)
      if (sx || sy) { // screen direction -> grid direction (iso rotation)
        this.free = false
        let gx = sx + sy, gy = sy - sx


        const l = Math.hypot(gx, gy); gx /= l; gy /= l
        this.moving = true; this.t += dt
        if (sy < 0) {
          p.dir = 'back'
          p.flip = false
        } else if (sy > 0) {
          p.dir = 'forward'
          p.flip = false
        } else if (sx > 0) {
          p.dir = 'right'
          p.flip = false
        } else if (sx < 0) {
          p.dir = 'right'
          p.flip = true
        }

        this.move(gx * SPEED * dt, 0)
        this.move(0, gy * SPEED * dt)
      }
    }
    const near = OBJS.find((o) => {
      if (!o.id || o.floor !== p.floor) return false
      const m = o.reach ?? 0.7   // per-object activation distance
      return p.x > o.x - m && p.x < o.x + o.w + m &&
        p.y > o.y - m && p.y < o.y + o.d + m
    })
    const id = near ? near.id : null
    if (id !== this.near) { this.near = id; this.onNear(id) }
    // const target = clamp(proj(p.floor, p.x, p.y)[1] - VIEW_H * 0.55, 0, WORLD_H - VIEW_H)
    // this.cam += (target - this.cam) * Math.min(1, dt * 6)

    const follow = clamp(proj(p.floor, p.x, p.y)[1] - VIEW_H * 0.55, -PAD_TOP, WORLD_H - VIEW_H + PAD_BOTTOM)
    this.cam += ((this.free ? this.camGoal : follow) - this.cam) * Math.min(1, dt * 6)
  }

  drawPlayer(c) {
    const p = this.p
    const [sx, sy] = proj(p.floor, p.x, p.y)
    const img = this.assets.player

    let top = 20 * SCALE

    if (img) {
      const frameW = img.naturalWidth / PLAYER.cols
      const frameH = img.naturalHeight / PLAYER.rows

      const anim =
        PLAYER.animations[p.dir] ??
        PLAYER.animations.idle

      const frame = this.moving
        ? Math.floor(this.t * PLAYER.fps) % anim.frames
        : 0

      const sourceX = frame * frameW
      const sourceY = anim.row * frameH

      // Scale the sprite for your game's resolution
      const destW = frameW * PLAYER.scale
      const destH = frameH * PLAYER.scale

      top = destH

      c.save()
      c.translate(sx, sy)

      if (p.flip) {
        c.scale(-1, 1)
      }

      c.drawImage(
        img,
        sourceX,
        sourceY,
        frameW,
        frameH,
        -destW / 2,
        -destH,
        destW,
        destH
      )

      c.restore()
    }

    if (this.near) {
      // c.fillStyle = '#fff'
      // c.fillRect(
      //   sx - 5,
      //   sy - top - 140,
      //   10,
      //   10
      // )

      c.fillStyle = '#ffffff'
      c.font = `${5 * SCALE}px monospace`
      c.textAlign = 'center'
      c.fillText(
        'press E',
        sx,
        sy - top - 6
      )
    }
  }


  draw() {
    const c = this.ctx, p = this.p
    c.fillStyle = '#eadbbc'; c.fillRect(0, 0, VIEW_W, VIEW_H)
    c.save()
    c.translate(0, -Math.round(this.cam))
    c.font = `${4 * SCALE}px monospace`; c.textAlign = 'center'
    // TODO: adjust number of rooms
    for (let f = 0; f < 3; f++) {
      drawRoom(c, f, this.assets)
      // painter's algorithm: back to front; the player is drawn just before the first object it is behind

      const list = OBJS
        .filter((o) => o.floor === f && !o.flat)
        .sort((a, b) => {
          const depthA = a.x + a.y + a.w + a.d
          const depthB = b.x + b.y + b.w + b.d
          return depthA - depthB
        })

      // let done = p.floor !== f
      // for (const o of list) {
      //   // draw the player just before the first object he is behind
      //   if (!done && (p.x < o.x || p.y < o.y)) { this.drawPlayer(c); done = true }
      //   drawObj(c, o, this.assets)
      // }
      const behind = [], front = []
      for (const o of list) {
        // player is behind o if he's further back on either axis
        (p.floor === f && (p.x < o.x || p.y < o.y) ? front : behind).push(o)
      }
      for (const o of behind) drawObj(c, o, this.assets)
      if (p.floor === f) this.drawPlayer(c)
      for (const o of front) drawObj(c, o, this.assets)


      for (const o of list) {
        if (!o.id || o.id === 'up' || o.id === 'down' || this.seen.has(o.id)) continue
        const r = objRect(o, this.assets)
        // const x = r.x + r.w / 2, y = r.y - 6 * SCALE + Math.sin(performance.now() / 250) * 3 * SCALE
        // poly(c, [[x - 4 * SCALE, y - 6 * SCALE], [x + 4 * SCALE, y - 6 * SCALE], [x, y]], '#c4553a')
        const bob = Math.sin(performance.now() / 250) * 3 * SCALE
        const height = (o.arrowHeight ?? 6) * SCALE

        const x = r.x + r.w / 2 + (o.arrowX ?? 0) * SCALE
        const y = r.y - height + bob
        const size = 4 * SCALE

        poly(c, [
          [x - size, y - 6 * SCALE],
          [x + size, y - 6 * SCALE],
          [x, y]
        ], o.arrowColor ?? '#c4553a')
        // down-pointing arrow
      }


      if (this.debug) for (const o of OBJS) { // footprints: magenta = solid, cyan = flat
        if (o.floor !== f) continue
        c.strokeStyle = o.flat ? '#0ff' : '#f0f'; c.lineWidth = 1; c.beginPath()
          ;[[o.x, o.y], [o.x + o.w, o.y], [o.x + o.w, o.y + o.d], [o.x, o.y + o.d]].forEach(([x, y], i) => { const [a, b] = proj(f, x, y); i ? c.lineTo(a, b) : c.moveTo(a, b) })
        c.closePath(); c.stroke()
      }
      for (const o of list) if (o.label) { // floating labels
        const [lx, ly] = proj(f, o.x + o.w / 2, o.y + o.d / 2, o.h + 160)
        c.strokeStyle = '#000'; c.lineWidth = 2; c.strokeText(o.label, lx, ly)
        c.fillStyle = '#fff'; c.fillText(o.label, lx, ly)
      }
    }
    c.restore()
  }
}
