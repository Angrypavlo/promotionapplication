import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import ButtonWrapper from "../Utils/ButtonWrapper";

import { FontAwesome5 } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { useStateValue } from "../../screens/store/StateContext";

const MAIN_COLOR = "#22c55e";

const imageAssets = {
    bat: require("../../assets/icons/bat-icon.png"),
    bird: require("../../assets/icons/bird-icon.png"),
    cow: require("../../assets/icons/cow-icon.png"),
    ilama: require("../../assets/icons/ilama-icon.png"),
    panda: require("../../assets/icons/panda-icon.png"),
  };

const IconCard = ({ name, image, id, points, hidePurchase }) => {

    const { buyItem } = useStateValue()

  return (
    <View style={styles.itemContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageAssets[image]} style={styles.image} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text>Buy this icon to use it as your profile picture!</Text>

        {hidePurchase || <ButtonWrapper
          style={styles.cardCta}
          onPress={() => buyItem(points, name, id)}
        >
          <Feather name="shopping-cart" size={21} color="white" />
          <Text style={styles.cardPoints}>{points} pts</Text>
        </ButtonWrapper>}
      </View>
    </View>
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
  itemContainer: {
    padding: 15,
    marginBottom: 25,
    width: "100%",
    backgroundColor: "#E4E4E4",
    borderRadius: 10,
    flexDirection: "row",
    // ios
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    // android
    elevation: 3,
  },
  imageContainer: {
    width: 120,
    height: 120,
    padding: 8,
    borderRadius: 60,
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: MAIN_COLOR,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
    padding: 10,
  },
  cardPoints: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginLeft: 10,
  },
  cardCta: {
    flexDirection: "row",
    backgroundColor: "#14b8a6",
    borderRadius: 5,
    padding: 8,
    marginTop: 12,
    alignSelf: "flex-start",
  },
});

export default IconCard;
