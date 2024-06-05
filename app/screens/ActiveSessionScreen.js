import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/ActiveStyle'
import { useTheme } from '../../constants/ThemeProvider';
import  {Auth, API}  from 'aws-amplify';

const BibleStudySessionScreen = ( props ) => {
  const sessionInfo = props.route.params.sessionInfo;
  const from = props.route.params.from;
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  console.log('this is navigation ===============>', props.route.params.questions);
  const keys = Object.keys(props.route.params.questions);

  const index = 0; // For example, to access the second property
  const key = keys[index];
  
  const { BibleStudyQuestions, questions, Questions, biblestudyquestions } = props.route.params.questions
  console.log("this is props" ,props, BibleStudyQuestions, biblestudyquestions, Questions, questions);
  // let restion = BibleStudyQuestions ? BibleStudyQuestions : biblestudyquestions ? biblestudyquestions : Questions ? Questions : questions ? questions : null;
  let restion = props.route.params.questions[key];
  console.log('this is restion from key', restion)
  restion = restion.map(item => {
    const keys = Object.keys(item);
    const firstKey = keys[0];
    const secondKey = keys[1];
    item.question = item[firstKey];
    item.verses = item[secondKey];
    return item; 
  })
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [expandedVerseIndex, setExpandedVerseIndex] = useState(null);
  useEffect(() => {
    if(from != 'mystudies')
      Auth.currentAuthenticatedUser().then( async user => {
        const data = await API.post('session', '/session', {
          body: {
            user, restion, sessionInfo: sessionInfo
          }
        })
        await API.post('session', '/session', {
          body: {
            "sessionInfo": {
              "title": "confirm",
              "groupType": "confirm",
              "numberQuestions": "1",
              "numberVerses": "1",
              "focusTopic": "confirm",
              "bible": "confirm"
            },
            "user": {
              "username": "12345678901234567890"
            },
            "restion": [
              {
                "question": "This is question for confirm",
                "verses": [
                  {
                    "reference": "This is reference for confirm",
                    "text": "This is text for confirm"
                  }
                ]
              }
            ]
          }
        })    
      })
  }, [])

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
              {verse.reference ? verse.reference : verse[Object.keys(verse)[0]]}
            </Text>
            {expandedVerseIndex === index && (
              <Text className={styles.verseText}>
                {verse.text ? verse.text : verse[Object.keys(verse)[1]]}
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