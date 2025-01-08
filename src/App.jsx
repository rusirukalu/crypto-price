import { useChartData } from './hooks/useChartData';
import CurrencySelector from './components/CurrencySelector';
import DateRangePicker from './components/DateRangePicker';
import Chart from './components/Chart';

function App() {
  useChartData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-gray-800 to-black text-white">
      <div className="container mx-auto p-6">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          Crypto Price Chart
        </h1>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-8">
          {/* Selection Panel */}
          <div className="w-full max-w-2xl bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-6 space-y-6">
            <CurrencySelector />
            <DateRangePicker />
          </div>

          {/* Chart Section */}
          <div className="w-full max-w-4xl bg-gray-900 bg-opacity-80 rounded-lg shadow-xl p-6">
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
