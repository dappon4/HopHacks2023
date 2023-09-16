import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AddScreen from './AddScreen';
import CameraScreen from './CameraScreen';
import LoginScreen from './LoginScreen';
import CompatibilityScreen from './CompatibilityScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add" component={AddScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Compatibility" component={CompatibilityScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
