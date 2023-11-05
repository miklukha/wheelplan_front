import React, { useState, useEffect, useCallback } from 'react';

// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import { Main } from './components/Main';
import { View, StyleSheet } from 'react-native';
import { colors } from './src/helpers/variables';
import { RegisterScreen } from './src/screens';

export default function App() {
  return (
    // <Provider store={store}>
    // <Provider>
    <RegisterScreen />
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.mainBg,
  },
});
