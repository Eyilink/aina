import React, { ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cgu from '@screens/Public/Cgu';
import ProfilCreation from '@screens/Public/ProfilCreation';
import ProfileCreated from '@screens/Public/ProfileCreated';
import Username from '@screens/Public/Username';
import Age from '@screens/Public/Age';

import Weight from '@screens/Public/Weight';
import Reminder from '@screens/Public/Reminder';
import Confirmation from '@screens/Public/Confirmation';

import { PublicStackParamList } from '@navigation/types';
import MoreData from '@screens/Public/MoreData';
import ComplementaryData from '@screens/Public/ComplementaryData';

const Stack = createStackNavigator<PublicStackParamList>();

const PublicNavigator = (): ReactElement => (
  <Stack.Navigator headerMode="none" initialRouteName="ProfilCreation">
    <Stack.Screen name="ProfilCreation" component={ProfilCreation} />
    <Stack.Screen name="ProfileCreated" component={ProfileCreated} />
    <Stack.Screen name="Username" component={Username} />
    <Stack.Screen name="Age" component={Age} />
    <Stack.Screen name="MoreData" component={MoreData} />
    <Stack.Screen name="ComplementaryData" component={ComplementaryData} />
    <Stack.Screen name="Weight" component={Weight} />

    {/* <Stack.Screen name="Diseases" component={Diseases} />
    <Stack.Screen name="Pregnant" component={Pregnant} />
    <Stack.Screen name="Reminder" component={Reminder} />
    <Stack.Screen name="Confirmation" component={Confirmation} /> */}
  </Stack.Navigator>
);

export default PublicNavigator;
