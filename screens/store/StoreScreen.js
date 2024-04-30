import { Alert } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import MyItemsScreen from './MyItemsScreen';
import MainStoreScreen from './MainStoreScreen';
import { StateProvider } from './StateContext';
import { AuthProvider } from '../../components/AuthContext';
import DetailPage from './DetailPage';

const StoreStack = createStackNavigator()

const StoreScreen = () => {
    return (
        <StateProvider>
            <AuthProvider>
                <StoreStack.Navigator>
                    <StoreStack.Screen name="StoreHome" component={MainStoreScreen} options={{ title: 'Store' }}/>
                    <StoreStack.Screen name="My Items" component={MyItemsScreen} />
                    <StoreStack.Screen name="Details" component={DetailPage} />
                </StoreStack.Navigator>
            </AuthProvider>
        </StateProvider>
    )
}

export default StoreScreen