import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigator = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Store') {
                    iconName = focused ? 'cart-outline' : 'cart-outline';
                } else if (route.name === 'Home') {
                    iconName = focused ? 'map-outline' : 'map-outline';
                } else if (route.name === 'Settings') {
                    iconName = focused ? 'settings-outline' : 'settings-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
        })}
    >
        <Tab.Screen name="Store" component={HomeScreen} />
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Settings" component={HomeScreen} />
    </Tab.Navigator>
);

export default AppNavigator;
