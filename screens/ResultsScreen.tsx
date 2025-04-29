import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getBudgetRecommendations } from '../services/chatAPI';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ NEW

type Bundle = {
  flight: string;
  hotel: string;
  total: string;
};

type RootStackParamList = {
  Results: {
    category: string;
    budget: string;
    location: string;
    departure?: string;
    destination?: string;
    date?: string;
    people?: string;
  };
};

const FAVORITES_KEY = 'favorites';

const ResultsScreen = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Results'>>();
  const { category, budget, location, departure, destination, date, people } = route.params;

  const [results, setResults] = useState<(string | Bundle)[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      try {
        const rawData = await getBudgetRecommendations(
          category,
          budget,
          location,
          departure,
          destination,
          date,
          people
        );

        if (category.toLowerCase() === 'travel bundle') {
          const parsed: Bundle[] = (rawData as string[]).map(entry => {
            const flight = entry.match(/Flight:\s*(.*)/)?.[1]?.trim() ?? 'Unknown';
            const hotel = entry.match(/Hotel:\s*(.*)/)?.[1]?.trim() ?? 'Unknown';
            const total = entry.match(/Total:\s*(.*)/)?.[1]?.trim() ?? 'Unknown';
            return { flight, hotel, total };
          });
          setResults(parsed);
        } else {
          setResults(rawData);
        }
      } catch (err) {
        console.error('❌ Error fetching results:', err);
      }
      setLoading(false);
    };

    const loadFavorites = async () => {
      try {
        const stored = await AsyncStorage.getItem(FAVORITES_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          console.log('✅ Loaded favorites from AsyncStorage:', parsed);
          setFavorites(new Set(parsed));
        }
      } catch (error) {
        console.error('❌ Failed to load favorites:', error);
      }
    };

    fetchRecommendations();
    loadFavorites();
  }, [category, budget, location, departure, destination, date, people]);

  const saveFavorites = async (updated: Set<string>) => {
    const arrayForm = Array.from(updated);
    setFavorites(updated);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(arrayForm));
    console.log('💾 Favorites saved:', arrayForm);
  };

  const toggleFavorite = (item: string) => {
    const updated = new Set(favorites);
    if (updated.has(item)) {
      updated.delete(item);
      console.log('🗑️ Removed from favorites:', item);
    } else {
      updated.add(item);
      console.log('❤️ Added to favorites:', item);
    }
    saveFavorites(updated);
  };

  const formatSearchQuery = (name: string) => {
    return category.toLowerCase().includes('travel')
      ? `${name} in ${destination}`
      : `${name} restaurant near ${location}`;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Top {category} Picks</Text>
        <Text style={styles.subheading}>Budget: ${budget}</Text>

        {(category === 'Travel' || category === 'Hotels' || category === 'Travel Bundle') && (
          <>
            <Text style={styles.subheading}>From: {departure} ➡️ To: {destination}</Text>
            <Text style={styles.subheading}>Date: {new Date(date || '').toDateString()}</Text>
            <Text style={styles.subheading}>Travelers: {people}</Text>
          </>
        )}

        {loading && <ActivityIndicator size="large" color="#D94F4F" style={{ marginTop: 20 }} />}
        {!loading && results.length === 0 && (
          <Text style={styles.noResults}>No results found 😢</Text>
        )}

        {category === 'Travel Bundle'
          ? (results as Bundle[]).map((bundle, index) => {
              const label = `Flight: ${bundle.flight}\nHotel: ${bundle.hotel}\nTotal: ${bundle.total}`;
              return (
                <View key={index} style={styles.bundleCard}>
                  <TouchableOpacity style={styles.heart} onPress={() => toggleFavorite(label)}>
                    <Ionicons
                      name={favorites.has(label) ? 'heart' : 'heart-outline'}
                      size={24}
                      color={favorites.has(label) ? '#ff5e5e' : '#ccc'}
                    />
                  </TouchableOpacity>
                  <Text style={styles.bundleFlight}>✈️ Flight: {bundle.flight}</Text>
                  <Text style={styles.bundleHotel}>🏨 Hotel: {bundle.hotel}</Text>
                  <View style={styles.separator} />
                  <Text style={styles.bundleTotal}>💰 Total Bundle: {bundle.total}</Text>
                </View>
              );
            })
          : (results as string[]).map((name, index) => (
              <View key={index} style={styles.card}>
                <TouchableOpacity style={styles.heart} onPress={() => toggleFavorite(name)}>
                  <Ionicons
                    name={favorites.has(name) ? 'heart' : 'heart-outline'}
                    size={24}
                    color={favorites.has(name) ? '#ff5e5e' : '#ccc'}
                  />
                </TouchableOpacity>
                <View style={styles.content}>
                  <Text style={styles.name}>{name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(`https://www.google.com/search?q=${encodeURIComponent(formatSearchQuery(name))}`)
                    }
                  >
                    <Text style={styles.link}>Search on Google</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: { flex: 1, backgroundColor: '#ffffff' }, // ✅ New
  container: { padding: 10 },

  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D94F4F',
    textAlign: 'center',
    marginBottom: 6,
  },
  subheading: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 4,
  },
  noResults: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },

  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    marginBottom: 20,
    padding: 12,
    elevation: 3,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  content: {
    paddingTop: 12,
  },
  name: {
    color: '#222',
    fontSize: 20,
    fontWeight: '600',
  },
  link: {
    marginTop: 6,
    color: '#D94F4F',
    fontWeight: 'bold',
  },
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#ffffffcc',
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
  },

  bundleCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: '#D94F4F',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  bundleFlight: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  bundleHotel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  bundleTotal: {
    fontSize: 18,
    color: '#D94F4F',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 8,
  },
});

export default ResultsScreen;
