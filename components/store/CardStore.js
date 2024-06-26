import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React from 'react'

import { Feather } from '@expo/vector-icons';

// Card to display for every item in the store page
const CardStore = ({ title, description, points, image, onBuy, hidePurchase }) => {

    // title: title of the item to buy
    // description: description of the item to buy
    // points: number of point to buy the item
    // image: URL of the image (does not work for local images)
    // onBuy: method to perform when the purchase button is clicked
    // hidePurchase: flag used to hide the purchase button in owned items

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
            alignItems: 'flex-end'
        }}>
            <View style={hidePurchase || {width: '65%'}}>
                <Text style={styles.cardTitle}>{title}</Text>   
                <Text style={styles.cardDescription}>{description}</Text>
            </View>
            {hidePurchase 
            ||
            <Pressable style={styles.cardCta} onPress={onBuy}>
                <Feather name="shopping-cart" size={21} color="white" />
                <Text style={styles.cardPoints}>{points} pts</Text>
            </Pressable>}
        </View>

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
        marginBottom: 25,
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
        fontSize: 21,
        fontWeight: '600',
        marginBottom: 5,
    },
    cardDescription: {
        marginBottom: 2,
    },
    cardPoints: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        marginLeft: 10,
    },
    cardCta: {
        flexDirection: 'row',
        backgroundColor: '#14b8a6',
        borderRadius: 5,
        padding: 8,
    }
})

export default CardStore