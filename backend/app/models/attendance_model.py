def attendance_helper(att) -> dict:
    return {
        "id": str(att["_id"]),
        "employee_id": att["employee_id"],
        "date": str(att["date"]),
        "status": att["status"]
    }
