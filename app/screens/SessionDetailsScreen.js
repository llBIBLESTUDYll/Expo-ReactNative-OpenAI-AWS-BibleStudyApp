import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SessionDetailsScreen = ({ route }) => {
  const { session } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{session.name}</Text>
      <Text style={styles.info}>Host: {session.host}</Text>
      <Text style={styles.info}>Time: {session.time}</Text>

      <TouchableOpacity style={styles.button} onPress={() => console.log('Join session')}>
        <Text style={styles.buttonText}>Join Session</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  info: {
    fontSize: 18,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#444444',
    padding: 16,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SessionDetailsScreen;
