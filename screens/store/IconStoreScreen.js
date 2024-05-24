import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useStateValue } from "./StateContext";

const IconStoreScreen = () => {
  const { coins } = useStateValue();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.points}>
            <FontAwesome5 name="coins" size={20} color="white" />
            <Text style={styles.pointsNum}> {coins} coins</Text>
          </View>
          <Pressable onPress={() => navigation.navigate("My Items")}>
            <Feather name="list" size={24} color="black" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  points: {
    flexDirection: "row",
    backgroundColor: "#eab308",
    padding: 10,
    borderRadius: 5,
  },
  pointsNum: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 5,
  },
});

export default IconStoreScreen;
