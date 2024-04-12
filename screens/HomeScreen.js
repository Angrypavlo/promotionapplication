import React, { useEffect, useState, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Dimensions, Button, Modal, Pressable, Animated } from 'react-native';
import { getScreenOptions } from '../components/ScreenOptions';
import { useAuth } from '../components/AuthContext';
import OAuthScreen from './LoginScreen';
import ProfileScreen from '../screens/profileScreens/ProfileScreen.js';
import EditProfileScreen from './profileScreens/EditProfileScreen.js';

import { Ionicons } from '@expo/vector-icons';

import MapView, { PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import haversine from 'haversine';
import Icon from 'react-native-vector-icons/Feather';

import { useLocationTracker } from '../components/StatsTracking/useLocationTracker';

import { formatTime } from '../components/Utils';

const HomeStack = createStackNavigator();
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

const calculateBounds = (path) => {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  path.forEach(point => {
    minLat = Math.min(minLat, point.latitude);
    maxLat = Math.max(maxLat, point.latitude);
    minLng = Math.min(minLng, point.longitude);
    maxLng = Math.max(maxLng, point.longitude);
  });

  return { minLat, maxLat, minLng, maxLng };
};

const getRegionForPath = (path) => {
  const { minLat, maxLat, minLng, maxLng } = calculateBounds(path);

  const latDelta = maxLat - minLat;
  const lngDelta = maxLng - minLng;

  // Add some padding to the deltas
  const padding = 0.05;
  return {
    latitude: minLat + (latDelta / 2),
    longitude: minLng + (lngDelta / 2),
    latitudeDelta: latDelta + padding,
    longitudeDelta: lngDelta + padding,
  };
};

const calculateAverageSpeed = (totalDistance, elapsedTime) => {
  console.log(totalDistance, elapsedTime);
  // Ensure elapsedTime is converted to hours
  const elapsedTimeInHours = elapsedTime / 1000 / 3600;
  console.log(elapsedTimeInHours);
  // Avoid division by zero error
  if (elapsedTimeInHours > 0) {
    return totalDistance / elapsedTimeInHours;
  } else {
    return 0;
  }
};

const Screen = ({ navigation }) => {
  const { user } = useAuth();
  const { region, path, speed, timer, toggleTracking, totalDistance, isTracking, coinCount } = useLocationTracker();

  const [modalVisible, setModalVisible] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);

  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  const [buttonAnimation] = useState(new Animated.Value(1));
  const handlePressIn = () => {
    Animated.spring(buttonAnimation, {
      toValue: 0.90,
      useNativeDriver: true,
      speed: 40, // Increase speed for a more rapid animation
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(buttonAnimation, {
      toValue: 1, // Return to original size
      useNativeDriver: true,
      speed: 40, // Match the speed of the press-in animation
    }).start();
  };

  const onMapLayout = () => {
    setMapReady(true);
  };

  useEffect(() => {
    if (mapReady && mapRef.current && path.length > 1) {
      mapRef.current.fitToCoordinates(path, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  }, [mapReady, path]);
  
  const handleStopTracking = () => {
    const currentTime = timer;
    setElapsedTime(currentTime);
    toggleTracking();
    setMapReady(false);
    const avgSpeed = calculateAverageSpeed(totalDistance, currentTime);
    setAverageSpeed(avgSpeed); // Store the average speed
    setModalVisible(true); // Show the modal with the map and stats
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation={true}
          region={region}
          customMapStyle={testStyle}
        >
          {path.length > 0 && (
            <Polyline
              coordinates={path}
              strokeColor="#009933"
              strokeWidth={3}
            />
          )}
        </MapView>
      )}
      <View style={styles.textContainer}>
        <Text>Home Screen</Text>
        <Text>Logged in: {user ? 'Yes' : 'No'}</Text>
        {user && user.email && <Text>Email: {user.email}</Text>}
      </View>
      <View style={styles.infoContainer}>
        {isTracking && (
          <>
            <Text>Timer: {formatTime(timer)}</Text>
            <Text>Distance: {totalDistance.toFixed(2)} km</Text>
            <Text>Speed: {speed ? (speed * 3.6).toFixed(2) : "0.00"} km/h</Text>
            <Text>Coins Collected: {coinCount}</Text>
          </>
        )}
        <AnimatedTouchable
          style={[
            styles.button,
            {
              transform: [
                { scale: buttonAnimation },
              ],
            },        
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={isTracking ? handleStopTracking : toggleTracking}
        >
          <Icon name="navigation" size={30} color="#009933" />
          <Text style={styles.buttonText}>{isTracking ? "STOP" : "START"}</Text>
        </AnimatedTouchable>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.mapModal}
          initialRegion={getRegionForPath(path)}
          onLayout={onMapLayout}
          customMapStyle={testStyle}
        >
          {mapReady && (
            <Polyline
              coordinates={path}
              strokeColor="#009933"
              strokeWidth={3}
            />
          )}
        </MapView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.modalText}>Time: {formatTime(elapsedTime)}</Text>
          <Text style={styles.modalText}>Distance: {totalDistance.toFixed(2)} km</Text>
          <Text style={styles.modalText}>Average Speed: {averageSpeed.toFixed(2)} km/h</Text>
          <Text style={styles.modalText}>Coins Collected: {coinCount}</Text>
          <Button
            title="Close"
            onPress={() => {
              setModalVisible(!modalVisible);
              setMapReady(false); // reset mapReady state
            }}
          />
        </View>
      </Modal>
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
  mapModal: {
    width: '100%',
    height: '75%',
  },
  textContainer: {
    position: 'absolute',
    top: 50,
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalText: {
    marginVertical: 10, // This ensures there is some space between the text and other elements
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: '#009933',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 160,
    height: 70,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#009933',
  },
});

function HomeScreen() {
  return (
    <HomeStack.Navigator screenOptions={({ navigation }) => getScreenOptions(navigation)}>
      <HomeStack.Screen name="Home" component={Screen} />
      {/* <HomeStack.Screen name="OAuthWebView" component={OAuthScreen}  /> */}
      <HomeStack.Screen name="Profile" component={ProfileScreen}
      initialParams={{
        name: 'John Doe',
        email: 'john.doe@example.com',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        profileImagePhoto: require('../screens/images/BlankProfileImage.png')
      }} />
      <HomeStack.Screen name="EditProfile" component={EditProfileScreen}
      // initialParams={{
      //   name: 'John Doe',
      //   email: 'john.doe@example.com',
      //   bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      //   profileImagePhoto: require('../screens/images/BlankProfileImage.png')
      // }} 
      />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;

const testStyle =
[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "administrative.neighborhood",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
