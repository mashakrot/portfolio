import { createContext, useContext, useEffect, useRef, useState } from 'react'

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID
const PLAYLIST_ID = '6bgM5k5LAMFAN7yszWe5Sn'
const REDIRECT_URI = 'https://mashakrot.github.io/portfolio/'

const SCOPES = [
    'streaming',
    'user-read-email',
    'user-read-private',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
].join(' ')

const SpotifyPlayerContext = createContext(null)

async function createChallenge(verifier) {
    const bytes = new TextEncoder().encode(verifier)
    const digest = await crypto.subtle.digest('SHA-256', bytes)

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

async function loginToSpotify() {
    if (!CLIENT_ID) {
        throw new Error('Add VITE_SPOTIFY_CLIENT_ID to your .env file.')
    }

    const bytes = crypto.getRandomValues(new Uint8Array(64))
    const verifier = Array.from(bytes, byte =>
        byte.toString(16).padStart(2, '0')
    ).join('')
    const challenge = await createChallenge(verifier)
    const state = crypto.randomUUID()

    sessionStorage.setItem('spotify_verifier', verifier)
    sessionStorage.setItem('spotify_state', state)

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
        code_challenge_method: 'S256',
        code_challenge: challenge,
        state,
        scope: SCOPES,
    })

    window.location.assign(`https://accounts.spotify.com/authorize?${params}`)
}

export function SpotifyPlayerProvider({ children }) {
    const playerRef = useRef(null)
    const [token, setToken] = useState(
        () => sessionStorage.getItem('spotify_token') || ''
    )
    const [deviceId, setDeviceId] = useState('')
    const [track, setTrack] = useState(null)
    const [paused, setPaused] = useState(true)
    const [position, setPosition] = useState(0)
    const [duration, setDuration] = useState(0)
    const [status, setStatus] = useState('')
    const [busy, setBusy] = useState(false)

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        const returnedState = params.get('state')
        const error = params.get('error')

        if (error) {
            setStatus(`Spotify login cancelled: ${error}`)
            window.history.replaceState({}, '', window.location.pathname)
            return
        }

        if (!code) return

        const verifier = sessionStorage.getItem('spotify_verifier')
        const expectedState = sessionStorage.getItem('spotify_state')
        window.history.replaceState({}, '', window.location.pathname)

        if (!verifier || returnedState !== expectedState) {
            setStatus('Login verification failed. Please try again.')
            return
        }

        let cancelled = false

        async function exchangeCode() {
            try {
                const response = await fetch(
                    'https://accounts.spotify.com/api/token',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: new URLSearchParams({
                            client_id: CLIENT_ID,
                            grant_type: 'authorization_code',
                            code,
                            redirect_uri: REDIRECT_URI,
                            code_verifier: verifier,
                        }),
                    }
                )
                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data.error_description || 'Token exchange failed.')
                }
                if (cancelled) return

                sessionStorage.setItem('spotify_token', data.access_token)
                sessionStorage.setItem(
                    'spotify_expires_at',
                    String(Date.now() + data.expires_in * 1000)
                )
                setToken(data.access_token)
                setStatus('')
            } catch (err) {
                if (!cancelled) setStatus(err.message || 'Spotify login failed.')
            } finally {
                sessionStorage.removeItem('spotify_verifier')
                sessionStorage.removeItem('spotify_state')
            }
        }

        exchangeCode()
        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        if (!token) return

        const expiresAt = Number(sessionStorage.getItem('spotify_expires_at') || 0)
        if (expiresAt && Date.now() >= expiresAt) {
            sessionStorage.removeItem('spotify_token')
            sessionStorage.removeItem('spotify_expires_at')
            setToken('')
            setStatus('Your Spotify session expired. Please reconnect.')
            return
        }

        let cancelled = false

        const initPlayer = () => {
            if (cancelled || !window.Spotify || playerRef.current) return

            const player = new window.Spotify.Player({
                name: 'My Retro Portfolio',
                volume: 0.6,
                getOAuthToken: callback => callback(token),
            })
            playerRef.current = player

            player.addListener('ready', ({ device_id }) => {
                setDeviceId(device_id)
                setStatus('Spotify connected')
            })
            player.addListener('not_ready', () => {
                setDeviceId('')
                setStatus('Spotify player disconnected')
            })
            player.addListener('player_state_changed', state => {
                if (!state) return
                setTrack(state.track_window.current_track)
                setPaused(state.paused)
                setPosition(state.position)
                setDuration(state.duration)
            })
            player.addListener('initialization_error', ({ message }) => setStatus(message))
            player.addListener('authentication_error', ({ message }) => setStatus(message))
            player.addListener('account_error', ({ message }) => setStatus(message))
            player.connect().then(connected => {
                if (!connected) setStatus('Could not connect to Spotify.')
            })
        }

        window.onSpotifyWebPlaybackSDKReady = initPlayer
        if (window.Spotify) {
            initPlayer()
        } else {
            let script = document.querySelector('script[data-spotify-sdk]')
            if (!script) {
                script = document.createElement('script')
                script.src = 'https://sdk.scdn.co/spotify-player.js'
                script.async = true
                script.dataset.spotifySdk = 'true'
                document.body.appendChild(script)
            }
        }

        return () => {
            cancelled = true
            if (playerRef.current) {
                playerRef.current.disconnect()
                playerRef.current = null
            }
        }
    }, [token])

    async function playPlaylist() {
        if (!deviceId || !token) return

        setBusy(true)
        setStatus('Loading playlist…')
        try {
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
            const response = await fetch(
                `https://api.spotify.com/v1/me/player/play?device_id=${encodeURIComponent(deviceId)}`,
                {
                    method: 'PUT',
                    headers,
                    body: JSON.stringify({ context_uri: `spotify:playlist:${PLAYLIST_ID}` }),
                }
            )
            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                throw new Error(data.error?.message || 'Could not start the playlist.')
            }

            const repeatResponse = await fetch(
                `https://api.spotify.com/v1/me/player/repeat?state=context&device_id=${encodeURIComponent(deviceId)}`,
                { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }
            )
            if (!repeatResponse.ok) {
                const data = await repeatResponse.json().catch(() => ({}))
                throw new Error(data.error?.message || 'Playlist started, but repeat could not be enabled.')
            }
            setStatus('')
        } catch (err) {
            setStatus(err.message)
        } finally {
            setBusy(false)
        }
    }

    async function togglePlayback() {
        if (!playerRef.current) return
        if (!track) {
            await playPlaylist()
            return
        }
        const result = await playerRef.current.togglePlay()
        if (result instanceof Error) setStatus(result.message)
    }

    async function skipTrack(direction) {
        if (!playerRef.current) return
        const result = direction === 'next'
            ? await playerRef.current.nextTrack()
            : await playerRef.current.previousTrack()
        if (result instanceof Error) setStatus(result.message)
    }

    const value = {
        token,
        deviceId,
        track,
        paused,
        position,
        duration,
        status,
        busy,
        playerRef,
        login: async () => {
            try {
                await loginToSpotify()
            } catch (err) {
                setStatus(err.message || 'Spotify login failed.')
            }
        },
        playPlaylist,
        togglePlayback,
        skipTrack,
    }

    return (
        <SpotifyPlayerContext.Provider value={value}>
            {children}
        </SpotifyPlayerContext.Provider>
    )
}

export function useSpotifyPlayer() {
    const context = useContext(SpotifyPlayerContext)
    if (!context) {
        throw new Error('useSpotifyPlayer must be used within SpotifyPlayerProvider')
    }
    return context
}
