from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.lifespan import app_lifespan
from api.middlewares import UserConfigEnvUpdateMiddleware
from api.v1.ppt.router import API_V1_PPT_ROUTER
import os

app = FastAPI(
    title="Presenton API",
    description="AI Presentation Generator API",
    version="1.0.0",
    lifespan=app_lifespan
)

# Routers
app.include_router(API_V1_PPT_ROUTER)

# Middlewares
# Allow all origins for cloud deployment, can be restricted in production
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(UserConfigEnvUpdateMiddleware)

# Health check endpoint for cloud platforms
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "presenton-api"}
