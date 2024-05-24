import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const BibleStudySessionScreen = ( props ) => {
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

  return (
    <View style={styles.container}>

      {/* Header */}
      <Text style={styles.header}>
        QUESTION {currentQuestionIndex + 1}/{restion.length}
      </Text>

      {/* Current Question */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>
          {restion[currentQuestionIndex].question}
        </Text>
      </View>

      {/* Verses List */}
      {restion[currentQuestionIndex].verses.map((verse, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.verseBox}
          onPress={() => handleVersePress(index)}
        >
          <Text style={styles.verseTitle}>
            {verse.reference}
          </Text>
          {expandedVerseIndex === index && (
            <Text style={styles.verseText}>
              {verse.text}
            </Text>
          )}
        </TouchableOpacity>
      ))}

      {/* Navigation Buttons */}
      <View style={styles.navigationButtons}>
        <TouchableOpacity 
          style={styles.navButton}
          disabled={currentQuestionIndex === 0}
          onPress={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
        >
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.navButton}
          disabled={currentQuestionIndex === restion.length - 1}
          onPress={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
        >
          <Text style={styles.navButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    fontSize: 12,
    color: '#444444',
    fontWeight: 'bold',
    marginBottom: 16,
    paddingLeft: 4,
  },
  questionBox: {
    backgroundColor: '#ccc1b4',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  questionText: {
    color: '#444444',
    fontWeight: 'bold',
  },
  verseBox: {
    backgroundColor: '#e8ebe9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
  },
  verseTitle: {
    color: '#444444',
    fontWeight: 'bold',
  },
  verseText: {
    color: '#444444',
    marginTop: 8,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  navButton: {
    padding: 12,
    backgroundColor: '#444444',
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  navButtonText: {
    color: 'white',
  },
});

export default BibleStudySessionScreen;