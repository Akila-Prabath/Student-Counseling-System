function StatsCard({ title, value, growth, icon, color }) {
  const positive = growth >= 0;

  return (
    <div className="premium-card p-5 hover:-translate-y-1 transition">

      {/* ICON */}
      <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${color}`}>
        {icon}
      </div>

      {/* TITLE */}
      <p className="text-xs text-gray-500 mt-3 uppercase tracking-wide">
        {title}
      </p>

      {/* VALUE */}
      <div className="flex justify-between items-end mt-2">
        <h2 className="text-3xl font-semibold tracking-tight">
          {value}
        </h2>

        <span className={`text-xs px-2 py-1 rounded-md ${
          positive
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}>
          {positive ? "+" : ""}{growth}%
        </span>
      </div>

    </div>
  );
}

export default StatsCard;