import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'

const MyItemsScreen = ({ownedItems}) => {
  return (
    <View style={styles.container}>
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
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default MyItemsScreen