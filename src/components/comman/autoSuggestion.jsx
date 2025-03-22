import React, { useState } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GOOGLE_MAPS_APIKEY } from '../../redux/config';

const CityAutoSuggestion = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

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
    setSuggestions([]); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={query}
        onChangeText={(text) => {
          setQuery(text);
          if (text.length >= 2) {
            fetchCitySuggestions(text);
          } else {
            setSuggestions([]);
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
    maxHeight: 150,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});

export default CityAutoSuggestion;
