import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns';

const Chart = () => {
  const chartDataState = useSelector((state) => state.chartData);  
  const { data, status, error } = useSelector((state) => state.chartData);

  console.log('Redux state:', chartDataState); // Log entire chartData state to check updates

  if (status === 'loading') {
    return (
      <p className="text-center text-blue-400 font-semibold animate-pulse">
        Loading chart data...
      </p>
    );
  }

  if (status === 'failed') {
    return (
      <p className="text-center text-red-500 font-semibold">
        Error: {error}
      </p>
    );
  }

  if (!data || !data.length === 0) {
    console.error('No valid data available for chart rendering.');
    return;
  }

  if (data.some(item => item[4] === undefined || item[0] === undefined)) {
    return <p className="text-center text-red-500">Invalid or incomplete data received.</p>;
  }
  

  console.log('Chart data:', data); // Log data to inspect

  const chartData = {
    labels: data.map((item) => {
      if (item && item[0]) {
        return new Date(item[0]).toLocaleDateString();
      }
      return '';
    }),
    datasets: [
      {
        label: 'Closing Price',
        data: data.map((item) => {
          if (item && item[4]) {
            return parseFloat(item[4]);
          }
          return null; // Handle invalid data
        }),
        borderColor: '#3182CE',
        backgroundColor: 'rgba(49, 130, 206, 0.2)',
        pointRadius: 2,
      },
    ],
  };
  
  

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: '#1A202C', // Dark tooltip background
        borderColor: '#4FD1C5', // Teal border
        borderWidth: 1,
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            label += `$${context.parsed.y.toFixed(2)}`;
            return label;
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#CBD5E0', // Light gray
        },
        grid: {
          color: '#2D3748', // Darker gray grid lines
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USDT)',
          font: {
            size: 14,
            weight: 'bold',
          },
          color: '#CBD5E0', // Light gray
        },
        grid: {
          color: '#2D3748', // Darker gray grid lines
        },
        ticks: {
          callback: (value) => `$${value}`,
        },
      },
    },
  };

  return (
    <div className="relative w-full h-80 bg-gray-800 bg-opacity-75 rounded-lg shadow-lg p-6">
      <h2 className="text-lg font-bold text-gray-200 mb-4">Price Chart</h2>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default Chart;
