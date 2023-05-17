import React, { ReactElement } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { format, fromUnixTime } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import AppText from '@components/atoms/AppText';
import Button from '@components/atoms/Button';

import { useUserStore } from '@store/store';

import colors from '@styles/colors';
import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { CGU_URL, MALADIE1 } from '@constants/constants';

const Profile = (): ReactElement => {
  const [user, actions] = useUserStore({ disease: MALADIE1 });

  const onEditProfile = (): void => {
    Alert.alert(
      i18n.t('commons.attention'),
      i18n.t('profile.erase'),
      [
        { text: i18n.t('commons.errors.cancel'), style: 'cancel' },
        {
          text: i18n.t('commons.errors.ok'),
          onPress: (): Promise<void> => actions.resetUserSession(),
        },
      ],
      { cancelable: false },
    );
  };

  const onPressCGU = async (): Promise<void> => {
    await WebBrowser.openBrowserAsync(CGU_URL);
  };

  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        <Title isPrimary text={i18n.t('navigation.authenticated.profile')} isCenter/>
        <ScrollView persistentScrollbar>
          <View style={styles.titleContainer}>
            <SubTitle text={user.username} style={styles.username} />
            <SubTitle text={user.postalCode.toString()} style={styles.info} />
          </View>
          <View style={styles.infosContainer}>
            <SubTitle
              text={`${user.age.toString()} ${i18n.t('commons.units.years')}`}
              style={styles.info}
            />
            {/* <View style={styles.separator} /> */}
            <SubTitle
              text={`${(user.size / 100).toString().split('.')[0]}${i18n.t(
                'commons.linkingWords.m',
              )} ${(user.size / 100).toPrecision(3).toString().split('.')[1]}`}
              style={styles.info}
            />
            {/* <View style={styles.separator} /> */}
            <SubTitle
              text={`${user.weight.toString()} ${i18n.t('commons.units.kg')}`}
              style={styles.info}
            />
          </View>
          {/* {user.pregnant && (
            <SubTitle
              text={i18n.t('profile.pregnant')}
              style={styles.pregnant}
            />
          )}
          <SubTitle text={i18n.t('profile.diseases')} style={styles.diseases} />
          {!Object.keys(user.diseases).filter(
            (disease: string) => user.diseases[disease],
          ).length && (
            <AppText text={i18n.t('commons.none')} style={styles.reminder} />
          )}
          {Object.keys(user.diseases).map(
            (disease: string) =>
              user.diseases[disease] && (
                <SubTitle
                  key={`Profile-${i18n.t(`diseases.${disease}`)}`}
                  text={i18n.t(`diseases.${disease}`)}
                  style={styles.disease}
                />
              ),
          )}
          <SubTitle text={i18n.t('profile.reminder')} style={styles.diseases} />
          <AppText
            text={
              user.reminder?.isActive
                ? format(fromUnixTime(user.reminder.date!), "kk'h'mm")
                : i18n.t('commons.none')
            }
            style={styles.reminder}
          /> */}
          <Button
            text={i18n.t('profile.edit')}
            onPress={onEditProfile}
            isValidate
            style={styles.editButton}
          />
          <TouchableOpacity onPress={onPressCGU}>
            <AppText text={i18n.t('profile.cgu')} style={styles.cgu} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  title:{
   
  },
  container: {
    paddingTop: layout.padding,
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  username: {
    fontFamily: fonts.weight.bold.fontFamily,
    fontSize: fonts.sections.fontSize,
    marginRight: layout.padding,
    textAlign: 'center'
  },
  infosContainer: {
    flexDirection: 'column',
    
    marginHorizontal: layout.padding,
  },
  info: {
    marginBottom: 0,
    paddingVertical: 10,
    marginHorizontal: 0,
    textAlign: 'center'
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: colors.black,
    height: '100%',
  },
  pregnant: {
    fontFamily: fonts.weight.bold.fontFamily,
    marginTop: layout.padding,
    marginBottom: 0,
  },
  diseases: {
    fontFamily: fonts.weight.bold.fontFamily,
    marginTop: layout.padding,
    marginBottom: layout.padding / 2,
  },
  disease: {
    marginBottom: layout.padding / 2,
  },
  reminder: {
    marginHorizontal: layout.padding,
  },
  editButton: {
    marginBottom: layout.padding,
  },
  cgu: {
    textAlign: 'center',
    fontSize: fonts.label.fontSize,
    marginBottom: layout.padding,
    textDecorationLine: 'underline',
    color: colors.greyDark,
  },
});
