import { View, Text, SafeAreaView,TouchableOpacity,FeatherIcon, StyleSheet, Pressable, ScrollView, FlatList } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';

const SettingsStack = createStackNavigator();

const SettingsScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#98FB98'}}>
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        Settings
                    </Text>
                    <Text style={styles.subtitle}>
                        Edit settings of the application
                    </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}
                  style={styles.row}>
                    <View style={[styles.row, styles.rowFirst, styles.rowWrapper]}>
                        <Text style={styles.rowLabel}>Language         </Text>

                        <View style={styles.rowSpacer} />

                        <Text style={styles.rowValue}>English</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        paddingVertical: 40
    },
    header:{
        paddingHorizontal: 24
    },
    title: {
        fontSize: 34,
        color: '#000000'

    },
    subtitle: {
        fontSize: 15,
        color: '#000000'

    },
    rowSpacer: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
      },
      rowValue: {
        fontSize: 17,
        fontWeight: '500',
        color: '#8B8B8B',
        marginRight: 4,
      },
      rowLabel: {
        fontSize: 17,
        fontWeight: '500',
        color: '#000',
      },
      row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingRight: 16,
        height: 50,
      },
      sectionBody: {
        paddingLeft: 24,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
      },
      rowWrapper: {
        borderTopWidth: 1,
        borderColor: '#e3e3e3',
      },
      rowFirst: {
        borderTopWidth: 0,
      },
})

export default SettingsScreen