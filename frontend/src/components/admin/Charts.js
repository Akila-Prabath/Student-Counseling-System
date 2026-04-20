import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  { name: "Jan", value: 100 },
  { name: "Feb", value: 200 },
  { name: "Mar", value: 150 },
  { name: "Apr", value: 300 },
  { name: "May", value: 250 },
  { name: "Jun", value: 320 },
];

function Charts() {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-6">

      {/* Bar Chart */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow md:col-span-2">
        <h3 className="font-semibold mb-4">Monthly Appointments</h3>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart */}
      <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow">
        <h3 className="font-semibold mb-4">Growth</h3>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <Tooltip />
            <Line type="monotone" dataKey="value" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default Charts;