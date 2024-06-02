import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';

import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemeProvider } from '../constants/ThemeProvider';

import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import VerifyScreen from './screens/VerifyScreen';
import SettingsScreen from './screens/SettingsScreen';
import SessionStackScreen from './screens/SessionStackScreen';
import QuestionScreen from './screens/QuestionScreen';
import {Amplify} from 'aws-amplify';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const SplashStack = createStackNavigator(); 
const AuthStack = createStackNavigator();

//Authorisation Stack
const SplashStackScreen = () => {
  return (
    <SplashStack.Navigator>
      <Tab.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
    </SplashStack.Navigator>
  );
}

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <Tab.Screen name='Login' component={LoginScreen} options={{ headerShown: false }} />
      <Tab.Screen name='Register' component={RegisterScreen} options={{ headerShown: false }} />
      <Tab.Screen name='Verify' component={VerifyScreen} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  )
}

//Main Stack
const TabNavigator = () => {
return (
  <Tab.Navigator
    screenOptions={({ route }) => ({

      //Set Icon Function
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Study Session') {
          iconName = focused ? 'book' : 'book-outline';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings-outline';
        } else if (route.name === 'Question') { 
          iconName = focused ? 'help-circle' : 'help-circle-outline';
        }

        return <Ionicons name={iconName} size={size * 0.8} color={color} />;
      },
    })}
    tabBarOptions={{
      tabStyle: {
        paddingVertical: 5,
      },
      activeTintColor: 'dark grey',
      inactiveTintColor: 'grey',
    }}
  >
    <Tab.Screen name="Study Session" component={SessionStackScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Question" component={QuestionScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Settings" component={SettingsScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);
}


export default function RootLayout() {
  const colorScheme = useColorScheme();
  console.log('This is colorScheme in _layout', colorScheme)

  return (
    <ThemeProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Tab">
          <Stack.Screen name="Splash" component={SplashStackScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }}/>
          <Stack.Screen name="Tab" component={TabNavigator} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>      
    </ThemeProvider>
  );
}
