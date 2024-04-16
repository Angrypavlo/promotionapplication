import { View, Text } from "react-native";
import React from "react";

import Triangle from "react-native-triangle";

const UserMarker = ({ name }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "#4D7298",
          paddingVertical: 3,
          paddingHorizontal: 8,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white" }}>{name}</Text>
      </View>

      <Triangle width={10} height={6} color={"#4D7298"} direction={"down"} />
    </View>
  );
};

export default UserMarker;
