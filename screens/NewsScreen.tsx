import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const mockNews = [
  {
    id: '1',
    title: 'Top 10 Budget Travel Destinations 2025',
    source: 'TravelNow',
    snippet: 'Looking to explore on a shoestring? These places are affordable and fun!',
  },
  {
    id: '2',
    title: 'Best Cheap Eats in the US',
    source: 'Foodies Weekly',
    snippet: 'A guide to delicious bites under $15 in every state.',
  },
];

export default function NewsScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Trending Budget News</Text>
        {mockNews.map((article) => (
          <View key={article.id} style={styles.card}>
            <Text style={styles.cardTitle}>{article.title}</Text>
            <Text style={styles.cardSource}>Source: {article.source}</Text>
            <Text style={styles.cardSnippet}>{article.snippet}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 28,
    color: '#D94F4F',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#D94F4F',
    borderWidth: 1,
  },
  cardTitle: {
    color: '#222',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSource: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  cardSnippet: {
    color: '#444',
    fontSize: 14,
  },
});
