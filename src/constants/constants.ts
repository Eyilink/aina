import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

import { PainSymptoms } from '@store/types';

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
export const DATE_TODAY = format(new Date(), 'PPPP', { locale: fr });

// Phone
export const PHONE_OS = Platform.OS;

// Other
export const CGU_URL = 'http://aina.io/monsuivisante-cgu/';
