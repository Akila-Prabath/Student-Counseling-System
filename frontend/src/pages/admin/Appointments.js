import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import API from "../../services/api";
import { FaTrash } from "react-icons/fa";

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

  // 🔥 UPDATE STATUS
  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/appointments/admin/${id}/status`, {
        status: newStatus
      });

      // 🔥 update UI instantly
      setAppointments((prev) =>
        prev.map((a) =>
          a._id === id ? { ...a, status: newStatus } : a
        )
      );

    } catch (error) {
      console.error("Failed to update status");
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

  // 🔥 DELETE APPOINTMENT
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/appointments/${id}`);

      // 🔥 remove from UI instantly
      setAppointments((prev) =>
        prev.filter((a) => a._id !== id)
      );

    } catch (error) {
      console.error("Delete failed");
      alert("❌ Failed to delete appointment");
    }
  };

  return (
    <div className="flex bg-gradient-to-br from-orange-50 to-orange-300 dark:from-gray-900 dark:to-gray-800 min-h-screen">

      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className={`${collapsed ? "ml-20" : "ml-64"} w-full p-6 transition-all duration-300`}>

        <AdminHeader collapsed={collapsed} setCollapsed={setCollapsed} />

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
                <th className="text-center">Actions</th>
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

                  {/* 🔥 STATUS DROPDOWN */}
                  <td>
                    <select
                      value={a.status}
                      onChange={(e) =>
                        handleStatusChange(a._id, e.target.value)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(a.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>

                  {/* 🔥 ACTIONS */}
                  <td className="text-center">

                    <button
                      onClick={() => handleDelete(a._id)}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      <FaTrash />
                    </button>

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