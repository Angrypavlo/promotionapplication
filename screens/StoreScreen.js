import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CardStore from '../components/store/CardStore'
import { FlatList } from 'react-native-gesture-handler'

const image = '../assets/image-placeholder.jpeg'

const StoreScreen = () => {

    const [items, setItems] = useState([
        {
            title: 'Maxima',
            description: 'Come to maxima for grocery shopping after your run',
            points: 50,
            image: 'https://www.maxima.lt/upl/media/762x/04/4034-maxima_ivairus-02.jpg?v=1-0',
        },
        {
            title: 'Caffeine',
            description: 'Caffeine is the best place to have a brake during your run',
            points: 30,
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbj5UdbPZHDV0d6-e3IcPSCgIOWX2jTAVHQy8RTja0Q&s',
        },
        {
            title: 'Dzeb Pub',
            description: 'After your run come for karaoke',
            points: 70,
            image: 'https://visit.kaunas.lt/assets/Uploads/_resampled/FillWyIxMDUwIiwiNTI1Il0/dzem-706118336.jpg',
        }
    ])

  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>StoreScreen</Text>

            <FlatList 
                style={{
                    height: '95%',
                    marginTop: 10,
                }}
                data={items}
                renderItem={({item}) => (
                    <CardStore 
                        title={item.title} 
                        description={item.description} 
                        points={item.points}
                        image={item.image}
                    />
                )}
            />

        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 25,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
})

export default StoreScreen