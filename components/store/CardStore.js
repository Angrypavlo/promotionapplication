import React, { useRef } from 'react';
import { View, Text, Image, StyleSheet, Pressable, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons';
import ButtonWrapper from '../Utils/ButtonWrapper';

const CardStore = ({ onPress, title, description, points, image, onBuy, hidePurchase }) => {
    const fadeAnim = useRef(new Animated.Value(1)).current;  // Initial opacity set to 1

    const handlePressIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 0.5,  // Fade to 50% opacity
            duration: 100,  // Duration in milliseconds
            useNativeDriver: true,  // Use native driver for better performance
        }).start();
    };

    const handlePressOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,  // Fade back to 100% opacity
            duration: 100,  // Duration in milliseconds
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable
            style={styles.cardContainer}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <Animated.View style={{ opacity: fadeAnim }}> 
                <Image
                    style={styles.cardImage}
                    source={{ uri: image }}
                    resizeMode='cover'
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end'
                }}>
                    <View style={hidePurchase ? undefined : { width: '65%' }}>
                        <Text style={styles.cardTitle}>{title}</Text>
                        <Text style={styles.cardDescription}>{description}</Text>
                    </View>
                    {hidePurchase ||
                        <ButtonWrapper style={styles.cardCta} onPress={onBuy}>
                            <Feather name="shopping-cart" size={21} color="white" />
                            <Text style={styles.cardPoints}>{points} pts</Text>
                        </ButtonWrapper>
                    }
                </View>
            </Animated.View>
        </Pressable>
    );
};

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