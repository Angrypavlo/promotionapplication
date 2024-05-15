import React, { useState } from 'react';
import { 
    View, 
    Text, 
    SafeAreaView, 
    StyleSheet, 
    TouchableOpacity, 
    ScrollView, 
    Switch 
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker'; 

const SettingsStack = createStackNavigator();

const SettingsScreen = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    const handleLanguageChange = (language) => {
        setSelectedLanguage(language);
        // You can add logic here to switch the application language
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Settings</Text>
                    <Text style={styles.subtitle}>Edit settings of the application</Text>
                </View>

                <Picker
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue) => handleLanguageChange(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                >
                    <Picker.Item label="English" value="English" />
                    <Picker.Item label="Lithuanian" value="Lithuanian" />
                </Picker>

                <View style={styles.sectionBody}>
                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowLabel}>Notifications</Text>
                        <Switch 
                            trackColor={{ false: "#767577", true: "#81b0ff" }} 
                            thumbColor="#f4f3f4" 
                            ios_backgroundColor="#3e3e3e" 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowLabel}>Dark Mode</Text>
                        <Switch 
                            trackColor={{ false: "#767577", true: "#81b0ff" }} 
                            thumbColor="#f4f3f4" 
                            ios_backgroundColor="#3e3e3e" 
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.row}>
                        <Text style={styles.rowLabel}>Email Notifications</Text>
                        <Switch 
                            trackColor={{ false: "#767577", true: "#81b0ff" }} 
                            thumbColor="#f4f3f4" 
                            ios_backgroundColor="#3e3e3e" 
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f0f0f0'
    },
    content: {
        paddingVertical: 40,
        paddingHorizontal: 24
    },
    header: {
        marginBottom: 20
    },
    title: {
        fontSize: 34,
        color: '#333',
        fontWeight: 'bold'
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20
    },
    picker: {
        backgroundColor: '#ffffff',
        marginBottom: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    pickerItem: {
        fontSize: 16,
        color: '#333'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#e3e3e3',
    },
    rowLabel: {
        flex: 1,
        fontSize: 16,
        color: '#333'
    },
    sectionBody: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingHorizontal: 16,
        paddingTop: 16
    },
});

export default SettingsScreen;
