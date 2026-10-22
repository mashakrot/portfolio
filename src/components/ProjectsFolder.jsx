import { WindowHeader } from './Windowchrome.jsx'

// Projects popup: the same retro window as About (win-bar + win-tabs),
// with an open folder of mixed papers as its content.
// Reads CONTENT.projects.body as-is. Optional per-project fields:
//   img:  'path/to/cover.png'   -> real cover image (otherwise a pixel-pattern cover is generated)
//   kind: 'hero' | 'dark' | 'polaroid' | 'ticket' | 'lined' | 'strip' | 'plain'

const LAYOUTS = [
  ['hero', 'polaroid', 'ticket', 'strip', 'strip'], // group 1
//   ['dark', 'polaroid', 'lined', 'strip'],  // group 2old
  ['dark', 'polaroid', 'lined', 'lined', 'polaroid'],  // group 2
]

const WIDE = new Set(['hero', 'dark', 'strip'])
const HAS_COVER = new Set(['hero', 'dark', 'polaroid', 'strip'])
const HAS_CLIP = new Set(['plain', 'lined', 'strip'])

const initials = (name) =>
  name.split(/\s+/).filter((w) => /^[a-z]/i.test(w)).slice(0, 2).map((w) => w[0].toUpperCase()).join('')

function Card({ p, kind, tone }) {
  const cover = HAS_COVER.has(kind) && (
    <div className={`pf-cover pf-tone-${tone}`}>
      {p.img
        ? <img src={p.img} alt="" loading="lazy" />
        : <span className="pf-glyph" aria-hidden="true">{initials(p.name)}</span>}
    </div>
  )

  const inner = (
    <>
      {HAS_CLIP.has(kind) && <span className="pf-clip" aria-hidden="true" />}
      {cover}
      <div className="pf-body">
        <h4>
          {p.name}
          {p.href && <span className="pf-arrow" aria-hidden="true"> ↗</span>}
        </h4>
        <p>{p.description}</p>
        <div className="pf-tags">
          {p.tech.map((t) => (
            <span className="pf-tag" key={t}>{t}</span>
          ))}
        </div>
      </div>
    </>
  )

  const cls = `pf-card pf-card--${kind}${WIDE.has(kind) ? ' pf-wide' : ''}`
  return p.href ? (
    <a className={cls} href={p.href} target="_blank" rel="noopener noreferrer"
       aria-label={`${p.name} (opens in a new tab)`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  )
}

export default function ProjectsFolder({ body, onClose, onTab }) {
  const groups = body.filter((b) => b.projects)
  const more = body.find((b) => b.links)
  let n = 0

  return (
    <div className="win pf">
      <WindowHeader address="marija.dev/projects" active="projects" onClose={onClose} onTab={onTab} />

      <div className="pf-folder">
        {groups.map((g, gi) => {
          const layout = LAYOUTS[gi] || LAYOUTS[0]
          return (
            <section className={`pf-page pf-page--${gi === 0 ? 'left' : 'right'}`} key={g.h}>
              <h3 className="pf-label">{g.h}</h3>
              <div className="pf-stack">
                {g.projects.map((p, i) => (
                  <Card key={p.name} p={p} kind={p.kind || layout[i % layout.length]} tone={n++ % 4} />
                ))}
              </div>

              {more && gi === groups.length - 1 && (
                <aside className="pf-note">
                  <h3>Explore more</h3>
                  <p>{more.text}</p>
                  <div className="pf-note-links">
                    {more.links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer">
                        {l.label} ↗
                      </a>
                    ))}
                  </div>
                </aside>
              )}
            </section>
          )
        })}
      </div>
    </div>
  )
}