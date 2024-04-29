// general imports
import React, { useEffect, useState, useRef } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Modal,
  Pressable,
  Animated,
  Platform,
} from "react-native";
import { getScreenOptions } from "../components/ScreenOptions";
import { useAuth } from "../components/AuthContext";
import OAuthScreen from "./LoginScreen";
import Icon from "react-native-vector-icons/Feather";
import { MaterialCommunityIcons } from '@expo/vector-icons';

// map imports
import MapView, {
  PROVIDER_GOOGLE,
  Polyline,
  Circle,
  Marker,
  Callout,
  AnimatedRegion,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useLocationTracker } from "../components/StatsTracking/useLocationTracker";
import * as Location from "expo-location";
import UserMarker from "../components/Home/Map/userMarker";
import RunStats from "../components/Home/Running/RunStats";
import RunRecap from "../components/Home/Running/RunRecap";
import ButtonWrapper from "../components/Utils/ButtonWrapper";
import StartMarker from "../components/Home/Map/startMarker";
// import { GOOGLE_MAPS_APIKEY } from '@env';

// maps components

const GOOGLE_MAPS_APIKEY = "AIzaSyD5OoHQxXav-GPGJ4JsXBcswbZZ_Gri9tE";
const MAIN_COLOR = "#22c55e";

