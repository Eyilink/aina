import React, { ReactElement, useRef, useState } from 'react';
import Modal from 'react-native-modal';
import { Slider, StyleSheet, View } from 'react-native';

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
};

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
}: Props): ReactElement => {
  const sliderRef = useRef<Slider | null>(null);
  const [value, setValue] = useState<number>(initialValue);
  const [updatedPainSymptoms, setPainSymptoms] = useState<PainSymptoms>(
    PAIN_SYMPTOMS,
  );

  const roundValue = (value: number): number => {
    if (!step) return value;

    const dividend = 1 / step;
    return Math.round(value / step) / dividend;
  };

  const onValueChangeRound = (value: number): void => {
    setValue && setValue(roundValue(value));
  };

  const onConfirmSlider = (): void => {
    const roundedValue = roundValue(value);
    if (PHONE_OS === 'ios' && step && sliderRef.current) {
      sliderRef.current.setNativeProps({ value: roundedValue });
    }
    onConfirm && onConfirm(roundedValue, updatedPainSymptoms);
  };

  const onChangePainSymptom = (pain: keyof PainSymptoms, value: boolean) => {
    setPainSymptoms((prevState: PainSymptoms) => {
      prevState[pain] = value;
      return { ...prevState };
    });
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onCancel}>
      <View style={styles.container}>
        <SubTitle isCenter text={title} style={styles.title} />
        <Slider
          minimumValue={min}
          maximumValue={max}
          minimumTrackTintColor={colors.primary}
          step={PHONE_OS === 'ios' ? 0 : step}
          value={value}
          style={styles.slider}
          thumbTintColor={colors.primary}
          onValueChange={onValueChangeRound}
        />
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
    width: '100%',
    zIndex: 2,
    marginTop: layout.padding / 2,
  },
  title: {
    marginHorizontal: 0,
  },
});
