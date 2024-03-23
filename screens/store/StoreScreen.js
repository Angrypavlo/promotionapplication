import { Alert } from 'react-native'
import React, { useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import MyItemsScreen from './MyItemsScreen';
import MainStoreScreen from './MainStoreScreen';
import { StateProvider } from './StateContext';

const StoreStack = createStackNavigator()

const StoreScreen = () => {
    return (
        <StateProvider>
            <StoreStack.Navigator>
                <StoreStack.Screen name="Store" component={MainStoreScreen}/>
                <StoreStack.Screen name="My Items" component={MyItemsScreen} />
            </StoreStack.Navigator>
        </StateProvider>
    )
}

export default StoreScreen