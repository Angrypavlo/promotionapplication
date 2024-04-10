import { View, Text } from "react-native";
import React, { useState } from "react";

import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";

const TestMapScreen = () => {
  [x, setX] = useState({
    latitude: 44.505,
    longitude: 11.34,
  });

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
      >
        <Marker
          coordinate={x}
          draggable
          onDragEnd={(e) => setX(e.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
};

export default TestMapScreen;
