import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { formatTime } from "../../Utils";
import StartMarker from "../Map/startMarker";
import EndMarker from "../Map/endMarker";

const calculateBounds = (path) => {
  let minLat = Infinity;
  let maxLat = -Infinity;
  let minLng = Infinity;
  let maxLng = -Infinity;

  path.forEach((point) => {
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
    latitude: minLat + latDelta / 2,
    longitude: minLng + lngDelta / 2,
    latitudeDelta: latDelta + padding,
    longitudeDelta: lngDelta + padding,
  };
};

const RunRecap = ({
  mapRef,
  provGoogle,
  path,
  onMapLayout,
  testStyle,
  mapReady,
  elapsedTime,
  totalDistance,
  averageSpeed,
  coinCount,
  onDismiss,
}) => {
  return (
    <View>
      <MapView
        ref={mapRef}
        provider={provGoogle}
        style={styles.mapModal}
        initialRegion={getRegionForPath(path)}
        onLayout={onMapLayout}
        customMapStyle={testStyle}
      >
        {mapReady && (
          <View>
            <Marker coordinate={path[0]}>
                <StartMarker />
            </Marker>
            <Polyline
              coordinates={path}
              strokeColor="#009933"
              strokeWidth={3}
            />
            <Marker coordinate={path[path.length - 1]}>
                <EndMarker />
            </Marker>
          </View>
        )}
      </MapView>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>Time: {formatTime(elapsedTime)}</Text>
        <Text style={styles.modalText}>
          Distance: {totalDistance.toFixed(2)} km
        </Text>
        <Text style={styles.modalText}>
          Average Speed: {averageSpeed.toFixed(2)} km/h
        </Text>
        <Text style={styles.modalText}>Coins Collected: {coinCount}</Text>
        <Button title="Close" onPress={onDismiss} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mapModal: {
    width: "100%",
    height: "75%",
  },
  modalView: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    marginVertical: 10,
  },
});

export default RunRecap;
