[Persona] Eres un desarrollador fullstack senior experto en Pyhton, FastAPI, React, TypeScript, Tailwind CSS, PostgreSQL y YOLO.

[Task]
1) Levanta la base de datos con docker-compose up -d y las variables definidas en el archivo .env
2) Genera un login simple para acceder a la homepage. Usuario y contraseña para iniciar sesion con:
    email: [EMAIL_ADDRESS]
    password: [PASSWORD]
3) Genera la home page, accesible para personas con baja vision o ceguera. Debe tener un boton grande para iniciar sesion y otro para registrarse. En la home page debe haber un boton para iniciar la partida de truco. Este boton debe ser grande y accesible para personas con baja vision o ceguera. Este boton te debe abrir la camara de tu pc. Genera UI simple y funcional. Basate en las rules definidas en agents/rules/front.md

[fixs]
1) Ayudame a levantar el backend y dime los comandos que debo ejecutar para que funcione. No lo levantes vos, me gusta gestionar mannualmente esto en la terminal. 
2) Hay un error en el frontend que no deja levantar el frontend:
    PS C:\Users\Nacho\trucoAI\Frontend> npm run dev

> complice-ai@0.1.0 dev
> vite


  VITE v5.4.21  ready in 335 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
Error:   Failed to scan for dependencies from entries:
  C:/Users/Nacho/trucoAI/Frontend/index.html

  X [ERROR] No matching export in "src/api.ts" for import "default"

    src/services/authService.ts:1:7:
      1 │ import api from '../api'
        ╵        ~~~


    at failureErrorWithLog (C:\Users\Nacho\trucoAI\Frontend\node_modules\esbuild\lib\main.js:1472:15)
    at C:\Users\Nacho\trucoAI\Frontend\node_modules\esbuild\lib\main.js:945:25
    at runOnEndCallbacks (C:\Users\Nacho\trucoAI\Frontend\node_modules\esbuild\lib\main.js:1315:45)
    at buildResponseToResult (C:\Users\Nacho\trucoAI\Frontend\node_modules\esbuild\lib\main.js:943:7) 
    at C:\Users\Nacho\trucoAI\Frontend\node_modules\esbuild\lib\main.js:955:9
    at new Promise (<anonymous>)
    at requestCallbacks.on-end (C:\Users\Nacho\trucoAI\Frontend\node_modules\esbuild\lib\main.js:954:54)
    at handleRequest (C:\Users\Nacho\trucoAI\Frontend\node_modules\esbuild\lib\main.js:647:17)        
    at handleIncomingPacket (C:\Users\Nacho\trucoAI\Frontend\node_modules\esbuild\lib\main.js:672:7)  
    at Socket.readFromStdout (C:\Users\Nacho\trucoAI\Frontend\node_modules\esbuild\lib\main.js:600:7)
    Solucionalo.
3) Dame una guia paso a paso para levantar el backend. 
