export default function AttendanceTable({ records }) {

  if (!records.length) return <p>No Attendance</p>;

  return (
    <div className="bg-white mt-4 p-4 shadow rounded">

      {records.map(r => (
        <div key={r.id} className="border-b py-2">
          {r.date} — {r.status}
        </div>
      ))}

    </div>
  );
}
