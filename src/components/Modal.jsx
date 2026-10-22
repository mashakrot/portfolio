import { useEffect, useState } from 'react'
import { CONTENT } from '../content.js'
import AboutWindow from './AboutWindow.jsx'
import ProjectsFolder from './ProjectsFolder.jsx'
import { WindowHeader } from './Windowchrome.jsx'
import { FaGlobe, FaLinkedin, FaKaggle, FaGithub, FaEnvelope, FaTelegram } from 'react-icons/fa'

const ICONS = { linkedin: FaLinkedin, kaggle: FaKaggle, github: FaGithub, email: FaEnvelope, telegram: FaTelegram }
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g

// Renders text with [label](url) links
function Inline({ text }) {
  const parts = []
  let last = 0
  for (const m of text.matchAll(LINK)) {
    parts.push(text.slice(last, m.index))
    parts.push(<a key={m.index} href={m[2]} target="_blank" rel="noopener noreferrer">{m[1]}</a>)
    last = m.index + m[0].length
  }
  parts.push(text.slice(last))
  return <>{parts}</>
}


function Block({ b, onClose, onTab }) {
  if (typeof b === 'string') {
    return <p><Inline text={b} /></p>
  }
  if (b.window) return <AboutWindow data={b.window} onClose={onClose} onTab={onTab} />

  // Handle tags BEFORE b.h, because tag groups also have headings
  if (b.tags) {
    return (
      <section className="about-group">
        <h3>{b.h}</h3>
        <div className="about-tags">
          {b.tags.map((tag) => (
            <span className="about-tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </section>
    )
  }

  // Handle the contact/CTA block
  if (b.text) {
    return (
      <p className="about-cta">
        <strong>{b.h}</strong>
        <br />
        {b.text}
      </p>
    )
  }

  if (b.bullets) {
    return (
      <section className="experience-entry">
        <div className="experience-marker" />
        <div className="experience-content">
          <p className="sub">{b.sub}</p>
          <h3>{b.h}</h3>
          <p className="experience-company">{b.company}</p>
          <ul>
            {b.bullets.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className="project-tags">
            {b.tech.map((tag) => (
              <span className="project-tag" key={tag}>{tag}</span>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Education entries and regular headings
  if (b.h) {
    return (
      <div className={`education-entry ${b.logo ? 'has-logo' : ''}`}>
        {b.logo && (
          <img
            className="education-logo"
            src={b.logo}
            alt=""
            aria-hidden="true"
          />
        )}

        <div className="education-info">
          {b.uni && <p className="education-uni">{b.uni}</p>}
          <h3>{b.h}</h3>
          {b.sub && <p className="sub">{b.sub}</p>}
        </div>
      </div>
    )
  }

  if (b.list) {
    return (
      <ul>
        {b.list.map((t, i) => (
          <li key={i}><Inline text={t} /></li>
        ))}
      </ul>
    )
  }

  if (b.icons) {
    return (
      <div className="icon-links">
        {b.icons.map(({ label, icon, href }) => {
          const Icon = ICONS[icon]
          const external = href.startsWith('http')

          return (
            <a
              key={label}
              className="icon-link"
              href={href}
              title={label}
              aria-label={label}
              {...(external && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            >
              {Icon && <Icon aria-hidden="true" />}
              <span>{label}</span>
            </a>
          )
        })}
      </div>
    )
  }

  return null
}


// Experience / Education / Contact: same window frame, blocks rendered in one column
function PageWindow({ id, address, body, onClose, onTab }) {
  return (
    <div className="win">
      <WindowHeader address={address ?? `marija.dev/${id}`} active={id} onClose={onClose} onTab={onTab} />
      <div className="win-page">
        {body.map((b, i) => <Block key={i} b={b} onClose={onClose} onTab={onTab} />)}
      </div>
    </div>
  )
}

export default function Modal({ id, onClose }) {
  // `cur` is the section currently shown; tab clicks change it without closing the popup
  const [cur, setCur] = useState(id)
  useEffect(() => setCur(id), [id])
  const go = (t) => CONTENT[t] && setCur(t) // ignore tabs that have no content yet

  useEffect(() => {
    const h = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  const c = CONTENT[cur]
  // Every section keeps its address in a `{ window: { address } }` block inside body.
  // About's window block also carries the rest of its data (rows, tags, ...).
  const win = c.body.find((b) => b.window)?.window
  const address = win?.address ?? c.address // c.address still works as a fallback
  const isAbout = !!win?.rows
  const isFolder = cur === 'projects'
  const blocks = c.body.filter((b) => !b.window) // address-only blocks are not rendered

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className={`modal modal--window${isFolder ? ' modal--folder' : ''}`}
        data-id={cur}
        role="dialog"
        aria-modal="true"
        aria-label={c.title}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="sr-only">{c.title}</h2>
        <div className="modal-body">
          {isFolder ? (
            <ProjectsFolder body={c.body} address={address} onClose={onClose} onTab={go} />
          ) : isAbout ? (
            c.body.map((b, i) => <Block key={i} b={b} onClose={onClose} onTab={go} />)
          ) : (
            <PageWindow id={cur} address={address} body={blocks} onClose={onClose} onTab={go} />
          )}
        </div>
      </div>
    </div>
  )
}