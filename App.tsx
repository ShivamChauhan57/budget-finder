import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from './screens/WelcomeScreen';
import FormScreen from './screens/FormScreen';
import Tabs from './navigation/AppNavigator';
import { FavoritesProvider } from './context/FavoritesContext'; // ✅ Import context

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // ✅ Wrap your entire app in FavoritesProvider context
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Form" component={FormScreen} />
          <Stack.Screen name="Main" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}
