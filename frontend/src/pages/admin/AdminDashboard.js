import { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import API from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    counselors: 0,
    appointments: 0,
    messages: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (error) {
      console.error("Error fetching stats", error);
    }
  };

  return (
    <div className="flex">

      <Sidebar />

      <div className="ml-64 p-6 w-full bg-gray-100 min-h-screen">

        <h1 className="text-2xl font-bold mb-6">
          Dashboard Overview
        </h1>

        {/* 🔥 STATS CARDS */}
        <div className="grid md:grid-cols-4 gap-6">

          {/* Students */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Students</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {stats.students}
            </p>
          </div>

          {/* Counselors */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Counselors</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {stats.counselors}
            </p>
          </div>

          {/* Appointments */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Appointments</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {stats.appointments}
            </p>
          </div>

          {/* Messages */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-gray-500 text-sm">Messages</h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {stats.messages}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;