import { Alert } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import MyItemsScreen from './MyItemsScreen';
import DiscountStoreScreen from './DiscountStoreScreen';
import { StateProvider } from './StateContext';
import { AuthProvider } from '../../components/AuthContext';
import DetailPage from './DetailPage';
import HomeStoreScreen from './HomeStoreScreen';
import IconStoreScreen from './IconStoreScreen';

const StoreStack = createStackNavigator()

const StoreScreen = () => {
    return (
        <StateProvider>
            <AuthProvider>
                <StoreStack.Navigator>
                    <StoreStack.Screen name="HomeStore" component={HomeStoreScreen} options={{ title: 'Store' }}/>
                    <StoreStack.Screen name="Discounts" component={DiscountStoreScreen} />
                    <StoreStack.Screen name="Icons" component={IconStoreScreen} />
                    <StoreStack.Screen name="My Items" component={MyItemsScreen} />
                    <StoreStack.Screen name="Details" component={DetailPage} />
                </StoreStack.Navigator>
            </AuthProvider>
        </StateProvider>
    )
}

export default StoreScreen