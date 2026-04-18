import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Button from '../components/ui/Button'
import { useNotification } from '../hooks/useNotification'

interface KeyOption {
  value: string
  label: string
  hint: string
}

const KEY_OPTIONS: KeyOption[] = [
  { value: 'Space',  label: 'Barra espaciadora', hint: 'PC / teclado' },
  { value: 'Enter',  label: 'Enter',              hint: 'PC / teclado' },
  { value: 'KeyF',   label: 'Tecla F',            hint: 'PC' },
  { value: 'VolumeUp', label: 'Volumen +',        hint: 'Android' },
]

export default function SettingsPage() {
  const navigate = useNavigate()
  const notification = useNotification()
  const [detectionKey, setDetectionKey] = useState(
    () => localStorage.getItem('detection_key') ?? 'Space',
  )

  function save() {
    localStorage.setItem('detection_key', detectionKey)
    notification.success('Configuración guardada')
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

      {/* Botón de detección */}
      <section className="bg-brand-navy rounded-2xl p-6 border border-brand-blue/40 flex flex-col gap-4">
        <div>
          <h2 className="text-brand-cream text-lg font-bold uppercase tracking-widest">
            Botón de detección
          </h2>
          <p className="text-brand-cream/40 text-sm font-light mt-1">
            Elegí qué botón usás para capturar las cartas desde la cámara.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {KEY_OPTIONS.map((opt) => {
            const active = detectionKey === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setDetectionKey(opt.value)}
                className={`flex items-center justify-between rounded-xl px-5 py-4 border-2 transition-all focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 ${
                  active
                    ? 'bg-brand-yellow/10 border-brand-yellow text-brand-yellow'
                    : 'bg-brand-bg border-brand-blue/30 text-brand-cream/60 hover:border-brand-blue'
                }`}
              >
                <span className="text-lg font-bold">{opt.label}</span>
                <span className={`text-sm font-light ${active ? 'text-brand-yellow/60' : 'opacity-40'}`}>
                  {opt.hint}
                </span>
              </button>
            )
          })}
        </div>

        <p className="text-brand-cream/25 text-xs font-light leading-relaxed">
          * En iOS los botones de hardware no son accesibles desde el navegador web.
          Usá teclado Bluetooth o un acceso directo de Siri Shortcuts.
        </p>
      </section>

      {/* Accesibilidad — placeholder */}
      <section className="bg-brand-navy rounded-2xl p-6 border border-brand-blue/40 flex flex-col gap-3">
        <h2 className="text-brand-cream text-lg font-bold uppercase tracking-widest">
          Accesibilidad
        </h2>
        <p className="text-brand-cream/30 text-sm font-light">
          Próximamente: velocidad de voz, idioma, feedback por vibración.
        </p>
      </section>

      <Button variant="primary" size="lg" onClick={save}>
        Guardar configuración
      </Button>
    </div>
  )
}
