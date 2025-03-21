import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../src/redux/slice/wheaterSlice';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
