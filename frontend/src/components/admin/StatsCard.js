function StatsCard({ title, value, growth }) {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">

      <p className="text-gray-500 text-sm">{title}</p>

      <div className="flex justify-between items-center mt-2">
        <h2 className="text-3xl font-bold">{value}</h2>

        <span className="text-sm text-green-500 bg-green-100 px-2 py-1 rounded">
          +{growth}%
        </span>
      </div>

    </div>
  );
}

export default StatsCard;