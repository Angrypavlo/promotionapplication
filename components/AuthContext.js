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
  const [coinCount, setCoinCount] = useState(0);

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
      await AsyncStorage.removeItem('coinCount');
      setUser(null);
      setAuthTokens({
        access_token: "",
        refresh_token: ""
      });
      setCoinCount(0);
    } catch (e) {
      console.error('Removing token failed', e);
    }
  };

  useEffect(() => {
    // Extend bootstrapAsync to retrieve both user token and refresh token
    const bootstrapAsync = async () => {
      let accessToken, refreshToken, storedCoinCount;
      try {
        accessToken = await AsyncStorage.getItem('userToken');
        refreshToken = await AsyncStorage.getItem('refreshToken');
        storedCoinCount = await AsyncStorage.getItem('coinCount');
      } catch (e) {
        console.error('Restoring token failed', e);
      }

      if (accessToken && refreshToken) {
        setAuthTokens({ access_token: accessToken, refresh_token: refreshToken });
        setCoinCount(storedCoinCount ? parseInt(storedCoinCount) : 0);
        // Optionally, validate the token and load user profile here
      }
    };

    bootstrapAsync();
  }, []);

  const updateCoinCount = async (newCount) => {
    try {
      if (user === null) return; // Check if user is logged in 
      await AsyncStorage.setItem('coinCount', newCount.toString()); // Store coin count in AsyncStorage
      setCoinCount(newCount); // Update coin count in state
    } catch (e) {
      console.error('Storing coin count failed', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, authTokens, authenticate, logout, updateCoinCount, coinCount }}>
      {children}
    </AuthContext.Provider>
  );
};
