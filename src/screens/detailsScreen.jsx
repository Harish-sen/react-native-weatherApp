import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getWeatherAnimation } from '../microFuntion';
import { useRoute } from '@react-navigation/native';
import ConnectivityAlert from '../components/comman/network';

const { width } = Dimensions.get('window');

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString(undefined, options);
};

const DetailsScreen = () => {
  const route = useRoute();

  const { forecastDetails, cityName } = route.params || {};

  if (!forecastDetails || !forecastDetails.day) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading weather details...</Text>
      </View>
    );
  }

  const { day, astro, date } = forecastDetails; // Assuming forecastDetails contains a 'date' field

  return (
    <LinearGradient colors={['#4facfe', '#00c6ff']} style={styles.gradient}>
        <ConnectivityAlert/>
      <ScrollView style={styles.container}  showsVerticalScrollIndicator={false} >
        {/* Top section with city name, date, temperature, and Lottie animation */}
        <View style={styles.topContainer}>
          {/* Left: Temperature, city, date, and condition */}
          <View style={styles.temperatureContainer}>
            <Text style={styles.cityName}>{cityName}</Text>
            <Text style={styles.dateText}>{formatDate(date)}</Text> {/* Display formatted date */}
            <Text style={styles.currentTemp}>{Math.round((day.maxtemp_c + day.mintemp_c) / 2)}°C</Text>
            <Text style={styles.conditionText}>{day.condition.text}</Text>

            {/* High and low temperatures */}
            <View style={styles.tempRangeContainer}>
              <Text style={styles.tempRange}>High: {day.maxtemp_c}°C</Text>
              <Text style={styles.tempRange}>Low: {day.mintemp_c}°C</Text>
            </View>
          </View>

          {/* Right: Lottie Animation */}
          <View style={styles.animationContainer}>
            <LottieView
              source={getWeatherAnimation(day.condition.text)}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        </View>

        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>Weather Details</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Humidity: {day.avghumidity}%</Text>
            <Text style={styles.infoText}>Wind Speed: {day.maxwind_kph} kph</Text>
            <Text style={styles.infoText}>Precipitation: {day.totalprecip_mm} mm</Text>
            <Text style={styles.infoText}>Visibility: {day.avgvis_km} km</Text>
            <Text style={styles.infoText}>UV Index: {day.uv}</Text>
          </View>

          {/* Astro Info Card */}
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>Sunrise: {astro.sunrise}</Text>
            <Text style={styles.infoText}>Sunset: {astro.sunset}</Text>
            <Text style={styles.infoText}>Moonrise: {astro.moonrise}</Text>
            <Text style={styles.infoText}>Moonset: {astro.moonset}</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    paddingTop:20
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  cityName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 10,
  },
  temperatureContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  currentTemp: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 6,
    marginBottom: 5,
  },
  conditionText: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 10,
  },
  tempRangeContainer: {
    flexDirection: 'column',
    marginTop: 10,
  },
  tempRange: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  animationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:-20
  },
  lottie: {
    width: width * 0.4,
    height: width * 0.4,
  },
  cardContainer: {
    marginVertical: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#555',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#555',
  },
});

export default DetailsScreen;



