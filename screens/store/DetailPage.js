import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import ShopMarker from '../../components/store/shopMarker';

const DetailPage = ({ route }) => {
  const [region, setRegion] = useState(null);
  const item = route.params.item;
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      const userCoordinate = {
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
      };

      // Calculate the midpoint
      const midLatitude = (item.coordinate.latitude + userCoordinate.latitude) / 2;
      const midLongitude = (item.coordinate.longitude + userCoordinate.longitude) / 2;

      // Calculate deltas
      const latitudeDelta = Math.abs(item.coordinate.latitude - userCoordinate.latitude) * 2.2; // Increased by factor for padding
      const longitudeDelta = Math.abs(item.coordinate.longitude - userCoordinate.longitude) * 2.2; // Increased by factor for padding

      // Set region
      setRegion({
        latitude: midLatitude,
        longitude: midLongitude,
        latitudeDelta,
        longitudeDelta,
      });
    })();
  }, []);

  if (!region) {
    return <View><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        customMapStyle={testStyle}
        showsUserLocation={true}
        region={region}
      >
        
        <Marker coordinate={item.coordinate}>
          <ShopMarker />
        </Marker>

      </MapView>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
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
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    position: 'absolute',
    top: 10,
    margin: 20,
    padding: 25,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default DetailPage;


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
