import { useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceTable from "../components/AttendanceTable";
import api from "../services/api";
import toast from "react-hot-toast";
import "./attendancePage.css";

export default function Attendance() {

  const [records, setRecords] = useState([]);
  const [employeeId, setEmployeeId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchAttendance = async (id) => {

    if (!id) {
      toast.error("Please enter Employee ID");
      return;
    }

    try {
      setLoading(true);

      const res = await api.get(`/attendance/${id}`);

      setRecords(res.data);

      if (res.data.length === 0) {
        toast("No attendance records found");
      }

    } catch (err) {

      const msg =
        err?.response?.data?.detail ||
        "Failed to fetch attendance";

      toast.error(msg);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-page">

      <h2 className="attendance-heading">Attendance Management</h2>

      <div className="attendance-grid">

        {/* Left → Form */}
        <AttendanceForm refresh={fetchAttendance} />

        {/* Right → Search + Table */}
        <div className="attendance-right">

          <div className="attendance-search">

            <input
              placeholder="Enter Employee ID"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              className="attendance-input"
            />

            <button
              className="attendance-search-btn"
              onClick={() => fetchAttendance(employeeId)}
            >
              Search
            </button>

          </div>

          {loading ? (
            <p className="attendance-loading">Loading...</p>
          ) : (
            <AttendanceTable records={records} />
          )}

        </div>
      </div>
    </div>
  );
}
