import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  Pressable,
} from "react-native";
import React, { useState, useEffect } from "react";
import UserComponent from "../../components/Home/Friends/UserComponent";
import { TextInput } from "react-native-gesture-handler";
import filter from "lodash.filter";

let dummyData = [
  {
    name: "Mario Rossi",
    email: "mario@rossi.com",
    image: "panda",
    coins: 30,
    status: 0,
  },
  {
    name: "Luigi Rossi",
    email: "luigi@rossi.com",
    coins: 60,
    status: 0,
  },
  {
    name: "Mario Verdi",
    email: "mario@verdi.com",
    image: "cow",
    coins: 20,
    status: 0,
  },
  {
    name: "Luigi Verdi",
    email: "luigi@verdi.com",
    image: "bird",
    coins: 10,
    status: 0,
  },
  {
    name: "Pippo Baudo",
    email: "pippo@bianchi.com",
    image: "bat",
    coins: 80,
    status: 0,
  },
  {
    name: "Franco Bianchi",
    email: "franco@bianchi.com",
    coins: 60,
    status: 0,
  },
  {
    name: "Lorenzo Rosa",
    email: "lorenzo@rosa.com",
    coins: 20,
    status: 0,
  },
  {
    name: "Matteo Vedi",
    email: "matteo@verdi.com",
    coins: 10,
    status: 0,
  },
  {
    name: "Filippo Perla",
    email: "filippo@perla.com",
    coins: 80,
    status: 0,
  },
];

const FriendsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(dummyData);

  const [lastEmail, setLastEmail] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    handleSearch(searchQuery);
  }, [dummyData]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();

    const filteredData = filter(dummyData, (user) => {
      return contains(user, formattedQuery);
    });

    setData(filteredData);
  };

  const contains = ({ name, email }, query) => {
    return name.toLowerCase().includes(query) || email.toLowerCase().includes(query);
  };

  const updateUserStatus = (email, status) => {
    dummyData = dummyData.map((user) =>
      user.email === email ? { ...user, status: status } : user
    );
    handleSearch(searchQuery);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
      />
      <FlatList
        style={styles.list}
        data={data}
        keyExtractor={(item) => item.email}
        renderItem={({ item }) => (
          <UserComponent
            name={item.name}
            email={item.email}
            status={item.status}
            image={item.image}
            onPress={() => {
              Alert.alert("Friendship request sent to " + item.name);

              setLastEmail(item.email);
              setLastName(item.name);

              setTimeout(() => {
                updateUserStatus(item.email, 1);
              }, 500);
            }}
          />
        )}
      />
      <Pressable
        onPress={() => {
          Alert.alert(lastName + " has accepted your friend request");

          setTimeout(() => {
            updateUserStatus(lastEmail, 2);
          }, 500);
        }}
        style={{
          position: "absolute",
          bottom: 60,
          left: 20,
          width: 100,
          height: 100,
        }}
      />
    </SafeAreaView>
  );
};

export default FriendsScreen;

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  searchBar: {
    backgroundColor: "#ffffff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 15,
  },
  list: {
    marginBottom: 30,
  },
});
