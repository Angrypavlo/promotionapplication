import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check for token in storage on app start
    const bootstrapAsync = async () => {
      let userToken;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
        console.error('Restoring token failed', e);
      }

      // After restoring token, we may need to validate it or directly load user profile
      if (userToken) {
        setUser({ ...user, token: userToken }); // Update state with token and possibly fetch user info
      }
    };

    bootstrapAsync();
  }, []);

  const login = async (userData, token) => {
    try {
      await AsyncStorage.setItem('userToken', token); // Securely store the token
      setUser(userData); // Update user state
    } catch (e) {
      console.error('Storing token failed', e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Clear the token from storage
      setUser(null); // Clear user state
    } catch (e) {
      console.error('Removing token failed', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
