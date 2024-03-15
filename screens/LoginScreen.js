import React from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OAuthWebView = () => {
  const navigation = useNavigation();
  const authUrl = 'https://jubilant-space-disco-qjvjwwvjw6r345p7-8080.app.github.dev/login'

  const modifiedUserAgent = "Mozilla/5.0 (Linux; Android 12; Pixel 5 Build/SP1A.210812.016) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/114.0.5735.130 Mobile Safari/537.36".replace("; wv", "");

  const handleNavigationStateChange = async (newNavState) => {
    const { url } = newNavState;
    if (url.includes('callback?code=')) { // Adjust based on your auth provider's redirect URL
      const code = new URL(url).searchParams.get('code');
      if (code) {
        // Now you can exchange this code for a token in your backend or directly if supported
        await exchangeCodeForToken(code);
      }
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const response = await fetch('YOUR_BACKEND_ENDPOINT/exchange', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const { access_token } = await response.json();
      await AsyncStorage.setItem('access_token', access_token);
      navigation.goBack(); // or navigate to another screen
    } catch (error) {
      console.error('Error exchanging code for token:', error);
    }
  };

  return (
    <WebView 
      source={{ uri: authUrl }} 
      onNavigationStateChange={handleNavigationStateChange} 
      userAgent={modifiedUserAgent} // Apply the modified userAgent
    />
  );
};

export default OAuthWebView;
