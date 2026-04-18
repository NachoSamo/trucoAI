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

        # Inferencia con umbral muy bajo (0.1) para forzar cualquier detección
        results = self.model(img, conf=0.3, iou=0.4, agnostic_nms=True) 
        
        # Guardar imagen con resultados dibujados (aunque no haya nada)
        res_plotted = results[0].plot()
        cv2.imwrite("debug_images/result.jpg", res_plotted)
        print(f"DEBUG: Resultado visual guardado en debug_images/result.jpg")

        detected_cards = []
        box_count = 0
        for result in results:
            box_count += len(result.boxes)
            for box in result.boxes:
                class_id = int(box.cls[0])
                conf = float(box.conf[0])
                class_name = self.model.names[class_id]
                detected_cards.append(class_name)
                print(f"DEBUG: >> Detectado '{class_name}' con confianza {conf:.2f}")
        
        print(f"DEBUG: Total de cajas detectadas: {box_count}")
        
        detected_cards = list(dict.fromkeys(detected_cards))
        
        if not detected_cards:
            return [], "No se detectaron cartas claramente."
            
        message = f"Detecté: {', '.join(detected_cards)}"
        return detected_cards, message
