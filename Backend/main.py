from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.detect import router as detect_router
from routes.auth import router as auth_router

app = FastAPI(title="Cómplice AI")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(detect_router)


@app.get("/health")
def health():
    return {"status": "ok"}
