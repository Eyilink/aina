import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import layout from '@styles/layout';
import colors from '@styles/colors';

type Props = {
  value: string;
  cellCount: number;
  onChange: (text: string) => void;
  unit?: string;
};

const InputText = ({
  onChange,
  value,
  cellCount,
  unit,
}: Props): ReactElement => {
  const ref = useBlurOnFulfill({ value, cellCount });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    onChange,
  });

  return (
    <CodeField
      ref={ref}
      {...props}
      autoFocus
      value={value}
      onChangeText={onChange}
      cellCount={cellCount}
      rootStyle={styles.codeFiledRoot}
      keyboardType="number-pad"
      renderCell={({ index, symbol, isFocused }): ReactElement => (
        <View
          onLayout={getCellOnLayoutHandler(index)}
          key={index}
          style={[styles.cellRoot, isFocused && styles.focusCell]}
        >
          <Text style={styles.cellText}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
          {unit && index === cellCount - 1 && (
            <Text style={styles.unit}>{unit}</Text>
          )}
        </View>
      )}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  unit: {
    position: 'absolute',
    bottom: 0,
    right: -layout.padding * 1.5,
  },
  codeFiledRoot: {
    marginLeft: 'auto',
    marginRight: 'auto',
    //marginTop: layout.padding,
  },
  cellRoot: {
    width: 50,
    height: 50,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  cellText: {
    color: colors.black,
    fontSize: 36,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: colors.black,
    borderBottomWidth: 2,
  },
});
