import { View, Text } from "react-native";
import React from "react";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import Triangle from "react-native-triangle";

const MAIN_COLOR = "#22c55e";

const StartMarker = ({ start }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          backgroundColor: MAIN_COLOR,
          padding: 0,
          borderRadius: 20,
        }}
      >
        <MaterialCommunityIcons
          name="source-commit-start"
          size={40}
          color="white"
        />
      </View>

      <Triangle width={30} height={20} color={MAIN_COLOR} direction={"down"} style={{marginTop: -6}}/>
    </View>
  );
};

export default StartMarker;
