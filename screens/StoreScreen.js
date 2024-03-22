import { View, Text, StyleSheet, SafeAreaView, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardStore from '../components/store/CardStore'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import { FontAwesome5 } from '@expo/vector-icons';

const StoreScreen = () => {

    const [points, setPoints] = useState(350)

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

    const [ownedItems, setOwnedItems] = useState([])

    const buyItem = (numPoints, title, id) => {
        if(points >= numPoints) {
            setPoints(points - numPoints)

            const item = items.find((item) => item.id === id)
            console.log("Item: " + item.title)

            if (item) {
                if(ownedItems.length > 0){
                    setOwnedItems([...ownedItems, item])
                }
                else{
                    setOwnedItems([item])
                }
            }
            console.log("State: " + ownedItems)
        }
        else {
            Alert.alert("You don't own enough points to buy " + title)
        }
    }

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>StoreScreen</Text>
                <View style={styles.points}>
                    <FontAwesome5 name="coins" size={20} color="white" />
                    <Text style={styles.pointsNum}> {points} pts</Text>
                </View>
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
                            onBuy={() => buyItem(item.points, item.title, item.id)}
                        />
                    )}
                    scrollEnabled={false}
                />

                <Text> Owned Items </Text>

                <FlatList 
                    style={{
                        marginTop: 10,
                    }}
                    data={ownedItems}
                    renderItem={({item}) => (
                        <CardStore 
                            title={item.title} 
                            description={item.description} 
                            points={item.points}
                            image={item.image}
                            hidePurchase
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

export default StoreScreen