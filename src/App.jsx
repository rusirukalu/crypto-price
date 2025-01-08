import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  // Hardcoded list of currency pairs
  const supportedPairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT'];
  const [selectedPair, setSelectedPair] = useState('');
  const [priceData, setPriceData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const dropdownRef = useRef(null);
  const today = new Date().toISOString().split("T")[0];

  const formatPairDisplay = (pair) => {
    if (!pair) return 'Select Trading Pair';
    return pair.slice(0, 3) + ' / ' + pair.slice(3);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(price);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsSelectOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedPair && startDate && endDate) {
      const fetchPriceData = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://api.binance.com/api/v3/klines`,
            {
              params: {
                symbol: selectedPair,
                interval: '1d',
                startTime: new Date(startDate).getTime(),
                endTime: new Date(endDate).getTime(),
              }
            }
          );
          const prices = response.data.map(item => ({
            x: new Date(item[0]).toLocaleDateString(),
            y: parseFloat(item[4])
          }));
          setPriceData(prices);
        } catch (error) {
          console.error('Error fetching price data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPriceData();
    }
  }, [selectedPair, startDate, endDate]);

  const chartData = {
    labels: priceData.map(item => item.x),
    datasets: [
      {
        label: `${selectedPair ? formatPairDisplay(selectedPair) : ''} Price History`,
        data: priceData.map(item => item.y),
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 5,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            family: 'Inter, sans-serif',
            size: 12
          },
          color: 'rgb(156, 163, 175)'
        }
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: 'rgba(17, 24, 39, 0.8)',
        titleColor: 'rgb(229, 231, 235)',
        bodyColor: 'rgb(229, 231, 235)',
        borderColor: 'rgba(75, 85, 99, 0.2)',
        borderWidth: 1,
      }
    },
    scales: {
      y: {
        grid: {
          color: 'rgba(75, 85, 99, 0.1)',
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          callback: (value) => formatPrice(value)
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: 'rgb(156, 163, 175)',
          maxRotation: 45,
          minRotation: 45
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Cryptocurrency Price Visualizer
          </h1>
          <p className="text-gray-400">Track and analyze cryptocurrency price movements</p>
        </div>

        <div className="bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 shadow-2xl mb-8 border border-gray-700/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Currency Pair Selector */}
            <div className="relative" ref={dropdownRef}>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Trading Pair
              </label>
              <div className="relative">
                <button
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className={`w-full bg-gray-700 border-2 ${
                    selectedPair ? 'border-blue-500/50' : 'border-gray-600'
                  } rounded-xl px-4 py-3 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 hover:bg-gray-600/50`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`${selectedPair ? 'text-white' : 'text-gray-400'} font-medium`}>
                      {formatPairDisplay(selectedPair)}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        isSelectOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isSelectOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl max-h-[300px] overflow-y-auto custom-scrollbar">
                    <div className="py-2">
                      {supportedPairs.map((pair) => (
                        <button
                          key={pair}
                          className={`w-full px-4 py-2 text-left hover:bg-gray-700/50 transition-colors ${
                            selectedPair === pair ? 'bg-blue-500/10 text-blue-400' : 'text-white'
                          }`}
                          onClick={() => {
                            setSelectedPair(pair);
                            setIsSelectOpen(false);
                          }}
                        >
                          {formatPairDisplay(pair)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                max={today}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                max={today}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
          
          <div className="relative h-[60vh] w-full">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            ) : priceData.length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                Select a date range to view price history
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;