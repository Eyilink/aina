import React, { ReactElement, ReactNode, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import * as Device from 'expo-device';

import layout from '@styles/layout';

type Props = {
  children: ReactNode;
  noMarginBottom?: boolean;
};

const Container = ({ children, noMarginBottom }: Props): ReactElement => {
  const [device, setDevice] = useState(1); // 1 = phone, 2 = tablet

  useEffect(() => {
    const getDeviceType = async () => {
      const deviceType = await Device.getDeviceTypeAsync();
      setDevice(deviceType);
    };

    getDeviceType();
  }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          marginBottom: noMarginBottom ? 0 : layout.padding,
          width: device === 1 ? '100%' : '70%',
          justifyContent: device === 1 ? 'flex-start' : 'center',
        },
      ]}
    >
      {children}
    </SafeAreaView>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: layout.padding,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
