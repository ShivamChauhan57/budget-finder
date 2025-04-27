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
import { RouteProp, useRoute } from '@react-navigation/native';
import { getBudgetRecommendations } from '../services/chatAPI';
import { Ionicons } from '@expo/vector-icons';

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

    fetchRecommendations();
  }, [category, budget, location, departure, destination, date, people]);

  const toggleFavorite = (name: string) => {
    setFavorites(prev => {
      const updated = new Set(prev);
      updated.has(name) ? updated.delete(name) : updated.add(name);
      return updated;
    });
  };

  const formatSearchQuery = (name: string) => {
    if (category.toLowerCase().includes('travel')) {
      return `${name} in ${destination}`;
    }
    return `${name} restaurant near ${location}`;
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Top {category} Picks</Text>
      <Text style={styles.subheading}>Budget: ${budget}</Text>

      {(category === 'Travel' || category === 'Hotels' || category === 'Travel Bundle') && (
        <>
          <Text style={styles.subheading}>From: {departure} ➡️ To: {destination}</Text>
          <Text style={styles.subheading}>Date: {new Date(date || '').toDateString()}</Text>
          <Text style={styles.subheading}>Travelers: {people}</Text>
        </>
      )}

      {loading && <ActivityIndicator size="large" color="#00ff99" style={{ marginTop: 20 }} />}

      {!loading && results.length === 0 && (
        <Text style={styles.noResults}>No results found 😢</Text>
      )}

      {category === 'Travel Bundle'
        ? (results as Bundle[]).map((bundle, index) => (
            <View key={index} style={styles.bundleCard}>
              <Text style={styles.bundleFlight}>✈️ Flight: {bundle.flight}</Text>
              <Text style={styles.bundleHotel}>🏨 Hotel: {bundle.hotel}</Text>
              <View style={styles.separator} />
              <Text style={styles.bundleTotal}>💰 Total Bundle: {bundle.total}</Text>
            </View>
          ))
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
                    Linking.openURL(
                      `https://www.google.com/search?q=${encodeURIComponent(formatSearchQuery(name))}`
                    )
                  }
                >
                  <Text style={styles.link}>Search on Google</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0d0d0d',
    padding: 10,
    flex: 1,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 15,
    color: '#bbb',
    marginBottom: 4,
    textAlign: 'center',
  },
  noResults: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    marginBottom: 20,
    padding: 12,
    elevation: 3,
    position: 'relative',
  },
  content: {
    paddingTop: 12,
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
  link: {
    marginTop: 6,
    color: '#5cb85c',
    fontWeight: 'bold',
  },
  heart: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#00000088',
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
  },
  bundleCard: {
    backgroundColor: '#222',
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: '#5cb85c',
  },
  bundleFlight: {
    fontSize: 16,
    color: '#f2f2f2',
    marginBottom: 4,
  },
  bundleHotel: {
    fontSize: 16,
    color: '#f2f2f2',
    marginBottom: 4,
  },
  separator: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 8,
  },
  bundleTotal: {
    fontSize: 18,
    color: '#ffd700',
    fontWeight: 'bold',
  },
});

export default ResultsScreen;
