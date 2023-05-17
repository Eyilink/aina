import React, { ReactElement } from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';

import fonts from '@styles/fonts';
import colors from '@styles/colors';
import layout from '@styles/layout';

type Props = {
  text: string;
  style?: TextStyle;
  isCenter?: boolean;
  isBold?: boolean;
};

const Subtitle = ({ text, style, isCenter, isBold }: Props): ReactElement => (
  <Text
    style={[
      styles.subtitle,
      {
        textAlign: isCenter ? 'center' : 'left',
        fontFamily: isBold
          ? fonts.weight.bold.fontFamily
          : fonts.subtitle.fontFamily,
      },
      style,
    ]}
  >
    {text}
  </Text>
);

export default Subtitle;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: fonts.subtitle.fontSize,
    color: colors.black,
    marginBottom: layout.padding,
    lineHeight: fonts.subtitle.fontSize + 5,
    marginHorizontal: layout.padding,
  },
});
