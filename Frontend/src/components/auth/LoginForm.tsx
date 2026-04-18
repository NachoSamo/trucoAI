import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, LoginFormData } from '../../schemasZod/authSchema'
import Input from '../ui/Input'
import Button from '../ui/Button'

interface LoginFormProps {
  onSubmitData: (data: LoginFormData) => Promise<void>
  isLoading: boolean
}

export default function LoginForm({ onSubmitData, isLoading }: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) })

  return (
    <form onSubmit={handleSubmit(onSubmitData)} className="flex flex-col gap-6" noValidate>
      <Input
        label="Email"
        type="email"
        autoComplete="email"
        aria-label="Email"
        {...register('email')}
        error={errors.email?.message}
      />
      <Input
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        aria-label="Contraseña"
        {...register('password')}
        error={errors.password?.message}
      />
      <Button type="submit" variant="primary" size="xl" disabled={isLoading}>
        {isLoading ? 'Ingresando…' : 'Ingresar'}
      </Button>
    </form>
  )
}
