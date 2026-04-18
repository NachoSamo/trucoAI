import api from '../api'
import { LoginCredentials, AuthToken } from '../types/auth'

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthToken> => {
    const { data } = await api.post<AuthToken>('/auth/login', credentials)
    return data
  },
}
