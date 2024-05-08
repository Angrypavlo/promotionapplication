import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
import ButtonWrapper from "../../Utils/ButtonWrapper";

const MAIN_COLOR = "#22c55e";

const UserComponent = ({ name, email, profilePicture, status }) => {
  const profilePicUrl =
    profilePicture || "https://avatar.iran.liara.run/public/boy?username=Ash";

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image source={{ uri: profilePicUrl }} style={styles.profileImage} />
        <View style={styles.textContainer}>
          <Text style={styles.headline}>{name}</Text>
          <Text>{email}</Text>
        </View>
      </View>
      <ButtonWrapper
        style={[
          styles.icon,
          status == 1 && styles.waitingIcon,
          status == 2 && styles.acceptedIcon,
        ]}
      >
        {status == 0 && <AntDesign name="adduser" size={24} color="black" />}
        {status == 1 && <AntDesign name="clockcircle" size={24} color="white" />}
        {status == 2 && <AntDesign name="checkcircleo" size={24} color="white" />}
      </ButtonWrapper>
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
