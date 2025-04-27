import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type WelcomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};

export default function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Budget Finder</Text>
      <Text style={styles.subtitle}>Find More, Spend Less</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Form')}
      >
        <Text style={styles.buttonText}>Start Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // black background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    color: '#39FF14', // neon green
    fontSize: 42,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'System',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 18,
    marginBottom: 50,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#39FF14',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
