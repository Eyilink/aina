import React, { ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import fonts from '@styles/fonts';
import colors from '@styles/colors';
import i18n from '@i18n/i18n';
import { PHONE_OS } from '@constants/constants';

const SliderFooter = ({ type }: { type: string }): ReactElement => (
  <>
    <View style={styles.lines}>
      <View style={styles.lineExtremity} />
      <View style={styles.line} />
      {type === 'temperature' && <View style={styles.line} />}
      <View style={styles.lineExtremity} />
    </View>

    {type === 'pain' ? (
      <View style={styles.units}>
        <Text style={styles.unit}>{i18n.t('report.nonexistent')}</Text>
        <Text style={styles.unit}>{i18n.t('report.max')}</Text>
      </View>
    ) : (
      <View style={styles.units}>
        <Text style={styles.unit}>{i18n.t('report.37')}</Text>
        <Text style={styles.unit}>{i18n.t('report.38')}</Text>
        <Text style={styles.unit}>{i18n.t('report.39')}</Text>
        <Text style={styles.unit}>{i18n.t('report.40')}</Text>
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
  },
  unit: {
    fontFamily: fonts.weight.regular.fontFamily,
  },
});
