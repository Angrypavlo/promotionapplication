import React, { useEffect, useState } from "react";
import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, exchangeCodeAsync } from 'expo-auth-session';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../components/AuthContext';
import { CLIENT_ID, AUTHORIZATION_ENDPOINT, TOKEN_ENDPOINT, AUTO_DISCOVERY_URL, USER_INFO_ENDPOINT } from '@env';

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
// const discovery = useAutoDiscovery(AUTO_DISCOVERY_URL);
const userInfoEndpoint = USER_INFO_ENDPOINT;

const OAuthScreen = ({ navigation }) => {
  const [authTokens, setAuthTokens] = useState({access_token: "", refresh_token: ""});
  const { authenticate } = useAuth();

  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: clientId,
      redirectUri: redirectUri,
      usePKCE: true,
      scopes: ['openid', 'profile', 'email', 'offline_access'],
    },
    discovery
  );

  useEffect(() => {
    const exchange = async (exchangeTokenReq) => {
      try {
        // Check if authTokens is already populated
        if (authTokens.access_token !== "" || authTokens.refresh_token !== "") {
          return;
        }
  
        const data = new URLSearchParams();
        data.append('client_id', clientId);
        data.append('grant_type', 'authorization_code');
        data.append('code', response.params.code);
        data.append('redirect_uri', redirectUri);
        data.append('code_verifier', request.codeVerifier);
  
        const exchangeTokenResponse = await fetch(discovery.tokenEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: data.toString(),
        });
  
        if (exchangeTokenResponse.ok) {
          const responseData = await exchangeTokenResponse.json();
          
          // Assuming the access token is in responseData.access_token
          const accessToken = responseData.access_token;

          try {
            // Make a request to the user info endpoint
            const userInfoResponse = await fetch(userInfoEndpoint, {
              headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
              },
            });
        
            if (userInfoResponse.ok) {
              const userInfo = await userInfoResponse.json();
              
              // Here you have the user info, you can now call authenticate with this info
              console.log("userInfo", userInfo);
              authenticate(userInfo, responseData); // Assuming authenticate can handle user info
            } else {
              console.error("Error fetching user info:", userInfoResponse.status);
            }
          } catch (error) {
            console.error("Error fetching user info", error);
          }
          
        } else {
          console.error("Error exchanging token:", exchangeTokenResponse.status);
        }
      } catch (error) {
        console.error("error", error);
      }
    };
  
    if (response) {
      if (response.error) {
        console.error(
          "Authentication error",
          response.params.error_description || "something went wrong"
        );
      }
      if (response.type === "success") {
        exchange(response.params.code);
      }
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Login!" disabled={!request} onPress={() => promptAsync()} />
      {response && <Text>{JSON.stringify(response, null, 2)}</Text>}
    </View>
  );
};

export default OAuthScreen;
