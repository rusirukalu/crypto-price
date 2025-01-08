import axios from 'axios';

const BACKEND_URL = 'http://localhost:3001/api/klines';

export const fetchKlineData = async (symbol, interval, startTime, endTime) => {
  const params = { 
    symbol, 
    interval, 
    startTime, 
    endTime 
};


try {
    // Request data from the backend server
    const response = await axios.get(BACKEND_URL, { params });
    console.log('API Response:', response.data); // Log the entire response
    return response.data;
  } catch (error) {
    console.error('API Error:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.msg || 'API request failed');
  }
};