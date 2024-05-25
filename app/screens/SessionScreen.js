import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { styled, withExpoSnack } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/SessionStyle'

const StyledText = styled(Text);

const user = "Rueben";

const SessionScreen = ({ navigation }) => {
  return (
    <View className={styles.container}>
      <View className={styles.header}>
          <Ionicons name="list" size={28} color="black" />
          <Image className={styles.avatar} source={require('../../design/avatar.png')}></Image>
      </View>
      <View>
        <StyledText className={styles.welcomeText}>Welcome back,</StyledText>
        <Text className={styles.welcomeText}>{user}!</Text>
      </View>
      <View className={styles.homeLabel.background}>
        <Text className={styles.homeLabel.title}>Weekly Verse</Text>
        <Text className={styles.homeLabel.content}>John 3:16 - "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."</Text>
      </View>
        <TouchableOpacity className={styles.button} onPress={() => navigation.navigate('CreateSession')}>
          <Text className={styles.buttonText}>
            CREATE NEW STUDY
          </Text>
          <Ionicons className={styles.tag} name="chevron-forward" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className={styles.button} onPress={() => navigation.navigate('CreateSession')}>
          <Text className={styles.buttonText}>
            MY STUDIES
          </Text>
          <Ionicons className={styles.tag} name="chevron-forward" size={28} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className={styles.button} onPress={() => navigation.navigate('CreateSession')}>
          <Text className={styles.buttonText}>
            COMMUNITY STUDIES
          </Text>
          <Ionicons className={styles.tag} name="chevron-forward" size={28} color="black" />
        </TouchableOpacity>
  </View>
  );
}

export default withExpoSnack(SessionScreen);
