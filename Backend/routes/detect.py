from fastapi import APIRouter
from schemas.detect import DetectRequest, DetectResponse

router = APIRouter()


@router.post("/detect", response_model=DetectResponse)
async def detect(request: DetectRequest):
    # TODO: pasar imagen a YOLO y retornar cartas detectadas
    return DetectResponse(cards=[], message="Detección simulada")
