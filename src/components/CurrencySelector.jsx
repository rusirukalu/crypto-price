const CurrencySelector = () => {
  return (
    <div className="w-full">
      <label
        htmlFor="currency-selector"
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Select Cryptocurrency Pair
      </label>
      <select
        id="currency-selector"
        className="block w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        aria-label="Select Cryptocurrency Pair"
      >
        {/* The options have been removed for simplicity */}
      </select>
    </div>
  );
};

export default CurrencySelector;
