import { useNavigate } from 'react-router-dom'
import { LogOut, Play, Settings } from 'lucide-react'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'

export default function HomePage() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-between p-6 font-geologica">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-brand-yellow text-3xl font-black tracking-widest uppercase">
          Cómplice AI
        </h1>
        <div className="flex gap-1">
          <button
            onClick={() => navigate('/settings')}
            aria-label="Configuración"
            className="text-brand-cream/60 hover:text-brand-yellow transition-colors p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-yellow/50"
          >
            <Settings size={28} />
          </button>
          <button
            onClick={logout}
            aria-label="Cerrar sesión"
            className="text-brand-cream/60 hover:text-brand-yellow transition-colors p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-yellow/50"
          >
            <LogOut size={28} />
          </button>
        </div>
      </header>

      <main className="flex flex-col items-center gap-8 w-full max-w-md text-center">
        <div className="space-y-4">
          <p className="text-brand-cream text-3xl font-bold">¿Listo para jugar?</p>
          <p className="text-brand-cream/60 text-xl leading-relaxed font-light">
            Tu cómplice va a leer las cartas y susurrarte al oído.
          </p>
        </div>

        <Button
          variant="primary"
          size="xl"
          aria-label="Iniciar partida de truco"
          onClick={() => navigate('/camera')}
        >
          <Play size={40} />
          Iniciar Partida
        </Button>
      </main>

      <footer className="text-brand-blue/60 text-sm font-light">Cómplice AI — MVP 2026</footer>
    </div>
  )
}
