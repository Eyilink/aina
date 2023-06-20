import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
import pathologies from '@assets/json/pathologies.json'
import symptoms from '@assets/json/symptomes.json'
import { PainSymptoms, Pathologie, Symptome } from '@store/types';

// Local Storage Keys
export const ASYNC_STORAGE_AUTH_KEY = `@${Constants.manifest.slug}:auth`;
export const ASYNC_STORAGE_DISEASE_KEY = `@${Constants.manifest.slug}:disease`;
export const TOKEN_KEY = 'token';

// Diseases
export const MALADIE1 = 'maladie1';
export const SYMPTOMS = [
  'fever',
  'pain',
  'tiredness',
  'sleep',
  'cough',
  'breathlessness',
  'digestive',
  'agueusiaAnosmia',
  'runnyNose',
  'skinProblem',
] as const;
export const PAIN_SYMPTOMS: PainSymptoms = {
  throat: false,
  head: false,
  stiffness: false,
  muscular: false,
};

// Dates
export const DATE_TODAY = format(new Date(), 'dd/MM HH:mm', { locale: fr });

// Phone
export const PHONE_OS = Platform.OS;

// Other
export const CGU_URL = 'http://aina.io/monsuivisante-cgu/';

export const symptomeJSON: Symptome[] = symptoms.map((item: Symptome) => ({
  id: item.id,
  name: item.name,
  type: item.type,
  frequency: item?.frequency ? item.frequency : 0
}));

export const pathologieJSON: Pathologie[] = pathologies.map((item: any) => ({
  id: item.id,
  name: item.name,
//    symptoms: symptomeData.filter((symptome: Symptome) => symptome.id == item.symptoms.trim().split(",")),
  symptoms: symptomeJSON.filter((symptome: Symptome) => item.symptoms.trim().split(",").includes(String(symptome.id)))
}));