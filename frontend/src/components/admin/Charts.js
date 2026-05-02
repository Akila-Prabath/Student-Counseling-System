import { useEffect, useState } from "react";
import API from "../../services/api";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

import { toast } from "react-toastify";

function Charts() {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {

    try {

      const res = await API.get("/appointments");

      setData(processData(res.data));

    } catch (error) {

      console.error(
        "Error fetching chart data",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to load chart data"
      );
    }
  };

  const processData = (appointments) => {

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    const counts = Array(12).fill(0);

    appointments.forEach((a) => {

      const month = new Date(
        a.date
      ).getMonth();

      counts[month]++;
    });

    return months.map((m, i) => ({
      name: m,
      appointments: counts[i]
    }));
  };

  // Custom Tooltip
  const CustomTooltip = ({
    active,
    payload,
    label
  }) => {

    if (
      active &&
      payload &&
      payload.length
    ) {

      return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg px-4 py-2 text-sm">

          <p className="font-semibold">
            {label}
          </p>

          <p className="text-orange-500">
            {payload[0].value} appointments
          </p>

        </div>
      );
    }

    return null;
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">

      {/* BAR CHART */}
      <div className="premium-card p-6 md:col-span-3">

        <h3 className="font-semibold mb-4 text-gray-700 dark:text-white">
          Monthly Appointments
        </h3>

        <ResponsiveContainer
          width="100%"
          height={260}
        >

          <BarChart
            data={data}
            syncId="dashboard"
          >

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.1}
            />

            <XAxis dataKey="name" />

            <Tooltip
              content={<CustomTooltip />}
            />

            <Legend />

            <Bar
              dataKey="appointments"
              fill="#f97316"
              radius={[8, 8, 0, 0]}
              maxBarSize={35}
              animationDuration={800}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* LINE CHART */}
      {/* 
      <div className="premium-card p-6">

        <h3 className="font-semibold mb-4 text-gray-700 dark:text-white">
          Growth Trend
        </h3>

        <ResponsiveContainer width="100%" height={260}>

          <LineChart data={data} syncId="dashboard">

            <CartesianGrid
              strokeDasharray="3 3"
              opacity={0.1}
            />

            <XAxis dataKey="name" />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 7 }}
              animationDuration={800}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>
      */}

    </div>
  );
}

export default Charts;