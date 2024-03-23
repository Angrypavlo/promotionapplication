import { View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native'
import React from 'react'

import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import CardStore from '../../components/store/CardStore';
import { useStateValue } from './StateContext';

const MainStoreScreen = ({navigation, route}) => {

    const { points, items, buyItem } = useStateValue()

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.points}>
                    <FontAwesome5 name="coins" size={20} color="white" />
                    <Text style={styles.pointsNum}> {points} pts</Text>
                </View>
                <Pressable onPress={() => navigation.navigate("My Items")}>
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
                            onBuy={() => { buyItem(item.points, item.title, item.id) }}
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
        marginTop: 25,
        marginHorizontal: 25,
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

export default MainStoreScreen