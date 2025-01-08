import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    symbol: 'BTCUSDT',
    interval: '1d',
    startTime: null,
    endTime: null,
  },
  reducers: {
    setSymbol(state, action) {
      state.symbol = action.payload;
    },
    setInterval(state, action) {
      state.interval = action.payload;
    },
    setStartTime(state, action) {
      state.startTime = action.payload;
    },
    setEndTime(state, action) {
      state.endTime = action.payload;
    },
  },
});

export const { setSymbol, setInterval, setStartTime, setEndTime } = uiSlice.actions;
export default uiSlice.reducer;
