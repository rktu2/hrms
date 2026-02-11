from fastapi import APIRouter
from app.schemas.employee_schema import EmployeeCreate
from app.services.employee_service import (
    create_employee,
    get_all_employees,
    delete_employee
)

router = APIRouter(prefix="/employees", tags=["Employees"])


@router.post("/")
async def add_employee(employee: EmployeeCreate):
    return await create_employee(employee)


@router.get("/")
async def fetch_employees():
    return await get_all_employees()


@router.delete("/{employee_id}")
async def remove_employee(employee_id: str):
    return await delete_employee(employee_id)
