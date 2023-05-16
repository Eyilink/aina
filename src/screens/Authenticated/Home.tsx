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

type Symptome = {
  name: string;
  type: 'num' | 'oui/non' | 'oui/non eval';
  question: String,
  valBool: Boolean,
  valNum: Number,
}


const InputBox = (s: Symptome) => {
  const [symptom, setSymptom] = useState<boolean>(false);
  const [hasUserChosen, setHasUserChosen] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState(0);

  const onChange = (value: boolean): void => {
    setHasUserChosen(true);
    setSymptom(value);
  };

  const styles = StyleSheet.create({
    sub: {
      fontSize: 20,
      marginTop: 10,
    },
    valueText: {
      fontSize: 16,
      marginTop: 10,
    },
  });

  let symptomText = null;

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
        <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      </View>
    );
  } else if (s.type === 'oui/non' || s.type === 'oui/non eval') {
    symptomText = (
      <View>
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
        <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
      </View>
    );
  } else {
    symptomText = <Text>Type de symptome inconnu</Text>;
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


  return (
    <Container noMarginBottom>
      
      {/* display question */}
      <View style={styles.container}>
        <Text style={styles.subtitle}>
          {'\n'}{'\n'}{'\n'}{'\n'}
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
