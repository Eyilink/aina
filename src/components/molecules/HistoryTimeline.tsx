import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import { format, fromUnixTime } from 'date-fns';
import fr from 'date-fns/locale/fr';

import AppText from '@components/atoms/AppText';
import Subtitle from '@components/atoms/SubTitle';

import { Report } from '@store/types';
import { getNumberOfSymptomsFromReport } from '@helpers/utils';

import i18n from '@i18n/i18n';
import colors from '@styles/colors';
import fonts from '@styles/fonts';
import layout from '@styles/layout';

type TransformedReport = {
  title: string;
  description: string;
  circleColor: string;
  lineColor: string;
};

const HistoryTimeline = ({ reports }: { reports: Report[] }): ReactElement => {
  const getLineColor = (report: Report): string => {
    const numberOfSymptoms = getNumberOfSymptomsFromReport(report);
    if (numberOfSymptoms === 0) return colors.green;
    if (numberOfSymptoms === 1) return colors.orange;
    return colors.primary;
  };

  const getSymptoms = (report: Report): string => {
    let symptoms = '';
    if (report.fever) {
      symptoms = symptoms.concat(
        `- ${i18n.t('report.temperature')} : ${report.temperature}${i18n.t(
          'commons.units.degrees',
        )}\n`,
      );
    }
    if (report.cough) {
      symptoms = symptoms.concat(
        `- ${i18n.t('report.cough')} : Niv. ${report.coughIntensity}\n`,
      );
    }
    if (report.tiredness) {
      symptoms = symptoms.concat(
        `- ${i18n.t('report.tiredness')} : Niv. ${report.tirednessIntensity}\n`,
      );
    }
    if (report.sleep) {
      symptoms = symptoms.concat(
        `- ${i18n.t('report.sleep')} : Niv. ${report.sleepIntensity}\n`,
      );
    }
    if (report.pain) {
      symptoms = symptoms.concat(
        `- ${i18n.t('report.pain')} : Niv. ${report.painIntensity}\n`,
      );
      if (Object.values(report.painSymptoms).indexOf(true) > -1) {
        symptoms = symptoms.concat(`  ${i18n.t('history.type')} : `);
        if (report.painSymptoms.head) {
          symptoms = symptoms.concat(`${i18n.t('report.head')}, `);
        }
        if (report.painSymptoms.muscular) {
          symptoms = symptoms.concat(`${i18n.t('report.muscular')}, `);
        }
        if (report.painSymptoms.stiffness) {
          symptoms = symptoms.concat(`${i18n.t('report.stiffness')}, `);
        }
        if (report.painSymptoms.throat) {
          symptoms = symptoms.concat(`${i18n.t('report.throat')}`);
        }
        symptoms = symptoms.replace(/,\s*$/, '').concat('\n'); // remove last comma if needed
      }
    }
    if (report.breathlessness) {
      symptoms = symptoms.concat(`- ${i18n.t('report.breathlessness')}\n`);
    }
    if (report.digestive) {
      symptoms = symptoms.concat(`- ${i18n.t('report.digestive')}\n`);
    }
    if (report.agueusiaAnosmia) {
      symptoms = symptoms.concat(`- ${i18n.t('report.agueusiaAnosmia')}\n`);
    }
    if (report.runnyNose) {
      symptoms = symptoms.concat(`- ${i18n.t('report.runnyNose')}\n`);
    }
    if (report.skinProblem) {
      symptoms = symptoms.concat(`- ${i18n.t('report.skinProblem')}\n`);
    }
    if (report.notes?.length) {
      symptoms = symptoms.concat(
        `\n${i18n.t('report.notes')} :\n${report.notes}\n`,
      );
    }
    if (report.peopleMet?.length) {
      symptoms = symptoms.concat(
        `\n${i18n.t('report.peopleMet')} :\n${report.peopleMet}`,
      );
    }
    return symptoms;
  };

  const reportsForTimeline = reports.map((report: Report) => ({
    title: format(fromUnixTime(report.date), 'PPPP', { locale: fr }),
    description: getSymptoms(report),
    lineColor: getLineColor(report),
    circleColor: getLineColor(report),
  }));

  const renderReport = (transformedReport: TransformedReport): ReactElement => {
    const { title, description, lineColor } = transformedReport;

    return (
      <>
        <Subtitle text={title} style={[styles.date, { color: lineColor }]} />
        {description.length > 0 && (
          <View style={styles.descriptionContainer}>
            <AppText
              text={description.replace(/^\s+|\s+$/g, '')} // remove last line break if needed
              style={{
                lineHeight: fonts.text.fontSize + 8,
                fontSize: fonts.input.fontSize,
              }}
            />
          </View>
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <Timeline
        style={styles.list}
        showTime={false}
        data={reportsForTimeline}
        renderDetail={renderReport}
        circleSize={20}
        renderFullLine
        listViewContainerStyle={styles.listViewContainer}
        persistentScrollbar
      />
    </View>
  );
};

export default HistoryTimeline;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    fontSize: fonts.text.fontSize,
    fontFamily: fonts.text.fontFamily,
  },
  date: {
    fontSize: fonts.subtitle.fontSize - 1,
    fontFamily: fonts.subtitle.fontFamily,
    marginBottom: layout.padding / 2,
    marginTop: -14,
    marginLeft: 0,
  },
  descriptionContainer: {
    backgroundColor: colors.greyLight,
    padding: layout.padding / 2,
    borderRadius: layout.buttons.borderRadius,
  },
  listViewContainer: {
    paddingBottom: layout.padding,
    marginHorizontal: layout.padding,
  },
});
