import React, { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { ActivityIndicator, Text, View, Button } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { CLIENT_ID, AUTHORIZATION_ENDPOINT, TOKEN_ENDPOINT, USER_INFO_ENDPOINT } from '@env';

WebBrowser.maybeCompleteAuthSession();
const redirectUri = makeRedirectUri({
  scheme: 'proapp',
  path: 'redirect',
});

const clientId = CLIENT_ID;
const discovery = {
  authorizationEndpoint: AUTHORIZATION_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
};
const userInfoEndpoint = USER_INFO_ENDPOINT;

const OAuthScreen = ({ navigation }) => {
  const { authenticate, isAuthenticated } = useAuth(); // Assume isAuthenticated checks if the user is already logged in
  const [loading, setLoading] = useState(true);

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      redirectUri: redirectUri,
      usePKCE: true,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
    },
    discovery
  );

  // Automatically initiate the login process
  useEffect(() => {
    if (request && !isAuthenticated) {
      promptAsync().then(() => setLoading(false));
    } else {
      setLoading(false); // In case request is not available or user is already authenticated
    }
  }, [request, isAuthenticated]);

  useEffect(() => {
    const exchangeTokenAndFetchUserInfo = async () => {
      if (response?.type === "success") {
        const data = new URLSearchParams();
        data.append('client_id', clientId);
        data.append('grant_type', 'authorization_code');
        data.append('code', response.params.code);
        data.append('redirect_uri', redirectUri);
        data.append('code_verifier', request.codeVerifier);

        try {
          const exchangeTokenResponse = await fetch(discovery.tokenEndpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: data.toString(),
          });

          if (!exchangeTokenResponse.ok) throw new Error('Token exchange failed');
          const responseData = await exchangeTokenResponse.json();

          const userInfoResponse = await fetch(userInfoEndpoint, {
            headers: {
              'Authorization': `Bearer ${responseData.access_token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!userInfoResponse.ok) throw new Error('Failed to fetch user info');
          const userInfo = await userInfoResponse.json();

          authenticate(userInfo, responseData);
          navigation.goBack(); // Navigate back upon successful login
        } catch (error) {
          console.error(error);
          setLoading(false); // Show retry or error message
        }
      } else if (response?.type === "error") {
        console.error("Authentication error:", response.error);
        setLoading(false); // Handle error state
      }
    };

    if (response) {
      exchangeTokenAndFetchUserInfo();
    }
  }, [response]);

  // Display loading indicator while waiting for login
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Logging you in...</Text>
      </View>
    );
  }

  // Display an error or retry option if login was not successful
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Login failed. Please try again.</Text>
      <Button title="Retry Login" onPress={() => promptAsync()} />
    </View>
  );
};

export default OAuthScreen;
