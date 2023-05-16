import React, { ReactElement, useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Notifications } from 'expo';
import HomeComponent from '@components/molecules/HomeComponent';
import { StackNavigationProp } from '@react-navigation/stack';
import { AntDesign, Feather } from '@expo/vector-icons';
import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';

import EmojiGreen from '@assets/images/green-emoji.png';
import EmojiOrange from '@assets/images/orange-emoji.png';
import EmojiRed from '@assets/images/red-emoji.png';

import { registerForPushNotificationsAsync } from '@helpers/notifications';
import { BottomTabParamList } from '@navigation/types';
import { useReportsStore } from '@store/store';

import i18n from '@i18n/i18n';
import fonts from '@styles/fonts';
import layout from '@styles/layout';
import { DATE_TODAY, MALADIE1 } from '@constants/constants';
import { getRecommandation } from '@helpers/utils';

type Props = {
  navigation: StackNavigationProp<BottomTabParamList, 'Home'>;
};

type Notification = {
  origin: 'selected' | 'received' | 'selected';
  data: object;
  remote: boolean;
};

const Home = ({ navigation }: Props): ReactElement => {
  const [image, setImage] = useState<ImageSourcePropType>({});
  const [textReco, setTextReco] = useState<string>('');
  const [reports] = useReportsStore({ disease: MALADIE1 });

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addListener(handleNotification);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (reports) {
      const recommandation = getRecommandation(reports);
      switch (recommandation) {
        case 'end1':
          setImage(EmojiGreen);
          setTextReco(i18n.t('home.end1'));
          break;
        case 'end2':
          setImage(EmojiOrange);
          setTextReco(i18n.t('home.end2'));
          break;
        case 'end2bis':
          setImage(EmojiOrange);
          setTextReco(i18n.t('home.end2bis'));
          break;
        case 'end3':
          setImage(EmojiRed);
          setTextReco(i18n.t('home.end3'));
          break;
      }
    }
  }, [reports]);

  const handleNotification = (notification: Notification): void => {
    const { origin } = notification;
    if (origin === 'selected') navigation.navigate('Evaluate');
  };

  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        {/* <Title
          isPrimary
          isDate
          isCenter
          text={DATE_TODAY}
          style={styles.title}
        />
        {!reports ? (
          <View>
            <SubTitle text={i18n.t('home.firstTime')} style={styles.subtitle} />
            <Button
              text={i18n.t('navigation.authenticated.evaluate')}
              onPress={(): void => navigation.navigate('Evaluate')}
              isValidate
              stretch
            />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.recommandationContainer}>
            <Image style={styles.image} source={image} />
            <SubTitle text={textReco} style={styles.subtitle} />
          </ScrollView>
        )} */}
        <HomeComponent isHealthy />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: layout.padding,
  },
  title: {
    paddingBottom: layout.padding / 2,
  },
  subtitle: {
    marginTop: layout.padding,
    textAlign: 'center',
    fontSize: fonts.subtitle.fontSize - 1,
  },
  recommandationContainer: {
    alignItems: 'center',
  },
  image: {
    marginTop: layout.padding / 2,
    width: 120,
    height: 120,
  },
});
