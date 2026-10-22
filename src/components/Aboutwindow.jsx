import { useState } from 'react'
import { FaCode, FaGraduationCap, FaCommentDots, FaLinkedin, FaGithub, FaKaggle, FaTelegram, FaEnvelope } from 'react-icons/fa'
import SpotifyMiniPlayer from './SpotifyMiniPlayer'
import { WindowHeader } from './Windowchrome.jsx'

const ROW_ICONS = { code: FaCode, school: FaGraduationCap, chat: FaCommentDots }
const SOCIAL_ICONS = { linkedin: FaLinkedin, github: FaGithub, kaggle: FaKaggle, telegram: FaTelegram, email: FaEnvelope }

// Retro "browser window" layout for the About popup
export default function AboutWindow({ data, onClose, onTab }) {
    const { address, name, role, rows, tags, tags1, now, socials } = data
    const [i, setI] = useState(0)
    const [portraitOk, setPortraitOk] = useState(true)
    const step = (d) => setI((v) => (v + d + now.length) % now.length)

    return (
        <div className="win">
            <WindowHeader address={address} active="about" onClose={onClose} onTab={onTab} />

            <div className="win-content">
                <div className="win-left">
                    {rows.map((r) => {
                        const Icon = ROW_ICONS[r.icon]
                        return (
                            <div className="win-row" key={r.h}>
                                <div className="win-icon">{Icon && <Icon aria-hidden="true" />}</div>
                                <div>
                                    <h3>{r.h}</h3>
                                    <p>{r.text}</p>
                                </div>
                            </div>
                        )
                    })}

                    <h3 className="win-label">What I’m into</h3>
                    <div className="win-tags">
                        {tags1.map((t) => <span className="win-tag" key={t}>{t}</span>)}
                    </div>
                    <h3 className="win-label">My toolkit</h3>
                    <div className="win-tags">
                        {tags.map((t) => <span className="win-tag" key={t}>{t}</span>)}
                    </div>

                    <div className="icon-links about-links">
                        {socials.map(({ label, icon, href }) => {
                            const Icon = SOCIAL_ICONS[icon]
                            const external = href.startsWith('http')
                            return (
                                <a key={label} className="icon-link about-link" href={href} title={label} aria-label={label}
                                    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}>
                                    {Icon && <Icon aria-hidden="true" />}
                                </a>
                            )
                        })}
                    </div>
                </div>

                <div className="win-card-wrap">
                    <aside className="win-card">
                        {/* <div className="win-portrait">
                            {portraitOk
                                ? <img src={`${import.meta.env.BASE_URL}assets/portrait.png`} alt="" onError={() => setPortraitOk(false)} />
                                : <span aria-hidden="true">M</span>}
                        </div> */}
                        <SpotifyMiniPlayer />
                    </aside>
                </div>
            </div>
        </div>
    )
}