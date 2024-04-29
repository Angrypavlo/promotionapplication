import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import MapView, { Polyline } from "react-native-maps";
import { formatTime } from "../../Utils";

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
          <Polyline coordinates={path} strokeColor="#009933" strokeWidth={3} />
        )}
      </MapView>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalText: {
    marginVertical: 10, // This ensures there is some space between the text and other elements
  },
});

export default RunRecap;
