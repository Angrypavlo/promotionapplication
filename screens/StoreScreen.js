import { View, Text, StyleSheet, SafeAreaView, Alert, Pressable } from 'react-native'
import React, { useState } from 'react'
import CardStore from '../components/store/CardStore'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import MyItemsScreen from './MyItemsScreen';

const StoreStack = createStackNavigator()

const Screen = ({navigation, route}) => {

    const points = route.params.params.points
    const items = route.params.params.items
    const buyItem = route.params.onPurchase

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.points}>
                    <FontAwesome5 name="coins" size={20} color="white" />
                    <Text style={styles.pointsNum}> {points} pts</Text>
                </View>
                <Pressable onPress={() => navigation.navigate("My Items")}>
                    {/* <Text>{navigator}</Text> */}
                    <Feather name="list" size={24} color="black"/>
                </Pressable>
            </View>

            <ScrollView style={{marginBottom: 100}}>
                <Text> Available items: </Text>

                <FlatList 
                    style={{
                        marginTop: 10,
                    }}
                    data={items}
                    renderItem={({item}) => (
                        <CardStore 
                            title={item.title} 
                            description={item.description} 
                            points={item.points}
                            image={item.image}
                            onBuy={() => {buyItem(item.points, item.title, item.id)}}
                        />
                    )}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 25,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: 10,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    points: {
        flexDirection: 'row',
        backgroundColor: '#eab308',
        padding: 10,
        borderRadius: 5,
    },
    pointsNum: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 5,
    }
})

const StoreScreen = () => {

    // points of the user
    const [points, setPoints] = useState(350)

    // items available (for upgrade they could be fetched from a db)
    const [items, setItems] = useState([
        {
            id: '1',
            title: 'Maxima',
            description: 'Come to maxima for grocery shopping after your run',
            points: 50,
            image: 'https://www.maxima.lt/upl/media/762x/04/4034-maxima_ivairus-02.jpg?v=1-0',
        },
        {
            id: '2',
            title: 'Caffeine',
            description: 'Caffeine is the best place to have a brake during your run',
            points: 30,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbj5UdbPZHDV0d6-e3IcPSCgIOWX2jTAVHQy8RTja0Q&s',
        },
        {
            id: '3',
            title: 'Dzeb Pub',
            description: 'After your run come for karaoke',
            points: 70,
            image: 'https://visit.kaunas.lt/assets/Uploads/_resampled/FillWyIxMDUwIiwiNTI1Il0/dzem-706118336.jpg',
        }
    ])

    // items bought by the customer
    const [ownedItems, setOwnedItems] = useState([])

    // method to perform when the purchase button of an item (CardStore component) is pressed
    const buyItem = (numPoints, title, id) => {
        console.log("bought " + title)

        // if available points are more than cost of the item proceed with the purchase
        if(points >= numPoints) {

            // update points
            setPoints(points - numPoints)

            // add item to the owned list
            const item = items.find((item) => item.id === id)
            if (item) {
                if(ownedItems.length > 0){
                    setOwnedItems([...ownedItems, item])
                }
                else{
                    setOwnedItems([item])
                }
            }
        }
        // if available points are less than cost of the item display an allert
        else {
            Alert.alert("You don't own enough points to buy " + title)
        }
    }

    return (
        <StoreStack.Navigator>
            <StoreStack.Screen 
                name="Store" 
                component={Screen} 
                initialParams={{
                    onPurchase: buyItem,
                    params: {
                        items,
                        points,
                    }
                }}
            />
            <StoreStack.Screen name="My Items" component={MyItemsScreen} />
        </StoreStack.Navigator>
    )
}

export default StoreScreen