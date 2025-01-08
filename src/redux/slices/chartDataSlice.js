import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchKlineData } from '../../api/binanceApi';

export const fetchChartData = createAsyncThunk(
  'chartData/fetchChartData',
  async ({ symbol, interval, startTime, endTime }, { rejectWithValue }) => {
    try {
      const data = await fetchKlineData(symbol, interval, startTime, endTime);
      console.log('Fetched data:', data); // Log data to inspect
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const chartDataSlice = createSlice({
  name: 'chartData',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChartData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChartData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchChartData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch data';
      });
  },
});

export default chartDataSlice.reducer;
