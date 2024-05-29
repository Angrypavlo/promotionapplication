import { View, Text, StyleSheet, FlatList } from "react-native";
import { useStateValue } from "./StateContext";
import CardStore from "../../components/store/CardStore";
import { ScrollView } from "react-native-gesture-handler";
import IconCard from "../../components/store/IconCard";

const MyItemsScreen = ({ navigation }) => {
  const { ownedItems } = useStateValue();

  return (
    <ScrollView style={styles.container}>
      <Text> Owned Items </Text>

      <FlatList
        style={{
          marginTop: 10,
        }}
        data={ownedItems}
        renderItem={({ item }) => {
          if (item.id < 10) {
            return (
              <CardStore
                onPress={() => navigation.navigate("Details", { item: item })}
                title={item.title}
                description={item.description}
                points={item.points}
                image={item.image}
                hidePurchase
              />
            );
          } else {
            return (
              <IconCard
                name={item.name}
                image={item.image}
                id={item.id}
                points={item.points}
                hidePurchase
              />
            );
          }
        }}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    marginHorizontal: 25,
  },
});

export default MyItemsScreen;
