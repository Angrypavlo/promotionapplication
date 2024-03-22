import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
import React from 'react'

const StoreScreen = () => {
  return (
    <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.title}>StoreScreen</Text>

            {/* <View style={{ flex: 1, justifyContent: 'flex-start' }} /> */}
            <View style={styles.cardContainer}>
                <Image 
                    style={styles.cardImage} 
                    source={require('../assets/image-placeholder.jpeg')}
                    resizeMode='cover'
                />
                <View style={{
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Text style={styles.cardTitle}>Title</Text>
                    <Text>30 pts</Text>
                </View>

                <Text style={styles.cardDescription}>Description</Text>
            </View>
            {/* <View style={{ flex: 1, justifyContent: 'flex-end' }} /> */}
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
    cardImage: {
        height: 125,
        width: '100%',
        marginBottom: 10,
        borderRadius: 5,
    },
    cardContainer: {
        padding: 15,
        marginTop: 15,
        width: '100%',
        backgroundColor: '#E4E4E4',
        borderRadius: 10,
        // ios
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        // android
        elevation: 3,
    },
    cardTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    cardDescription: {

    }
})

export default StoreScreen