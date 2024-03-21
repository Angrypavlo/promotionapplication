import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigators/AppNavigator';
import { StyleSheet } from 'react-native';
import { AuthProvider } from './components/AuthContext';
import ProfileDrawer from './components/ProfileDrawer';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <ProfileDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        drawerPosition: 'right',
      }}
    >
      <Drawer.Screen name="App" component={AppNavigator} />
    </Drawer.Navigator>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
