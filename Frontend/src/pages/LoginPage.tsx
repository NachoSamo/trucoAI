import LoginForm from '../components/auth/LoginForm'
import { useAuth } from '../hooks/useAuth'

export default function LoginPage() {
  const { login, isLoading } = useAuth()

  return (
    <div className="min-h-screen bg-brand-bg flex flex-col items-center justify-center p-6 font-geologica">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-brand-yellow text-5xl font-black tracking-widest uppercase">
            Cómplice AI
          </h1>
          <p className="text-brand-cream/60 text-xl mt-3 font-light">Tu socio en el juego</p>
        </div>

        <div className="bg-brand-navy rounded-2xl border-2 border-brand-yellow p-8">
          <h2 className="text-brand-cream text-2xl font-bold mb-8 text-center">Iniciar Sesión</h2>
          <LoginForm onSubmitData={login} isLoading={isLoading} />
        </div>
      </div>
    </div>
  )
}
