import React, { ReactElement, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';

import { useAuthStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';
import { alertError } from '@helpers/utils';

import colors from '@styles/colors';
import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'Username'>;
};

const Username = ({ navigation }: Props): ReactElement => {
  const [username, onChange] = useState<string>('');
  const [, actions] = useAuthStore();  

  const onValidate = (): void => {
    if (!username.trim().length) alertError({});
    else {
      actions.editUserProfile({ key: 'username', value: username.trim() });
      Keyboard.dismiss();
      navigation.navigate('Age');
    }
  };

  // const onGoBack = () => {
  //   navigation.navigate('ProfileCreation');
  // };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          {/* <Previous /> */}
        </View>

        <SubTitle style={{marginTop:30}} text={i18n.t('signup.questions.username')} />
        <TextInput
          autoFocus
          value={username}
          onChangeText={onChange}
          textContentType="name"
          returnKeyType="done"
          style={styles.input}
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

export default Username;

const styles = StyleSheet.create({
  container: {
    paddingVertical: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: colors.greyLight,
    paddingHorizontal: layout.padding,
    paddingVertical: layout.padding / 2,
    borderRadius: layout.buttons.borderRadius,
    fontSize: fonts.subtitle.fontSize,
    fontFamily: fonts.subtitle.fontFamily,
    textAlign: 'center',
    marginTop: layout.padding,
    marginHorizontal: layout.padding,
    ...layout.shadow,
  },
});
