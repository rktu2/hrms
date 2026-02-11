import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

export default function EmployeeForm({ refresh }) {

  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {

    try {
      setLoading(true);

      await api.post("/employees/", form);

      toast.success("Employee Added");

      setForm({});
      refresh();

    } catch {
      toast.error("Error adding employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">

      <h2 className="font-bold mb-3">Add Employee</h2>

      {["employee_id", "full_name", "email", "department"].map(field => (
        <input
          key={field}
          placeholder={field}
          value={form[field] || ""}
          className="input"
          onChange={e => setForm({ ...form, [field]: e.target.value })}
        />
      ))}

      <button onClick={submit} className="btn">
        {loading ? "Adding..." : "Add"}
      </button>

    </div>
  );
}
