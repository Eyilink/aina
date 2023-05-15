import React, { ReactElement, useEffect, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Slider
} from 'react-native';
import { Notifications } from 'expo';
import { StackNavigationProp } from '@react-navigation/stack';

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
import Symptoms from './Report/Symptoms';

type Props = {
  navigation: StackNavigationProp<BottomTabParamList, 'Home'>;
};

type Notification = {
  origin: 'selected' | 'received' | 'selected';
  data: object;
  remote: boolean;
};

type Symptome = {
  name: string;
  type: 'num' | 'oui/non' | 'oui/non eval';
  question: String,
  valBool: Boolean,
  valNum: Number,
}

const symptome: Symptome = {
  name: 'Toux',
  type: 'num',
  question: "Avez vous de la ",
  valBool: false,
  valNum: -1,
};

const onChange = (value: boolean): void => {
  setHasUserChosen(true);
  setPregnant(value);
};

const Cat = (s: Symptome) => {
  let symptomText = null;

  const [sliderValue, setSliderValue] = useState(0);

  const styles = StyleSheet.create({
    subtitle: {
      fontSize: 20, // Customize the font size
      marginTop: 10, // Customize the top margin
    },
    valueText: {
      fontSize: 16,
      marginTop: 10,
    },
  });

  if (s.type === 'num') {
    symptomText = (
      <View>
        <Text style={styles.subtitle}>
          {'\n'}
          {s.question}
          {s.name} ?
          {'\n'}
        </Text>
        <Slider
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumValue={0}
          maximumValue={10}
          step={1}
          thumbTintColor="blue" // Customize the color of the slider thumb
          minimumTrackTintColor="red" // Customize the color of the slider track before the thumb
        />
        <Text style={styles.valueText}>  Intensité: {sliderValue}</Text>
      </View>
    );
  } else if(s.type === 'oui/non' || s.type === 'oui/non eval') {
    symptomText = (
      <Text style={styles.subtitle}>
        {'\n'}
        {s.question}
        {s.name} ?
        {'n'}
        <Button
          text={i18n.t('commons.yes')}
          onPress={(): void => onChange(true)}
          isSelected={hasUserChosen ? pregnant : false}
          stretch
        />
        <Button
          text={i18n.t('commons.no')}
          onPress={(): void => onChange(false)}
          isSelected={hasUserChosen ? !pregnant : false}
          stretch
        />
        <Button
          text={i18n.t('signup.validate')}
          onPress={onValidate}
          isValidate
        />
      </Text>
    );}
   else {
    symptomText = <Text>Default Case</Text>;
  }

  return symptomText;
};


const Home = ({ navigation }: Props): ReactElement => {
  // const [image, setImage] = useState<ImageSourcePropType>({});
  // const [textReco, setTextReco] = useState<string>('');
  // const [reports] = useReportsStore({ disease: MALADIE1 });

  // useEffect(() => {
  //   registerForPushNotificationsAsync();
  //   Notifications.addListener(handleNotification);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (reports) {
  //     const recommandation = getRecommandation(reports);
  //     switch (recommandation) {
  //       case 'end1':
  //         setImage(EmojiGreen);
  //         setTextReco(i18n.t('home.end1'));
  //         break;
  //       case 'end2':
  //         setImage(EmojiOrange);
  //         setTextReco(i18n.t('home.end2'));
  //         break;
  //       case 'end2bis':
  //         setImage(EmojiOrange);
  //         setTextReco(i18n.t('home.end2bis'));
  //         break;
  //       case 'end3':
  //         setImage(EmojiRed);
  //         setTextReco(i18n.t('home.end3'));
  //         break;
  //     }
  //   }
  // }, [reports]);

  // const handleNotification = (notification: Notification): void => {
  //   const { origin } = notification;
  //   if (origin === 'selected') navigation.navigate('Evaluate');
  // };

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
        <Cat {...symptome} />
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
