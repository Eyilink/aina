import React, { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
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
  navigation: StackNavigationProp<PublicStackParamList, 'Size'>;
};

const Size = ({ navigation }: Props): ReactElement => {
  const [size, onChange] = useState<string>('');
  const [, actions] = useAuthStore();

  const onValidate = (): void => {
    if (size.length < 2 || size.length > 3 || !isNumeric(size)) alertError({});
    else {
      actions.editUserProfile({ key: 'size', value: parseInt(size, 10) });
      navigation.navigate('Weight');
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <SubTitle text={i18n.t('signup.questions.size')} />
        <InputText
          value={size}
          cellCount={3}
          onChange={onChange}
          unit={i18n.t('commons.units.cm')}
        />

        <Button style={{backgroundColor:'#EE4483', marginTop:100}}
          text={i18n.t('signup.validate')}
          onPress={onValidate}
          isValidate
        />
      </View>
    </Container>
  );
};

export default Size;

const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
