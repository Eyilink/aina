import React, { ReactElement } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import AuthenticatedNavigator from '@navigation/AuthenticatedNavigator';
import PublicNavigator from '@navigation/PublicNavigator';

import colors from '@styles/colors';

type RootNavigatorProps = {
  isUserSignin: boolean;
};

const ThemeStyle = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

const RootNavigator = ({ isUserSignin }: RootNavigatorProps): ReactElement => (
  <NavigationContainer theme={ThemeStyle}>
    {isUserSignin ? <AuthenticatedNavigator /> : <PublicNavigator />}
  </NavigationContainer>
);

export default RootNavigator;
