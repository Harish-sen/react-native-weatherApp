module.exports = {
  presets: ['module:@react-native/babel-preset'], // Use the recommended React Native preset
  env: {
    production: {
      plugins: ['react-native-paper/babel'], // Optimize react-native-paper for production
    },
  },
};
