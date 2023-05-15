import React, { ReactElement } from 'react';
import { StyleSheet, Text } from 'react-native';

import fonts from '@styles/fonts';
import colors from '@styles/colors';
import layout from '@styles/layout';

type Symptome = {
  nom: string
}

type Pathologie = {
  nom: string
}

type Props = {
  objet: Symptome|Pathologie;
};

const BoxPathologie = ({ objet }: Props): ReactElement => (
  <Text
    style={[
      styles.subtitle,
    ]}
  >
    {objet.nom}
  </Text>
);

export default BoxPathologie;

const styles = StyleSheet.create({
  subtitle: {
    fontSize: fonts.subtitle.fontSize,
    color: colors.black,
    marginBottom: layout.padding,
    lineHeight: fonts.subtitle.fontSize + 5,
    marginHorizontal: layout.padding,
  },
});
