import React, { ReactElement, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';

import { AuthenticatedStackParamList } from '@navigation/types';
import { useAuthStore } from '@store/store';

import layout from '@styles/layout';
import colors from '@styles/colors';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { DATE_TODAY } from '@constants/constants';

type Props = {
  navigation: StackNavigationProp<AuthenticatedStackParamList, 'Notes'>;
  route: RouteProp<AuthenticatedStackParamList, 'Notes'>;
};

const Notes = ({ navigation, route }: Props): ReactElement => {
  const [notes, setNotes] = useState<string>('');
  const [peopleMet, setPeopleMet] = useState<string>('');
  const [, actions] = useAuthStore();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onValidate = async (): Promise<void> => {
    const { report } = route.params;
    setIsLoading(true);
    await actions.addNewReport({
      report: {
        ...report,
        notes: notes.trim(),
        peopleMet: peopleMet.trim(),
      },
    });
    // simulate loading
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('BottomTabNavigator', { screen: 'Home' });
    }, 500);
  };

  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        <Previous />
        <Title isPrimary isDate isCenter text={DATE_TODAY} />

        <KeyboardAwareScrollView
          persistentScrollbar
          enableOnAndroid
          extraScrollHeight={100}
        >
          <SubTitle isCenter text={i18n.t('report.notes')} />
          <TextInput
            value={notes}
            onChangeText={setNotes}
            style={styles.input}
            multiline
            numberOfLines={4}
            enablesReturnKeyAutomatically
            textAlignVertical="top"
            scrollEnabled={false}
          />
          <SubTitle isCenter text={i18n.t('report.peopleMet')} />
          <TextInput
            value={peopleMet}
            onChangeText={setPeopleMet}
            style={styles.input}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            scrollEnabled={false}
          />
          <Button
            text={i18n.t('signup.validate')}
            onPress={onValidate}
            isLoading={isLoading}
            disabled={isLoading}
          />
        </KeyboardAwareScrollView>
      </View>
    </Container>
  );
};

export default Notes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    backgroundColor: colors.greyLight,
    paddingHorizontal: layout.padding,
    paddingTop: layout.padding / 2,
    paddingBottom: layout.padding / 2,
    borderRadius: layout.buttons.borderRadius,
    fontSize: fonts.input.fontSize,
    fontFamily: fonts.input.fontFamily,
    marginBottom: layout.padding * 2,
    marginHorizontal: layout.padding,
    ...layout.shadow,
  },
});
