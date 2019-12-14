import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainScreen from "./components/MainScreen.component"
export default function App() {
  return (
    <MainScreen/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});