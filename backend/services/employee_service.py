from config.database import employee_collection
from models.employee_model import employee_helper
from fastapi import HTTPException


async def create_employee(employee):

    existing = await employee_collection.find_one({
        "employee_id": employee.employee_id
    })

    if existing:
        raise HTTPException(status_code=400, detail="Employee already exists")

    await employee_collection.insert_one(employee.dict())

    return {"message": "Employee created successfully"}


async def get_all_employees():

    employees = []

    async for emp in employee_collection.find():
        employees.append(employee_helper(emp))

    return employees


async def delete_employee(employee_id):

    result = await employee_collection.delete_one({
        "employee_id": employee_id
    })

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"message": "Employee deleted"}
