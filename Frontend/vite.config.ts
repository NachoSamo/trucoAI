import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    host: true, // Expone automáticamente el servidor a toda la red local
    proxy: {
      '/auth': 'http://localhost:8000',
      '/detect': 'http://localhost:8000',
      '/health': 'http://localhost:8000',
    },
  },
})
