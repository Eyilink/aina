import React, { ReactElement, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';
import Slider from '@components/molecules/Slider';

import { AuthenticatedStackParamList } from '@navigation/types';
import { alertError } from '@helpers/utils';

import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { DATE_TODAY, PAIN_SYMPTOMS } from '@constants/constants';

type Props = {
  navigation: StackNavigationProp<AuthenticatedStackParamList, 'Symptoms'>;
  route: RouteProp<AuthenticatedStackParamList, 'Symptoms'>;
};

const Symptoms = ({ navigation, route }: Props): ReactElement => {
  const [symptoms, setSymptoms] = useState({
    selectedSymptom: null,
    cough: {
      choice: false,
      intensity: null,
      isSliderVisible: false,
      hasUserChosen: false,
    },
    pain: {
      choice: false,
      painIntensity: null,
      isSliderVisible: false,
      hasUserChosen: false,
      painSymptoms: { ...PAIN_SYMPTOMS },
    },
    tiredness: {
      choice: false,
      tirednessIntensity: null,
      isSliderVisible: false,
      hasUserChosen: false,
    },
    sleep: {
      choice: false,
      sleepIntensity: null,
      isSliderVisible: false,
      hasUserChosen: false,
    },
  });

  const onValidate = async (): Promise<void> => {
    if (
      !symptoms.cough.hasUserChosen ||
      !symptoms.pain.hasUserChosen ||
      !symptoms.tiredness.hasUserChosen ||
      !symptoms.sleep.hasUserChosen
    ) {
      alertError({});
    } else {
      const { report } = route.params;
      navigation.navigate('OtherSymptoms', {
        report: {
          ...report,
          cough: symptoms.cough.choice,
          coughIntensity: symptoms.cough.intensity,
          sleep: symptoms.sleep.choice,
          sleepIntensity: symptoms.sleep.intensity,
          tiredness: symptoms.tiredness.choice,
          tirednessIntensity: symptoms.tiredness.intensity,
          pain: symptoms.pain.choice,
          painIntensity: symptoms.pain.intensity,
          painSymptoms: { ...symptoms.pain.painSymptoms },
        },
      });
    }
  };

  const onCancel = (): void => {
    if (!symptoms[symptoms.selectedSymptom].intensity) {
      setSymptoms({
        ...symptoms,
        selectedSymptom: null,
        [symptoms.selectedSymptom]: {
          choice: false,
          intensity: null,
          isSliderVisible: false,
          hasUserChosen: false,
          ...(symptoms.selectedSymptom === 'pain' && {
            painSymptoms: { ...PAIN_SYMPTOMS },
          }),
        },
      });
    }
  };

  const onConfirm = (intensity: number, painSymptoms?: object): void => {
    setSymptoms({
      ...symptoms,
      selectedSymptom: null,
      [symptoms.selectedSymptom]: {
        choice: true,
        intensity,
        isSliderVisible: false,
        hasUserChosen: true,
        ...(painSymptoms && {
          painSymptoms: { ...painSymptoms },
        }),
      },
    });
  };

  const onPressYes = (symptom: string): void => {
    setSymptoms({
      ...symptoms,
      selectedSymptom: symptom,
      [symptom]: {
        choice: true,
        intensity: null,
        isSliderVisible: true,
        hasUserChosen: true,
        ...(symptom === 'pain' && {
          painSymptoms: { ...PAIN_SYMPTOMS },
        }),
      },
    });
  };

  const onPressNo = (symptom: string): void => {
    setSymptoms({
      ...symptoms,
      selectedSymptom: null,
      [symptom]: {
        choice: false,
        intensity: null,
        isSliderVisible: false,
        hasUserChosen: true,
        ...(symptom === 'pain' && {
          painSymptoms: { ...PAIN_SYMPTOMS },
        }),
      },
    });
  };

  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        <Previous />
        <Title isPrimary isDate isCenter text={DATE_TODAY} />
        <SubTitle
          isBold
          isCenter
          text={i18n.t('report.symptoms')}
          style={styles.subtitle}
        />
        <SubTitle
          isBold
          isCenter
          text={i18n.t('report.unusual')}
          style={styles.subtitle2}
        />
        <ScrollView persistentScrollbar>
          {['cough', 'tiredness', 'pain', 'sleep'].map((symptom: string) => (
            <View key={symptom} style={styles.symptomContainer}>
              <SubTitle
                text={i18n.t(`report.${symptom}`)}
                style={styles.symptom}
              />
              <View style={styles.choiceContainer}>
                <Button
                  text={
                    symptoms[symptom].intensity
                      ? `${i18n.t('commons.yes')} : ${
                          symptoms[symptom].intensity
                        }`
                      : i18n.t('commons.yes')
                  }
                  onPress={(): void => onPressYes(symptom)}
                  isSelected={
                    symptoms[symptom].hasUserChosen
                      ? symptoms[symptom].choice
                      : false
                  }
                  style={styles.yesNoButton}
                />
                <Button
                  text={i18n.t('commons.no')}
                  onPress={(): void => onPressNo(symptom)}
                  isSelected={
                    symptoms[symptom].hasUserChosen
                      ? !symptoms[symptom].choice
                      : false
                  }
                  style={styles.yesNoButton}
                />
              </View>
            </View>
          ))}
          <Button
            text={i18n.t('signup.validate')}
            onPress={onValidate}
            isValidate
          />
        </ScrollView>
      </View>
      <Slider
        isVisible={!!symptoms.selectedSymptom}
        onConfirm={onConfirm}
        onCancel={onCancel}
        step={1}
        initialValue={1}
        min={1}
        max={10}
        type="pain"
        hasPainSymptoms={symptoms.selectedSymptom === 'pain'}
        title={i18n.t(`report.${symptoms.selectedSymptom}Suivi`)}
      />
    </Container>
  );
};

export default Symptoms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    marginBottom: layout.padding * 0.1,
    marginHorizontal: layout.padding,
  },
  subtitle2: {
    marginTop: layout.padding * 0.1,
    marginBottom: layout.padding * 1.5,
    marginHorizontal: layout.padding,
    fontSize: fonts.subtitle.fontSize*1.2,
  },
  symptomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: layout.padding,
  },
  symptom: {
    marginBottom: 0,
    marginHorizontal: 0,
    width: 130,
    fontSize: layout.window.width <= 400 ? 20 : fonts.subtitle.fontSize,
  },
  choiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yesNoButton: {
    paddingHorizontal: layout.padding / 2,
    marginHorizontal: 0,
    marginLeft: layout.padding / 2,
  },
});
