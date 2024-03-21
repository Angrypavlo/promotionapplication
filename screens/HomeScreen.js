import React, { useEffect, useState, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { getScreenOptions } from '../components/ScreenOptions';
import { useAuth } from '../components/AuthContext';
import OAuthScreen from './LoginScreen';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const HomeStack = createStackNavigator();

const Screen = ({ navigation }) => {
  const { user } = useAuth();
  const [region, setRegion] = useState(null);
  const locationSubscription = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 5,
        },
        (locationUpdate) => {
          const { latitude, longitude } = locationUpdate.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          });
        }
      );
    })();

    // Cleanup function to stop watching location on component unmount
    return () => {
      if (locationSubscription.current) {
        locationSubscription.current.remove();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          region={region} // Use `region` instead of `initialRegion` to make the map follow the user
        />
      )}
      <View style={styles.textContainer}>
        <Text>Home Screen</Text>
        <Text>Logged in: {user ? 'Yes' : 'No'}</Text>
        {user && user.email && (
          <Text>Email: {user.email}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  textContainer: {
    position: 'absolute',
    alignItems: 'center',
  },
});

function HomeScreen() {
  return (
    <HomeStack.Navigator screenOptions={({ navigation }) => getScreenOptions(navigation)}>
      <HomeStack.Screen name="Home" component={Screen} />
      <HomeStack.Screen name="OAuthWebView" component={OAuthScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;
