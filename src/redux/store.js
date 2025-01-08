import { configureStore } from '@reduxjs/toolkit';
import chartDataReducer from './slices/chartDataSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    chartData: chartDataReducer,
    ui: uiReducer,
  },
});
