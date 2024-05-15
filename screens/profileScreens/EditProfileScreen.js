import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button } from 'react-native';

const EditProfileScreen = ({ route, navigation }) => {
    // Sample profile data
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "johndoe@example.com",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        // profileImagePhoto: require('./profile.jpg') // Change this to your profile image path
    });

    const [newName, setNewName] = useState(profile.name);
    const [newEmail, setNewEmail] = useState(profile.email);
    const [newBio, setNewBio] = useState(profile.bio);

    const handleSaveChanges = () => {
        // Implement save changes logic here
        const updatedProfile = { ...profile, name: newName, email: newEmail, bio: newBio };
        setProfile(updatedProfile);
        // Optionally, you can navigate back to the ProfileScreen or any other screen
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.editButton} onPress={handleSaveChanges}>
                    <Text style={styles.editButtonText}>Save Changes</Text>
                </TouchableOpacity>
                <Image
                    style={styles.profileImage}
                    source={profile.profileImagePhoto}
                />
                <TextInput
                    style={styles.heading}
                    value={newName}
                    onChangeText={value => setNewName(value)}
                    placeholder="Name"
                    placeholderTextColor="#666"
                />
                <TextInput
                    style={styles.subHeading}
                    value={newEmail}
                    onChangeText={value => setNewEmail(value)}
                    placeholder="Email"
                    placeholderTextColor="#666"
                />
            </View>
            <View style={styles.bioContainer}>
                <Text style={styles.label}>Bio:</Text>
                <TextInput
                    style={styles.bio}
                    value={newBio}
                    onChangeText={value => setNewBio(value)}
                    placeholder="Bio"
                    placeholderTextColor="#666"
                    multiline={true}
                />
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
        color: '#000',
    },
    subHeading: {
        fontSize: 16,
        color: '#666',
    },
    bioContainer: {
        padding: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bio: {
        fontSize: 16,
        color: '#000',
    },
    editButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 10,
    },
    editButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default EditProfileScreen;
