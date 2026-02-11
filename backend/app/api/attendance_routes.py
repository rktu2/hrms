from fastapi import APIRouter
from app.schemas.attendance_schema import AttendanceCreate
from app.services.attendance_service import (
    mark_attendance,
    get_employee_attendance
)

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/")
async def add_attendance(data: AttendanceCreate):
    return await mark_attendance(data)


@router.get("/{employee_id}")
async def fetch_attendance(employee_id: str):
    return await get_employee_attendance(employee_id)
