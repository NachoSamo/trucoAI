# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

**Cómplice AI** — app mobile-first que ayuda a personas con discapacidad visual a jugar al Truco. Una cámara montada en arnés de pecho captura frames; el backend los procesa con YOLO para identificar cartas y retorna el estado al frontend, que lo convierte en voz mediante Web Speech API.

## Commands

### Base de datos
```bash
docker-compose up -d     # levanta PostgreSQL (usa variables de .env)
docker-compose down      # detiene
```

### Backend (Python/FastAPI)
```bash
cd backend
python -m venv .venv && source .venv/Scripts/activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload    # http://localhost:8000
```

### Frontend (React/Vite/TypeScript)
```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Architecture

### Flujo principal
1. Usuario inicia sesión → `POST /auth/login` → token en `localStorage`
2. Home muestra botón "Iniciar Partida" → navega a `/camera`
3. `CameraInterface` captura frame del `<video>` al canvas → extrae base64
4. `api.ts → POST /detect` → backend procesa con YOLO → devuelve `{ cards, message }`
5. Frontend llama `window.speechSynthesis.speak()` con el resultado

### Frontend `frontend/src/`
```
pages/          LoginPage, HomePage, CameraPage  — routing + composición
components/
  auth/         LoginForm  — formulario dumb con react-hook-form + zod
  ui/           Button, Input  — componentes base con forwardRef
  CameraInterface.tsx  — cámara, captura, síntesis de voz
hooks/          useAuth (login/logout/isAuthenticated), useNotification (sonner)
services/       authService  — llamadas Axios al backend
schemasZod/     authSchema  — validaciones zod centralizadas
types/          auth.ts  — interfaces TypeScript
api.ts          instancia Axios base (VITE_API_URL o localhost:8000)
```

### Backend `backend/`
```
main.py            FastAPI app, CORS, monta routers
routes/auth.py     POST /auth/login — valida contra vars de entorno EMAIL/PASSWORD
routes/detect.py   POST /detect — recibe base64, retorna cartas (stub YOLO)
schemas/           auth.py, detect.py
services/          lógica de negocio (YOLO irá aquí)
models/            modelos SQLModel / PostgreSQL
```

## Frontend rules (ver `.agents/rules/front.md`)
- Stack obligatorio: `react-hook-form` + `@hookform/resolvers/zod`, `sonner`, `lucide-react`, `react-router-dom`
- Formularios: siempre `useForm` con zod — prohibido `useState` para inputs
- Notificaciones: siempre `useNotification()` — prohibido `window.alert/confirm`
- Componentes UI usan `forwardRef`; no tener lógica de negocio ni llamadas Axios
- Rutas dedicadas para CRUD — modales solo para confirmaciones destructivas

## Design constraint
Alto contraste (negro / amarillo `#FACC15`). Áreas de toque grandes (`py-8`). Feedback sonoro como canal principal. Mensajes de voz cortos y directos.

## Environment variables (`.env`)
| Variable | Uso |
|---|---|
| `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT` | Docker Compose |
| `EMAIL`, `PASSWORD` | Credenciales de login (backend) |
| `VITE_API_URL` | URL del backend desde el frontend (default: `http://localhost:8000`) |
