// HeaderRightButton.js
import React from 'react';
import { View, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from './AuthContext';
import { Linking } from 'react-native';

const ProfileLoginButton = ({ navigation }) => {
  const { user } = useAuth();

  const handleLoginPress = () => {
    navigation.navigate('OAuthWebView');
  };

  return (
    <View style={styles.container}>
      {user ? (
        <TouchableOpacity onPress={() => {/* Handle profile action */}}>
          <Image
            source={{ uri: user.profilePicture }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      ) : (
        <Button
          onPress={handleLoginPress}
          title="Login"
          color="#00ccff"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10, // Adjust the margin as needed
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

export default ProfileLoginButton;
