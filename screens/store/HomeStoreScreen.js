import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useStateValue } from "./StateContext";

const MAIN_COLOR = "#22c55e";

const HomeStoreScreen = ({ navigation }) => {
  const { coins } = useStateValue();

  return (
    <SafeAreaView style={styles.safeArea}>
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

        <View style={styles.categoryContainer}>
          <Pressable
            style={styles.categoryBackground}
            onPress={() => navigation.navigate("Discounts")}
          >
            <View style={styles.category}>
              <MaterialIcons
                name="discount"
                size={50}
                color="white"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.categoryText}>Discounts</Text>
            </View>
          </Pressable>
          <Pressable
            style={styles.categoryBackground}
            onPress={() => navigation.navigate("Icons")}
          >
            <View style={styles.category}>
              <MaterialCommunityIcons
                name="dots-hexagon"
                size={50}
                color="white"
                style={{ marginBottom: 10 }}
              />
              <Text style={styles.categoryText}>Icons</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginVertical: 25,
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
  categoryContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  categoryBackground: {
    backgroundColor: "#86efac",
    width: "100%",
    flex: 1,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  category: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: MAIN_COLOR,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default HomeStoreScreen;
