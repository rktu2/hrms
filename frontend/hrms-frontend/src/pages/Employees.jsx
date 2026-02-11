import { useEffect, useState } from "react";
import EmployeeModal from "../components/EmployeeModal";
import api from "../services/api";

export default function Employees() {

  const [employees, setEmployees] = useState([]);
  const [show, setShow] = useState(false);

  const fetchEmployees = async () => {
    const res = await fetch("https://hrms-2-v6ol.onrender.com/employees");
    const data = await res.json();
    setEmployees(data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const deleteEmployee = async (id) => {
    await fetch(`http://127.0.0.1:8000/employees/${id}`, {
      method: "DELETE"
    });
    fetchEmployees();
  };

  return (
    <div className="card">

      <h1>Employees</h1>

      <button className="btn-primary" onClick={() => setShow(true)}>
        Add Employee
      </button>

      {show && (
        <EmployeeModal close={() => setShow(false)} refresh={fetchEmployees}/>
      )}

      <table border="1" width="100%" style={{marginTop:"20px"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map(emp => (
            <tr key={emp.employee_id}>
              <td>{emp.employee_id}</td>
              <td>{emp.full_name}</td>
              <td>{emp.email}</td>
              <td>{emp.department}</td>
              <td>
                <button
                  className="btn-danger"
                  onClick={() => deleteEmployee(emp.employee_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}
