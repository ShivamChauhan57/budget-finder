import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

type Props = {
  title: string;
  searchUrl: string;
};

const RecommendationTile: React.FC<Props> = ({ title, searchUrl }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{title}</Text>
      <TouchableOpacity onPress={() => Linking.openURL(searchUrl)}>
        <Text style={styles.link}>Search on Google</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderLeftColor: '#5cb85c',
    borderLeftWidth: 4,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  link: {
    marginTop: 8,
    color: '#5cb85c',
    fontWeight: 'bold',
  },
});

export default RecommendationTile;