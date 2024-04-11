import { View, Text } from "react-native";
import React, { useState } from "react";

import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const TestMapScreen = () => {
  [x, setX] = useState({
    latitude: 44.505,
    longitude: 11.34,
  });

  const origin = { latitude: 44.505, longitude: 11.34 };
  const destination = { latitude: 44.49, longitude: 11.3426 };
  const GOOGLE_MAPS_APIKEY = "AIzaSyD5OoHQxXav-GPGJ4JsXBcswbZZ_Gri9tE";

  const [coords, setCoords] = useState([]);
  const [duration, setDuration] = useState(null);
  const [popupCoordinate, setPopupCoordinate] = useState(null);

  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{
          width: "100%",
          height: "100%",
        }}
        initialRegion={{
          latitude: 44.5,
          longitude: 11.34,
          latitudeDelta: 0.08,
          longitudeDelta: 0.04,
        }}
        customMapStyle={testStyle}
        onPress={(e) => {
          setCoords([...coords, e.nativeEvent.coordinate]);
        }}
      >
        <Marker
          coordinate={x}
          draggable
          onDragEnd={(e) => setX(e.nativeEvent.coordinate)}
        />

        {coords.map((coord, index) => (
          <Marker key={index.toString()} coordinate={coord} />
        ))}
        {coords[0] && coords[1] && (
          <MapViewDirections
            origin={coords[0]}
            destination={coords[coords.length - 1]}
            waypoints={coords.slice(1, coords.length - 1)}
            apikey={GOOGLE_MAPS_APIKEY}
            mode="WALKING"
            strokeWidth={5}
            strokeColor="hotpink"
            onReady={(result) => {
              setDuration(result.duration);
              console.log(duration)
              setPopupCoordinate(result.coordinates[Math.floor(result.coordinates.length / 2)]);
              console.log(popupCoordinate)
            }}
          />
        )}
        <Circle
          center={x}
          radius={100}
          strokeWidth={3}
          strokeColor="#dc2626"
          fillColor="#rgba(239, 68, 68, 0.5)"
        />
        {duration && popupCoordinate && (
          <Marker coordinate={popupCoordinate}>
            <View
              style={{ backgroundColor: "white", padding: 10, borderRadius: 5 }}
            >
              <Text>Duration: {Math.round(duration)} min</Text>
            </View>
          </Marker>
        )}
      </MapView>
    </View>
  );
};

export default TestMapScreen;

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
