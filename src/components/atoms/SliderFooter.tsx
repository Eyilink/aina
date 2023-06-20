import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import fonts from '@styles/fonts';
import colors from '@styles/colors';
import i18n from '@i18n/i18n';
import { PHONE_OS } from '@constants/constants';
import { Symptome } from '@store/types';

// SliderFooter function renders a footer component with lines and units based on the provided symptome prop.
// If the symptom name is 'Température', it renders an additional line and displays specific unit texts.
// Otherwise, it displays different unit texts.
// This component is typically used to provide visual indicators and units in a slider or a similar UI element.


const SliderFooter = ({ symptome }: { symptome: Symptome }): ReactElement => (
  <>
    <View style={styles.lines}>
      <View style={styles.lineExtremity} />
      <View style={styles.line} />
      {symptome.name === 'Température' && <View style={styles.line} />}
      <View style={styles.lineExtremity} />
    </View>

    {symptome.name === 'Température' ? (
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
  </>
);

export default SliderFooter;

const styles = StyleSheet.create({
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
    // marginTop: PHONE_OS === 'ios' ? -35 : -25,
    // marginHorizontal: PHONE_OS === 'ios' ? 0 : 15,
  },
  line: {
    borderLeftWidth: 1,
    borderLeftColor: colors.black,
    height: 20,
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
