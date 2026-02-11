import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import "./attendance.css";

export default function AttendanceForm({ refresh }) {

  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {

    if (!form.employee_id || !form.date || !form.status) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await api.post("/attendance/", form);

      toast.success("Attendance Marked Successfully");

      refresh(form.employee_id);

      setForm({
        employee_id: "",
        date: "",
        status: ""
      });

    } catch (err) {

      const msg =
        err?.response?.data?.detail ||
        "Something went wrong";

      toast.error(msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-card">

      <h3 className="attendance-title">Mark Attendance</h3>

      <input
        name="employee_id"
        value={form.employee_id}
        placeholder="Employee ID"
        onChange={handleChange}
        className="attendance-input"
      />

      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        className="attendance-input"
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
        className="attendance-input"
      >
        <option value="">Select Status</option>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>

      <button
        className="attendance-btn"
        onClick={submit}
        disabled={loading}
      >
        {loading ? "Saving..." : "Mark Attendance"}
      </button>

    </div>
  );
}
