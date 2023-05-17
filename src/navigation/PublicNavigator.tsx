import React, { ReactElement } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cgu from '@screens/Public/Cgu';
import Username from '@screens/Public/Username';
import Age from '@screens/Public/Age';
import PostalCode from '@screens/Public/PostalCode';
import Size from '@screens/Public/Size';
import Weight from '@screens/Public/Weight';
import Diseases from '@screens/Public/Diseases';
import Pregnant from '@screens/Public/Pregnant';
import Reminder from '@screens/Public/Reminder';
import Confirmation from '@screens/Public/Confirmation';

import { PublicStackParamList } from '@navigation/types';

const Stack = createStackNavigator<PublicStackParamList>();

const PublicNavigator = (): ReactElement => (
  <Stack.Navigator headerMode="none" initialRouteName="Cgu">
    <Stack.Screen name="Cgu" component={Cgu} />
    <Stack.Screen name="Username" component={Username} />
    <Stack.Screen name="Age" component={Age} />
    <Stack.Screen name="PostalCode" component={PostalCode} />
    <Stack.Screen name="Size" component={Size} />
    <Stack.Screen name="Weight" component={Weight} />
    <Stack.Screen name="Diseases" component={Diseases} />
    <Stack.Screen name="Pregnant" component={Pregnant} />
    <Stack.Screen name="Reminder" component={Reminder} />
    <Stack.Screen name="Confirmation" component={Confirmation} />
  </Stack.Navigator>
);

export default PublicNavigator;
