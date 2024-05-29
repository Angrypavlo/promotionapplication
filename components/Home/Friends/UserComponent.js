import { View, Text, StyleSheet, Image, Alert } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import ButtonWrapper from "../../Utils/ButtonWrapper";

const MAIN_COLOR = "#22c55e";

const imageAssets = {
  bat: require("../../../assets/icons/bat-icon.png"),
  bird: require("../../../assets/icons/bird-icon.png"),
  cow: require("../../../assets/icons/cow-icon.png"),
  ilama: require("../../../assets/icons/ilama-icon.png"),
  panda: require("../../../assets/icons/panda-icon.png"),
};

const UserComponent = ({ name, email, profilePicture, status, image, onPress }) => {
  const profilePicUrl =
    profilePicture || "https://avatar.iran.liara.run/public/boy?username=Ash";

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={image ? imageAssets[image] : { uri: profilePicUrl }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.headline}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      {status == 0 && (
        <ButtonWrapper style={styles.icon} onPress={onPress}>
          <AntDesign name="adduser" size={24} color="black" />
        </ButtonWrapper>
      )}
      {status == 1 && (
        <ButtonWrapper style={[styles.icon, styles.waitingIcon]}>
          <AntDesign name="clockcircle" size={24} color="white" />
        </ButtonWrapper>
      )}
      {status == 2 && (
        <ButtonWrapper style={[styles.icon, styles.acceptedIcon]}>
          <AntDesign name="checkcircleo" size={24} color="white" />
        </ButtonWrapper>
      )}
    </View>
  );
};

export default UserComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 25,
  },
  headline: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 3,
  },
  icon: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#c9c9c9",
  },
  waitingIcon: {
    backgroundColor: "#f59e0b",
  },
  acceptedIcon: {
    backgroundColor: MAIN_COLOR,
  },
});
