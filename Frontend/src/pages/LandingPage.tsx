import { useNavigate } from 'react-router-dom'
import { Mic, Eye, Zap } from 'lucide-react'
import Logo from '../components/Logo'
import Button from '../components/ui/Button'

const FEATURES = [
  {
    icon: <Eye size={32} className="text-brand-yellow" />,
    title: 'Detección con IA',
    body: 'YOLOv8 identifica el palo y el número de cada carta en tiempo real, incluso en condiciones de poca luz.',
  },
  {
    icon: <Mic size={32} className="text-brand-yellow" />,
    title: 'Voz instantánea',
    body: 'Tu cómplice te susurra la mano al oído. Sin mirar la pantalla, sin tocar nada.',
  },
  {
    icon: <Zap size={32} className="text-brand-yellow" />,
    title: '100% accesible',
    body: 'Alto contraste, texto grande y control por auricular o doble tap. Diseñado para baja visión y ceguera.',
  },
]

const STEPS = [
  { n: '01', text: 'Apuntá la cámara a tus cartas' },
  { n: '02', text: 'Presioná el botón o tu auricular' },
  { n: '03', text: 'Escuchá tu mano al instante' },
]

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-brand-bg font-geologica text-brand-cream flex flex-col">

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <nav className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="text-brand-yellow text-xl font-black tracking-widest uppercase">
            Cómplice AI
          </span>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="text-brand-cream/70 hover:text-brand-yellow text-sm font-bold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-brand-yellow/50 rounded-lg px-3 py-2"
        >
          Ingresar
        </button>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-16 gap-8 flex-1">
        <Logo size={80} />

        <div className="space-y-4 max-w-lg">
          <h1 className="text-brand-yellow text-5xl font-black tracking-tight leading-tight">
            Tus cartas.<br />Tu voz.<br />Tu juego.
          </h1>
          <p className="text-brand-cream/70 text-xl font-light leading-relaxed">
            Cómplice AI escanea tu mano de Truco y te la dice al oído.
            Diseñado para personas con discapacidad visual.
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-xs">
          <Button variant="primary" size="xl" onClick={() => navigate('/login')}>
            Empezar a jugar
          </Button>
          <p className="text-brand-cream/30 text-xs font-light">
            Gratis · Sin registro · Red local
          </p>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────── */}
      <section className="px-6 py-12 flex flex-col gap-4 max-w-lg mx-auto w-full">
        <h2 className="text-brand-yellow text-2xl font-black uppercase tracking-widest text-center mb-2">
          ¿Qué hace?
        </h2>
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="bg-brand-navy border border-brand-blue/30 rounded-2xl p-6 flex gap-5 items-start"
          >
            <div className="shrink-0 mt-0.5">{f.icon}</div>
            <div>
              <p className="text-brand-cream font-bold text-lg">{f.title}</p>
              <p className="text-brand-cream/50 text-sm font-light mt-1 leading-relaxed">{f.body}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── Cómo funciona ───────────────────────────────────────── */}
      <section className="px-6 py-12 flex flex-col gap-6 max-w-lg mx-auto w-full">
        <h2 className="text-brand-yellow text-2xl font-black uppercase tracking-widest text-center">
          Cómo funciona
        </h2>
        <div className="flex flex-col gap-4">
          {STEPS.map((s) => (
            <div key={s.n} className="flex items-center gap-5">
              <span className="text-brand-yellow text-3xl font-black opacity-40 w-10 shrink-0 text-right">
                {s.n}
              </span>
              <p className="text-brand-cream text-lg font-light">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA final ───────────────────────────────────────────── */}
      <section className="px-6 py-14 flex flex-col items-center gap-6 text-center">
        <p className="text-brand-cream/60 text-lg font-light max-w-xs">
          Listo para que alguien cuide tu mano.
        </p>
        <div className="w-full max-w-xs">
          <Button variant="primary" size="xl" onClick={() => navigate('/login')}>
            Ingresar
          </Button>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="flex items-center justify-center gap-3 py-6 border-t border-brand-navy">
        <Logo size={18} />
        <span className="text-brand-blue/60 text-xs font-light">
          Cómplice AI — MVP 2026
        </span>
      </footer>
    </div>
  )
}
