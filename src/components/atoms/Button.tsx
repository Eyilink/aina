import React, { ReactElement } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

import AppText from '@components/atoms/AppText';

import layout from '@styles/layout';
import colors from '@styles/colors';

type Props = {
  text: string;
  isSelected?: boolean;
  onPress: () => void;
  stretch?: boolean;
  isValidate?: boolean;
  isLoading?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  noText?: boolean;
};

const Button = ({
  text,
  isSelected,
  onPress,
  stretch,
  isValidate,
  isLoading,
  style,
  disabled,
  noText
}: Props): ReactElement => (
  <TouchableOpacity
    style={noText ? {justifyContent: 'space-evenly', alignItems: 'center',backgroundColor: isSelected ? colors.primary : colors.greyLight,
    alignSelf: stretch ? 'stretch' : 'center',borderRadius: layout.buttons.borderRadius, paddingHorizontal: layout.padding/3, paddingVertical: layout.padding / 4,}: [
      styles.button,
      {
        backgroundColor: isSelected ? colors.primary : colors.greyLight,
        alignSelf: stretch ? 'stretch' : 'center',
        marginVertical: isValidate ? layout.padding : layout.padding / 3,
        borderColor: 'red'
      },
      style,
    ]}
    disabled={disabled}
    onPress={onPress}
  >
    {isLoading ? (
      <ActivityIndicator animating={isLoading} color={colors.primary} />
    ) : (
      <AppText
        color={isSelected ? colors.white : colors.black}
        text={text}
        style={styles.text}
      />
    )}
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: layout.buttons.borderRadius,
    paddingHorizontal: layout.padding,
    paddingVertical: layout.padding / 2,
    // marginHorizontal: layout.padding,
  },
  text: {
    textAlign: 'center',
    
  },
});
