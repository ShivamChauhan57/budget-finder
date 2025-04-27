import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const mockMessages = [
  { id: '1', user: 'Alex', message: "What's the best food deal under $10?" },
  { id: '2', user: 'Jade', message: "Spirit has $49 flights to Atlanta!" },
  { id: '3', user: 'Liam', message: "Best ramen place in Tampa for cheap?" },
];

export default function ChatScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Community Chat</Text>
      {mockMessages.map((msg) => (
        <View key={msg.id} style={styles.messageCard}>
          <Text style={styles.username}>@{msg.user}</Text>
          <Text style={styles.messageText}>{msg.message}</Text>
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
    color: '#39FF14',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  messageCard: {
    backgroundColor: '#111',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftColor: '#39FF14',
    borderLeftWidth: 4,
  },
  username: {
    color: '#00e0ff',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
});
