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
  navigation: StackNavigationProp<PublicStackParamList, 'MoreData'>;
};

const ComplementaryData = ({ navigation }: Props): ReactElement => {
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
      navigation.navigate('ProfileCreated');
    }
  };

  const onNoValidate = (): void => {
    navigation.navigate('ProfileCreated');
  };

  return (
    <Container>
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
          <InputText
            value={size}
            cellCount={3}
            onChange={onChangeSize}
            unit={i18n.t('commons.units.cm')}
          />
        </View>



          <Button style={styles.button}
            text={i18n.t('commons.validate')}
            onPress={onValidate}
            isValidate
            isSelected
          />
      </View>
    </Container>
  );
};

export default ComplementaryData;

const styles = StyleSheet.create({
  container: {
    //paddingVertical: layout.padding,
    margin: layout.padding
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    //backgroundColor:'#EE4483',
    //marginTop:100
  }
});
