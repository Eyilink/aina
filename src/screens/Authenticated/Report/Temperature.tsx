import React, { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';
import Slider from '@components/molecules/Slider';

import { AuthenticatedStackParamList } from '@navigation/types';
import { alertError } from '@helpers/utils';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';
import { DATE_TODAY } from '@constants/constants';

type Props = {
  navigation: StackNavigationProp<AuthenticatedStackParamList, 'Temperature'>;
};

const Temperature = ({ navigation }: Props): ReactElement => {
  const [choice, setChoice] = useState<boolean>(false);
  const [temperature, setTemperature] = useState<number | null>(null);
  const [isSliderVisible, setIsSliderVisible] = useState<boolean>(false);
  const [hasUserChosen, setHasUserChosen] = useState<boolean>(false);

  const onValidate = async (): Promise<void> => {
    if (!hasUserChosen) alertError({});
    else {
      navigation.navigate('Symptoms', {
        report: { fever: choice, temperature },
      });
    }
  };

  const onCancelSlider = (): void => {
    setIsSliderVisible(false);
    if (!temperature) setHasUserChosen(false);
  };

  const onConfirmTemperature = (temperature: number): void => {
    setIsSliderVisible(false);
    setTemperature(temperature);
  };

  const onPressYes = (): void => {
    setHasUserChosen(true);
    setChoice(true);
    setIsSliderVisible(true);
  };

  const onPressNo = (): void => {
    setHasUserChosen(true);
    setChoice(false);
    setTemperature(null);
  };

  return (
    <Container>
      <View style={styles.container}>
        <Previous />
        <Title isPrimary isDate isCenter text={DATE_TODAY} />
        <SubTitle isBold isCenter text={i18n.t('report.temperature')} />
        <SubTitle isCenter text={i18n.t('report.temperatureFeeling')} />
        <Button
          text={
            temperature
              ? `${i18n.t('commons.yes')} : ${temperature} ${i18n.t(
                  'commons.units.degrees',
                )}`
              : i18n.t('commons.yes')
          }
          onPress={onPressYes}
          isSelected={hasUserChosen ? choice : false}
          stretch
        />
        <Button
          text={i18n.t('commons.no')}
          onPress={onPressNo}
          isSelected={hasUserChosen ? !choice : false}
          stretch
        />
        <Button
          text={i18n.t('signup.validate')}
          onPress={onValidate}
          isValidate
        />
      </View>
      <Slider
        isVisible={isSliderVisible}
        onConfirm={onConfirmTemperature}
        onCancel={onCancelSlider}
        step={0.1}
        initialValue={37}
        min={37}
        max={40}
        type="temperature"
        title={i18n.t('report.temperatureFeeling')}
      />
    </Container>
  );
};

export default Temperature;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: layout.padding,
  },
});
