from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.employee_routes import router as employee_router
from api.attendance_routes import router as attendance_router

app = FastAPI(title="HRMS Lite API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(employee_router)
app.include_router(attendance_router)
