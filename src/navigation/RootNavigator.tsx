import React, { ReactElement, useState , useEffect } from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import AuthenticatedNavigator from '@navigation/AuthenticatedNavigator';
import PublicNavigator from '@navigation/PublicNavigator';

import colors from '@styles/colors';
import { ImageSourcePropType, View } from 'react-native';
import AppText from '@components/atoms/AppText';
import App from 'App';
import ToolBar from '@components/molecules/ToolBar';
import { getIconPath } from '@constants/constants';
import { ImageProvider } from '@components/molecules/ImageContext';
import { InfomrationProvider } from '@components/molecules/InformationContext';

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


const RootNavigator = ({ isUserSignin }: RootNavigatorProps): ReactElement => {

  return (
    <InfomrationProvider>
    <ImageProvider>
    <NavigationContainer theme={ThemeStyle}>
      {isUserSignin ? <ToolBar /> : null}
      {isUserSignin ? <AuthenticatedNavigator /> : <PublicNavigator />}
    </NavigationContainer>
    </ImageProvider>
    </InfomrationProvider>
  );

};

export default RootNavigator;
