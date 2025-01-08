import axios from 'axios';

export const fetchKlineData = async (symbol, interval, startTime, endTime) => {
  const params = {
    symbol,
    interval,
    startTime,
    endTime,
    limit: 1000, // Binance's maximum limit for klines
  };

  try {
    const response = await axios.get('https://api.binance.com/api/v3/klines', {
      params,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The server responded with a status code outside of 2xx
      throw new Error(`Binance API Error: ${error.response.data.msg}`);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response from Binance API. Please check your network connection.'
      );
    } else {
      // Something else happened
      throw new Error(`Error: ${error.message}`);
    }
  }
};
