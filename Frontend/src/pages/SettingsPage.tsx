import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, Monitor, Smartphone } from 'lucide-react'
import Button from '../components/ui/Button'
import { useNotification } from '../hooks/useNotification'

type ConfigStep = 'idle' | 'select-device' | 'listening' | 'confirmed'
type DeviceType = 'pc' | 'mobile'

const VOLUME_KEYS = ['AudioVolumeUp', 'AudioVolumeDown', 'VolumeUp', 'VolumeDown']
const MODIFIER_KEYS = ['Shift', 'Control', 'Alt', 'Meta']

export function keyDisplayName(key: string): string {
  const map: Record<string, string> = {
    Space:           'Barra espaciadora',
    Enter:           'Enter',
    AudioVolumeUp:   'Volumen +',
    AudioVolumeDown: 'Volumen -',
    VolumeUp:        'Volumen +',
    VolumeDown:      'Volumen -',
    ArrowUp:         'Flecha ↑',
    ArrowDown:       'Flecha ↓',
    ArrowLeft:       'Flecha ←',
    ArrowRight:      'Flecha →',
  }
  if (map[key]) return map[key]
  if (key.startsWith('Key')) return `Tecla ${key.replace('Key', '')}`
  if (key.startsWith('Digit')) return `Número ${key.replace('Digit', '')}`
  if (key.startsWith('F') && !isNaN(Number(key.slice(1)))) return key
  return key
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const notification = useNotification()

  const [step, setStep] = useState<ConfigStep>('idle')
  const [deviceType, setDeviceType] = useState<DeviceType | null>(null)
  const [capturedKey, setCapturedKey] = useState<string | null>(null)
  const [savedKey, setSavedKey] = useState(() => localStorage.getItem('detection_key') ?? 'Space')

  // Captura de tecla: solo activo cuando step === 'listening'
  useEffect(() => {
    if (step !== 'listening') return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setStep('select-device'); return }

      const isVolume = VOLUME_KEYS.includes(e.key)
      const isModifier = MODIFIER_KEYS.includes(e.key)

      if (isModifier) return
      if (deviceType === 'mobile' && !isVolume) return

      e.preventDefault()
      // Para teclas de volumen, e.code puede estar vacío → usar e.key
      setCapturedKey(e.code || e.key)
      setStep('confirmed')
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [step, deviceType])

  function confirm() {
    if (!capturedKey) return
    localStorage.setItem('detection_key', capturedKey)
    setSavedKey(capturedKey)
    notification.success(`Botón guardado: ${keyDisplayName(capturedKey)}`)
    setStep('idle')
    setCapturedKey(null)
    setDeviceType(null)
  }

  function cancel() {
    setStep('idle')
    setCapturedKey(null)
    setDeviceType(null)
  }

  function selectDevice(type: DeviceType) {
    setDeviceType(type)
    setStep('listening')
  }

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col p-6 gap-6 font-geologica">

      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Volver"
          className="text-brand-cream/60 hover:text-brand-yellow transition-colors p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
        >
          <ArrowLeft size={28} />
        </button>
        <h1 className="text-brand-yellow text-2xl font-black tracking-widest uppercase">
          Configuración
        </h1>
      </div>

      {/* Sección: Botón de detección */}
      <section className="bg-brand-navy rounded-2xl p-6 border border-brand-blue/40 flex flex-col gap-4">
        <div>
          <h2 className="text-brand-cream text-lg font-bold uppercase tracking-widest">
            Botón de detección
          </h2>
          <p className="text-brand-cream/40 text-sm font-light mt-1">
            Configurá qué botón usás para capturar las cartas.
          </p>
        </div>

        {/* Key actual */}
        <div className="flex items-center justify-between bg-brand-bg rounded-xl px-5 py-4 border border-brand-blue/20">
          <span className="text-brand-cream/50 text-sm font-light uppercase tracking-widest">Actual</span>
          <span className="text-brand-yellow font-bold text-lg">{keyDisplayName(savedKey)}</span>
        </div>

        <Button variant="secondary" size="md" onClick={() => setStep('select-device')}>
          Cambiar botón
        </Button>
      </section>

      {/* Sección: Accesibilidad placeholder */}
      <section className="bg-brand-navy rounded-2xl p-6 border border-brand-blue/40 flex flex-col gap-3">
        <h2 className="text-brand-cream text-lg font-bold uppercase tracking-widest">
          Accesibilidad
        </h2>
        <p className="text-brand-cream/30 text-sm font-light">
          Próximamente: velocidad de voz, idioma, feedback por vibración.
        </p>
      </section>

      {/* ── Overlay 1: seleccionar dispositivo ── */}
      {step === 'select-device' && (
        <div className="fixed inset-0 bg-brand-bg/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 gap-8 z-50">
          <div className="text-center">
            <h2 className="text-brand-cream text-2xl font-bold uppercase tracking-widest">
              ¿Desde dónde vas a jugar?
            </h2>
            <p className="text-brand-cream/40 text-sm font-light mt-2">
              Esto nos ayuda a escuchar el botón correcto.
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full max-w-sm">
            <button
              onClick={() => selectDevice('pc')}
              className="flex items-center gap-5 bg-brand-navy border-2 border-brand-blue/40 hover:border-brand-yellow hover:bg-brand-yellow/10 rounded-2xl px-6 py-5 transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
            >
              <Monitor size={36} className="text-brand-blue shrink-0" />
              <div className="text-left">
                <p className="text-brand-cream font-bold text-lg">PC / Teclado</p>
                <p className="text-brand-cream/40 text-sm font-light">Cualquier tecla del teclado</p>
              </div>
            </button>

            <button
              onClick={() => selectDevice('mobile')}
              className="flex items-center gap-5 bg-brand-navy border-2 border-brand-blue/40 hover:border-brand-yellow hover:bg-brand-yellow/10 rounded-2xl px-6 py-5 transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow/50"
            >
              <Smartphone size={36} className="text-brand-blue shrink-0" />
              <div className="text-left">
                <p className="text-brand-cream font-bold text-lg">Celular</p>
                <p className="text-brand-cream/40 text-sm font-light">Botón de volumen (Android)</p>
              </div>
            </button>
          </div>

          <button
            onClick={cancel}
            className="text-brand-cream/30 hover:text-brand-cream/60 text-sm font-light transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}

      {/* ── Overlay 2: escuchando ── */}
      {step === 'listening' && (
        <div className="fixed inset-0 bg-brand-bg/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 gap-8 z-50">
          {/* Anillo animado */}
          <div className="relative flex items-center justify-center w-36 h-36">
            <div className="absolute w-36 h-36 rounded-full border-4 border-brand-yellow/15 animate-ping" />
            <div className="absolute w-28 h-28 rounded-full border-2 border-brand-yellow/30" />
            <div className="w-20 h-20 rounded-full bg-brand-yellow/10 border-2 border-brand-yellow flex items-center justify-center">
              {deviceType === 'pc'
                ? <Monitor size={32} className="text-brand-yellow" />
                : <Smartphone size={32} className="text-brand-yellow" />
              }
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-brand-yellow text-2xl font-black uppercase tracking-widest">
              Escuchando…
            </h2>
            <p className="text-brand-cream/50 text-base font-light mt-3 max-w-xs">
              {deviceType === 'pc'
                ? 'Presioná la tecla que querés usar para detectar cartas.'
                : 'Presioná el botón de volumen que querés usar.'
              }
            </p>
            {deviceType === 'mobile' && (
              <p className="text-brand-cream/25 text-xs font-light mt-3">
                * iOS no permite capturar botones de hardware desde el navegador.
              </p>
            )}
            <p className="text-brand-cream/20 text-xs font-light mt-2">
              ESC para cancelar
            </p>
          </div>
        </div>
      )}

      {/* ── Overlay 3: confirmación ── */}
      {step === 'confirmed' && capturedKey && (
        <div className="fixed inset-0 bg-brand-bg/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 gap-8 z-50">
          <div className="w-24 h-24 rounded-full bg-brand-yellow/10 border-4 border-brand-yellow flex items-center justify-center">
            <Check size={40} className="text-brand-yellow" />
          </div>

          <div className="text-center">
            <p className="text-brand-cream/60 text-sm font-light uppercase tracking-widest">
              Botón detectado
            </p>
            <p className="text-brand-yellow text-4xl font-black mt-2">
              {keyDisplayName(capturedKey)}
            </p>
            <p className="text-brand-cream/40 text-sm font-light mt-3">
              Vas a usar este botón para detectar cartas.
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-xs">
            <Button variant="primary" size="lg" onClick={confirm}>
              Confirmar
            </Button>
            <Button variant="secondary" size="md" onClick={() => setStep('listening')}>
              Volver a intentar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
