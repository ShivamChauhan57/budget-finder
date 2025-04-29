import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native'; // ✅ Import DefaultTheme
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import WelcomeScreen from './screens/WelcomeScreen';
import FormScreen from './screens/FormScreen';
import Tabs from './navigation/AppNavigator';
import { FavoritesProvider } from './context/FavoritesContext';

const Stack = createNativeStackNavigator();

// ✅ Define your custom app theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',  // App background
    primary: '#D94F4F',      // Primary accent (active links, icons)
    card: '#ffffff',         // Top bars, tab bars
    text: '#222222',         // Text color
    border: '#dddddd',       // Light gray borders
    notification: '#D94F4F', // Notification badge color
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Form" component={FormScreen} />
            <Stack.Screen name="Main" component={Tabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
