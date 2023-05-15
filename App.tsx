import React, { ReactElement, useEffect, useState } from 'react';
import { AppLoading } from 'expo';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import RootNavigator from '@navigation/RootNavigator';
import { cacheResources } from '@helpers/assets';
import { StoreSubscriber, useAuthStore } from '@store/store';

import colors from '@styles/colors';

const App: React.FC = () => {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [userSession, actions] = useAuthStore();

  // Ignore dynamic scaling on iOS
  // @ts-ignore
  Text.defaultProps = Text.defaultProps || {};
  // @ts-ignore
  Text.defaultProps.allowFontScaling = false;

  useEffect(() => {
    if (userSession.user === null || userSession.token === null) {
      actions.getUserSession();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={cacheResources}
        onFinish={(): void => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <StoreSubscriber>
        {({ auth, isLoading }): ReactElement => {
          return isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator animating={isLoading} color={colors.primary} />
            </View>
          ) : (
            <RootNavigator isUserSignin={auth.token !== null} />
          );
        }}
      </StoreSubscriber>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
