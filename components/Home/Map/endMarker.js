import { View, Text } from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import Triangle from "react-native-triangle";

const MAIN_COLOR = "#22c55e";

const EndMarker = ({ start }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          backgroundColor: MAIN_COLOR,
          padding: 10,
          borderRadius: 20,
        }}
      >
        <FontAwesome5 name="flag-checkered" size={20} color="white" />
      </View>

      <Triangle
        width={30}
        height={20}
        color={MAIN_COLOR}
        direction={"down"}
        style={{ marginTop: -6 }}
      />
    </View>
  );
};

export default EndMarker;
