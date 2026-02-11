import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h1>HRMS Lite</h1>

      <Link to="/">Dashboard</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/attendance">Attendance</Link>
    </div>
  );
}
