import { View, Text, FlatList } from "react-native";
import React from "react";
import UserComponent from "../../components/Home/Friends/UserComponent";

const dummyData = [
  {
    name: 'Mario',
    email: "mario@rossi.com",
    coins: 30,
    status: 2,
  },
  {
    name: 'Luigi',
    email: "luigi@rossi.com",
    coins: 60,
    status: 0,
  },
  {
    name: 'Mario',
    email: "mario@verdi.com",
    coins: 20,
    status: 0,
  },
  {
    name: 'Luigi',
    email: "luigi@verdi.com",
    coins: 10,
    status: 1,
  },
  {
    name: 'Pippo',
    email: "pippo@bianchi.com",
    coins: 80,
    status: 0,
  },
];

const FriendsScreen = () => {
  return (
    <View>
      <FlatList
        data={dummyData}
        renderItem={({ item }) => <UserComponent name={item.name} email={item.email} status={item.status}/>}
      />
    </View>
  );
};

export default FriendsScreen;
