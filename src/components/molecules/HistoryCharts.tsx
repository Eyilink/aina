import React, { ReactElement, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import * as shape from 'd3-shape';
import * as scale from 'd3-scale';
import { LineChart, YAxis } from 'react-native-svg-charts';
import { Circle, G, Line } from 'react-native-svg';
import { format, fromUnixTime } from 'date-fns';
import fr from 'date-fns/locale/fr';

import { Report } from '@store/types';
import {
  fillGapsInReports,
  getNumberOfSymptomsFromReport,
} from '@helpers/utils';

import i18n from '@i18n/i18n';
import colors from '@styles/colors';
import fonts from '@styles/fonts';
import layout from '@styles/layout';
import { SYMPTOMS } from '@constants/constants';

const GRAPH_HEIGHT = 200;
const COLUMN_WIDTH = 45;
const COLUMN_HEIGHT = 30;
const LEFT_LABELS_CONTAINER_WIDTH = 80;

type DecoratorProps = {
  x: (index: number) => 'string | number | undefined';
  y: (temperature: number) => 'string | number | undefined';
  data: Report[];
};

type CustomGridProps = {
  x: (index: number) => 'string | number | undefined';
  data: Report[];
};

type Props = {
  isFocused: boolean;
  reports: Report[];
};

const HistoryCharts = ({ reports, isFocused }: Props): ReactElement => {
  const refScrollView = useRef<ScrollView>(null);

  useEffect(() => {
    if (refScrollView?.current && isFocused)
      refScrollView.current.scrollToEnd({ animated: true });
  });

  const reportsWithFilledGaps = fillGapsInReports(reports);

  const contentInset = {
    top: 20,
    bottom: 20,
    left:
      (reportsWithFilledGaps.length * COLUMN_WIDTH) /
      reportsWithFilledGaps.length,
  };

  const Decorator = ({ x, y, data }: DecoratorProps) => {
    return data.map((report: Report, index: number) => {
      if (!report.temperature) return null;
      return (
        <Circle
          key={index}
          cx={x(index - 0.5)}
          cy={y(report.temperature)}
          r={6}
          fill={colors.primary}
        />
      );
    });
  };

  const CustomGrid = ({ x, data }: CustomGridProps) => {
    return (
      <G>
        {
          // Vertical grid
          data.map((_, index) => {
            return (
              <Line
                key={index}
                y1={'0%'}
                y2={'100%'}
                x1={x(index)}
                x2={x(index)}
                stroke={colors.greyLight}
              />
            );
          })
        }
      </G>
    );
  };

  return (
    <View style={styles.chart}>
      <View style={styles.labelsContainer}>
        <YAxis
          data={reportsWithFilledGaps}
          contentInset={contentInset}
          svg={{ fill: colors.black, fontSize: fonts.label.fontSize }}
          numberOfTicks={4}
          min={37}
          max={40}
          formatLabel={(temperature: number) =>
            `${temperature}${i18n.t('commons.units.degrees')}`
          }
          style={styles.temperatureLabelsContainer}
        />
        <View style={styles.symptomSidebarContainer}>
          <View key={'date-label'} style={styles.symptomLabelContainer} />
          {SYMPTOMS.map((symptom) => (
            <View key={`${symptom}-label`} style={styles.symptomLabelContainer}>
              <Text style={styles.symptomLabel}>
                {symptom === 'fever'
                  ? i18n.t('report.temperature')
                  : i18n.t(`report.${symptom}`)}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <ScrollView
        ref={refScrollView}
        horizontal={true}
        persistentScrollbar
        scrollEventThrottle={200}
        decelerationRate="fast"
        contentContainerStyle={[
          styles.scrollViewContainer,
          { width: reportsWithFilledGaps.length * COLUMN_WIDTH },
        ]}
      >
        <View style={styles.lineChartContainer}>
          <LineChart
            style={[
              styles.lineChart,
              { width: reportsWithFilledGaps.length * COLUMN_WIDTH },
            ]}
            data={reportsWithFilledGaps}
            svg={{ stroke: colors.grey, strokeWidth: 2, x: -COLUMN_WIDTH / 2 }}
            contentInset={contentInset}
            curve={shape.curveNatural}
            animate
            yMin={37}
            yMax={40}
            yAccessor={({ item }) => item.temperature || 37}
            xAccessor={({ index }) => index}
            xScale={scale.scaleTime}
          >
            <CustomGrid belowChart={true} />
            <Decorator />
          </LineChart>
        </View>
        <View style={styles.symptomsRow}>
          {reportsWithFilledGaps.map((report: Report) => {
            return (
              <View
                key={`date-${report.date}`}
                style={[
                  styles.badgeContainer,
                  {
                    backgroundColor: !report.isFilled
                      ? colors.grey
                      : getNumberOfSymptomsFromReport(report) === 0
                      ? colors.green
                      : colors.primary,
                  },
                ]}
              >
                {
                  <Text style={styles.date}>
                    {format(fromUnixTime(report.date), 'dd/MM', { locale: fr })}
                  </Text>
                }
              </View>
            );
          })}
        </View>
        {SYMPTOMS.map((symptom) => {
          return (
            <View key={`${symptom}-row`} style={styles.symptomsRow}>
              {reportsWithFilledGaps.map((report: Report) => {
                return (
                  <View
                    key={`report-${report.date}`}
                    style={styles.badgeContainer}
                  >
                    {report[symptom] && report.isFilled && (
                      <View style={styles.badge}>
                        {report[`${symptom}Intensity`] && (
                          <Text style={styles.intensity}>
                            {report[`${symptom}Intensity`]}
                          </Text>
                        )}
                        {symptom === 'fever' && report.fever && (
                          <Text style={styles.intensity}>
                            {report.temperature}
                          </Text>
                        )}
                      </View>
                    )}
                    {!report[symptom] && report.isFilled && (
                      <View style={styles.badgeOK} />
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default HistoryCharts;

const styles = StyleSheet.create({
  chart: {
    flexDirection: 'row',
    borderTopColor: colors.greyLight,
    borderTopWidth: 1,
    marginBottom: layout.padding,
    marginHorizontal: layout.padding,
  },
  lineChartContainer: {
    flexDirection: 'row',
  },
  lineChart: {
    height: GRAPH_HEIGHT,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
  },
  labelsContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: LEFT_LABELS_CONTAINER_WIDTH,
    borderRightColor: colors.greyLight,
    borderRightWidth: 1,
    borderLeftColor: colors.greyLight,
    borderLeftWidth: 1,
  },
  temperatureLabelsContainer: {
    height: GRAPH_HEIGHT,
    borderBottomColor: colors.grey,
    borderBottomWidth: 1,
    width: LEFT_LABELS_CONTAINER_WIDTH,
  },
  symptomSidebarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  symptomLabelContainer: {
    height: 30,
    justifyContent: 'center',
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
    width: LEFT_LABELS_CONTAINER_WIDTH,
  },
  symptomLabel: {
    fontSize: fonts.label.fontSize,
    fontFamily: fonts.label.fontFamily,
    color: colors.black,
    textAlign: 'left',
    paddingLeft: 2,
  },
  scrollViewContainer: {
    flexDirection: 'column',
  },
  symptomsRow: {
    height: COLUMN_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 1,
  },
  badgeContainer: {
    height: COLUMN_HEIGHT,
    width: COLUMN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: colors.greyLight,
    borderRightWidth: 1,
  },
  badge: {
    backgroundColor: colors.primary,
    height: COLUMN_HEIGHT - 10,
    width: COLUMN_WIDTH - 10,
    borderRadius: layout.buttons.borderRadius / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeOK: {
    backgroundColor: colors.green,
    height: COLUMN_HEIGHT - 20,
    width: COLUMN_HEIGHT - 20,
    borderRadius: COLUMN_HEIGHT - 20 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  intensity: {
    textAlign: 'center',
    color: colors.white,
    fontSize: fonts.label.fontSize,
  },
  date: {
    fontFamily: fonts.label.fontFamily,
    fontSize: fonts.label.fontSize,
    color: colors.white,
  },
});
