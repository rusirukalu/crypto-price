import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const App = () => {
  const [currencyPairs, setCurrencyPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState('BTCUSDT');
  const [priceData, setPriceData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    // Fetch available trading pairs from Binance API
    axios.get('https://api.binance.com/api/v3/exchangeInfo')
      .then(response => {
        const pairs = response.data.symbols
          .filter(symbol => symbol.status === 'TRADING')
          .map(symbol => symbol.symbol);
        setCurrencyPairs(pairs);
      });
  }, []);

  useEffect(() => {
    if (selectedPair && startDate && endDate) {
      // Fetch historical price data for the selected currency pair
      const fetchPriceData = async () => {
        try {
          const response = await axios.get(
            `https://api.binance.com/api/v3/klines`, {
              params: {
                symbol: selectedPair,
                interval: '1d', // Daily prices
                startTime: new Date(startDate).getTime(),
                endTime: new Date(endDate).getTime(),
              }
            }
          );
          const prices = response.data.map(item => ({
            x: new Date(item[0]),
            y: parseFloat(item[4]) // Closing price
          }));
          setPriceData(prices);
        } catch (error) {
          console.error('Error fetching price data:', error);
        }
      };
      fetchPriceData();
    }
  }, [selectedPair, startDate, endDate]);

  const chartData = {
    labels: priceData.map(item => item.x),
    datasets: [
      {
        label: `${selectedPair} Price History`,
        data: priceData.map(item => item.y),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        fill: true,
      }
    ]
  };

  return (
    <div className="container">
      <h1>Cryptocurrency Price Visualizer</h1>
      <div className="controls">
        <select
          value={selectedPair}
          onChange={(e) => setSelectedPair(e.target.value)}
        >
          {currencyPairs.map(pair => (
            <option key={pair} value={pair}>
              {pair}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <Line data={chartData} />
    </div>
  );
};

export default App;
