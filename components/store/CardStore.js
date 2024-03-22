import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const CardStore = ({ title, description, points, image }) => {
  return (
    <View style={styles.cardContainer}>
        <Image 
            style={styles.cardImage} 
            source={{uri: image}}
            resizeMode='cover'
        />
        <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text>{points} pts</Text>
        </View>

        <Text style={styles.cardDescription}>{description}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
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

    },
})

export default CardStore