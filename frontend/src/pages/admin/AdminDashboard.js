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
    <div className="flex bg-gray-50 dark:bg-gray-900">

      <Sidebar />

      <div className="ml-64 w-full p-6 min-h-screen">

        <AdminHeader />

        <h1 className="text-2xl font-bold mt-6">
          Dashboard Overview
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-6">
          <StatsCard title="Students" value={stats.students} growth={12} />
          <StatsCard title="Counselors" value={stats.counselors} growth={8} />
          <StatsCard title="Appointments" value={stats.appointments} growth={15} />
          <StatsCard title="Messages" value={stats.messages} growth={5} />
        </div>

        {/* Charts */}
        <Charts />

        {/* Table */}
        <RecentTable />

      </div>
    </div>
  );
}

export default AdminDashboard;