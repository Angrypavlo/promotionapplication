import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Button } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const EditProfileScreen = ({ route, navigation }) => {


    const [name, setName] = useState("Name")

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image
                    style={styles.profileImage}
                />
                <TextInput style={styles.heading}
                value={name}
                onChangeText={value=>setName(value)}
                editable={true} />
                <TextInput style={styles.subHeading}></TextInput>
            </View>
            <View style={styles.bioContainer}>
                <Text style={styles.label}>Bio:</Text>
                <TextInput style={styles.bio}></TextInput>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 10,
    },
    heading: {
        fontSize: 21,
        fontWeight: '600',
        marginBottom: 5,
    },
    subHeading: {
        fontSize: 16,
        color: '#666',
    },
    bioContainer: {
        padding: 18,
        borderBottomColor: '#ddd'
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bio: {
        fontSize: 16,
    },
    
});

export default EditProfileScreen;
