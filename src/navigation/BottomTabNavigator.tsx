import React, { ReactElement } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, Feather } from '@expo/vector-icons';

import i18n from '@i18n/i18n';
import Home from '@screens/Authenticated/Home';
import Suivi from '@screens/Authenticated/Suivi';
import History from '@screens/Authenticated/History';
import Profile from '@screens/Authenticated/Profile';

import layout from '@styles/layout';
import colors from '@styles/colors';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

type RenderTabBarIconProps = {
  color: string;
  route: { name: string };
};

const renderTabBarIcon = ({
  color,
  route,
}: RenderTabBarIconProps): ReactElement => {
  const size = layout.navigation.tabIconSize;
  if (route.name === 'Home') {
    return <AntDesign name="home" size={size} color={color} />;
  }
  if (route.name === 'Suivi') {
    return <AntDesign name="pluscircle" size={size} color={color} />;
  }
  if (route.name === 'History') {
    return <Feather name="bar-chart-2" size={size} color={color} />;
  }
  if (route.name === 'Profile') {
    return <AntDesign name="user" size={size} color={color} />;
  }
  throw new Error('renderTabBarIcon: No route found');
};

const BottomTabNavigator = (): ReactElement => (
  <Tab.Navigator
    initialRoute="Home"
    screenOptions={({ route }): object => ({
      tabBarIcon: ({ color }: { color: string }): ReactElement =>
        renderTabBarIcon({ color, route }),
    })}
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: colors.greyDark,
      style: { paddingVertical: 6 },
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{ tabBarLabel: i18n.t('navigation.authenticated.home') }}
    />
    <Tab.Screen
      name="Suivi"
      component={Suivi}
      options={{ tabBarLabel: i18n.t('navigation.authenticated.suivi') }}
    />
    <Tab.Screen
      name="History"
      component={History}
      options={{ tabBarLabel: i18n.t('navigation.authenticated.history') }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{ tabBarLabel: i18n.t('navigation.authenticated.profile') }}
    />
  </Tab.Navigator>
);

export default BottomTabNavigator;
