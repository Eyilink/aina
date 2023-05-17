import React, { ReactElement } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

import fonts from '@styles/fonts';
import colors from '@styles/colors';

type Props = {
  text: string;
  color?: string;
  style?: TextStyle;
};

const AppText = ({ text, color, style }: Props): ReactElement => (
  <Text style={[styles.subtitle, { color }, style]}>{text}</Text>
);

export default AppText;

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: fonts.text.fontFamily,
    fontSize: fonts.text.fontSize,
    color: colors.black,
  },
});
