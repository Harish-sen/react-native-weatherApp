import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

const ConnectivityAlert = () => {
  const [isConnected, setIsConnected] = useState(true);
  
  useEffect(() => {
      console.log("hello")
      const unsubscribe = NetInfo.addEventListener(state => {
          console.log("Network state: ", state.isConnected); // Check the status
      setIsConnected(state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  if (isConnected) return null;

  return (
    <View style={styles.toast}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    zIndex: 9999,
    elevation: 10,
  },
  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ConnectivityAlert;
