import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Principal from './src/pages/Principal';
import Historico from './src/pages/Historico';
import Login from './src/pages/Login';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Principal" component={Principal} />
      <Stack.Screen name="Historico" component={Historico} />
      <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
  </NavigationContainer>
  );
}
