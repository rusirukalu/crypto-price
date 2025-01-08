import { useDispatch, useSelector } from 'react-redux';
import { setSymbol } from '../redux/slices/uiSlice';

const CurrencySelector = () => {
  const dispatch = useDispatch();
  const symbol = useSelector((state) => state.ui.symbol);

  const currencyPairs = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'XRPUSDT'];

  const handleChange = (e) => {
    dispatch(setSymbol(e.target.value));
  };

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
        value={symbol}
        onChange={handleChange}
        className="block w-full px-4 py-3 text-gray-900 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        aria-label="Select Cryptocurrency Pair"
      >
        {currencyPairs.map((pair) => (
          <option key={pair} value={pair} className="text-gray-800">
            {pair.slice(0, -4)} / {pair.slice(-4)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
