import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { styled, withExpoSnack } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/SessionStyle'
import { useTheme } from '../../constants/ThemeProvider';

const StyledText = styled(Text);

const user = "Rueben";

const SessionScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const navigation = useNavigation();
  return (
    <View className={styles.container} style={{height: '100%', backgroundColor: theme.backgroundColor}}>
      <View className={styles.header}>
          <Ionicons name="list" size={28} color={theme.header.icon} />
          <Image className={styles.avatar} source={require('../../design/avatar.png')}></Image>
      </View>
      <View>
        <Text className={styles.welcomeText} style={{color: theme.poster}}>Welcome back,</Text>
        <Text className={styles.welcomeText} style={{color: theme.poster}}>{user}!</Text>
      </View>
      <View className={styles.homeLabel.background}>
        <Text className={styles.homeLabel.title}>Weekly Verse</Text>
        <Text className={styles.homeLabel.content}>John 3:16 - "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."</Text>
      </View>
        <TouchableOpacity className={styles.button} onPress={() => navigation.navigate('CreateSession')}>
          <Text className={styles.buttonText} style={{color: theme.button.text}}>
            CREATE NEW STUDY
          </Text>
          <Ionicons className={styles.tag} name="chevron-forward" size={28} color={theme.header.icon} />
        </TouchableOpacity>
        <TouchableOpacity className={styles.button} onPress={() => navigation.navigate('SavedSession')}>
          <Text className={styles.buttonText} style={{color: theme.button.text}}>
            MY STUDIES
          </Text>
          <Ionicons className={styles.tag} name="chevron-forward" size={28} color={theme.header.icon} />
        </TouchableOpacity>
        <TouchableOpacity className={styles.button} onPress={() => navigation.navigate('SavedSession')}>
          <Text className={styles.buttonText} style={{color: theme.button.text}}>
            COMMUNITY STUDIES
          </Text>
          <Ionicons className={styles.tag} name="chevron-forward" size={28} color={theme.header.icon} />
        </TouchableOpacity>
  </View>
  );
}

export default withExpoSnack(SessionScreen);
