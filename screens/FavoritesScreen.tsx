// screens/FavoritesScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useFavorites } from '../context/FavoritesContext';

const FavoritesScreen = () => {
  const { favorites, removeFavorite } = useFavorites(); // ❗ no loading from context (not implemented there)
  const isFocused = useIsFocused();

  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
      setLocalLoading(true);
      const timeout = setTimeout(() => {
        setLocalLoading(false);
      }, 300); // slight delay for smoother refresh
      console.log('✅ Favorites updated:', favorites);
      return () => clearTimeout(timeout);
    }
  }, [favorites, isFocused]);

  const handleRemove = (item: string) => {
    removeFavorite(item);
    console.log(`🗑️ Removed from favorites: ${item}`);
  };

  if (localLoading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#5cb85c" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Favorites</Text>

      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>No favorites added yet.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => handleRemove(item)}>
                <Text style={styles.removeText}>Remove</Text>
              </TouchableOpacity>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#0a0a0a',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5cb85c',
    marginBottom: 16,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
  },
  removeText: {
    color: '#ff5e5e',
    fontWeight: 'bold',
    paddingLeft: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
});
