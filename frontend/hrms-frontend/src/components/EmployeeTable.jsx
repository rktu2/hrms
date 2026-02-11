import api from "../services/api";
import toast from "react-hot-toast";

export default function EmployeeTable({ employees, refresh }) {

  const remove = async (id) => {
    await api.delete(`/employees/${id}`);
    toast.success("Deleted");
    refresh();
  };

  if (!employees.length) return <p>No Employees</p>;

  return (
    <div className="bg-white mt-4 rounded shadow">

      <table className="w-full">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Dept</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {employees.map(e => (
            <tr key={e.employee_id} className="border-b text-center">

              <td>{e.employee_id}</td>
              <td>{e.full_name}</td>
              <td>{e.department}</td>

              <td>
                <button
                  className="text-red-500"
                  onClick={() => remove(e.employee_id)}
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
