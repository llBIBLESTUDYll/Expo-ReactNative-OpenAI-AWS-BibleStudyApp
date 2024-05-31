import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, TouchableOpacity, Image, Modal, Keyboard, BackHandler, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/SettingStyle';
import { useTheme } from '../../constants/ThemeProvider';
import  {Auth, API}  from 'aws-amplify';
import axios from 'axios';
const apiEndpoint = 'https://7tyvicof5e.execute-api.us-east-1.amazonaws.com/this_is_stage_of_deploy_api/';

const SettingsScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAbout, setIsAbout] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const update = () => {
    setLoading(true);
    Auth.currentAuthenticatedUser()
        .then(user => {
          console.log('this is logined user', user.attributes)
          return Auth.updateUserAttributes(user, {
            'name': username,
            'email': email
          });
        })
        .then(data => {console.log(data); setLoading(false); closeModal();})
        .catch(err => console.log(err));
  }

  const testAPI = async () => {
    setLoading(true);
    try {
      // Make the API call
      const data = await API.get('secondTestForBible', '/items')
      // const response = await axios.get(apiEndpoint);
      setLoading(false)
      console.log('Response data:', data);
    } catch (error) {
      setLoading(false)
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
        .then(user => {
          console.log('this is logined user', user.attributes)
          setUsername(user.attributes.name ? user.attributes.name : '')
          setEmail(user.attributes.email ? user.attributes.email : '')
        })
        .catch(err => console.log(err));
  }, [])

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
        <Switch value={isDarkMode} trackColor={{ false: 'gray', true: 'black' }} onValueChange={toggleDarkMode} />
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
            <TouchableOpacity className={styles.button} onPress={testAPI}>
            { loading ? <ActivityIndicator animating = {true} size="small" color={theme.loading} /> : <Text className={styles.buttonText}>Test</Text> }
            </TouchableOpacity>
          </View>
      </Modal>
      <Modal
        animationType={"slide"}
        transparent={true}
        visible={isProfile}
        onRequestClose={closeModal}>
          <View style={styles.modal}>
            <Text className={styles.postar}>Change Your Profile</Text>
            <View className={styles.inputGroup}>
                <Text className={styles.inputLabel}>username</Text>
                <TextInput
                    className={styles.input}
                    onChangeText={setUsername}
                    value={username}
                    // placeholder="Enter Group Type (eg. Family)"
                    placeholderTextColor="grey"
                />
            </View>
            <View className={styles.inputGroup}>
                <Text className={styles.inputLabel}>email</Text>
                <TextInput
                    className={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    // placeholder="Enter Group Type (eg. Family)"
                    placeholderTextColor="grey"
                />
            </View>
            <TouchableOpacity className={styles.button} onPress={update}>
            { loading ? <ActivityIndicator animating = {true} size="small" color={theme.loading} /> : <Text className={styles.buttonText}>Change</Text> }
            </TouchableOpacity>
          </View>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
