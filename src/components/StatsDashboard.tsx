interface StatsDashboardProps {
  totalCount: number;
  healthyCount: number;
  thirstyCount: number;
  filter: 'all' | 'healthy' | 'thirsty';
  setFilter: (filter: 'all' | 'healthy' | 'thirsty') => void;
}

export default function StatsDashboard({
  totalCount,
  healthyCount,
  thirstyCount,
  filter,
  setFilter,
}: StatsDashboardProps) {
  return (
    <section className="grid grid-cols-3 gap-4 mb-8">
      {/* Total Card */}
      <button
        onClick={() => setFilter('all')}
        className={`bg-white p-4 rounded-xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer relative group ${
          filter === 'all'
            ? 'border-[#215336] ring-1 ring-[#215336] bg-[#cdebc4]/10'
            : 'border-[#c0c9c0] hover:border-[#215336]/60'
        }`}
        id="stat-box-total"
        title="Show all herbs"
      >
        <span className="text-[10px] sm:text-xs font-bold text-[#414942] uppercase tracking-wider">
          Total
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-[#215336] mt-1">
          {totalCount}
        </span>
        <span className="absolute bottom-1 right-2 text-[8px] opacity-0 group-hover:opacity-50 transition-opacity hidden md:inline">
          View All
        </span>
      </button>

      {/* In Season / Healthy Card */}
      <button
        onClick={() => setFilter('healthy')}
        className={`bg-white p-4 rounded-xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer relative group ${
          filter === 'healthy'
            ? 'border-[#4b6546] ring-1 ring-[#4b6546] bg-[#cdebc4]/10'
            : 'border-[#c0c9c0] hover:border-[#4b6546]/60'
        }`}
        id="stat-box-season"
        title="Show healthy herbs"
      >
        <span className="text-[10px] sm:text-xs font-bold text-[#414942] uppercase tracking-wider">
          In Season
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-[#4b6546] mt-1">
          {healthyCount}
        </span>
        <span className="absolute bottom-1 right-2 text-[8px] opacity-0 group-hover:opacity-50 transition-opacity hidden md:inline">
          View Active
        </span>
      </button>

      {/* Alerts / Thirst Card */}
      <button
        onClick={() => setFilter('thirsty')}
        className={`bg-white p-4 rounded-xl border transition-all flex flex-col items-center justify-center text-center cursor-pointer relative group ${
          filter === 'thirsty'
            ? 'border-[#ba1a1a] ring-1 ring-[#ba1a1a] bg-[#ffdad6]/20'
            : 'border-[#c0c9c0] hover:border-[#ba1a1a]/60'
        }`}
        id="stat-box-alerts"
        title="Show herbs that need watering"
      >
        <span className="text-[10px] sm:text-xs font-bold text-[#414942] uppercase tracking-wider">
          Alerts
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-[#ba1a1a] mt-1">
          {thirstyCount}
        </span>
        <span className="absolute bottom-1 right-2 text-[8px] opacity-0 group-hover:opacity-50 transition-opacity hidden md:inline">
          View Thirsty
        </span>
      </button>
    </section>
  );
}
