import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  } from 'react-native';

const QuestionScreen = ({ navigation }) => {

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Add code here to handle submission of the question
    // You can navigate to the answer screen after submission
    navigation.navigate('Answer', { question });
  };
  return (
    <View style={styles.container}>
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Ask a question"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Submit Question</Text>
      )}
    </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  input: {
    paddingVertical: 4,
    borderColor: "#444444",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 10,
    marginHorizontal: 20,
  },
    button: {
    backgroundColor: '#444444',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});
export default QuestionScreen;