import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

const VerifyScreen = ({ navigation }) => {
  const route = useRoute();
  const email = route.params?.email;
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    console.log("this is navigation form login or register",route)
    setError(null);
    setLoading(true);
    Auth.confirmSignUp(email, code)
    .then(data => {
      setLoading(false);
      console.log("this is response after email confirmed", data)
      navigation.navigate('Login');
      //navigation.navigate('Main');
    })
    .catch(err => {
      setLoading(false);
      console.log("this is an error from confirm email", err)
      setError(err.message);
    });
  };

  const resendCode = async () => {
    try {
      const data = await Auth.resendSignUp(email);
      setError("We have resent the verify code to " + data.CodeDeliveryDetails.Destination);
      console.log('Verification code resent successfully');
    } catch (error) {
      console.error('Error resending verification code:', error);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcom to Bible Study!</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <TextInput
        value={code}
        onChangeText={setCode}
        placeholder="Enter a correct code from your Email"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Verify</Text>
      )}
      </TouchableOpacity>
      <Text style={styles.link} onPress={resendCode}>Please, send me a verify code again</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 100,
    padding: 10,
  },
  welcomeMessage: {
    fontSize: 24,
    textAlign: 'center',
    margin: 20,
  },  
  input: {
    paddingVertical: 4,
    borderColor: "#444444",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    placeholderTextColor: 'grey'
  },
    button: {
    marginHorizontal: 20,
    backgroundColor: '#444444',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  link: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingLeft: 10,
    paddingVertical: 4,
//    color: '#0000aa',
//    borderBottomColor: '#0000aa',
//    borderBottomWidth: 0.5,
    width: 300
  },
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});
export default VerifyScreen;