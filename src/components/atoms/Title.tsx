import React, { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';

import fonts from '@styles/fonts';
import colors from '@styles/colors';
import layout from '@styles/layout';

type Props = {
  text: string;
  isPrimary?: boolean;
  isDate?: boolean;
  isCenter?: boolean;
};

const Title = ({ text, isPrimary, isDate, isCenter }: Props): ReactElement => (
  <Text
    style={[
      styles.title,
      {
        color: isPrimary ? colors.primary : colors.black,
        fontSize: isDate ? fonts.sections.fontSize - 1 : fonts.title.fontSize,
        textAlign: isCenter ? 'center' : 'left',
      },
    ]}
  >
    {isDate ? `${text.charAt(0).toUpperCase()}${text.slice(1)}` : text}
  </Text>
);

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.title.fontFamily,
    marginBottom: layout.padding,
    marginHorizontal: layout.padding,
  },
});
