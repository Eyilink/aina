import React, { ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from '@navigation/BottomTabNavigator';
import Temperature from '@screens/Authenticated/Report/Temperature';
import Symptoms from '@screens/Authenticated/Report/Symptoms';
import OtherSymptoms from '@screens/Authenticated/Report/OtherSymptoms';
import Notes from '@screens/Authenticated/Report/Notes';

import { AuthenticatedStackParamList } from './types';

const Stack = createStackNavigator<AuthenticatedStackParamList>();

const AuthenticatedNavigator = (): ReactElement => (
  <Stack.Navigator headerMode="none" initialRouteName="BottomTabNavigator">
    <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
    <Stack.Screen name="Temperature" component={Temperature} />
    <Stack.Screen name="Symptoms" component={Symptoms} />
    <Stack.Screen name="OtherSymptoms" component={OtherSymptoms} />
    <Stack.Screen name="Notes" component={Notes} />
  </Stack.Navigator>
);

export default AuthenticatedNavigator;
