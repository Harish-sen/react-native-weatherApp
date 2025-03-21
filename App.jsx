import React from 'react';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './store/store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WeatherScreen from './src/screens/WheaterScreen';
import DetailsScreen from './src/screens/detailsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="WeatherScreen">
              {/* WeatherScreen as the initial screen */}
              <Stack.Screen 
                name="WeatherScreen" 
                component={WeatherScreen} 
                options={{ headerShown:false }}
              />

              {/* DetailsScreen to show forecast details */}
              <Stack.Screen 
                name="DetailsScreen" 
                component={DetailsScreen} 
                options={{ title: 'Forecast Details' }} 
              />
              
            </Stack.Navigator>
        
          </NavigationContainer>
        </SafeAreaView>
      </PaperProvider>
    </Provider>
  );
};

export default App;

