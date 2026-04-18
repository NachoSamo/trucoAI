import { useNavigate } from 'react-router-dom'
import { LogOut, Play } from 'lucide-react'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'

export default function HomePage() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-between p-6">
      <header className="w-full flex justify-between items-center">
        <h1 className="text-yellow-400 text-3xl font-bold tracking-widest uppercase">
          Cómplice AI
        </h1>
        <button
          onClick={logout}
          aria-label="Cerrar sesión"
          className="text-gray-400 hover:text-yellow-400 transition-colors p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-400"
        >
          <LogOut size={32} />
        </button>
      </header>

      <main className="flex flex-col items-center gap-8 w-full max-w-md text-center">
        <div className="space-y-4">
          <p className="text-white text-3xl font-bold">¿Listo para jugar?</p>
          <p className="text-gray-400 text-xl leading-relaxed">
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

      <footer className="text-gray-700 text-sm">Cómplice AI — MVP 2026</footer>
    </div>
  )
}
