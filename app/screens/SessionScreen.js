import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const user = "Rueben";

const SessionScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.welcomeMessage}>Welcome, {user}!</Text>

      <View style={styles.verseContainer}>
        <Text style={styles.verseTitle}>Weekly Verse</Text>
        <Text style={styles.verseText}>John 3:16 - "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateSession')}>
        <Text style={styles.buttonText}>Create a Study Session</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 40,
  },
  welcomeMessage: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },
  verseContainer: {
    backgroundColor: '#E8E8E8',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  verseTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  verseText: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#444444',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default SessionScreen;
