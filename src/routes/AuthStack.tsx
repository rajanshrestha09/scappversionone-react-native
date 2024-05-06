import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {LoginScreen} from '../screen/LoginScreen';
import {SignupScreen} from '../screen/SignupScreen';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerBackTitleVisible: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{title:"Login"}}/>
      <Stack.Screen name="Signup" component={SignupScreen} options={{title:"Signup"}}/>
    </Stack.Navigator>
  );
}

