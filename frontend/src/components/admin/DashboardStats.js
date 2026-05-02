import { useEffect, useState } from "react";
import API from "../../services/api";

import { toast } from "react-toastify";

function DashboardStats() {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    rejected: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const res = await API.get("/appointments");

      const appointments = res.data;

      setStats({
        total: appointments.length,

        pending: appointments.filter(
          (a) => a.status === "pending"
        ).length,

        completed: appointments.filter(
          (a) => a.status === "completed"
        ).length,

        rejected: appointments.filter(
          (a) => a.status === "rejected"
        ).length
      });

    } catch (error) {

      console.error(
        "Error fetching stats",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load dashboard statistics"
      );
    }
  };

  const items = [
    {
      label: "Total Appointments",
      value: stats.total,
      color: "bg-blue-500"
    },

    {
      label: "Pending",
      value: stats.pending,
      color: "bg-yellow-300"
    },

    {
      label: "Completed",
      value: stats.completed,
      color: "bg-green-500"
    },

    {
      label: "Rejected",
      value: stats.rejected,
      color: "bg-red-500"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow mt-6">

      <h3 className="font-semibold mb-4 text-lg">
        Appointment Overview
      </h3>

      <div className="space-y-4">

        {items.map((item, i) => (

          <div key={i}>

            {/* Label + Count */}
            <div className="flex justify-between mb-1 text-sm">

              <span className="text-gray-600 dark:text-gray-300">
                {item.label}
              </span>

              <span className="font-semibold">
                {item.value}
              </span>

            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full">

              <div
                className={`${item.color} h-2 rounded-full`}
                style={{
                  width: stats.total
                    ? `${
                        (item.value /
                          stats.total) *
                        100
                      }%`
                    : "0%"
                }}
              ></div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default DashboardStats;