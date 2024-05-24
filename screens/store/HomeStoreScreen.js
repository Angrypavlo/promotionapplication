import { View, Text, StyleSheet, Pressable, SafeAreaView } from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
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
            <Pressable style={styles.category} onPress={() => navigation.navigate("Discounts")}>
                <Text style={styles.categoryText}>Discounts</Text>
            </Pressable>
            <Pressable style={styles.category} onPress={() => navigation.navigate("Icons")}>
                <Text style={styles.categoryText}>Icons</Text>
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
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 50,
  },
  category: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: MAIN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default HomeStoreScreen;
