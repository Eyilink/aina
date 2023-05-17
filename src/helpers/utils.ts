import { Alert } from 'react-native';
import {
  eachDayOfInterval,
  fromUnixTime,
  getUnixTime,
  isSameDay,
  isToday,
  sub,
} from 'date-fns';

import i18n from '@i18n/i18n';
import { Report } from '@store/types';
import { PAIN_SYMPTOMS, SYMPTOMS } from '@constants/constants';

export const alertError = ({
  title = i18n.t('commons.errors.title'),
  message = i18n.t('commons.errors.message'),
}): void =>
  Alert.alert(title, message, [{ text: i18n.t('commons.errors.ok') }], {
    cancelable: false,
  });

export const isNumeric = (str: string): boolean => /^\d+$/.test(str);

export const orderReportsByDate = (reports: Report[]): Report[] =>
  reports.sort((a, b) => b.date - a.date);

export const hasPreviousReportToday = (currentReports: Report[]): boolean => {
  let lastReport = null;
  if (currentReports.length) lastReport = currentReports[0];
  return lastReport ? isToday(fromUnixTime(lastReport.date)) : false;
};

export const getNumberOfSymptomsFromReport = (report: Report): number =>
  SYMPTOMS.filter((symptom: keyof Report) => report[symptom] === true).length;

export const getRecommandation = (reports: Report[]): string => {
  const lastReport = reports[0];
  const numberOfSymptomsFromLastReport = getNumberOfSymptomsFromReport(
    lastReport,
  );

  if (numberOfSymptomsFromLastReport > 1) return 'end3';

  if (numberOfSymptomsFromLastReport === 1) return 'end2';

  if (numberOfSymptomsFromLastReport === 0) {
    if (reports.length === 1) return 'end1';

    const numberOfSymptomsFromThreePreviousReport = reports
      .slice(-4, -1)
      .map((report: Report) =>
        SYMPTOMS.filter((symptom: keyof Report) => report[symptom] === true),
      )
      .map((symptoms) => symptoms.length)
      .reduce((acc: number, current: number) => acc + current);

    if (numberOfSymptomsFromThreePreviousReport < 2) return 'end1';

    return 'end2bis';
  }

  return 'end1';
};

export const fillGapsInReports = (reports: Report[]) => {
  const emptyReport: Report = {
    isFilled: false,
    agueusiaAnosmia: false,
    breathlessness: false,
    cough: false,
    coughIntensity: null,
    date: 0,
    digestive: false,
    fever: false,
    pain: false,
    painIntensity: null,
    painSymptoms: PAIN_SYMPTOMS,
    notes: '',
    peopleMet: '',
    runnyNose: false,
    skinProblem: false,
    sleep: false,
    sleepIntensity: null,
    temperature: null,
    tiredness: false,
    tirednessIntensity: null,
  };

  const eachDaybetweenMinAndMaxDate = eachDayOfInterval({
    start:
      reports.length < 7
        ? sub(fromUnixTime(reports[reports.length - 1].date), {
            days: 7 - reports.length,
          })
        : fromUnixTime(reports[reports.length - 1].date),
    end: fromUnixTime(reports[0].date),
  });

  const reportsWithFilledGaps: Report[] = [];

  eachDaybetweenMinAndMaxDate.map((date) => {
    const sameDayInReports = reports.find((report: Report) =>
      isSameDay(date, fromUnixTime(report.date)),
    );

    if (sameDayInReports) reportsWithFilledGaps.push(sameDayInReports);
    else {
      const dateOfEmptyReport = getUnixTime(date);
      reportsWithFilledGaps.push({ ...emptyReport, date: dateOfEmptyReport });
    }
  });

  return reportsWithFilledGaps;
};
