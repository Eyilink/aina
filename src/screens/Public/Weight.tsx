import React, { ReactElement, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import InputText from '@components/atoms/InputText';
import Previous from '@components/atoms/Previous';

import { useAuthStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';
import { alertError, isNumeric } from '@helpers/utils';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'Weight'>;
};

const Weight = ({ navigation }: Props): ReactElement => {
  const [weight, onChange] = useState<string>('');
  const [, actions] = useAuthStore();

  const onValidate = (): void => {
    if (weight.length < 2 || weight.length > 3 || !isNumeric(weight)) {
      alertError({});
    } else {
      actions.editUserProfile({ key: 'weight', value: parseInt(weight, 10) });
      Keyboard.dismiss();
      navigation.navigate('ProfileCreated');
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <SubTitle text={i18n.t('signup.questions.weight')} />
        <InputText
          value={weight}
          cellCount={3}
          onChange={onChange}
          unit={i18n.t('commons.units.kg')}
        />
        <Button style={styles.button}
          text={i18n.t('signup.validate')}
          onPress={onValidate}
          isValidate
        />
      </View>
    </Container>
  );
};

export default Weight;

const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor:'#EE4483',
    marginTop:100
  }
});
