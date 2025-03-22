import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_KEY } from '../config';

// Thunk to fetch weather data based on city
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (cityName) => {
    console.log(cityName, 'cityname');
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}`
    );
    console.log(response, 'what is response');
    return response.data;
  }
);

// Thunk to fetch forecast data based on city and number of days
export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async ({ city, days }) => {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=${days}`
    );
    return response.data;
  }
);


const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    weatherData: null,
    forecastData: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weatherData = action.payload;
        state.error = ""
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecastData = action.payload;
        state.error = ""
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;

