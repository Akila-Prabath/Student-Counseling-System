function RecentTable() {
  const data = [
    { name: "John", service: "Therapy", date: "2026-04-20" },
    { name: "Sara", service: "Counseling", date: "2026-04-19" },
    { name: "Mike", service: "Stress Mgmt", date: "2026-04-18" },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow mt-6">

      <h3 className="font-semibold mb-4">Recent Appointments</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-500 text-sm border-b">
            <th className="pb-2">Name</th>
            <th className="pb-2">Service</th>
            <th className="pb-2">Date</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, i) => (
            <tr key={i} className="border-b text-sm">
              <td className="py-3">{item.name}</td>
              <td>{item.service}</td>
              <td>{item.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default RecentTable;