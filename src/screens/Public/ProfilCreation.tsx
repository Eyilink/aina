import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


import Container from '@components/molecules/Container';
import Button from '@components/atoms/Button';

import { useAuthStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';

import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';


type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'ProfilCreation'>;
};

const ProfilCreation = ({ navigation }: Props): ReactElement => {
  const [, actions] = useAuthStore();

  const onValidate = (): void => {
    actions.editUserProfile({ key: 'cgu', value: true });
    navigation.navigate('Username');
  };


  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            {`${i18n.t('signup.firstText')} `}
          </Text>
        </View>
        <Button
          text={i18n.t('signup.next')}
          onPress={onValidate}
          isValidate
        />
      </View>
    </Container>
  );
};

export default ProfilCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: layout.padding,
  },
  messageContainer: {
    flexDirection: 'row',
  },
  message: {
    textAlign: 'center',
    fontFamily: fonts.subtitle.fontFamily,
    fontSize: fonts.subtitle.fontSize,
    lineHeight: fonts.subtitle.fontSize,
  },
  cta: {
    textDecorationLine: 'underline',
    fontFamily: fonts.weight.bold.fontFamily,
  },
});
