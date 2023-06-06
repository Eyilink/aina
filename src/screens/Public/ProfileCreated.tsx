import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';


import Container from '@components/molecules/Container';
import Button from '@components/atoms/Button';

import { AuthenticatedStackParamList, BottomTabParamList, PublicStackParamList } from '@navigation/types';

import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { useAuthStore } from '@store/store';


type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'Weight'>;
  //navigationHome: StackNavigationProp<BottomTabParamList, 'Home'>;
};

const ProfilCreated = ({ navigation }: Props): ReactElement => {
  const [,actions]=useAuthStore();
  const ValidatePressed = (): void => {
    actions.signupUser();
    navigation.navigate('Weight'); 
  };

  const onNoValidate = (): void => {
    navigation.navigate('Weight');
  };


  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            {`${i18n.t('signup.endsignup')} `}
          </Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            {`${i18n.t('profile.newfollow')} `}
          </Text>
        </View>

        <Button
          text={i18n.t('commons.validate')}
          onPress={ValidatePressed}
          stretch
        />
        <Button style={styles.button}
          text={i18n.t  ('commons.no')}
          onPress={onNoValidate}
        />
      </View>
    </Container>
  );
};

export default ProfilCreated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: layout.padding,
    marginBottom: 200,
  },
  messageContainer: {
    flexDirection: 'row',
    marginTop: 30
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
  button: {
    marginTop : 200,
    backgroundColor:'#EE4483'
  }
});
