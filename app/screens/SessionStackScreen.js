import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import the screens
import SessionScreen from './SessionScreen';
import ActiveSessionScreen from './ActiveSessionScreen';
import CreateSessionScreen from './CreateSessionScreen';
import SessionDetailsScreen from './SessionDetailsScreen';

// Create a Stack Navigator for Sessions
const SessionStack = createStackNavigator();

const SessionStackScreen = () => {
  return (
    <SessionStack.Navigator initialRouteName="Session">
      <SessionStack.Screen name="Session" component={SessionScreen} options={{ headerShown: false }} />
      <SessionStack.Screen name="ActiveSession" component={ActiveSessionScreen} options={{ headerShown: false }}/>
      <SessionStack.Screen name="CreateSession" component={CreateSessionScreen} options={{ headerShown: false }} />
      <SessionStack.Screen name="SessionDetails" component={SessionDetailsScreen} />
    </SessionStack.Navigator>
  );
}

export default SessionStackScreen;
