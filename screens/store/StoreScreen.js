import { Alert } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import MyItemsScreen from './MyItemsScreen';
import MainStoreScreen from './MainStoreScreen';
import { StateProvider } from './StateContext';
import { AuthProvider } from '../../components/AuthContext';

const StoreStack = createStackNavigator()

const StoreScreen = () => {
    return (
        <StateProvider>
            <AuthProvider>
                <StoreStack.Navigator>
                    <StoreStack.Screen name="Store" component={MainStoreScreen}/>
                    <StoreStack.Screen name="My Items" component={MyItemsScreen} />
                </StoreStack.Navigator>
            </AuthProvider>
        </StateProvider>
    )
}

export default StoreScreen