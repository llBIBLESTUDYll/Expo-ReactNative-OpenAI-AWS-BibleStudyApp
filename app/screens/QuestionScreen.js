import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image
  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/QuestionStyle';
import { useTheme } from '../../constants/ThemeProvider';

const QuestionScreen = ({ navigation }) => {

  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = () => {
    navigation.navigate('Answer', { question });
  };
  
  const goToBack = () => {
    navigation.goBack();
  }  
  return (
    <View className={styles.container} style={{height: '100%', backgroundColor: theme.backgroundColor}}>
      <View className={styles.header}>
          <Ionicons name="arrow-back-sharp" size={30} color={theme.header.icon} onClick={() => goToBack()} />
          <Text className={styles.title} style={{color: theme.header.title}}>Question</Text>
          <Image className={styles.avatar} source={require('../../design/avatar.png')}></Image>
      </View>
      <Text className={styles.postar} style={{color: theme.poster}}>Please Ask Any Questions You Have!</Text>      
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
        <Text className={styles.buttonText} style={{color: theme.button.text}}>Submit Question</Text>
      )}
    </TouchableOpacity>
    </View>
  );
};
export default QuestionScreen;