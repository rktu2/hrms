import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    const res = await api.get("/employees/");
    setEmployees(res.data);
  };

  return (
    <div>

      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">

        <div className="bg-white p-5 rounded shadow">
          <p className="text-gray-500">Total Employees</p>
          <h2 className="text-2xl font-bold">{employees.length}</h2>
        </div>

      </div>

    </div>
  );
}
