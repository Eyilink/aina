import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import colors from '@styles/colors';
import layout from '@styles/layout';

const Previous = (): ReactElement => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={(): void => navigation.goBack()}
      style={styles.container}
    >
      <Ionicons
        name="ios-arrow-round-back"
        size={layout.navigation.previousIcon.size}
        color={colors.black}
      />
    </TouchableOpacity>
  );
};

export default Previous;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: layout.padding,
  },
});
