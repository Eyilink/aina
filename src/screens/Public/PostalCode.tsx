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
  navigation: StackNavigationProp<PublicStackParamList, 'PostalCode'>;
};

const PostalCode = ({ navigation }: Props): ReactElement => {
  const [postalCode, onChange] = useState<string>('');
  const [, actions] = useAuthStore();

  const onValidate = (): void => {
    if (postalCode.length !== 5 || !isNumeric(postalCode)) alertError({});
    else {
      actions.editUserProfile({
        key: 'postalCode',
        value: parseInt(postalCode, 10),
      });
      navigation.navigate('Size');
    }
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <SubTitle text={i18n.t('signup.questions.postalCode')} />
        <InputText value={postalCode} cellCount={5} onChange={onChange} />
        <Button
          text={i18n.t('signup.validate')}
          onPress={onValidate}
          isValidate
        />
      </View>
    </Container>
  );
};

export default PostalCode;

const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
