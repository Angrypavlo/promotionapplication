// Import useEffect and useState from 'react' if not already done
import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authTokens, setAuthTokens] = useState({
    access_token: "",
    refresh_token: ""
  });

  // Function to update both user and tokens
  const authenticate = async (userData, tokens) => {
    try {
      await AsyncStorage.setItem('userToken', tokens.access_token);
      await AsyncStorage.setItem('refreshToken', tokens.refresh_token);
      setUser(userData);
      setAuthTokens(tokens);
    } catch (e) {
      console.error('Storing token failed', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('refreshToken');
      setUser(null);
      setAuthTokens({
        access_token: "",
        refresh_token: ""
      });
    } catch (e) {
      console.error('Removing token failed', e);
    }
  };

  useEffect(() => {
    // Extend bootstrapAsync to retrieve both user token and refresh token
    const bootstrapAsync = async () => {
      let accessToken, refreshToken;
      try {
        accessToken = await AsyncStorage.getItem('userToken');
        refreshToken = await AsyncStorage.getItem('refreshToken');
      } catch (e) {
        console.error('Restoring token failed', e);
      }

      if (accessToken && refreshToken) {
        setAuthTokens({ access_token: accessToken, refresh_token: refreshToken });
        // Optionally, validate the token and load user profile here
      }
    };

    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={{ user, authTokens, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
