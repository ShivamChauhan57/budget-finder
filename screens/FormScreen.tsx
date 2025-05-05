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
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
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
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [dietaryRestriction, setDietaryRestriction] = useState('');

  const handleSearch = () => {
    const params: any = {
      category,
      budget,
    };

    if (category === 'Food') {
      params.location = location;
      params.dietaryRestriction = dietaryRestriction;
    } else if (category === 'Travel Bundle') {
      params.departure = departure;
      params.destination = destination;
      params.people = people;
      params.date = startDate.toISOString();
    } else if (category === 'Hidden Gems') {
      params.location = location;
    }

    navigation.navigate('Main', {
      screen: 'Results',
      params,
    });
  };

  const categories = ['Food', 'Travel Bundle', 'Hidden Gems'];
  const dietaryOptions = ['', 'Vegan', 'Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
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

        {category === 'Food' && (
          <>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter a city"
              placeholderTextColor="#999"
            />

            <Text style={styles.label}>Dietary Restrictions</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={dietaryRestriction}
                onValueChange={(itemValue) => setDietaryRestriction(itemValue)}
              >
                {dietaryOptions.map((option) => (
                  <Picker.Item key={option} label={option || 'None'} value={option} />
                ))}
              </Picker>
            </View>
          </>
        )}

        {category === 'Travel Bundle' && (
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

            <Text style={styles.label}>Travel Start Date</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowStartPicker(true)}>
              <Text style={styles.dateText}>{startDate.toDateString()}</Text>
            </TouchableOpacity>
            {showStartPicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(e, selectedDate) => {
                  setShowStartPicker(false);
                  setStartDate(selectedDate || startDate);
                }}
              />
            )}

            <Text style={styles.label}>Travel End Date</Text>
            <TouchableOpacity style={styles.dateButton} onPress={() => setShowEndPicker(true)}>
              <Text style={styles.dateText}>{endDate.toDateString()}</Text>
            </TouchableOpacity>
            {showEndPicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={(e, selectedDate) => {
                  setShowEndPicker(false);
                  setEndDate(selectedDate || endDate);
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

        {category === 'Hidden Gems' && (
          <>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="Enter a city"
              placeholderTextColor="#999"
            />
          </>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Find Recommendations</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D94F4F',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#f5f5f5',
    color: '#333',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
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
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
    flexGrow: 1,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  categoryText: {
    color: '#555',
    textAlign: 'center',
  },
  selectedCategory: {
    backgroundColor: '#D94F4F',
    borderColor: '#D94F4F',
  },
  selectedCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#D94F4F',
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
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dateText: {
    color: '#333',
  },
  pickerWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginTop: 8,
  },
});

export default FormScreen;
