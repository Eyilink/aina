import React, { ReactElement } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import SubTitle from '@components/atoms/SubTitle';

import { PainSymptoms } from '@store/types';

import colors from '@styles/colors';
import layout from '@styles/layout';
import i18n from '@i18n/i18n';

type Props = {
  onPressPainSymptom: (pain: keyof PainSymptoms, value: boolean) => void;
  painSymptoms: PainSymptoms;
};

const SliderPainSymptoms = ({
  painSymptoms,
  onPressPainSymptom,
}: Props): ReactElement => {
  return (
    <View style={styles.container}>
      {Object.keys(painSymptoms).map(
        (pain: keyof PainSymptoms, index: number) => {
          return (
            <View
              key={pain}
              style={[
                styles.painContainer,
                {
                  marginTop: index === 0 ? layout.padding : layout.padding / 4,
                },
              ]}
            >
              <SubTitle style={styles.pain} text={i18n.t(`report.${pain}`)} />
              <TouchableOpacity
                onPress={() => onPressPainSymptom(pain, !painSymptoms[pain])}
              >
                {painSymptoms[pain] ? (
                  <MaterialCommunityIcons
                    name="checkbox-marked"
                    size={36}
                    color={colors.primary}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="checkbox-blank"
                    size={36}
                    color={colors.greyLight}
                  />
                )}
              </TouchableOpacity>
            </View>
          );
        },
      )}
    </View>
  );
};

export default SliderPainSymptoms;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  painContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pain: {
    marginBottom: 0,
    width: 170,
  },
});
