import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchKlineData } from '../../api/binanceApi';
import { toast } from 'react-toastify'

export const fetchChartData = createAsyncThunk(
  'chartData/fetchChartData',
  async ({ symbol, interval, startTime, endTime }, { rejectWithValue }) => { 
    try { 
        const data = await fetchKlineData(symbol, interval, startTime, endTime); 
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
        state.error = action.error.message;
        state.error = action.payload || 'Failed to fetch data';
        toast.error(state.error);
      });
  },
});

export default chartDataSlice.reducer;
