import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ Add SafeAreaView

const mockMessages = [
  { id: '1', user: 'Alex', message: "What's the best food deal under $10?" },
  { id: '2', user: 'Jade', message: "Spirit has $49 flights to Atlanta!" },
  { id: '3', user: 'Liam', message: "Best ramen place in Tampa for cheap?" },
];

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Community Chat</Text>
        {mockMessages.map((msg) => (
          <View key={msg.id} style={styles.messageCard}>
            <Text style={styles.username}>@{msg.user}</Text>
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // White background
  },
  container: {
    padding: 16,
  },
  title: {
    color: '#D94F4F', // App accent color
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  messageCard: {
    backgroundColor: '#f9f9f9', // Light card background
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftColor: '#D94F4F', // Accent colored border
    borderLeftWidth: 4,
  },
  username: {
    color: '#D94F4F', // Match primary theme color
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 16,
  },
  messageText: {
    color: '#222', // Dark text
    fontSize: 16,
  },
});
