import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useStateValue } from './StateContext'
import CardStore from '../../components/store/CardStore'
import { ScrollView } from 'react-native-gesture-handler'

const MyItemsScreen = ({ navigation }) => {

    const { ownedItems } = useStateValue()

  return (
    <ScrollView style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        marginHorizontal: 25,
    }
})

export default MyItemsScreen