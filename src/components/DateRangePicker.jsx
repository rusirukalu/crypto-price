import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { setStartTime, setEndTime } from '../redux/slices/uiSlice';

const DateRangePicker = () => {
    const dispatch = useDispatch(); 
    const [startDate, setStartDate] = useState(''); 
    const [endDate, setEndDate] = useState('');

    const today = new Date().toISOString().split('T')[0];

    const handleStartDateChange = (e) => { 
        const date = e.target.value; 
        setStartDate(date); 
        const timestamp = new Date(date).getTime(); 
        dispatch(setStartTime(timestamp)); 
    }; 
    
    const handleEndDateChange = (e) => { 
        const date = e.target.value; 
        setEndDate(date); 
        const timestamp = new Date(date).getTime(); 
        dispatch(setEndTime(timestamp)); 
    }; 
    
    return ( 
        <div className="mb-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4"> 
            <input 
                type="date" 
                aria-label='Select Start Date'
                value={startDate} 
                max={endDate || today} 
                onChange={handleStartDateChange} 
                className="p-2 border rounded w-full" 
            /> 
            <input 
                type="date" 
                aria-label='Select End Date'
                value={endDate} 
                min={startDate} 
                max={today} 
                onChange={handleEndDateChange} 
                className="p-2 border rounded w-full" 
            /> 
        </div> 
    );
};

export default DateRangePicker;
