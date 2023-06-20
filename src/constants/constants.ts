import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { ImageSourcePropType, Platform } from 'react-native';
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

const getIconPath = (iconName: string): ImageSourcePropType => {
  switch (iconName) {
    case 'avq.png':
      return require('@assets/images/avq.png');
    case 'barthel.png':
      return require('@assets/images/barthel.png');
    case 'braden.png':
      return require('@assets/images/braden.png');
    case 'clinimetre.png':
      return require('@assets/images/clinimetre.png');
    case 'coeur.png':
      return require('@assets/images/coeur.png');
    case 'colonne.png':
      return require('@assets/images/colonne.png');
    case 'covid.png' :
      return require('@assets/images/covid.png');
    case 'dentaire.png' :
      return require('@assets/images/dentaire.png');
    case 'genou.png' :
      return require('@assets/images/genou.png');
    case 'grippe.png' :
      return require('@assets/images/grippe.png');
    case 'grossesse.png' :
      return require('@assets/images/grossesse.png');
    case 'insh.png' :
      return require('@assets/images/insh.png');
    case 'mif.png' :
      return require('@assets/images/mif.png');
    case 'orl.png' :
      return require('@assets/images/orl.png');
    case 'peau.png' :
      return require('@assets/images/peau.png');
    case 'poumon.png' :
      return require('@assets/images/poumon.png');
    case 'yeux.png' :
      return require('@assets/images/yeux.png');
    default:
      return require('@assets/images/6_i.png'); // Provide a default image path
  }
};

export const symptomeJSON: Symptome[] = symptoms.map((item: Symptome) => ({
  id: item.id,
  name: item.name,
  type: item.type,
}));

export const pathologieJSON: Pathologie[] = pathologies.map((item: any) => ({
  id: item.id,
  name: item.name,
//    symptoms: symptomeData.filter((symptome: Symptome) => symptome.id == item.symptoms.trim().split(",")),
  symptoms: symptomeJSON.filter((symptome: Symptome) => item.symptoms.trim().split(",").includes(String(symptome.id))),
  icon: getIconPath(item.logo)
  
}));


