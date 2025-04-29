import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  name: string;
  price?: string;
  onRemove: () => void;
};

const FavoriteCard: React.FC<Props> = ({ name, price, onRemove }) => {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="trash" size={20} color="#ff4d4d" />
        </TouchableOpacity>
      </View>
      {price && <Text style={styles.price}>Saved Price: {price}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#111',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: '#00e0ff',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },
});

export default FavoriteCard;