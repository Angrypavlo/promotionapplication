import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';
// Import components from @react-navigation/drawer
import { DrawerContentScrollView } from '@react-navigation/drawer';

const ProfileDrawer = (props) => {
  const { user, logout } = useAuth();
  // Fallback URL for user's profile picture
  const profilePicUrl = user?.profilePicture || 'https://avatar.iran.liara.run/public/boy?username=Ash';

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        <Image source={{ uri: profilePicUrl }} style={styles.profileImage} />
        <TouchableOpacity style={styles.button} onPress={() => {
          props.navigation.navigate('Friends');
        }}>
          <Text>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {
          logout();
          props.navigation.closeDrawer();
        }}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    marginVertical: 10,
  }
});

export default ProfileDrawer;
