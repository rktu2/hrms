from fastapi import HTTPException
from config.database import attendance_collection, employee_collection
from models.attendance_model import attendance_helper


async def mark_attendance(data):

    # ✅ Check employee exists
    employee = await employee_collection.find_one({
        "employee_id": data.employee_id
    })

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    # ✅ Duplicate check
    existing = await attendance_collection.find_one({
        "employee_id": data.employee_id,
        "date": str(data.date)
    })

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Attendance already marked for this date"
        )

    attendance = {
        "employee_id": data.employee_id,
        "date": str(data.date),
        "status": data.status
    }

    await attendance_collection.insert_one(attendance)

    return {"message": "Attendance marked successfully"}


async def get_employee_attendance(employee_id):

    records = []

    async for rec in attendance_collection.find({
        "employee_id": employee_id
    }):
        records.append(attendance_helper(rec))

    return records
