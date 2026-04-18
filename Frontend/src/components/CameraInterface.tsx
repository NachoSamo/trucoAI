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
  error:     { pill: 'border-brand-red   text-brand-red',         dot: 'bg-brand-red' },
}

export default function CameraInterface({ onBack }: CameraInterfaceProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [detectionState, setDetectionState] = useState<DetectionState>('idle')
  const [cards, setCards] = useState<string[]>([])
  const [detectionKey] = useState(() => localStorage.getItem('detection_key') ?? 'Space')
  const navigate = useNavigate()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream
      })
  }, [])

  const capture = useCallback(async () => {
    if (detectionState === 'detecting' || !videoRef.current || !canvasRef.current) return
    setDetectionState('detecting')
    speak('Iniciando detección')

    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const key = localStorage.getItem('detection_key') ?? 'Space'
      if (e.code === key || e.key === key) {
        e.preventDefault()
        void capture()
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [capture])

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-AR'
    utterance.rate = 1.2
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  const { pill, dot } = STATE_STYLE[detectionState]
  const keyLabel = keyDisplayName(detectionKey).toUpperCase()

  return (
    <div className="fixed inset-0 overflow-hidden bg-brand-bg font-geologica">

      {/* Cámara — ocupa toda la pantalla */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
      />
      <canvas ref={canvasRef} className="hidden" />

      {/* Viñeta para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/70 via-transparent to-brand-bg/85 pointer-events-none" />

      {/* Barra superior */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4">
        {onBack ? (
          <button
            onClick={onBack}
            aria-label="Volver al inicio"
            className="text-brand-cream/80 hover:text-brand-yellow transition-colors p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
          >
            <ArrowLeft size={28} />
          </button>
        ) : <div className="w-12" />}

        <h1 className="text-brand-yellow text-xl font-black tracking-widest uppercase drop-shadow-lg">
          Cómplice AI
        </h1>

        <button
          onClick={() => navigate('/settings')}
          aria-label="Configuración"
          className="text-brand-cream/80 hover:text-brand-yellow transition-colors p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
        >
          <Settings size={28} />
        </button>
      </div>

      {/* AR — cartas superpuestas sobre la imagen */}
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
        <div className={`flex items-center gap-2 border rounded-full px-5 py-2 bg-brand-bg/70 backdrop-blur-sm ${pill}`}>
          <span className={`w-2 h-2 rounded-full shrink-0 ${dot}`} />
          <span className="text-sm font-bold tracking-widest uppercase">
            {STATE_LABEL[detectionState]}
          </span>
        </div>
        <p className="text-brand-cream/30 text-xs tracking-wider font-light">
          Presioná <span className="text-brand-cream/60 font-bold">{keyLabel}</span> para detectar
        </p>
      </div>
    </div>
  )
}
