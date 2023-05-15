import React, { ReactElement, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Feather } from '@expo/vector-icons';

import HistoryTimeline from '@components/molecules/HistoryTimeline';
import HistoryCharts from '@components/molecules/HistoryCharts';
import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import Subtitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';

import { BottomTabParamList } from '@navigation/types';
import { useReportsStore } from '@store/store';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';
import fonts from '@styles/fonts';
import colors from '@styles/colors';
import { MALADIE1 } from '@constants/constants';
import { ScrollView } from 'react-native-gesture-handler';

type Props = {
  navigation: StackNavigationProp<BottomTabParamList, 'History'>;
};

const History = ({ navigation }: Props): ReactElement => {
  const [reports] = useReportsStore({ disease: MALADIE1 });
  const [reportType, setReportType] = useState<string>('list');
  const [isChartFocused, setIsChartFocused] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsChartFocused(true);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setIsChartFocused(false);
    });
    return unsubscribe;
  }, [navigation]);

  const onPressList = (): void => {
    setIsChartFocused(false);
    setReportType('list');
  };

  const onPressChart = (): void => {
    setIsChartFocused(true);
    setReportType('chart');
  };

  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        {/* <Title isPrimary text={i18n.t('navigation.authenticated.history')} />
        {!reports ? (
          <>
            <Subtitle
              text={i18n.t('history.firstTime')}
              style={styles.subtitle}
            />
            <Button
              text={i18n.t('navigation.authenticated.evaluate')}
              onPress={(): void => navigation.navigate('Evaluate')}
              isValidate
              stretch
            />
          </>
        ) : (
          <>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                onPress={onPressList}
                style={[
                  styles.button,
                  styles.buttonList,
                  {
                    backgroundColor:
                      reportType === 'list' ? colors.primary : colors.greyLight,
                  },
                ]}
              >
                <Feather
                  name="list"
                  size={layout.navigation.tabIconSize}
                  color={reportType === 'list' ? colors.white : colors.black}
                />
                <Text
                  style={[
                    styles.textButtons,
                    {
                      color:
                        reportType === 'list' ? colors.white : colors.black,
                    },
                  ]}
                >
                  {i18n.t('history.list')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onPressChart}
                style={[
                  styles.button,
                  styles.buttonCharts,
                  {
                    backgroundColor:
                      reportType === 'chart'
                        ? colors.primary
                        : colors.greyLight,
                  },
                ]}
              >
                <Feather
                  name="bar-chart-2"
                  size={layout.navigation.tabIconSize}
                  color={reportType === 'chart' ? colors.white : colors.black}
                />
                <Text
                  style={[
                    styles.textButtons,
                    {
                      color:
                        reportType === 'chart' ? colors.white : colors.black,
                    },
                  ]}
                >
                  {i18n.t('history.chart')}
                </Text>
              </TouchableOpacity>
            </View>
            {reportType === 'list' ? (
              <HistoryTimeline reports={reports} />
            ) : (
              <ScrollView persistentScrollbar>
                <HistoryCharts reports={reports} isFocused={isChartFocused} />
              </ScrollView>
            )}
          </>
        )} */}
      </View>
    </Container>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: layout.padding,
  },
  subtitle: {
    marginTop: layout.padding,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginHorizontal: layout.padding,
  },
  button: {
    flex: 1,
    paddingHorizontal: layout.padding,
    paddingVertical: layout.padding / 6,
    marginBottom: layout.padding,
    alignItems: 'center',
  },
  buttonList: {
    borderTopLeftRadius: layout.buttons.borderRadius,
    borderBottomLeftRadius: layout.buttons.borderRadius,
  },
  buttonCharts: {
    borderTopRightRadius: layout.buttons.borderRadius,
    borderBottomRightRadius: layout.buttons.borderRadius,
  },
  textButtons: {
    textAlign: 'center',
    fontFamily: fonts.label.fontFamily,
    fontSize: fonts.label.fontSize,
    marginTop: 4,
  },
});