const HomeStack = createStackNavigator();
const AnimatedTouchable = Animated.createAnimatedComponent(Pressable);

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
  const { user, setUser } = useAuth();
  const {
    region,
    path,
    speed,
    timer,
    toggleTracking,
    totalDistance,
    isTracking,
    coinCount,
  } = useLocationTracker();

  const [modalVisible, setModalVisible] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [averageSpeed, setAverageSpeed] = useState(0);

  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

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

    const newCoins = user.coins + coinCount;
    setUser({ ...user, coins: newCoins });
  };

  const onDismissModal = () => {
    setModalVisible(!modalVisible);
    setMapReady(false); // reset mapReady state
  };

  // ==================================== HOT ZONES =====================================

  // coordinates of the hot zone
  const [x, setX] = useState({
    latitude: 54.893,
    longitude: 23.903,
  });
  const [focusedX, setFocusedX] = useState(false);

  // route duration
  const [duration, setDuration] = useState(null);
  const [popupCoordinate, setPopupCoordinate] = useState(null);

  // user location
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // get user location at load
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const goToTheHotArea = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setFocusedX(!focusedX);
  };

  // ==================================== OTHER USERS =====================================
  const [users, setUsers] = useState([
    {
      name: "pippo1",
      coordinate: new AnimatedRegion({
        latitude: 37.3367,
        longitude: -122.0311,
      }),
    },
    {
      name: "pippo2",
      coordinate: new AnimatedRegion({
        latitude: 37.3303,
        longitude: -122.0345,
      }),
    },
  ]);

  const updatedUsers = [
    {
      name: "pippo1",
      coordinate: {
        latitude: 37.336,
        longitude: -122.0311,
      },
    },
    {
      name: "pippo2",
      coordinate: {
        latitude: 37.3303,
        longitude: -122.033,
      },
    },
    {
      name: "pippo3",
      coordinate: {
        latitude: 37.329,
        longitude: -122.0343,
      },
    },
  ];

  const updateOtherUsers = () => {
    updatedUsers.map(({ name, coordinate }) => {
      const updUser = users.find((user) => user.name == name);
      if (updUser) {
        if (Platform.OS == "ios") {
          updUser.coordinate.timing({ ...coordinate, duration: 10 }).start();
        } else if (Platform.OS == "android") {
          if (Platform.OS == "ios")
            updUser.coordinate.timing({ ...coordinate, duration: 500 }).start();
        }
      } else {
        setUsers((prevUsers) => [
          ...prevUsers,
          {
            name: name,
            coordinate: new AnimatedRegion(coordinate),
          },
        ]);
      }
    });
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
          {path.length > 0 && isTracking && (
            <View>
              <Marker coordinate={path[0]}>
                <StartMarker />
              </Marker>
              <Polyline
                coordinates={path}
                strokeColor="#009933"
                strokeWidth={3}
              />
            </View>
          )}

          {users.length > 0 &&
            users.map(({ name, coordinate }, index) => {
              return (
                <Marker.Animated key={index} coordinate={coordinate}>
                  <UserMarker name={name} />
                </Marker.Animated>
              );
            })}

          {focusedX && (
            <MapViewDirections
              origin={location.coords}
              destination={x}
              apikey={GOOGLE_MAPS_APIKEY}
              mode="WALKING"
              strokeWidth={5}
              strokeColor="#22c55e"
              onReady={(result) => {
                setDuration(result.duration);
                setPopupCoordinate(
                  result.coordinates[Math.floor(result.coordinates.length / 2)]
                );
              }}
            />
          )}
          <Circle
            center={x}
            radius={200}
            strokeWidth={3}
            strokeColor="#16a34a"
            fillColor="#rgba(74, 222, 128, 0.5)"
          />
          {focusedX && <Marker coordinate={x} />}
          {focusedX && duration && popupCoordinate && (
            <Marker coordinate={popupCoordinate}>
              <View
                style={{
                  backgroundColor: "#15803d",
                  padding: 5,
                  borderRadius: 5,
                }}
              >
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  {Math.round(duration)} min
                </Text>
              </View>
            </Marker>
          )}
        </MapView>
      )}

      {isTracking && (
        <RunStats
          timer={timer}
          totalDistance={totalDistance}
          speed={speed}
          coinCount={coinCount}
        />
      )}

      {/* <View style={styles.textContainer}>
        <Text>Home Screen</Text>
        <Text>Logged in: {user ? "Yes" : "No"}</Text>
        {user && user.email && <Text>Email: {user.email}</Text>}
      </View> */}
        <ButtonWrapper
          style={styles.button}
          onPress={isTracking ? handleStopTracking : toggleTracking}
        >
          <Icon name="navigation" size={30} color="white" />
          <Text style={styles.buttonText}>{isTracking ? "STOP" : "START"}</Text>
        </ButtonWrapper>

      <ButtonWrapper style={styles.secondaryButton} onPress={goToTheHotArea}>
        <MaterialCommunityIcons name="target" size={32} color={MAIN_COLOR} />
      </ButtonWrapper>

      <Pressable
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: 50,
          height: 50,
        }}
        onPress={() => updateOtherUsers()}
      ></Pressable>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <RunRecap
          mapRef={mapRef}
          provGoogle={PROVIDER_GOOGLE}
          path={path}
          onMapLayout={onMapLayout}
          mapReady={mapReady}
          testStyle={testStyle}
          elapsedTime={elapsedTime}
          totalDistance={totalDistance}
          averageSpeed={averageSpeed}
          coinCount={coinCount}
          onDismiss={onDismissModal}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  textContainer: {
    position: "absolute",
    bottom: 200,
    alignItems: "center",
  },
  button: {
    backgroundColor: MAIN_COLOR,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 35,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: 160,
    height: 70,
    position: "absolute",
    bottom: 60,
  },
  secondaryButton: {
    bottom: 30,
    left: 30,
    position: 'absolute',
    backgroundColor: "white",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  buttonText: {
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
});

function HomeScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation }) => getScreenOptions(navigation)}
    >
      <HomeStack.Screen
        name="Map"
        component={Screen}
        options={{ title: "Home" }}
      />
      <HomeStack.Screen name="OAuthWebView" component={OAuthScreen} />
    </HomeStack.Navigator>
  );
}

export default HomeScreen;

const testStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#523735",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#c9b2a6",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#dcd2be",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ae9e90",
      },
    ],
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#93817c",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#a5b076",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#447530",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f1e6",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#fdfcf8",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#f8c967",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#e9bc62",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#e98d58",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#db8555",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#806b63",
      },
    ],
  },
  {
    featureType: "transit",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8f7d77",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#ebe3cd",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#dfd2ae",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#b9d3c2",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#92998d",
      },
    ],
  },
];
