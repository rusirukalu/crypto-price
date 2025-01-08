const Chart = () => {
  return (
    <div className="transform transition-all duration-300 hover:scale-[1.01]">
      <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-2xl shadow-2xl p-6 border border-gray-700/30 backdrop-blur-xl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Price Chart
            </h2>
            <p className="text-gray-400 text-sm mt-1">Real-time market data</p>
          </div>

          {/* Time Range Filters */}
          <div className="flex gap-2">
            {['1H', '24H', '1W', '1M', '1Y'].map((range) => (
              <button
                key={range}
                className="px-3 py-1.5 text-sm font-medium rounded-lg 
                          bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 
                          transition-all duration-200 hover:text-white
                          focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-[400px] relative">
          {/* Placeholder for actual chart */}
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700/20 to-gray-800/20 rounded-xl border border-gray-700/30">
            {/* Loading Animation */}
            <div className="h-full w-full flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-pulse flex space-x-4">
                  <div className="h-12 w-12 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
                </div>
                <p className="text-gray-400 mt-4">Loading chart data...</p>
              </div>
            </div>
          </div>

          {/* Chart Controls */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors">
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;