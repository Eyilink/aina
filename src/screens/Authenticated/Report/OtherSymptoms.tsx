import React, { ReactElement, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import AppText from '@components/atoms/AppText';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';

import { AuthenticatedStackParamList } from '@navigation/types';
import { alertError } from '@helpers/utils';

import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { DATE_TODAY } from '@constants/constants';

type Props = {
  navigation: StackNavigationProp<AuthenticatedStackParamList, 'OtherSymptoms'>;
  route: RouteProp<AuthenticatedStackParamList, 'OtherSymptoms'>;
};

const OtherSymptoms = ({ navigation, route }: Props): ReactElement => {
  const [symptoms, setSymptoms] = useState({
    selectedSymptom: null,
    breathlessness: { choice: false, hasUserChosen: false },
    digestive: { choice: false, hasUserChosen: false },
    agueusiaAnosmia: { choice: false, hasUserChosen: false },
    runnyNose: { choice: false, hasUserChosen: false },
    skinProblem: { choice: false, hasUserChosen: false },
  });

  const onValidate = async (): Promise<void> => {
    if (
      !symptoms.breathlessness.hasUserChosen ||
      !symptoms.digestive.hasUserChosen ||
      !symptoms.agueusiaAnosmia.hasUserChosen ||
      !symptoms.runnyNose.hasUserChosen ||
      !symptoms.skinProblem.hasUserChosen
    ) {
      alertError({});
    } else {
      const { report } = route.params;
      navigation.navigate('Notes', {
        report: {
          ...report,
          breathlessness: symptoms.breathlessness.choice,
          digestive: symptoms.digestive.choice,
          agueusiaAnosmia: symptoms.agueusiaAnosmia.choice,
          runnyNose: symptoms.runnyNose.choice,
          skinProblem: symptoms.skinProblem.choice,
        },
      });
    }
  };

  const onPressYes = (symptom: string): void => {
    setSymptoms({
      ...symptoms,
      selectedSymptom: symptom,
      [symptom]: { choice: true, hasUserChosen: true },
    });
  };

  const onPressNo = (symptom: string): void => {
    setSymptoms({
      ...symptoms,
      selectedSymptom: null,
      [symptom]: { choice: false, hasUserChosen: true },
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
          text={i18n.t('report.otherSymptoms')}
          style={styles.subtitle}
        />
        <ScrollView persistentScrollbar>
          {[
            'breathlessness',
            'digestive',
            'agueusiaAnosmia',
            'runnyNose',
            'skinProblem',
          ].map((symptom: string) => (
            <View key={symptom} style={styles.symptomContainer}>
              <AppText
                text={i18n.t(`report.${symptom}`)}
                style={styles.symptom}
              />
              <View style={styles.choiceContainer}>
                <Button
                  text={i18n.t('commons.yes')}
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
    </Container>
  );
};

export default OtherSymptoms;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subtitle: {
    marginBottom: layout.padding * 1.5,
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
