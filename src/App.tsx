// src/presentation/App.tsx
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { HomeScreen } from './presentation/screens/HomeScreen';

export const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <HomeScreen/>
    </SafeAreaView>
  );
};
