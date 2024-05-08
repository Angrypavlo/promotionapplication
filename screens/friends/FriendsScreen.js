import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import React, { useState } from "react";
import UserComponent from "../../components/Home/Friends/UserComponent";
import { TextInput } from "react-native-gesture-handler";

import filter from "lodash.filter";

const dummyData = [
  {
    name: "Mario Rossi",
    email: "mario@rossi.com",
    coins: 30,
    status: 2,
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
    coins: 20,
    status: 0,
  },
  {
    name: "Luigi Verdi",
    email: "luigi@verdi.com",
    coins: 10,
    status: 0, 
  },
  {
    name: "Pippo Baudo",
    email: "pippo@bianchi.com",
    coins: 80,
    status: 1,
  },
  {
    name: "Franco Bianchi",
    email: "franco@bianchi.com",
    coins: 60,
    status: 2,
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
    status: 1,
  },
  {
    name: "Filippo Perla",
    email: "filippo@perla.com",
    coins: 80,
    status: 0,
  },
];

const FriendsScreen = () => {

    const [searchQuery, setSearchQuery] = useState("")
    const [data, setData] = useState(dummyData)

    const handleSearch = (query) => {
        setSearchQuery(query)
        const formattedQuery = query.toLowerCase()

        const filteredData = filter(dummyData, (user) => {
            return contains(user, formattedQuery)
        })

        setData(filteredData)
    }

    const contains = ({ name, email }, query) => {
        return name.includes(query) || email.includes(query)
    }

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
        renderItem={({ item }) => (
          <UserComponent
            name={item.name}
            email={item.email}
            status={item.status}
          />
        )}
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
        backgroundColor: '#ffffff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 15,
    },
    list: {
        marginBottom: 30,
    },
})
