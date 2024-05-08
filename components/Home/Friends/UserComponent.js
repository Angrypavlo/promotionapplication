import { View, Text, StyleSheet, Image, Alert } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import ButtonWrapper from "../../Utils/ButtonWrapper";

const MAIN_COLOR = "#22c55e";

const UserComponent = ({ name, email, profilePicture, status }) => {
  const profilePicUrl =
    profilePicture || "https://avatar.iran.liara.run/public/boy?username=Ash";

    const friendRequest = () => {
        Alert.alert("Friend request sent to " + name)
    }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: profilePicUrl }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.headline}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      {status == 0 && (
        <ButtonWrapper style={styles.icon} onPress={friendRequest}>
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
    margin: 10,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#E4E4E4",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    flexDirection: "row",
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
    fontSize: 21,
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
