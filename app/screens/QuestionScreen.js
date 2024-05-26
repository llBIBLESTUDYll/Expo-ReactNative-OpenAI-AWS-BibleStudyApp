import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image
  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/QuestionStyle';

const QuestionScreen = ({ navigation }) => {

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    // Add code here to handle submission of the question
    // You can navigate to the answer screen after submission
    navigation.navigate('Answer', { question });
  };
  
  const goToBack = () => {
    navigation.goBack();
  }  
  return (
    <View className={styles.container}>
      <View className={styles.header}>
          <Ionicons name="arrow-back-sharp" size={30} color="black" onClick={() => goToBack()} />
          <Text className={styles.title}>Question</Text>
          <Image className={styles.avatar} source={require('../../design/avatar.png')}></Image>
      </View>
      <Text className={styles.postar}>Please Ask Any Questions You Have!</Text>      
      <TextInput
        value={question}
        onChangeText={setQuestion}
        placeholder="Ask a question"
        placeholderTextColor="grey"
        className={styles.input}
      />
      <TouchableOpacity className={styles.button} onPress={handleSubmit}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text className={styles.buttonText}>Submit Question</Text>
      )}
    </TouchableOpacity>
    </View>
  );
};
export default QuestionScreen;