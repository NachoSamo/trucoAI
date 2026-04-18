import cv2
import numpy as np
import base64
from ultralytics import YOLO
from pathlib import Path

class YOLOService:
    def __init__(self, model_path="models/spanishDeck.pt"): # CAMBIAR AHI SI SE USA EL NUEVO
        self.model_path = model_path
        self.model = None
        self._load_model()

    def _load_model(self):
        """Carga el modelo YOLO si existe el archivo."""
        print(f"DEBUG: Intentando cargar modelo desde {self.model_path}...")
        if Path(self.model_path).exists():
            try:
                self.model = YOLO(self.model_path)
                # Imprimir clases para confirmar carga
                classes = self.model.names
                print(f"✅ Modelo cargado exitosamente. Clases detectadas ({len(classes)}): {classes}")
            except Exception as e:
                print(f"❌ Error cargando el modelo: {e}")
        else:
            print(f"⚠️ Advertencia: No se encontró el modelo en {self.model_path}. Usando modo simulación.")

    def process_base64(self, base64_str: str):
        """Convierte una cadena base64 en una imagen de OpenCV."""
        try:
            # Limpiar posibles espacios o cabeceras que se hayan colado
            base64_str = base64_str.strip()
            img_data = base64.b64decode(base64_str)
            
            print(f"DEBUG: Recibidos {len(img_data)} bytes de imagen.")
            
            nparr = np.frombuffer(img_data, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
            
            if img is None:
                print("❌ ERROR: cv2.imdecode devolvió None. ¿Es un JPEG válido?")
                return None
                
            return img
        except Exception as e:
            print(f"❌ ERROR decodificando imagen base64: {e}")
            return None

    def detect_cards(self, base64_image: str):
        """
        Realiza la detección de cartas. 
        """
        if self.model is None:
            return [], "Modo simulación: No hay modelo cargado."

        img = self.process_base64(base64_image)
        if img is None:
            return [], "Error al procesar la imagen"

        # --- DEBUG: Información de la imagen ---
        h, w, _ = img.shape
        print(f"DEBUG: Imagen recibida de {w}x{h}")
        debug_path = Path("debug_images/last_capture.jpg")
        cv2.imwrite(str(debug_path), img)
        # --------------------------------------------------

        # Inferencia
        results = self.model(img, conf=0.5, iou=0.5, agnostic_nms=True) 
        
        # Guardar imagen con resultados dibujados
        res_plotted = results[0].plot()
        cv2.imwrite("debug_images/result.jpg", res_plotted)
        print(f"DEBUG: Resultado visual guardado en debug_images/result.jpg")

        detections = []
        for result in results:
            for box in result.boxes:
                class_id = int(box.cls[0])
                conf = float(box.conf[0])
                class_name = self.model.names[class_id]
                
                # Obtener la coordenada X (centro de la caja)
                # box.xywh devuelve [x_center, y_center, width, height]
                x_center = float(box.xywh[0][0])
                
                detections.append({
                    "name": class_name,
                    "x": x_center
                })
                print(f"DEBUG: >> Detectado '{class_name}' en x={x_center:.1f} (conf {conf:.2f})")
        
        # ORDENAR DE IZQUIERDA A DERECHA
        detections.sort(key=lambda d: d["x"])
        
        # Diccionario de nombres del Truco
        TRUCO_NAMES = {
            "1-ESPADA": "el macho",
            "1-BASTO": "la hembra",
            "7-ESPADA": "el siete de espada",
            "7-ORO": "el siete de oro",
            "3-ESPADA": "el tres de espada",
            "3-BASTO": "el tres de basto",
            "3-COPA": "el tres de copa",
            "3-ORO": "el tres de oro",
            "2-ESPADA": "el dos de espada",
            "2-BASTO": "el dos de basto",
            "2-COPA": "el dos de copa",
            "2-ORO": "el dos de oro",
            "1-COPA": "el ancho falso de copa",
            "1-ORO": "el ancho falso de oro",
            "12-ESPADA": "el doce de espada",
            "4-BASTO": "el cuatro de basto",
            "4-COPA": "el cuatro de copa",
            "4-ORO": "el cuatro de oro",
            "5-COPA": "el cinco de copa",
            "7_COPAS": "el siete de copa",
        }

        # Extraer los nombres ya ordenados y traducirlos
        detected_cards = []
        friendly_names = []
        for d in detections:
            name = d["name"]
            detected_cards.append(name)
            # Si el nombre está en nuestro diccionario, usamos el nombre del truco
            friendly_names.append(TRUCO_NAMES.get(name, name.replace("-", " de ")))
        
        print(f"DEBUG: Total de cajas detectadas: {len(detected_cards)}")
        
        if not detected_cards:
            return [], "No se detectaron cartas claramente."
            
        if len(friendly_names) == 1:
            message = f"Tienes {friendly_names[0]}"
        else:
            message = f"Tienes {', '.join(friendly_names[:-1])} y {friendly_names[-1]}"
            
        return detected_cards, message
