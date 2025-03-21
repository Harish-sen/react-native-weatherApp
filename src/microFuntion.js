export const getWeatherAnimation = (conditionText) => {
    switch (conditionText.toLowerCase()) {
      case 'clear':
      case 'sunny':
        return require('../src/assets/animation/sunny.json'); // Daytime clear/sunny animation
  
      case 'partly cloudy':
      case 'light cloud':
      case 'mostly sunny':
        return require('../src/assets/animation/cloud.json'); // Partly cloudy animation
  
      case 'cloudy':
      case 'overcast':
        return require('../src/assets/animation/cloud.json'); // Fully cloudy/overcast animation
  
      case 'rain':
      case 'light rain':
      case 'patchy rain possible':
      case 'showers':
      case 'moderate rain':
      case 'heavy rain':
        return require('../src/assets/animation/rain.json'); // Rain animation for all rain conditions
  
      case 'thunderstorm':
      case 'patchy light rain with thunder':
      case 'moderate or heavy rain with thunder':
        return require('../src/assets/animation/rain.json'); // Thunderstorm animation
  
      case 'snow':
      case 'light snow':
      case 'patchy light snow':
      case 'moderate snow':
      case 'heavy snow':
      case 'blizzard':
        return require('../src/assets/animation/snow.json'); // Snow animation for all snow conditions
  
      case 'mist':
      case 'fog':
      case 'freezing fog':
        return require('../src/assets/animation/cloud.json'); // Fog or mist animation
  
      case 'hail':
        return require('../src/assets/animation/rain.json'); // Hail animation
  
      case 'night clear':
      case 'clear night':
      case 'clear skies night':
        return require('../src/assets/animation/night.json'); // Clear night animation
  
      case 'partly cloudy night':
      case 'light cloud night':
        return require('../src/assets/animation/night.json'); // Partly cloudy night animation
  
      case 'rain night':
      case 'light rain night':
        return require('../src/assets/animation/rain.json'); // Rain at night animation
  
      case 'snow night':
      case 'light snow night':
        return require('../src/assets/animation/snow.json'); // Snow at night animation
  
      // Add other conditions as necessary
  
      default:
        return require('../src/assets/animation/wheater.json'); // Default animation for unrecognized conditions
    }
  };
  