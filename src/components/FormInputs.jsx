import { useState } from "react";

const CurrencyDateSelector = () => {
  const [currency, setCurrency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    const data = {
      currency,
      startDate,
      endDate,
    };
    console.log(JSON.stringify(data));
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <label
          htmlFor="currency-selector"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Select Cryptocurrency Pair
        </label>
        <select
          id="currency-selector"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="block w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          aria-label="Select Cryptocurrency Pair"
        >
          {/* Add options here */}
          <option value="">Select a pair</option>
          <option value="BTC/USD">BTC / USD</option>
          <option value="ETH/USD">ETH / USD</option>
          <option value="BNB/USDT">BNB / USDT</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row items-center sm:space-x-4 space-y-4 sm:space-y-0">
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
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            aria-label="Select Start Date"
            className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

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
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            aria-label="Select End Date"
            className="w-full px-4 py-3 bg-gray-100 text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200"
      >
        Submit
      </button>
    </div>
  );
};

export default CurrencyDateSelector;