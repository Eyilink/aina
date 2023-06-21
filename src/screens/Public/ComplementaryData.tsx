import React, { ReactElement, useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import {ScrollView} from "react-native"
import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import InputText from '@components/atoms/InputText';
import Previous from '@components/atoms/Previous';

import { useAuthStore, useUserStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';
import { alertError, isNumeric } from '@helpers/utils';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';
import { MALADIE1 } from '@constants/constants';
import { getUserSelector } from '@store/selectors';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'ComplementaryData'>;
};

const ComplementaryData = ({ navigation }: Props): ReactElement => {
  const [AllergyClicked, setAllergyClicked] = React.useState(true);
  const [TetanosClicked, setTetanosClicked] = React.useState(true);
  const [size, onChangeSize] = useState<string>('');
  const [weight, onChangeWeight] = useState<string>('');
  const [, actions] = useAuthStore();

  const onValidate = (): void => {
    if ((weight.length < 2 || weight.length > 3 || !isNumeric(weight))&&(size.length < 2 || size.length > 3 || !isNumeric(size))) {
      alertError({});
    } else {
      actions.editUserProfile({ key: 'weight', value: parseInt(weight, 10) });
      actions.editUserProfile({ key: 'size', value: parseInt(size, 10) });
      Keyboard.dismiss();
      navigation.navigate('Reminder');
      if (AllergyClicked){
        actions.editUserProfile({ key: 'allergy', value: true});
      }
      else {
        actions.editUserProfile({ key: 'allergy', value: false});
      }
      if (TetanosClicked){
        actions.editUserProfile({ key: 'tetanos', value: true});
      }
      else {
        actions.editUserProfile({ key: 'allergy', value: false});
      }
    }
  };

  const onAllergyValidate = (): void => {
    setAllergyClicked(true);
  };

  const onNoAllergyValidate = (): void => {
    setAllergyClicked(false);
  };

  const onTetanosValidate = (): void => {
    setTetanosClicked(true);
  };

  const onNoTetanosValidate = (): void => {
    setTetanosClicked(false);
  };

  return (
    <Container>
      <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <View style={styles.container}>

          <SubTitle text={i18n.t('signup.title.weight')} />
          <InputText
            value={weight}
            cellCount={3}
            onChange={onChangeWeight}
            unit={i18n.t('commons.units.kg')}
          />
        </View>

        <View style={styles.container}>
          <SubTitle text={i18n.t('signup.title.size')} />
          <InputText
            value={size}
            cellCount={3}
            onChange={onChangeSize}
            unit={i18n.t('commons.units.cm')}
          />
        </View>

        <View style={styles.container}>
          <SubTitle text={i18n.t('signup.title.allergy')} />
          <View style={styles.messageContainer}>
            <Button style={styles.button}
              text={i18n.t('commons.yes')}
              onPress={onAllergyValidate}
              isValidate={AllergyClicked}
              isSelected={AllergyClicked}
            />
            <Button style={styles.button}
              text={i18n.t('commons.no')}
              onPress={onNoAllergyValidate}
              isValidate={!AllergyClicked}
              isSelected={!AllergyClicked}
            />
          </View>
        </View>

        <View style={styles.container}>
          <SubTitle text={i18n.t('signup.title.tetanos')} />
          <View style={styles.messageContainer}>
            <Button style={styles.button}
              text={i18n.t('commons.yes')}
              onPress={onTetanosValidate}
              isValidate={TetanosClicked}
              isSelected={TetanosClicked}
            />
            <Button style={styles.button}
              text={i18n.t('commons.no')}
              onPress={onNoTetanosValidate}
              isValidate={!TetanosClicked}
              isSelected={!TetanosClicked}
            />
          </View>
        </View>
        <Button style={styles.button}
          text={i18n.t('commons.validate')}
          onPress={onValidate}
          isValidate
          isSelected
        />
      </View>
      </ScrollView>
    </Container>
  );
};

export default ComplementaryData;

const styles = StyleSheet.create({
  container: {
    margin: 20
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  messageContainer: {
    margin: -30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    margin: 10
  }
});
