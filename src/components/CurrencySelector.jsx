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
    <select 
        value={symbol} 
        onChange={handleChange} 
        className="mb-4 p-2 border rounded w-full"
        aria-label="Select Cryptocurrency Pair"
    >
        {currencyPairs.map((pair) => (
            <option key={pair} value={pair}>
            {pair.slice(0, -4)} / {pair.slice(-4)}
            </option>
        ))}
    </select>
  );
};

export default CurrencySelector;
