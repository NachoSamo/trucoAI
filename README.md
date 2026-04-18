# Cómplice AI 🃏👁️

**Cómplice AI** es una aplicación diseñada para que personas con discapacidad visual puedan jugar al Truco en igualdad de condiciones, utilizando Inteligencia Artificial para la identificación de cartas y el seguimiento de la partida en tiempo real.

## 🌟 La Visión
El Truco es un juego de engaño, señas y rapidez visual. **Cómplice AI** actúa como un "socio silencioso" que, a través de una cámara montada en el pecho (arnés) y auriculares, susurra al oído del jugador qué cartas tiene y qué movimientos está realizando su rival, permitiendo que la persona ciega se concentre en la estrategia y la diversión.

## 🚀 Alcance del MVP
- **Identificación de Mano:** Reconocimiento de las 3 cartas del jugador mediante visión computacional.
- **Seguimiento del Rival:** Detección de las cartas que el oponente lanza a la mesa.
- **Feedback Auditivo:** Sistema de "lectura sigilosa" que informa el estado de la partida por voz.
- **Disparador Manual:** Integración con botones físicos (iPhone Action Button o botones de volumen) para capturar una nueva mano. O con tocar la pantalla. Lo que sea mas simple.

## 🛠️ Stack Tecnológico

### Frontend (Mobile First)
- **Framework:** React + Vite
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Interacción:** Web Speech API (para feedback auditivo)

### Backend (Procesamiento y Lógica)
- **Framework:** Python + FastAPI
- **ORM:** SQLModel
- **Base de Datos:** PostgreSQL
- **IA/ML:** YOLO (You Only Look Once) para detección de objetos en tiempo real.

## 🏗️ Arquitectura del Prototipo
1. **Hardware:** Smartphone en arnés de pecho + auriculares bluetooth.
2. **Captura:** La AI captura por intervalos (2 o 3 veces cada 1 segundo) un frame del video en vivo -> El frontend captura el frame de la cámara -> Envía al backend.
3. **Inferencia:** El backend procesa la imagen con YOLO -> Identifica cartas y valores.
4. **Respuesta:** El backend retorna el estado de la partida -> El frontend lo convierte en voz.

## 🛠️ Configuración del Entorno

### Requisitos previos
- Python 3.10+
- Node.js 18+ 
- PostgreSQL activo en un contenderor docker 