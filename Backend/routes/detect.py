from fastapi import APIRouter
from schemas.detect import DetectRequest, DetectResponse
from services.yolo_service import YOLOService

router = APIRouter()
yolo_service = YOLOService() # Inicializa una vez al arrancar


@router.post("/detect", response_model=DetectResponse)
async def detect(request: DetectRequest):
    cards, message = yolo_service.detect_cards(request.image)
    return DetectResponse(cards=cards, message=message)
