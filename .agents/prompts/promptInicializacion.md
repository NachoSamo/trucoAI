###  Prompt de Inicialización 

> **Actúa como un Arquitecto de Software Full Stack.**
> 
> Necesito inicializar el proyecto **"Complice AI"**, una app para ayudar a personas ciegas a jugar al Truco. Debes crear la estructura de archivos base siguiendo este stack:
> 
> 1. **Backend (Python/FastAPI):**
>    - Crea una carpeta `/backend`.
>    - Configura un entorno con `FastAPI` y `SQLModel` para la base de datos PostgreSQL.
>    - Incluye un `main.py` con una ruta de salud (`/health`) y una ruta POST `/detect` que reciba una imagen en base64 (simulando la entrada para YOLO).
>    - Crea una estructura de carpetas: `/models`, `/routes`, `/services`, y `/schemas`.
>    - Genera un `requirements.txt` básico.
> 
> 2. **Frontend (React/Vite/TypeScript):**
>    - Crea una carpeta `/frontend` usando la estructura de Vite.
>    - Configura `Tailwind CSS`.
>    - Crea un componente principal `CameraInterface.tsx` que:
>        - Acceda a la cámara del dispositivo.
>        - Tenga un listener para eventos de teclado (simulando los botones de volumen/acción).
>        - Use la `Web Speech API` (`window.speechSynthesis`) para decir "Iniciando detección".
>    - Configura un archivo `api.ts` con Axios para conectar con el backend de FastAPI.
> 
> 3. **Configuración Global:**
>    - Un archivo `docker-compose.yml` que levante el servicio de FastAPI y la base de datos PostgreSQL.
>    - Un `.gitignore` que cubra tanto Python como Node/React.
> 
> **Restricción de diseño:** La interfaz debe ser minimalista (High Contrast) pensando en que el usuario tiene baja visión o es ciego, priorizando áreas de toque grandes y feedback sonoro.
> 
> Por favor, genera primero el árbol de directorios y luego los archivos de configuración (`package.json`, `main.py`, `vite.config.ts`, etc.).

---

### Consejos adicionales para tu proyecto:
* **Identificación de cartas:** Para el entrenamiento de YOLO, te recomiendo usar el dataset de "Spanish Playing Cards" en Roboflow, o sacar fotos a tu mazo desde la perspectiva del arnés (desde arriba/pecho) para que la IA se acostumbre a esa deformación visual.
* **Botón de Acción:** En iOS, puedes usar eventos de "volumen" mediante librerías específicas si lo empaquetas como PWA o App Nativa (Capacitor/Cordova), ya que el navegador estándar tiene restricciones para leer botones físicos.
* **Voz:** Para que no sea molesto, usa una voz de baja latencia y mensajes muy cortos (ej: "Siete de Espadas. Rival tiró Ancho de Bastos").