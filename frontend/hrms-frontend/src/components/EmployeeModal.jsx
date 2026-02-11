
import { useState } from "react";
import "./Modal.css";
import api from "../services/api";

export default function EmployeeModal({ close, refresh }) {

  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addEmployee = async () => {
    const res = await fetch("http://127.0.0.1:8000/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    if (res.ok) {
      refresh();
      close();
    } else {
      alert("Error adding employee");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal-box">

        <h2>Add Employee</h2>

        <input name="employee_id" placeholder="Employee ID" onChange={handleChange}/>
        <input name="full_name" placeholder="Full Name" onChange={handleChange}/>
        <input name="email" placeholder="Email" onChange={handleChange}/>
        <input name="department" placeholder="Department" onChange={handleChange}/>

        <div className="modal-actions">
          <button onClick={close}>Cancel</button>
          <button className="btn-primary" onClick={addEmployee}>Add</button>
        </div>

      </div>
    </div>
  );
}
