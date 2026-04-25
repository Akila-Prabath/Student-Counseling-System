import { useEffect, useState } from "react";
import API from "../../services/api";

function RecentTable() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchRecent();
  }, []);

  const fetchRecent = async () => {
    try {
      const res = await API.get("/appointments");

      const latest = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setAppointments(latest);

    } catch (error) {
      console.error("Error fetching recent appointments", error);
    }
  };

  const getStatusColor = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";

    case "completed":
      return "bg-blue-100 text-blue-700 border border-blue-200";

    case "rejected":
      return "bg-red-100 text-red-700 border border-red-200";

    case "approved":
      return "bg-green-100 text-green-700 border border-green-200";
  }
};

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-2xl shadow mt-6">

      <h3 className="font-semibold mb-4">Recent Appointments</h3>

      <table className="w-full text-left">

        <thead>
          <tr className="border-b text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
            <th className="pb-2">Student</th>
            <th className="pb-2">Service</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr key={a._id} className="border-b text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">

              {/* 🔥 STUDENT WITH IMAGE */}
              <td className="py-2 flex items-center gap-2">

                <img
                  src={
                    a.student?.profilePic
                      ? `http://localhost:8070/uploads/${a.student.profilePic}`
                      : "https://i.pravatar.cc/40"
                  }
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://i.pravatar.cc/40";
                  }}
                />

                <span className="font-medium">
                  {a.student?.name || "N/A"}
                </span>

              </td>

              {/* SERVICE */}
              <td className="capitalize">
                {a.serviceType}
              </td>

              {/* STATUS */}
              <td>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(a.status)}`}
                >
                  {a.status}
                </span>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
          
    </div>
  );
}

export default RecentTable;