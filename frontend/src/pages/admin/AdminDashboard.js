import Sidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import StatsCard from "../../components/admin/StatsCard";
import Charts from "../../components/admin/Charts";
import RecentTable from "../../components/admin/RecentTable";
import DashboardStats from "../../components/admin/DashboardStats";
import ServicePieChart from "../../components/admin/ServicePieChart";

import { Users, UserCheck, CalendarDays, MessageCircle } from "lucide-react";

import { useEffect, useState } from "react";
import API from "../../services/api";

function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    counselors: 0,
    appointments: 0,
    messages: 0
  });

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
    <div className="bg-gradient-to-br from-orange-50 to-orange-300 dark:from-gray-900 dark:to-gray-800">

      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div
        className={`transition-all duration-300 p-6 md:p-5 space-y-8
        ${collapsed ? "md:ml-20" : "md:ml-64"}`}
      >

        <AdminHeader
          setMobileOpen={setMobileOpen}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        {/* 🔥 HEADER */}
        <div className="flex justify-between items-center">

          {/*<div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Monitor your system performance & activity
            </p>
          </div>*/}

        </div>

        {/* 🔥 PREMIUM STATS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatsCard
            title="Students"
            value={stats.students}
            growth={12}
            icon={<Users size={20} />}
            color="bg-blue-100 text-blue-600"
          />

          <StatsCard
            title="Counselors"
            value={stats.counselors}
            growth={8}
            icon={<UserCheck size={20} />}
            color="bg-purple-100 text-purple-600"
          />

          <StatsCard
            title="Appointments"
            value={stats.appointments}
            growth={15}
            icon={<CalendarDays size={20} />}
            color="bg-orange-100 text-orange-600"
          />

          <StatsCard
            title="Messages"
            value={stats.messages}
            growth={5}
            icon={<MessageCircle size={20} />}
            color="bg-green-100 text-green-600"
          />

        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-4">

          <div className="lg:col-span-2 space-y-4">
            <div className="premium-card p-4">
              <Charts />
            </div>

            <div className="premium-card p-4">
              <RecentTable />
            </div>

          </div>

          <div className="space-y-4">
            <div className="premium-card p-4">
              <ServicePieChart />
            </div>
            <div className="premium-card p-4 sticky top-4">
              <DashboardStats />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;