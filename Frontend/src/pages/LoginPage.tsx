import LoginForm from '../components/auth/LoginForm'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { login, isLoading } = useAuth()

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-yellow-400 text-5xl font-bold tracking-widest uppercase">
            Cómplice AI
          </h1>
          <p className="text-gray-400 text-xl mt-3">Tu socio en el juego</p>
        </div>

        <div className="bg-gray-900 rounded-2xl border-2 border-yellow-400 p-8">
          <h2 className="text-white text-2xl font-bold mb-8 text-center">Iniciar Sesión</h2>
          <LoginForm onSubmitData={login} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
