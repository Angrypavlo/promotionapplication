import { View, Text } from "react-native";
import React from "react";

import { Entypo } from '@expo/vector-icons';
import Triangle from "react-native-triangle";

const MAIN_COLOR = "#22c55e";

const ShopMarker = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          backgroundColor: MAIN_COLOR,
          padding: 8,
          borderRadius: 20,
        }}
      >
        <Entypo name="shop" size={24} color="white" />
      </View>

      <Triangle width={25} height={20} color={MAIN_COLOR} direction={"down"} style={{marginTop: -6}}/>
    </View>
  );
};

export default ShopMarker;
