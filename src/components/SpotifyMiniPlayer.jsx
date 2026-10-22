import { FaMusic, FaPause, FaPlay } from 'react-icons/fa'
import { useSpotifyPlayer } from './SpotifyPlayerContext.jsx'

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000)
    return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

export default function SpotifyMiniPlayer({ compact = false }) {
    const {
        token,
        deviceId,
        track,
        paused,
        position,
        duration,
        status,
        busy,
        playerRef,
        login,
        playPlaylist,
        togglePlayback,
        skipTrack,
    } = useSpotifyPlayer()

    const albumCover = track?.album?.images?.[0]?.url
    const progress = duration ? Math.min(100, (position / duration) * 100) : 0

    if (!token) {
        return (
            <div className={`spotify-mini${compact ? ' spotify-mini--compact' : ''}`}>
                {!compact && <p className="win-now">Song of my day</p>}
                <p className="win-track">{status || 'Connect to Spotify to listen'}</p>
                <button
                    className="spotify-connect"
                    onClick={login}
                >
                    Connect Spotify
                </button>
            </div>
        )
    }

    return (
        <div className={`spotify-mini${compact ? ' spotify-mini--compact' : ''}`}>
            {!compact && <p className="win-now-title">Song of my day</p>}

            {!compact && (
                <div className="vinyl-story">
                    <div className="vinyl-story-content">
                        <div className="vinyl-record">
                            <div className={`vinyl-disc ${!paused ? 'spinning' : ''}`}>
                                <div className="vinyl-grooves" />
                                <div className="album-artwork">
                                    {albumCover ? (
                                        <img src={albumCover} alt={`${track?.name ?? 'Current track'} album cover`} />
                                    ) : (
                                        <div className="album-artwork-placeholder"><FaMusic /></div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <p className="win-track" aria-live="polite">{track?.name || 'Your playlist'}</p>
            {!compact && (
                <>
                    <p className="spotify-artist">
                        {track?.artists?.map(artist => artist.name).join(', ') || 'Connect your player to begin'}
                    </p>
                    <div className="win-progress" role="progressbar" aria-label="Song progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
                        <i style={{ width: `${progress}%` }} />
                    </div>
                    <div className="spotify-time">
                        <span>{formatTime(position)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>
                </>
            )}

            <div className="win-controls">
                <button onClick={() => skipTrack('previous')} disabled={!deviceId} aria-label="Previous song" title="Previous song">«</button>
                <button className="spotify-play" onClick={togglePlayback} disabled={!deviceId || busy} aria-label={paused ? 'Play' : 'Pause'} title={paused ? 'Play' : 'Pause'}>
                    {paused ? <FaPlay /> : <FaPause />}
                </button>
                <button onClick={() => skipTrack('next')} disabled={!deviceId} aria-label="Next song" title="Next song">»</button>
            </div>

            {!deviceId && (
                <button className="spotify-connect" onClick={() => playerRef.current?.connect()}>
                    Reconnect player
                </button>
            )}
            {deviceId && !track && (
                <button className="spotify-connect" onClick={playPlaylist} disabled={busy}>
                    {busy ? 'Loading…' : 'Play my playlist'}
                </button>
            )}
            {status && <p className="spotify-status" role="status">{status}</p>}
        </div>
    )
}
