import React, { ReactElement, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Slider,
  ViewStyle
} from 'react-native';

import Container from '@components/molecules/Container';
import Button from '@components/atoms/Button';

import { useAuthStore, useUserStore } from '@store/store';
import i18n from '@i18n/i18n';
import fonts from '@styles/fonts';
import layout from '@styles/layout';
import { Symptome } from '@store/types';
import { MALADIE1 } from '@constants/constants';
import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';
import moment from 'moment';
import ProfileAskPersonal from './ProfileAskPersonnal';

type InputSymptomeProps = {
  s: Symptome;
  onClose: () => void; // onClose function prop
  onArrow?: () => void;
  donotdispVButtons?: boolean;
  recupSliderValue?: (value: number) => void; // Declare recupSliderValue as a function that takes a number argument and returns void
  recupYesNo?: (value: boolean) => void;
  ouinonSameLine?: boolean;
  recupText?: (value: string) => void;
  recupSymp?: (value: Symptome) => void;
  isDataComp?: boolean;
  style?: ViewStyle;
  noText?: boolean;
  evaluateur?: string;
};



export const InputBox = ({ s, onClose, noText, donotdispVButtons, recupSliderValue, recupYesNo, ouinonSameLine, recupText, recupSymp, isDataComp, evaluateur }: InputSymptomeProps) => {
  const [symptom, setSymptom] = useState(false);
  const [txt, setTxt] = useState<string>('');
  const [hasUserChosen, setHasUserChosen] = useState(false);
  const initialSliderValue = s.name === "Température" ? 36 : 0;
  const [sliderValue, setSliderValue] = useState(initialSliderValue);
  const [user, actions] = useUserStore({ disease: MALADIE1 });
  useEffect(() => {
    if (recupSymp)
      recupSymp(s)
    if (recupYesNo)
      recupYesNo(symptom)

  }, [symptom])
  useEffect(() => {
    if (recupSymp)
      recupSymp(s)
    if (recupSliderValue)
      recupSliderValue(sliderValue)

  }, [sliderValue])
  useEffect(() => {
    if (recupSymp)
      recupSymp(s)
    if (recupText)
      recupText(txt);

  }, [txt])

  const addValueUser = (sympt: Symptome, val: number | string) => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    // Iterate over each pathology in my_personal_datas
    user.my_personal_datas.forEach((pathology) => {
      // Find the symptoms with the same id as the provided sympt
      const symptomsToUpdate = pathology.symptoms.filter((symptom) => symptom.id === sympt.id);

      // Update the data field of each matching symptom

      if (symptomsToUpdate[0]) {

        const newData = { date: formattedDate, valeur: val, evaluateur: evaluateur };

        if (!symptomsToUpdate[0].data) {
          // If data field doesn't exist, create a new array with the new data
          symptomsToUpdate[0].data = [newData];
        } else {
          // If data field already exists, concatenate the new data to the existing array
          symptomsToUpdate[0].data = symptomsToUpdate[0].data.concat(newData);
        }
      }

      console.log(pathology.symptoms);  
    });
  };

  const fixedVal = (value: number): number => {
    return Number(value.toFixed(1));
  };

  const onChange = (value: boolean) => {
    setHasUserChosen(true);
    setSymptom(value);
  };

  const handleSliderChange = (value: number) => {
    setSliderValue(fixedVal(value));
  };

  const handleValidate = () => {
    onChange(true);
    console.log(sliderValue);
    addValueUser(s, fixedVal(sliderValue));
    actions.saveUserProfile();
    onClose();
  };
  const handleValidateT = () => {
    onChange(true);
    console.log(sliderValue);
    addValueUser(s, txt);
    actions.saveUserProfile();
    onClose();
  };

  const handleYesNoSymptome = () => {
    console.log(`Symptom: ${s.name}`);
    console.log(`User selection: ${symptom ? 'Oui' : 'Non'}`);
    addValueUser(s, Number(`${symptom ? 10 : 0}`));
    actions.saveUserProfile();
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
      minimumValue = 36;
      maximumValue = 42;
    }

    if (typeof s.valMin !== 'undefined') {
      if (typeof s.valMin === 'string')
        minimumValue = parseFloat(s.valMin);
      else
        minimumValue = s.valMin;
    }

    if (typeof s.valMax !== 'undefined') {
      if (typeof s.valMax === 'string')
        maximumValue = parseFloat(s.valMax);
      else
        maximumValue = (s.valMax);
    }

    symptomText = (
      <View>

        <View style={styles.lines}>
          <View style={styles.lineExtremity} />
          <View style={styles.line} />
          {s.name === 'Température' && <View style={styles.line} />}
          <View style={styles.lineExtremity} />
        </View>

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

        {s.name === 'Température' ? (
          <View style={styles.units}>
            <Text style={styles.unit}>{i18n.t('report.36')}</Text>
            <Text style={styles.unit}>{i18n.t('report.38')}</Text>
            <Text style={styles.unit}>{i18n.t('report.40')}</Text>
            <Text style={styles.unit}>{i18n.t('report.42')}</Text>
          </View>
        ) : (

          <View style={styles.units}>
            <Text style={styles.unit}>{i18n.t('report.nonexistent')}</Text>
            <Text style={styles.unit}>{i18n.t('report.max')}</Text>
          </View>
        )}

        <Text style={styles.valueText}>Intensité: {sliderValue}</Text>
        <Text style={styles.subtitle}></Text>
        {donotdispVButtons ? null : <Button
          text={i18n.t('commons.validate')}
          onPress={handleValidate}
          isSelected={true}
        />}
      </View>
    );
    // if the symptom is yes / no, we display a oui/non box
  } else if (s.type === 'Oui/non' || s.type === 'oui/non') {
    symptomText = (
      <View>
        {isDataComp ?
          <>
            <Button
              text={i18n.t('commons.yes')}
              onPress={() => onChange(true)}
              isSelected={hasUserChosen && symptom}

            />
            <Button
              text={i18n.t('commons.no')}
              onPress={() => onChange(false)}
              isSelected={hasUserChosen && !symptom}

            />
          </> :
          <View style={ouinonSameLine ? { flexDirection: 'row', justifyContent: 'space-evenly' } : { flexDirection: 'column' }}>
            <Button
              text={i18n.t('commons.yes')}
              onPress={() => onChange(true)}
              isSelected={hasUserChosen && symptom}
              style={noText ? { width: '20%', height: '20%' } : {}}
              noText
            />
            <Button
              text={i18n.t('commons.no')}
              onPress={() => onChange(false)}
              isSelected={hasUserChosen && !symptom}
              style={noText ? { width: '20%', height: '20%' } : {}}
              noText
            />
          </View>
        }
        {/* <Text style={styles.subtitle}></Text> */}

        {donotdispVButtons ? null : <Button
          text="Validate"
          onPress={handleYesNoSymptome}
          isSelected={hasUserChosen}
        />}
      </View>
    );
  } else {
    symptomText = (
      <View style={{ flex: 1 }}>
        <ProfileAskPersonal onTextChange={(text: string) => { setTxt(text) }} nameText={noText ? '' : s.name} inputPlaceholder={s.unit} displayPersonal={false} initValue={user.my_personal_datas.find(p => p.id == "21")?.symptoms.find(t => t.id == s.id)?.data?.slice(-1)[0].valeur} />
        {donotdispVButtons ? null : <Button
          text="Validate"
          onPress={handleValidateT}
          isSelected
        />}
      </View>)
  }

  return symptomText;
};



