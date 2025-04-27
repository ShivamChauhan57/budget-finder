import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

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
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Trending Budget News</Text>
      {mockNews.map((article) => (
        <View key={article.id} style={styles.card}>
          <Text style={styles.cardTitle}>{article.title}</Text>
          <Text style={styles.cardSource}>Source: {article.source}</Text>
          <Text style={styles.cardSnippet}>{article.snippet}</Text>
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
    borderColor: '#ff00cc',
    borderWidth: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardSource: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  cardSnippet: {
    color: '#ccc',
    fontSize: 14,
  },
});
