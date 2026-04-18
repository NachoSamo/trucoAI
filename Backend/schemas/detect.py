from pydantic import BaseModel


class DetectRequest(BaseModel):
    image: str  # base64 JPEG


class DetectResponse(BaseModel):
    cards: list[str]
    message: str
