import { View, Text, StyleSheet } from "react-native";
import React from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
import { formatTime } from "../../Utils/Utils";
import StartMarker from "../Map/startMarker";
import EndMarker from "../Map/endMarker";
import { AntDesign } from "@expo/vector-icons";
import ButtonWrapper from "../../Utils/ButtonWrapper";

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
        <View style={styles.modalRow}>
          <View style={styles.modalCol}>
            <View style={styles.valueContainer}>
              <Text style={styles.label}>Time:</Text>
              <Text style={styles.value}>{formatTime(elapsedTime)}</Text>
            </View>

            <View style={styles.valueContainer}>
              <Text style={styles.label}>Distance:</Text>
              <Text style={styles.value}> {totalDistance.toFixed(2)} km</Text>
            </View>
          </View>

          <View style={styles.modalCol}>
            <View style={styles.valueContainer}>
              <Text style={styles.label}>Average Speed:</Text>
              <Text style={styles.value}>{averageSpeed.toFixed(2)} km/h</Text>
            </View>

            <View style={styles.valueContainer}>
              <Text style={styles.label}>Collected:</Text>
              <Text style={styles.value}>{coinCount} coins</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 80}} />
      </View>
      <ButtonWrapper style={styles.closeBut} onPress={onDismiss}>
        <AntDesign name="close" size={32} color="black" />
      </ButtonWrapper>
    </View>
  );
};

const styles = StyleSheet.create({
  mapModal: {
    width: "100%",
    height: "100%",
  },
  modalView: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    left: "5%",
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    padding: 10,
  },
  modalRow: {
    flexDirection: "row",
  },
  modalCol: {
    flex: 1,
    padding: 10,
  },
  valueContainer: {
    marginVertical: 10,
  },
  value: {
    fontWeight: "bold",
    fontSize: 24,
  },
  label: {},
  closeBut: {
    position: "absolute",
    top: 80,
    right: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 30,
  },
});

export default RunRecap;
