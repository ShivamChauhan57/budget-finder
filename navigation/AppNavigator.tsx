import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ResultsScreen from '../screens/ResultsScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import NewsScreen from '../screens/NewsScreen';
import FormScreen from '../screens/FormScreen'; // for Home tab
import ChatScreen from '../screens/ChatScreen'; // new chat page

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000' },
        tabBarLabelStyle: { color: '#fff' },
        tabBarIcon: ({ size, focused }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          switch (route.name) {
            case 'Results':
              iconName = 'list';
              break;
            case 'Favorites':
              iconName = 'heart';
              break;
            case 'News':
              iconName = 'newspaper';
              break;
            case 'Chat':
              iconName = 'chatbubble-ellipses';
              break;
            case 'Home':
              iconName = 'home';
              break;
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={focused ? '#39FF14' : '#888'}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={FormScreen} />
      <Tab.Screen name="Results" component={ResultsScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="News" component={NewsScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
    </Tab.Navigator>
  );
}
