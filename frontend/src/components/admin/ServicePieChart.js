import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#6050DC", 
  "#D52DB7", 
  "#FF2E7E", 
  "#FF6B45", 
  "#FFAB05"  
];

function ServicePieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await API.get("/appointments");

      const counts = {};

      res.data.forEach((a) => {
        const type = a.serviceType;
        counts[type] = (counts[type] || 0) + 1;
      });

      const formatted = Object.keys(counts).map((key) => ({
        name: key,
        value: counts[key]
      }));

      setData(formatted);

    } catch (err) {
      console.error("Error fetching service chart", err);
    }
  };

  // 🔥 Custom Tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 rounded shadow text-sm">
          <p className="font-semibold">{payload[0].name}</p>
          <p>{payload[0].value} appointments</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="premium-card p-4">

      <h3 className="font-semibold text-gray-700 dark:text-white mb-4">
        Service Distribution
      </h3>

      <ResponsiveContainer width="100%" height={260}>
        <PieChart>

          <Pie
            data={data}
            innerRadius={70}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip content={<CustomTooltip />} />
            
        </PieChart>
      </ResponsiveContainer>

      {/* 🔥 Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-sm">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            ></span>
            {item.name}
          </div>
        ))}
      </div>

    </div>
  );
}

export default ServicePieChart;