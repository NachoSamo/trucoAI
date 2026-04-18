import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8000',
})

export default api

export interface DetectResponse {
  cards: string[]
  message: string
}

export async function detectCards(imageBase64: string): Promise<DetectResponse> {
  const { data } = await api.post<DetectResponse>('/detect', { image: imageBase64 })
  return data
}
