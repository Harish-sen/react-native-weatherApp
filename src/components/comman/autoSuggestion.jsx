import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CityAutoSuggestion = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const GOOGLE_MAPS_APIKEY = 'AIzaSyA42CdbqjXsS49_AH8d4CysPzmDR7X-v3A'; // Replace with your Google Maps API Key

  const fetchCitySuggestions = async (input) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=(cities)&key=${GOOGLE_MAPS_APIKEY}`
      );
      setSuggestions(response.data.predictions);
    } catch (error) {
      console.error('Error fetching city suggestions: ', error);
    }
  };

  const handleCitySelect = (cityName) => {
    onCitySelect(cityName);
    setQuery(cityName)
    setSuggestions([]); // Clear suggestions after selecting
  };

  return (
    <View style={styles.container}>
      {/* <Icon name="search" size={25} color="gray" style={styles.icon} /> */}
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          if (text.length >= 2) {
            fetchCitySuggestions(text);
          } else {
            setSuggestions([]); // Clear suggestions if input is less than 2 characters
          }
        }}
      />

      {suggestions.length > 0 && (
        <FlatList
          style={styles.suggestionsList}
          data={suggestions}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.suggestionItem}
              onPress={() => handleCitySelect(item.structured_formatting.main_text)}
            >
              <Text>{item.structured_formatting.main_text}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    left: 10,
    top: 12,
  },
  input: {
     // Add space for the search icon
     paddingHorizontal:15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  suggestionsList: {
    marginTop: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxHeight: 150, // Adjust to limit the height of the list
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default CityAutoSuggestion;