const InputSymptome = ({ s, onClose, onArrow, style }: InputSymptomeProps): ReactElement => {


  return (
    <Container>

      {/* display question */}
      <View style={[styles.popUpContainer, style]}>
        <Ionicons
          name="ios-arrow-round-back"
          size={48}
          color={colors.black}
          onPress={onArrow ? onArrow : onClose}
          style={{ marginLeft: 12 }}
        />
        <Text style={styles.subtitle}>
          {'\n'}{'\n'}
          {s.question ? s.question : "Evaluez votre " + s.name}
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

  },
  button: {
    marginBottom: 40,
  },
  slider: {
    transform: [{ scaleX: 1 }, { scaleY: 3 }]

    // marginTop: -12

  },
  popUpContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,

    justifyContent: 'center',

  },
  lines: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    zIndex: 1,
  },
  lineExtremity: {
    borderLeftWidth: 1,
    height: 30,
    borderLeftColor: colors.black,
    marginHorizontal: 12,
    marginBottom: -10
    // marginTop: PHONE_OS === 'ios' ? -35 : -25,
    // marginHorizontal: PHONE_OS === 'ios' ? 0 : 15,
  },
  line: {
    borderLeftWidth: 1,
    borderLeftColor: colors.black,
    height: 20,
    // marginBottom: -10,
    // marginTop: PHONE_OS === 'ios' ? -30 : -20,
  },
  units: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  unit: {
    fontFamily: fonts.weight.regular.fontFamily,
  },
});
