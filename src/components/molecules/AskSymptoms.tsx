import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Slider
} from 'react-native';

import Container from '@components/molecules/Container';
import Button from '@components/atoms/Button';
import SliderFooter from '@components/atoms/SliderFooter';


import i18n from '@i18n/i18n';
import fonts from '@styles/fonts';
import layout from '@styles/layout';
import { Symptome } from '@store/types';

type InputSymptomeProps = {
  s: Symptome;
  onClose: () => void; // onClose function prop
};


const InputBox = ({ s, onClose }: InputSymptomeProps) => {
  const [symptom, setSymptom] = useState(false);
  const [hasUserChosen, setHasUserChosen] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  const onChange = (value: boolean) => {
    setHasUserChosen(true);
    setSymptom(value);
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(value);
  };

  const handleValidate = () => {
    onChange(true);
    console.log(sliderValue);
    onClose();
  };

  const handleYesNoSymptome = () => {
    console.log(`Symptom: ${s.name}`);
    console.log(`User selection: ${symptom ? 'Oui' : 'Non'}`);
    onClose();
  };

  let symptomText = null;
  // If the symptom is numeric, we display a slider
  if (s.type === 'Num.' || s.type === 'Oui/non éval') {
    let minimumValue = 0;
    let maximumValue = 10;
    let step = 1;

    if (s.name === 'Température') {
      step = 0.1;
    }

    if (typeof s.valMin !== 'undefined') {
      minimumValue = s.valMin;
    }

    if (typeof s.valMax !== 'undefined') {
      maximumValue = s.valMax;
    }

    symptomText = (
      <View>
        <SliderFooter symptome={s} />
        <Slider
          style={styles.slider}
          value={sliderValue}
          onValueChange={handleSliderChange}
          minimumValue={minimumValue}
          maximumValue={maximumValue}
          step={step}
          minimumTrackTintColor="red"
          thumbTintColor="red"
        />
        <Text style={styles.valueText}>Intensité: {sliderValue}</Text>
        <Text style={styles.subtitle}></Text>
        <Button
          text={i18n.t('commons.validate')}
          onPress={handleValidate}
          isSelected={true}
        />
      </View>
    );
  // if the symptom is yes / no, we display a oui/non box
  } else if (s.type == 'oui/non') {
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
        <Text style={styles.subtitle}></Text>
        <Button
          text="Validate"
          onPress={handleYesNoSymptome}
          isSelected={hasUserChosen}
        />
      </View>
    );
  } else {
    symptomText = <Text>Type de symptome inconnu</Text>;
  }

  return symptomText;
};



const InputSymptome = ({ s, onClose }: InputSymptomeProps): ReactElement => {


  return (
    <Container >
 
      {/* display question */}
      <View style={styles.popUpContainer}>
        <Text style={styles.subtitle}>
          {'\n'}{'\n'}
          {s.question? s.question : "Evaluez votre "+s.name}
          {'\n'}{'\n'}
        </Text>

        {/* display the input box  */}
        <InputBox s={s} onClose={onClose} />
        
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
    margin: 10,
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
  valueText: {
    fontSize: 16,
    marginTop: 10,

  },button: {
    marginBottom: 40,
  },slider: {
    height: 10,
  },
  popUpContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
  },
});
