import React, { ReactElement, useRef, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import SliderFooter from '@components/atoms/SliderFooter';
import SliderPainSymptoms from '@components/molecules/SliderPainSymptoms';

import { PainSymptoms } from '@store/types';

import colors from '@styles/colors';
import layout from '@styles/layout';
import i18n from '@i18n/i18n';
import { PAIN_SYMPTOMS, PHONE_OS } from '@constants/constants';

type Props = {
  isVisible: boolean;
  onConfirm: (value: number, updatedPainSymptoms?: object) => void;
  onCancel: () => void;
  step: number;
  initialValue: number;
  min: number;
  max: number;
  type: 'pain' | 'temperature';
  title: string;
  hasPainSymptoms: boolean;
  roundvalue: number;
};

const { width: screenWidth } = Dimensions.get('window');

const CustomSlider = ({
  isVisible,
  onCancel,
  onConfirm,
  step,
  initialValue,
  type,
  min,
  max,
  title,
  hasPainSymptoms,
  roundvalue
}: Props): ReactElement => {
  const sliderRef = useRef<View | null>(null);
  const [value, setValue] = useState<number>(initialValue);
  const [updatedPainSymptoms, setPainSymptoms] = useState<PainSymptoms>(
    PAIN_SYMPTOMS,
  );

  const roundValue = (value: number): number => {
    roundvalue = value;
    value=Math.floor(value);
    if (!step) return value;
    console.log(value);
    
    const dividend = 1 / step;
    return Math.round(value / step) / dividend;
  };

  const onValueChangeRound = (value: number): void => {
    setValue(roundValue(value));
  };

  const onConfirmSlider = (): void => {
    const roundedValue = roundValue(value);
    onConfirm(roundedValue, updatedPainSymptoms);
  };

  const onChangePainSymptom = (pain: keyof PainSymptoms, value: boolean) => {
    setPainSymptoms((prevState: PainSymptoms) => {
      prevState[pain] = value;
      return { ...prevState };
    });
  };

  const handleSliderPress = (event: any) => {
    const { locationX } = event.nativeEvent;
    const width = screenWidth - 40; // Adjust the padding/margin as needed
    const newValue = (locationX / width) * (max - min) + min;
    setValue(newValue);
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.container}>
        <SubTitle isCenter text={title} style={styles.title} />
        <TouchableOpacity
          style={styles.slider}
          onPress={handleSliderPress}
          ref={sliderRef}
        >
          <View style={styles.sliderTrack} />
          <View
            style={[
              styles.sliderValue,
              { width: `${((value - min) / (max - min)) * 100}%` },
            ]}
          />
        </TouchableOpacity>
        <SliderFooter type={type} />
        {hasPainSymptoms && (
          <SliderPainSymptoms
            painSymptoms={updatedPainSymptoms}
            onPressPainSymptom={onChangePainSymptom}
          />
        )}
        <Button
          text={i18n.t('signup.validate')}
          onPress={onConfirmSlider}
          isValidate
        />
      </View>
    </Modal>
  );
};

export default CustomSlider;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: layout.padding,
    paddingTop: layout.padding * 2,
    borderRadius: layout.buttons.borderRadius,
  },
  slider: {
    width: screenWidth - 40, // Adjust the padding/margin as needed
    zIndex: 2,
    marginTop: layout.padding / 2,
  },
  sliderTrack: {
    width: '85%',
    height: 5,
    borderRadius: 3,
    backgroundColor: 'gray',
    marginLeft: '7%' // Customize the track color as needed
  },
  sliderValue: {
    position: 'absolute',
    marginLeft: '7%',
    top: -2,
    left: 0,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.primary, // Customize the selected value color as needed
  },
  title: {
    marginHorizontal: 0,
  },
});
