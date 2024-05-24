import {
  View,
  Text,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import React from "react";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useStateValue } from "./StateContext";
import { FlatList } from "react-native-gesture-handler";
import IconCard from "../../components/store/IconCard";

const IconStoreScreen = () => {
  const { coins, icons, ownedItems } = useStateValue();

  const filteredIcons = icons.filter((icon) => {
    return !ownedItems.some((item) => item.id === icon.id);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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

        <FlatList
          style={{
            flex: 1,
          }}
          data={filteredIcons}
          renderItem={({ item }) => (
            <IconCard
              name={item.name}
              image={item.image}
              id={item.id}
              points={item.points}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 24,
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
