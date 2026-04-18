import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { useNotification } from './useNotification'
import { LoginFormData } from '../schemasZod/authSchema'

const TOKEN_KEY = 'complice_token'

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const notification = useNotification()

  const login = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      const result = await authService.login(data)
      localStorage.setItem(TOKEN_KEY, result.access_token)
      notification.success('¡Bienvenido, Cómplice!')
      navigate('/home')
    } catch (err: unknown) {
      const status = (err as { response?: { status: number } })?.response?.status
      if (status === 401) {
        notification.error('Email o contraseña incorrectos')
      } else {
        notification.error('Error del servidor. Intentá de nuevo.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    navigate('/login')
  }

  const isAuthenticated = () => !!localStorage.getItem(TOKEN_KEY)

  return { login, logout, isLoading, isAuthenticated }
}
