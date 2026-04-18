import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowLeft, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { detectCards } from '../api'
import { keyDisplayName } from '../pages/SettingsPage'

type DetectionState = 'idle' | 'detecting' | 'success' | 'error'

interface CameraInterfaceProps {
  onBack?: () => void
}

const STATE_LABEL: Record<DetectionState, string> = {
  idle:      'ESPERANDO CARTAS',
  detecting: 'DETECTANDO…',
  success:   'CARTAS DETECTADAS',
  error:     'FALLO DE DETECCIÓN',
}

const STATE_STYLE: Record<DetectionState, { pill: string; dot: string }> = {
  idle:      { pill: 'border-brand-cream/20 text-brand-cream/60', dot: 'bg-brand-cream/40' },
  detecting: { pill: 'border-brand-yellow text-brand-yellow',     dot: 'bg-brand-yellow animate-pulse' },
  success:   { pill: 'border-brand-yellow text-brand-yellow',     dot: 'bg-brand-yellow' },
  error:     { pill: 'border-brand-red text-brand-red',           dot: 'bg-brand-red' },
}

// Audio silencioso mínimo — necesario para activar MediaSession en iOS
const SILENT_AUDIO_SRC =
  'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA='

export default function CameraInterface({ onBack }: CameraInterfaceProps) {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const audioRef    = useRef<HTMLAudioElement | null>(null)
  const lastTapRef  = useRef(0)
  const msReadyRef  = useRef(false)     // MediaSession ya activado

  const [detectionState, setDetectionState] = useState<DetectionState>('idle')
  const [cards, setCards]                   = useState<string[]>([])
  const [detectionKey]                      = useState(() => localStorage.getItem('detection_key') ?? 'Space')
  const navigate = useNavigate()

  // ── Cámara ──────────────────────────────────────────────────────────
  useEffect(() => {
    const storedDeviceId = localStorage.getItem('camera_device_id')
    const constraints: MediaStreamConstraints = {
      video: storedDeviceId
        ? { deviceId: { exact: storedDeviceId } }
        : { facingMode: 'environment' },
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .catch(() => navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }))
      .then((stream) => { if (videoRef.current) videoRef.current.srcObject = stream })
  }, [])

  // ── Lógica de captura ────────────────────────────────────────────────
  const capture = useCallback(async () => {
    if (detectionState === 'detecting' || !videoRef.current || !canvasRef.current) return
    setDetectionState('detecting')
    speak('Iniciando detección')

    const video  = videoRef.current
    const canvas = canvasRef.current
    canvas.width  = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')!.drawImage(video, 0, 0)
    const base64 = canvas.toDataURL('image/jpeg').split(',')[1]

    try {
      const data = await detectCards(base64)
      setCards(data.cards)
      setDetectionState('success')
      speak(data.message || data.cards.join('. ') || 'Sin cartas detectadas')
    } catch {
      setDetectionState('error')
      speak('Error de conexión')
    }
  }, [detectionState])

  // Ref siempre apunta a la versión más reciente de capture (para MediaSession)
  const captureRef = useRef(capture)
  useEffect(() => { captureRef.current = capture }, [capture])

  // ── Trigger 1: teclado (PC) ──────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = localStorage.getItem('detection_key') ?? 'Space'
      if (e.code === key || e.key === key) {
        e.preventDefault()
        void captureRef.current()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  // ── Trigger 2 + 3: MediaSession + doble tap (mobile) ────────────────
  // Se activan en el primer contacto táctil para respetar la política
  // de autoplay de iOS (el audio DEBE arrancar desde un gesto del usuario)
  function activateMediaSession() {
    if (msReadyRef.current) return
    msReadyRef.current = true

    const audio = new Audio(SILENT_AUDIO_SRC)
    audio.loop   = true
    audio.volume = 0.001   // casi silencioso pero no muteado (iOS lo requiere)
    audioRef.current = audio
    audio.play().catch(() => {})

    if ('mediaSession' in navigator) {
      const handler = () => void captureRef.current()
      navigator.mediaSession.setActionHandler('play',          handler)
      navigator.mediaSession.setActionHandler('pause',         handler)
      navigator.mediaSession.setActionHandler('nexttrack',     handler)
      navigator.mediaSession.setActionHandler('previoustrack', handler)
    }
  }

  // Limpieza al desmontar
  useEffect(() => () => {
    audioRef.current?.pause()
    if ('mediaSession' in navigator) {
      ;(['play', 'pause', 'nexttrack', 'previoustrack'] as MediaSessionAction[])
        .forEach(a => navigator.mediaSession.setActionHandler(a, null))
    }
  }, [])

  function handleTouchStart() {
    activateMediaSession()   // primer toque desbloquea audio + MediaSession
  }

  function handleTouchEnd(e: React.TouchEvent) {
    // Ignorar toques sobre botones de la UI
    if ((e.target as HTMLElement).closest('button')) return
    const now = Date.now()
    if (now - lastTapRef.current < 350) void captureRef.current()
    lastTapRef.current = now
  }

  // ── TTS ─────────────────────────────────────────────────────────────
  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang  = 'es-AR'
    utterance.rate  = 1.2
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const { pill, dot } = STATE_STYLE[detectionState]
  const keyLabel = keyDisplayName(detectionKey).toUpperCase()

  return (
    <div
      className="fixed inset-0 overflow-hidden bg-brand-bg font-geologica"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Cámara full-screen */}
      <video
        ref={videoRef}
        autoPlay playsInline muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Viñeta */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/70 via-transparent to-brand-bg/85 pointer-events-none" />

      {/* Barra superior */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
        {onBack ? (
          <button onClick={onBack} aria-label="Volver al inicio"
            className="text-brand-cream/80 hover:text-brand-yellow transition-colors p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50">
            <ArrowLeft size={28} />
          </button>
        ) : <div className="w-12" />}

        <h1 className="text-brand-yellow text-xl font-black tracking-widest uppercase drop-shadow-lg">
          Cómplice AI
        </h1>

        <button onClick={() => navigate('/settings')} aria-label="Configuración"
          className="text-brand-cream/80 hover:text-brand-yellow transition-colors p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50">
          <Settings size={28} />
        </button>
      </div>

      {/* AR — cartas superpuestas */}
      {detectionState === 'success' && cards.map((card, i) => (
        <div
          key={i}
          className="absolute bg-brand-bg/80 border-2 border-brand-yellow rounded-xl px-4 py-2 backdrop-blur-sm"
          style={{ left: `${12 + i * 30}%`, top: `${38 + (i % 2) * 15}%` }}
        >
          <span className="text-brand-yellow text-lg font-normal tracking-wide">{card}</span>
        </div>
      ))}

      {/* Overlay inferior */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-3 px-4 pb-10">
        <button
          onClick={() => void capture()}
          disabled={detectionState === 'detecting'}
          aria-label="Detectar cartas"
          className={`flex items-center gap-3 border rounded-full px-8 py-4 bg-brand-bg/70 backdrop-blur-sm active:scale-95 transition-transform disabled:opacity-60 disabled:cursor-not-allowed ${pill}`}
        >
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dot}`} />
          <span className="text-base font-bold tracking-widest uppercase">
            {STATE_LABEL[detectionState]}
          </span>
        </button>
        <p className="text-brand-cream/30 text-xs tracking-wider font-light text-center">
          Tocá el botón · auricular · <span className="text-brand-cream/60 font-bold">{keyLabel}</span>
        </p>
      </div>
    </div>
  )
}
