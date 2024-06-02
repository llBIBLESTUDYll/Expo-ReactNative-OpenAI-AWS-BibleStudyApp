import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  TextInput, 
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  } from 'react-native';
import  {Auth}  from 'aws-amplify';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    setError(null);
    setLoading(true);
    Auth.signIn(email, password)
    .then(user => {
      setLoading(false);
      navigation.navigate('Tab');
      console.log("this is user from user pool", user)
      //navigation.navigate('Main');
    })
    .catch(err => {
      setLoading(false);
      console.log("this is an error from user pool when login", err)
      if(err.code == 'UserNotConfirmedException') navigation.navigate("Verify", {email});
      else setError(err.message);
    });
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  }
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeMessage}>Welcom to Bible Study!</Text>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Jhon@gmail.com"
        style={styles.input}
      />

      <TextInput
        secureTextEntry= {true}
        value={password}
        onChangeText={setPassword}
        placeholder="Enter a correct password"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Text style={styles.buttonText}>Login</Text>
      )}
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginLeft: 30}}>
        <Text style={styles.state} >Don't you have an account? </Text>
        <Text style={styles.link} onPress={goToRegister} >Singn Up Now</Text>
      </View> 
      
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
  state: {
    marginVertical: 10,
    paddingVertical: 4,
//    color: '#0000aa',
    borderBottomColor: '#0000aa',
//    borderBottomWidth: 0.5,
    width: 200
  },
  link: {
    marginVertical: 10,
    paddingVertical: 4,
    width: 100
  },  
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
});
export default LoginScreen;