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


const onChange = (value: boolean): void => {
  setHasUserChosen(true);
  setSymptom(value);
};

const InputBox = (s: Symptome) => {
  const [symptom, setSymptom] = useState<boolean>(false);
  const [hasUserChosen, setHasUserChosen] = useState<boolean>(false);
  let symptomText = null;
  const [sliderValue, setSliderValue] = useState(0);

  const styles = StyleSheet.create({
    subtitle: {
      fontSize: 20,
      marginTop: 10,
    },
    valueText: {
      fontSize: 16,
      marginTop: 10,
    },
  });

  if (s.type === 'num') {
    symptomText = (
      <View>
        <Slider
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          minimumValue={0}
          maximumValue={10}
          step={1}
          thumbTintColor="blue"
          minimumTrackTintColor="red"
        />
        <Text style={styles.valueText}>  Intensité: {sliderValue}</Text>
      </View>
    );
  } else if (s.type === 'oui/non' || s.type === 'oui/non eval') {
    symptomText = (
      <View>
        <Text style={styles.subtitle}>
          <Button
            text={i18n.t('commons.yes')}
            onPress={() => onChange(true)}
            isSelected={hasUserChosen && symptom}
            stretch
          />
          <Button
            text={i18n.t('commons.no')}
            onPress={() => onChange(false)}
            isSelected={hasUserChosen && !symptom}
            stretch
          />
          <Button
            text={i18n.t('signup.validate')}
            onPress={onValidate}
            isValidate
          />
        </Text>
      </View>
    );
  } else {
    symptomText = <Text>Default Case</Text>;
  }

  return symptomText;
};



const InputSymptome = (): ReactElement => {
  const s: Symptome = {
    name: 'Toux',
    type: 'num',
    question: "Avez vous de la toux ?",
    valBool: false,
    valNum: -1,
  };  

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
      
      {/* display question */}
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          {'\n'}
          {s.question}
          {'\n'}
        </Text>
      </View>

        {/* display the input box  */}
      <View>
        <InputBox {...s} />
        
      </View>
      
    </Container>
  );
};

export default InputSymptome;


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
