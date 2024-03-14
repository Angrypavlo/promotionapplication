import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native';
import { getScreenOptions } from '../components/ScreenOptions';
import { useAuth } from '../components/AuthContext';

const HomeStack = createStackNavigator();

function Screen({ navigation }) {
  const { user } = useAuth();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      {user && user.token && (
        <Text>Token: {user.token}</Text> // Display the token
      )}
    </View>
  );
}

function HomeScreen() {
  return (
    <HomeStack.Navigator screenOptions={({ navigation }) => getScreenOptions(navigation)}>
      <HomeStack.Screen name="Home" component={Screen} />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;
