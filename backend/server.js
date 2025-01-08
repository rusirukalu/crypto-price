// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

// Enable CORS for all requests
app.use(cors());

// Set the port for the server
const PORT = 3001;

// Binance API base URL
const BINANCE_API_URL = 'https://api.binance.com/api/v3/klines';

// Route to fetch Kline data (chart data)
app.get('/api/klines', async (req, res) => {
  const { symbol, interval, startTime, endTime } = req.query;

  try {
    // Make the API request to Binance
    const response = await axios.get(BINANCE_API_URL, {
      params: { symbol, interval, startTime, endTime },
    });
    res.json(response.data); // Return the data from Binance API to the client
  } catch (error) {
    console.error('Error fetching data from Binance:', error);
    res.status(500).json({ message: 'Failed to fetch data from Binance' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
