import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';


const FormScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [category, setCategory] = useState('Food');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [people, setPeople] = useState('1');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSearch = () => {
    navigation.navigate('Main', {
      screen: 'Results',
      params: {
        category,
        budget,
        location,
        departure,
        destination,
        people,
        date: date.toISOString(),
      },
    });
    
  };

  const categories = ['Food', 'Travel', 'Shopping', 'Hotels', 'Travel Bundle'];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Plan Your Budget-Friendly Adventure</Text>

      <Text style={styles.label}>Select Category</Text>
      <View style={styles.categoryRow}>
        {categories.map((c, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.categoryOption, category === c && styles.selectedCategory]}
            onPress={() => setCategory(c)}
          >
            <Text style={[styles.categoryText, category === c && styles.selectedCategoryText]}>
              {c}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Your Total Budget ($)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
        placeholder="Enter your budget"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        value={location}
        onChangeText={setLocation}
        placeholder="Enter a city"
        placeholderTextColor="#999"
      />

      {(category === 'Travel' || category === 'Hotels' || category === 'Travel Bundle') && (
        <>
          <Text style={styles.label}>Departure Location</Text>
          <TextInput
            style={styles.input}
            value={departure}
            onChangeText={setDeparture}
            placeholder="City of departure"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Destination</Text>
          <TextInput
            style={styles.input}
            value={destination}
            onChangeText={setDestination}
            placeholder="Destination city"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Travel Date</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>{date.toDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
            />
          )}

          <Text style={styles.label}>Number of Travelers</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={people}
            onChangeText={setPeople}
            placeholder="e.g. 2"
            placeholderTextColor="#999"
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Find Recommendations</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0a0a0a',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  categoryOption: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#222',
    marginVertical: 4,
    flexGrow: 1,
    marginRight: 8,
  },
  categoryText: {
    color: '#aaa',
    textAlign: 'center',
  },
  selectedCategory: {
    backgroundColor: '#5cb85c',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
  },
  dateText: {
    color: '#fff',
  },
});

export default FormScreen;
