import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CityAutoSuggestion from '../components/comman/autoSuggestion';
import { fetchForecast, fetchWeather } from '../redux/slice/wheaterSlice';
import { SelectList } from 'react-native-dropdown-select-list';
import LottieView from 'lottie-react-native';
import { getWeatherAnimation } from '../microFuntion';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ConnectivityAlert from '../components/comman/network';

const WeatherScreen = () => {
  const [cityName, setCityName] = useState('');
  const [days, setDays] = useState(3); // Default to 3 days forecast
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { weatherData, forecastData, status, error } = useSelector((state) => state.weather);

  const handleSearch = (city) => {
    setCityName(city);
    dispatch(fetchWeather(city));
    dispatch(fetchForecast({ city, days }));
  };

  const handleDaysChange = (selectedDays) => {
    setDays(selectedDays);
    if (cityName) {
      dispatch(fetchForecast({ city: cityName, days: selectedDays }));
    }
  };

  const handleForecastPress = (forecastDetails) => {
    navigation.navigate('DetailsScreen', {
      forecastDetails,
      cityName,
    });
  };

  return (
    <LinearGradient colors={['#4facfe', '#80e4fe', '#b3f0fe']} style={styles.gradientBackground}>
        <ConnectivityAlert/>
      <View style={{ padding: 20, backgroundColor: 'transparent' }}>
        <Text style={styles.title}>Weather App</Text>
        <CityAutoSuggestion onCitySelect={handleSearch} />
      </View>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {status === 'loading' && <ActivityIndicator size="large" color="#fff" />}
        {error && <Text style={styles.errorText}>Error: {"Data not found"}</Text>}

        {/* Show message when no city is searched yet */}
        {!weatherData && (
          <View style={styles.centerMessageContainer}>
            <Text style={styles.centerMessageText}>Search any city to see the weather details.</Text>
          </View>
        )}

        {weatherData && (
          <View style={styles.weatherInfo}>
            <Text style={styles.cityName}>
              {weatherData.location.name}, {weatherData.location.region}, {weatherData.location.country}
            </Text>

            <View style={styles.weatherRow}>
              <LottieView
                source={getWeatherAnimation(weatherData.current.condition.text)}
                autoPlay
                loop
                style={styles.weatherAnimation}
              />
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.temp}>{weatherData.current.temp_c}°C</Text>
                <Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
                  {weatherData.current.condition.text}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* Days Selection */}
        {forecastData && (
          <>
            <Text style={styles.forecastTitle}>Choose forecast days:</Text>
            <SelectList
              setSelected={handleDaysChange}
              data={daysOptions}
              defaultOption={{ key: '3', value: '3 Days' }} // Default selected value
              placeholder="Select Days"
              boxStyles={styles.selectBox}
              dropdownStyles={styles.dropdown}
            />
          </>
        )}

        {/* Forecast Data */}
        {forecastData && (
          <View style={styles.forecastContainer}>
            <Text style={styles.forecastTitle}>Weather Forecast</Text>
            {forecastData.forecast.forecastday.map((day, index) => (
              <TouchableOpacity key={index} style={styles.forecastItem} onPress={() => handleForecastPress(day)}>
                <Text style={styles.forecastDate}>{day.date}</Text>
                <Image source={{ uri: `http:${day.day.condition.icon}` }} style={styles.forecastIcon} />
                <View style={{ width: '33%' }}>
                  <Text>High: {day.day.maxtemp_c}°C</Text>
                  <Text>Low: {day.day.mintemp_c}°C</Text>
                  <Text>{day.day.condition.text}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#fff',
  },
  weatherAnimation: {
    width: 150,
    height: 150,
  },
  weatherInfo: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // elevation: 3,
    marginBottom: 20,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  weatherRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 15,
  },
  temp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff8c00',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    textTransform: 'capitalize',
    color: '#333',
    flexWrap: 'wrap',
    width: '55%',
  },
  forecastTitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom:10
  },
  forecastContainer: {
    marginTop: 20,
  },
  forecastItem: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    marginBottom: 10,
  },
  forecastDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: '33%',
  },
  forecastIcon: {
    width: 40,
    height: 40,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  centerMessageContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 50,
    // backgroundColor:"red"
  },
  centerMessageText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default WeatherScreen;

const daysOptions = [
  { key: '3', value: '3 Days' },
  { key: '5', value: '5 Days' },
  { key: '7', value: '7 Days' },
  { key: '10', value: '10 Days' },
];

