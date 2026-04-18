### 🎯 Prompt Maestro para Prototipado Visual (Cómplice AI)

**[Meta-Objetivo]**
Generar un prototipo de alta fidelidad para la aplicación "Complice AI", utilizando una interfaz **Mobile-First** con un diseño de **Alto Contraste**. El objetivo es mostrar cómo se ve la experiencia visual del usuario (ya sea un asistente con visión reducida o la persona ciega usando funciones de alto contraste) y cómo se comunican los estados de la IA.

**[Lineamientos Técnicos y Estéticos]**

1.  **Tipografía Oficial (Geologica)**
    * **Fuente:** Geologica.
    * **Ajustes Obligatorios:** Las variaciones de diseño deben estar desactivadas ( `CRSV=0`, `slnt=0`, `SHRP=0` ) para máxima limpieza y legibilidad.
    * **Jerarquía de Texto:**
        * **Títulos principales:** `Geologica` en peso Negrita (700) o Extra Negrita (900).
        * **Contenido y labels:** `Geologica` en peso Regular (400) o Ligero (200).

2.  **Uso de Paletas de Colores (Ver Imagen de Referencia)**

    * **Paleta Principal Accesible (El Corazón del Diseño):**
        * **`#1B113B` (Fondo):** Utilizar como color base para el fondo de la aplicación y áreas de contenido principal para maximizar el contraste.
        * **`#FDE63F` (Destacado & Alto Contraste):** Usar exclusivamente para los elementos de "Acción Principal" (ej. botones grandes de escaneo) y para el texto que va sobre el fondo oscuro.
        * **`#ED2A2C` (Estado IA & Urgencia):** Utilizar para notificaciones críticas, alertas de error o cuando el modelo YOLO no identifique una carta correctamente.

    * **Paleta Complementaria "In Color Balance" (Soporte):**
        * Utilizar los tonos azules ( `#081856` y `#085bb9` ) y el blanco sucio (`#fff6f1`) para elementos de balance de diseño secundario, como iconos de estado, gráficas de rendimiento o áreas de "Ayuda" que no requieran el máximo contraste.

**[Composición del Prototipo]**

Crea un layout vertical dividido en paneles que demuestre la aplicación práctica del sistema de diseño:

* **Panel de Identidad:** Muestra el logo y el nombre del producto "Cómplice AI".
* **Panel de Estado de IA:** Un ejemplo claro de la interfaz de "Lectura Sigilosa". Sobre el fondo oscuro, un indicador de estado con color Rojo de Urgencia (`#ED2A2C`) que diga "ESPERANDO CARTAS" o "FALLO DE DETECCIÓN", y un botón grande en color Amarillo Destacado (`#FDE63F`) con texto en peso Regular que diga "REINTENTAR ESCANEO".
* **Panel de Contenido de Mano:** Muestra un área oscura (`#1B113B`) donde se simula la identificación de las 3 cartas (ej. Siete de Espadas, Ancho de Bastos). El texto debe ser en Amarillo Destacado con peso Regular.
* **Panel de Balance:** Incluye un pequeño gráfico de "Balance de Diseño" usando los azules complementarios para demostrar la versatilidad de la marca.



[Fixes]
1) Haz que la camara sea responsive para que se adapte a cualquier tamaño de pantalla
2) Queremos simular realidad aumentada, es decir, que la camara detecte las cartas y las muestre en la pantalla como si estuvieran ahi. Para esto, elimina el boton de "Reintentar escaneo" y muestra las cartas detectadas en la pantalla como si estuvieran ahi.
3) Elimina los divs visuales de "tu mano" y de "Rendimiento sesion activa". Basicamente quiero que toda la page sea la camara y que se superpongan los componentes necesarios como toggles y textos sobre la camara. Simulando realidad aumentada.
4) Elimina el boton de "Detectar cartas" y agrega que se realice con un boton del teclado (si es en pc) o con un boton de volumen (si es en celular) o si es en iphone con el boton de subir acciones ( si es que el modelo cuenta con él). Para ello debes agregar una page de configuracion para que el usuario pueda configurar el boton de deteccion de cartas y otras configuraciones que puedan ser relevantes para el usuario.
5) Mejora los colores de los componentes, estan todos del mismo color actualmente y no se diferencian bien entre si. Usa la paleta de colores que te di para que se diferencien bien entre si.