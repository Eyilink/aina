import AppText from '@components/atoms/AppText';
import React, { useState } from 'react';
import { View, Text, TextInput, CheckBox, StyleSheet } from 'react-native';

interface ProfileAskPersonalProps {
  nameText: string;
  inputPlaceholder: string;
  displayPersonal: boolean;
}

const ProfileAskPersonal = ({
  nameText,
  inputPlaceholder,
  displayPersonal,
}: ProfileAskPersonalProps) => {
  const [name, setName] = useState('');
  const [isPersonal, setIsPersonal] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AppText style={styles.label} text={nameText} />
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder={inputPlaceholder}
        />
      </View>
      {displayPersonal && (
        <View style={[styles.row, styles.personalContainer]}>
          <AppText style={styles.personalLabel} text='Strictement personnel' />
          <CheckBox
            value={isPersonal}
            onValueChange={setIsPersonal}
            style={styles.checkbox}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    marginRight: 8,
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  personalContainer: {
    justifyContent: 'flex-end',
  },
  personalLabel: {
    fontSize: 16,
    marginRight: 4,
  },
  checkbox: {
    marginLeft: 0,
    marginRight: 0,
  },
});

export default ProfileAskPersonal;
