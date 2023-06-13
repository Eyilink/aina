import React, { ReactElement, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
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
import fonts from '@styles/fonts';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'MoreData'>;
};

const MoreData = ({ navigation }: Props): ReactElement => {
  const [size, onChange] = useState<string>('');
  const [, actions] = useAuthStore();

  const onValidate = (): void => {
  //   if (size.length < 2 || size.length > 3 || !isNumeric(size)) alertError({});
  //   else {
  //     actions.editUserProfile({ key: 'size', value: parseInt(size, 10) });
      navigation.navigate('ComplementaryData');
    // }
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
        <SubTitle text={i18n.t('signup.questions.baseddata')} />
        <Text style={styles.message}>
          {`${i18n.t('signup.moredata')} `}
        </Text>
        <View style={styles.messageContainer}>
          <Button style={styles.button}
            text={i18n.t('commons.yes')}
            onPress={onValidate}
            isValidate
            isSelected
          />
          <Button style={styles.button}
            text={i18n.t('commons.no')}
            onPress={onNoValidate}
          />
        </View>
      </View>
    </Container>
  );
};

export default MoreData;

const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    fontFamily: fonts.text.fontFamily,
    fontSize: fonts.text.fontSize,
    lineHeight: fonts.text.fontSize,
  },
  messageContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
