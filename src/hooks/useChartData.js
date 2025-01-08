import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchChartData } from '../redux/slices/chartDataSlice';

export const useChartData = () => {
  const dispatch = useDispatch();
  const { symbol, interval, startTime, endTime } = useSelector(
    (state) => state.ui
  );

  useEffect(() => {
    if (startTime && endTime && startTime < endTime) {
      dispatch(fetchChartData({ symbol, interval, startTime, endTime }));
    }
  }, [symbol, interval, startTime, endTime, dispatch]);
};
