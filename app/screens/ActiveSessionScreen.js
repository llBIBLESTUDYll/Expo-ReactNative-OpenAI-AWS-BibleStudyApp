import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { styled, withExpoSnack } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/ActiveStyle'
import { useTheme } from '../../constants/ThemeProvider';

const BibleStudySessionScreen = ( props ) => {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  console.log('this is navigation ===============>', navigation);
  const { BibleStudyQuestions, questions, Questions, biblestudyquestions } = props.route.params.questions.BibleStudy ? props.route.params.questions.BibleStudy : props.route.params.questions;
  console.log("this is props" ,props, BibleStudyQuestions, biblestudyquestions, Questions, questions);
  let restion = BibleStudyQuestions ? BibleStudyQuestions : biblestudyquestions ? biblestudyquestions : Questions ? Questions : questions ? questions : null;
  restion = restion.map(item => {
    item.question = item.question ? item.question : item.title ? item.title : item.Question;
    item.verses = item.Verses ? item.Verses : item.verses;
    return item; 
  })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [expandedVerseIndex, setExpandedVerseIndex] = useState(null);

  const handleVersePress = (index) => {
    if (expandedVerseIndex === index) {
      setExpandedVerseIndex(null);
    } else {
      setExpandedVerseIndex(index);
    }
  };

  const goToBack = () => {
    navigation.goBack();
  }
  return (
    <View className={styles.container} style={{height: '100%', backgroundColor: theme.backgroundColor}}>
      {/* Header */}
      <View className={styles.header}>
          <Ionicons name="arrow-back-sharp" size={30} color={theme.header.icon} onClick={() => goToBack()} />
          <Text className={styles.title} style={{color: theme.header.title}}>Active Session</Text>
          <Image className={styles.avatar} source={require('../../design/avatar.png')}></Image>
      </View>
      {/* Current Question */}
      <View className={styles.questionBox} style={{height: '15%'}}>
        <Text className={styles.questionText}>
          {restion[currentQuestionIndex].question}
        </Text>
      </View>
      <View style={{height: '57%'}}>
        {/* Verses List */}
        {restion[currentQuestionIndex].verses.map((verse, index) => (
          <TouchableOpacity 
            key={index} 
            className={styles.verseBox}
            onPress={() => handleVersePress(index)}
          >
            <Text className={styles.verseTitle}>
              {verse.reference}
            </Text>
            {expandedVerseIndex === index && (
              <Text className={styles.verseText}>
                {verse.text}
              </Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
      <Text className={styles.page} style={{color: theme.header.title}}>
        QUESTION {currentQuestionIndex + 1}/{restion.length}
      </Text>
      {/* Navigation Buttons */}
      <View className={styles.navigationButtons}>
        <TouchableOpacity 
          className={styles.navButton}
          disabled={currentQuestionIndex === 0}
          onPress={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
        >
          <Text className={styles.navButtonText} style={{color: theme.button.text}}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={styles.navButton}
          disabled={currentQuestionIndex === restion.length - 1}
          onPress={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
        >
          <Text className={styles.navButtonText} style={{color: theme.button.text}}>Next</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default BibleStudySessionScreen;