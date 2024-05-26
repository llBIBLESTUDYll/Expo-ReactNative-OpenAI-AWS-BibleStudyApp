import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Image, Modal, Keyboard, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/SettingStyle';
import { useTheme } from '../../constants/ThemeProvider';
const SettingsScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleDarkMode = () => {
    setIsDarkMode(previousState => !previousState);
    toggleTheme()
  };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Auth' }],
    });
  };
  const goToBack = () => {
    navigation.goBack();
  }
  const closeModal = () => {
    setIsAbout(false);
    setIsProfile(false);
  };
  // Event listener for tapping outside of modal
  const handleTapOutside = () => {
    closeModal();
  };

  // Event listener for pressing the escape key
  const handleEscapePress = () => {
    closeModal();
  };


  useEffect(() => {
    if (isAbout) {
      // Listen for tapping outside of modal
      const outsideListener = Keyboard.addListener('keyboardDidHide', handleTapOutside);
      
      // Listen for pressing the escape key
      const escapeListener = BackHandler.addEventListener('hardwareBackPress', handleEscapePress);

      return () => {
        // Clean up event listeners when modal is closed
        outsideListener.remove();
        escapeListener.remove();
      };
    }
  }, [isAbout]);

  return (
    <View className={styles.container} style={{height: '100%', backgroundColor: theme.backgroundColor}}>
      <View className={styles.header}>
        <Ionicons name="arrow-back-sharp" size={30} color={theme.header.icon} onClick={() => goToBack()} />
        <Text className={styles.title} style={{color: theme.header.title}}>Settings</Text>
        <Image className={styles.avatar} source={require('../../design/avatar.png')}></Image>
      </View>
      <TouchableOpacity className={styles.settingContainer} onPress={() => setIsProfile(!isProfile)}>
        <Text className={styles.settingDescription}>Profile</Text>
        <Ionicons name="person" size={30} color="black" onClick={() => goToBack()} />
      </TouchableOpacity>
      <TouchableOpacity className={styles.settingContainer} onPress={() => setIsAbout(!isAbout)}>
        <Text className={styles.settingDescription}>About Us</Text>
        <Ionicons name="information-circle-sharp" size={30} color="black" onClick={() => goToBack()} />
      </TouchableOpacity>
      <TouchableOpacity className={styles.settingContainer}>
        <Text className={styles.settingDescription}>Donate</Text>
        <Ionicons name="diamond" size={30} color="black" onClick={() => goToBack()} />
      </TouchableOpacity>
      <TouchableOpacity className={styles.settingContainer} disabled>
        <Text className={styles.settingDescription}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </TouchableOpacity>

      <TouchableOpacity className={styles.button} onPress={handleLogout}>
        <Text className={styles.buttonText} style={{color: theme.button.text}}>Log Out</Text>
      </TouchableOpacity>

      <Modal
        animationType={"slide"}
        transparent={true}
        visible={isAbout}
        onRequestClose={closeModal}>
          <View style={styles.modal}>
            <Text>About Us</Text>
          </View>
      </Modal>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={isProfile}
        onRequestClose={closeModal}>
          <View style={styles.modal}>
            <Text>Profile</Text>
          </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
