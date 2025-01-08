import { useChartData } from './hooks/useChartData';
import CurrencySelector from './components/CurrencySelector';
import DateRangePicker from './components/DateRangePicker';
import Chart from './components/Chart';

function App() {
  useChartData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">
        Crypto Price Chart
      </h1>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-lg">
          <CurrencySelector />
          <DateRangePicker />
        </div>
        <div className="w-full mt-4">
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default App;
