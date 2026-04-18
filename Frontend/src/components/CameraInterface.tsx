import { useEffect, useRef, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { detectCards, DetectResponse } from '../api'

interface CameraInterfaceProps {
  onBack?: () => void
}

export default function CameraInterface({ onBack }: CameraInterfaceProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [result, setResult] = useState<DetectResponse | null>(null)
  const [detecting, setDetecting] = useState(false)

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream
      })
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') capture()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  function speak(text: string) {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'es-AR'
    utterance.rate = 1.2
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  async function capture() {
    if (detecting || !videoRef.current || !canvasRef.current) return
    setDetecting(true)
    speak('Iniciando detección')

    const video = videoRef.current
    const canvas = canvasRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')!.drawImage(video, 0, 0)
    const base64 = canvas.toDataURL('image/jpeg').split(',')[1]

    try {
      const data = await detectCards(base64)
      setResult(data)
      speak(data.message || data.cards.join('. ') || 'Sin cartas detectadas')
    } catch {
      speak('Error de conexión')
    } finally {
      setDetecting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-4">
      <div className="w-full flex items-center gap-4 mt-2">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Volver al inicio"
            className="text-gray-400 hover:text-yellow-400 transition-colors p-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400"
          >
            <ArrowLeft size={32} />
          </button>
        )}
        <h1 className="text-yellow-400 text-2xl font-bold tracking-widest uppercase">
          Detectando Cartas
        </h1>
      </div>

      <div className="w-full max-w-lg aspect-video bg-gray-900 rounded-2xl overflow-hidden border-4 border-yellow-400">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {result && (
        <div className="w-full max-w-lg bg-gray-900 rounded-2xl p-4 border-2 border-yellow-400 text-center">
          <p className="text-white text-xl font-semibold">
            {result.cards.length > 0 ? result.cards.join(' · ') : 'Sin cartas detectadas'}
          </p>
        </div>
      )}

      <button
        onClick={capture}
        disabled={detecting}
        aria-label="Detectar cartas"
        className="w-full max-w-lg py-8 rounded-2xl text-3xl font-bold uppercase tracking-widest
          bg-yellow-400 text-black active:scale-95 transition-transform
          disabled:opacity-50 disabled:cursor-not-allowed mb-4"
      >
        {detecting ? 'Detectando…' : 'Detectar Cartas'}
      </button>
    </div>
  )
}
