import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const mockFavorites = [
  { id: '1', name: 'Cheap Eats in Tampa', price: '$10' },
  { id: '2', name: 'Roundtrip to Atlanta', price: '$120' },
];

export default function FavoritesScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Saved Favorites</Text>
      {mockFavorites.map((fav) => (
        <View key={fav.id} style={styles.card}>
          <Text style={styles.cardTitle}>{fav.name}</Text>
          <Text style={styles.cardText}>Saved Price: {fav.price}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: '#39FF14',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#00e0ff',
    borderWidth: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  cardText: {
    color: '#ccc',
    fontSize: 14,
  },
});
