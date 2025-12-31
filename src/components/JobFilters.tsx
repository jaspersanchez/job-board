interface JobFiltersProps {
  filters: {
    remote: boolean | null; // null = all, true = remote only, false = onsite only
    minSalary: number;
  };
  onFilterChange: (filters: {
    remote: boolean | null;
    minSalary: number;
  }) => void;
}

export const JobFilters = ({ filters, onFilterChange }: JobFiltersProps) => {
  const handleRemoteChange = (value: boolean | null) => {
    onFilterChange({ ...filters, remote: value });
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, minSalary: Number(e.target.value) });
  };

  const handleClearFilters = () => {
    onFilterChange({ remote: null, minSalary: 0 });
  };

  const hasActiveFilters = filters.remote !== null || filters.minSalary > 0;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Work Type Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Work Type
        </label>
        <div className="flex gap-2">
          <button
            onClick={() => handleRemoteChange(null)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              filters.remote === null
                ? "border-blue-600 bg-blue-50 text-blue-700 font-semibold"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleRemoteChange(true)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              filters.remote === true
                ? "border-green-600 bg-green-50 text-green-700 font-semibold"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            🏠 Remote
          </button>
          <button
            onClick={() => handleRemoteChange(false)}
            className={`flex-1 py-2 px-4 rounded-lg border-2 transition-all ${
              filters.remote === false
                ? "border-purple-600 bg-purple-50 text-purple-700 font-semibold"
                : "border-gray-300 text-gray-700 hover:border-gray-400"
            }`}
          >
            🏢 Onsite
          </button>
        </div>
      </div>

      {/* Salary Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Minimum Salary: ₱{filters.minSalary.toLocaleString()}
        </label>
        <input
          type="range"
          min="0"
          max="150000"
          step="10000"
          value={filters.minSalary}
          onChange={handleSalaryChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
        />
        <div className="relative mt-2 text-xs text-gray-500">
          <span className="absolute left-0 -translate-x-1/2">₱0</span>
          <span className="absolute left-1/3 -translate-x-1/2">₱50k</span>
          <span className="absolute left-2/3 -translate-x-1/2">₱100k</span>
          <span className="absolute left-full -translate-x-1/2">₱150k+</span>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Active filters:
            {filters.remote !== null && (
              <span className="ml-2 inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                {filters.remote ? "Remote" : "Onsite"}
              </span>
            )}
            {filters.minSalary > 0 && (
              <span className="ml-2 inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">
                Min ₱{filters.minSalary.toLocaleString()}
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
};
