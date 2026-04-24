import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import StatsCard from "../../components/admin/StatsCard";
import Charts from "../../components/admin/Charts";
import RecentTable from "../../components/admin/RecentTable";

import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    counselors: 0,
    appointments: 0,
    messages: 0
  });

  // 🔥 Sidebar states
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/admin/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gray-200 dark:bg-gray-900 min-h-screen">

      {/* 🔥 Sidebar */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* 🔥 MAIN CONTENT */}
      <div
        className={`transition-all duration-300 p-4 md:p-6
          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >

        {/* 🔥 Header with mobile toggle */}
        <AdminHeader setMobileOpen={setMobileOpen} />

        <h1 className="text-xl md:text-2xl font-bold mt-6 text-gray-800 dark:text-white">
          Dashboard Overview
        </h1>

        {/* 🔥 Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
          <StatsCard title="Students" value={stats.students} growth={12} />
          <StatsCard title="Counselors" value={stats.counselors} growth={8} />
          <StatsCard title="Appointments" value={stats.appointments} growth={15} />
          <StatsCard title="Messages" value={stats.messages} growth={5} />
        </div>

        {/* 🔥 Charts */}
        <div className="mt-6">
          <Charts />
        </div>

        {/* 🔥 Table */}
        <div className="mt-6">
          <RecentTable />
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;