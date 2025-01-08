import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import 'chart.js/auto';

const Chart = () => {
  const { data, status, error } = useSelector((state) => state.chartData);

  if (status === 'loading') {
    return <p className="text-center">Loading chart data...</p>;
  }

  if (status === 'failed') {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!data.length) {
    return (
      <p className="text-center text-red-500">
        {error || 'An unexpected error occurred. Please try again later.'}
      </p>
    );
  }

  const chartData = {
    labels: data.map((item) => new Date(item[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Closing Price',
        data: data.map((item) => parseFloat(item[4])),
        borderColor: '#3182CE',
        backgroundColor: 'rgba(49, 130, 206, 0.2)',
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
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
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USDT)',
        },
      },
    },
  };

  return (
    <div className="relative w-full h-64">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default Chart;
