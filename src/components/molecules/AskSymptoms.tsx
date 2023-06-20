import React, { ReactElement, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Slider
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

type InputSymptomeProps = {
  s: Symptome;
  onClose: () => void; // onClose function prop
};



const InputBox = ({ s, onClose }: InputSymptomeProps) => {
  const [symptom, setSymptom] = useState(false);
  const [hasUserChosen, setHasUserChosen] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [user, actions] = useUserStore({ disease: MALADIE1 });

  const addValueUser = (sympt: Symptome, val: number) => {
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
      
      const newData = { date: formattedDate, valeur: val };

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
  
    // Call the appropriate action to save the modified user profile
    // actions.editUserProfile({ key: 'my_personal_datas', value: user.my_personal_datas });
  };
  

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
    addValueUser(s, sliderValue);
    actions.signupUser();
    onClose();
  };

  const handleYesNoSymptome = () => {
    console.log(`Symptom: ${s.name}`);
    console.log(`User selection: ${symptom ? 'Oui' : 'Non'}`);
    addValueUser(s, Number(`${symptom ? 10 : 0}`));
    actions.signupUser();
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
      minimumValue = s.valMin;
    }

    if (typeof s.valMax !== 'undefined') {
      maximumValue = s.valMax;
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
        <Button
          text={i18n.t('commons.validate')}
          onPress={handleValidate}
          isSelected={true}
        />
      </View>
    );
  // if the symptom is yes / no, we display a oui/non box
  } else if (s.type === 'Oui/non' || s.type === 'oui/non') {
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
      <Ionicons
        name="ios-arrow-round-back"
        size={layout.navigation.previousIcon.size}
        color={colors.black}
        onPress={onClose}
        style={{marginLeft:12}}
      />
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

  },
  button: {
    marginBottom: 40,
  },
  slider: {
    height: 10,
    // marginTop: -12
  },
  popUpContainer: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10,
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
