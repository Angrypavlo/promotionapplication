import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { formatTime } from "../../Utils";

const MAIN_COLOR = "#22c55e";

const RunStats = ({ timer, totalDistance, speed, coinCount }) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={[styles.infoValue, styles.infoMainValue]}>
        {formatTime(timer)}
      </Text>
      <View style={styles.infoSubContainer}>
        <View style={styles.infoValueContainer}>
          <Text>distance:</Text>
          <Text style={styles.infoValue}>{totalDistance.toFixed(2)} km</Text>
        </View>
        <View style={styles.infoValueContainer}>
          <Text>speed:</Text>
          <Text style={styles.infoValue}>
            {speed ? (speed * 3.6).toFixed(2) : "0.00"} km/h
          </Text>
        </View>
        <View style={styles.infoValueContainer}>
          <Text>coins:</Text>
          <Text style={styles.infoValue}>{coinCount} coins</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    position: "absolute",
    top: 20,
    backgroundColor: "white",
    alignItems: "center",
    padding: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  infoMainValue: {
    color: MAIN_COLOR,
    fontSize: 52,
  },
  infoSubContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  infoValueContainer: {
    alignItems: "center",
    backgroundColor: '#efefef',
    margin: 5,
    padding: 5,
    borderRadius: 5,
  },
});

export default RunStats;
