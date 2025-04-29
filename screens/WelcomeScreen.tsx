import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      {/* Optional cute icon */}
      <Image
        source={require('../assets/explorer.png')} // Optional illustration if you want
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>Welcome to</Text>
      <Text style={styles.brand}>Wanderly</Text>
      <Text style={styles.subtitle}>Find new adventures without breaking the bank.</Text>

      <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Main', { screen: 'Home' })}
        >
          <Text style={styles.buttonText}>Start Exploring</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe1e1', // soft pastel pink
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: '#555',
    fontWeight: '500',
  },
  brand: {
    fontSize: 40,
    color: '#c86464',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#c86464',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
