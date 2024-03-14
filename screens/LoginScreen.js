import * as React from 'react';
import { Linking, Button, Alert, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Assuming you're using AsyncStorage to store the token

// Define your deep link prefix
const DEEP_LINK_PREFIX = 'yourapp://';

const App = () => {
    React.useEffect(() => {
        const handleDeepLink = async (event) => {
            // Extract the token from the URL
            let { url } = event;
            if (url.includes('token=')) {
                let token = url.split('token=')[1];
                // Store the token securely
                await AsyncStorage.setItem('userToken', token);
                Alert.alert('Login Success', 'Token stored successfully!');
            }
        };
        
        // Listen for incoming deep links
        Linking.addEventListener('url', handleDeepLink);
        
        return () => {
            Linking.removeEventListener('url', handleDeepLink);
        };
    }, []);
    
    // Function to initiate the OAuth2 flow
    const initiateLogin = async () => {
        try {
            // Assuming you have the backend URL stored in an environment variable or directly inserted
            const backendAuthUrl = 'https://yourbackend.com/auth/login';
            // Attempt to open the URL which will redirect the user to Authentik for login
            const supported = await Linking.canOpenURL(backendAuthUrl);
            if (supported) {
                await Linking.openURL(backendAuthUrl);
            } else {
                Alert.alert('Error', 'Can\'t handle backend URL');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred');
        }
    };
    
    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title="Login with Authentik" onPress={initiateLogin} />
        </SafeAreaView>
        );
    };
    
    export default App;
    