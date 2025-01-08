const DateRangePicker = () => {
  return (
    <div className="mb-6 flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
      {/* Start Date Picker */}
      <div className="w-full">
        <label
          htmlFor="start-date"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Start Date
        </label>
        <input
          id="start-date"
          type="date"
          aria-label="Select Start Date"
          className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>

      {/* End Date Picker */}
      <div className="w-full">
        <label
          htmlFor="end-date"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          End Date
        </label>
        <input
          id="end-date"
          type="date"
          aria-label="Select End Date"
          className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />
      </div>
    </div>
  );
};

export default DateRangePicker;
