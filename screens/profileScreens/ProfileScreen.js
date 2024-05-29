import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ProfileScreen = ({ route, navigation }) => {
    const { name, email, bio, profileImagePhoto } = route.params;

    const handleEditProfile = () => {
        navigation.navigate('EditProfile'); // Navigate to the EditProfileScreen
    };
    const handleStatisticsScreen = () => {
        navigation.navigate('Statistics'); // Navigate to the EditProfileScreen
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                    <Text style={styles.editButtonText}>Edit profile</Text>
                </TouchableOpacity>
                <Image
                    style={styles.profileImage}
                    source={profileImagePhoto} // Change this to your profile image path
                />
                <Text style={styles.heading}>{name}</Text>
                <Text style={styles.subHeading}>{email}</Text>
            </View>
            <View style={styles.bioContainer}>
                <Text style={styles.label}>Bio:</Text>
                <Text style={styles.bio}>{bio}</Text>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                    }} style={styles.bioContainer}>
                    <Text style={styles.label}>Friends</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleStatisticsScreen} style={styles.bioContainer}>
                    <Text style={styles.label}>Statistics</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        // handle onPress
                    }} style={styles.bioContainer}>
                    <Text style={styles.label}>History</Text>
                </TouchableOpacity>
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
        borderBottomWidth: 1,
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

export default ProfileScreen;