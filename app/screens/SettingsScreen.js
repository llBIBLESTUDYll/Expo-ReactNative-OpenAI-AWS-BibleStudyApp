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

  const update = async () => {
    setLoading(true);
    const user = await Auth.currentAuthenticatedUser().then(async user => { return user});
    console.log('this is logined user', user.attributes)

    setLoading(false);
  }

  const testAPI = async () => {
    setLoading(true);
    try {
      // Make the API call
      const username = '8498a478-c051-7039-fc9f-5e0797a4be9e'
      const data = await API.get('secondTestForBible', `/session/question?username=${username}&page=4`)
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
      {isAbout && (
        <TouchableOpacity style={extra_styles.overlay}>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={isAbout}
            onRequestClose={closeModal}>
            <TouchableOpacity
              style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}
              activeOpacity={1}
              onPress={closeModal}
            ></TouchableOpacity>
              <View style={ styles.modal}>
                {/* <TouchableOpacity className={styles.button} onPress={testAPI}>
                { loading ? <ActivityIndicator animating = {true} size="small" color={theme.loading} /> : <Text className={styles.buttonText}>Test</Text> }
                </TouchableOpacity> */}
                <Text className={styles.about}>Welcome To BibleStudy</Text>

                <TouchableOpacity className={styles.button} onPress={closeModal}>
                    <Text className={styles.buttonText}>O K</Text>
                </TouchableOpacity>
                {/* <Text>This is a christian study app.</Text> */}
              </View>
          </Modal>
        </TouchableOpacity>
      )}

      {isProfile && (
        <TouchableOpacity style={extra_styles.overlay}>
          <Modal
            animationType={"slide"}
            transparent={true}
            visible={isProfile}
            onRequestClose={closeModal}>
              <TouchableOpacity
                style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }}
                activeOpacity={1}
                onPress={closeModal}
              ></TouchableOpacity>
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
                <View className={styles.buttonGroup}>
                  <TouchableOpacity className={styles.button} onPress={update}>
                  { loading ? <ActivityIndicator animating = {true} size="small" color={theme.loading} /> : <Text className={styles.aboutButtonText}>Change</Text> }
                  </TouchableOpacity>
                  <TouchableOpacity className={styles.button} onPress={closeModal}>
                    <Text className={styles.aboutButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </Modal>
        </TouchableOpacity>
      )}
    </View>
  );
};

const extra_styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
})

export default SettingsScreen;
