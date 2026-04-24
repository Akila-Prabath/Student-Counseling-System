import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.error("Error fetching appointments");
    }
  };

  // 🎨 Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "ml-20" : "ml-64"} w-full p-6`}>

        <AdminHeader />

        <h2 className="text-2xl font-bold mt-6 mb-6">
          All Appointments
        </h2>

        <div className="bg-white p-6 rounded-xl shadow overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-500 text-sm">
                <th className="py-3">Student</th>
                <th>Service</th>
                <th>Counselor</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className="border-b hover:bg-gray-50">

                  {/* STUDENT */}
                  <td className="py-3">
                    {a.student?.name || "N/A"}
                  </td>

                  {/* SERVICE */}
                  <td className="capitalize">
                    {a.serviceType}
                  </td>

                  {/* COUNSELOR */}
                  <td>
                    {a.counselor?.name || "N/A"}
                  </td>

                  {/* DATE */}
                  <td>
                    {new Date(a.date).toLocaleDateString()} <br />
                    <span className="text-xs text-gray-400">
                      {a.timeSlot}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(a.status)}`}
                    >
                      {a.status}
                    </span>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
}

export default Appointments;