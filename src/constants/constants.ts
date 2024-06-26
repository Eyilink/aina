import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import { ImageSourcePropType, Platform } from 'react-native';
import Constants from 'expo-constants';
import pathologies from '@assets/json/pathologies.json'
import symptoms from '@assets/json/symptomes.json'
import { PainSymptoms, Pathologie, Symptome, User } from '@store/types';
import { InformationContext2 } from '@components/molecules/InformationContext2';
import {useContext} from 'react'

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
export const DATE_TODAY = format(new Date(), 'dd/MM', { locale: fr });

// Phone
export const PHONE_OS = Platform.OS;

// Other
export const CGU_URL = 'http://aina.io/monsuivisante-cgu/';



export const getIconPath = (iconName: string): ImageSourcePropType => {
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
    case 'hanche.png' :
      return require('@assets/images/hanche.png');
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
    case 'home.png' :
      return require('@assets/images/home.png');
    case 'pulmonaire_rl.png' :
        return require('@assets/images/pulmonaire_rl.png');
    default:
      return require('@assets/images/6_i.png'); // Provide a default image path
  }
};

export const symptomeJSON: Symptome[] = symptoms.map((item: Symptome) => ({
  id: item.id,
  name: item.name,
  type: item.type,
  frequency: item.frequency,
  unit: item.unit,
  caractere: item.caractere,
  valMin: item.valMin,
  valMax: item.valMax,
  surname: item.surname,
}));

export const pathologieJSON: Pathologie[] = pathologies.map((item: any) => ({
  id: item.id,
  name: item.name,
//    symptoms: symptomeData.filter((symptome: Symptome) => symptome.id == item.symptoms.trim().split(",")),
  symptoms: symptomeJSON.filter((symptome: Symptome) => item.symptoms.trim().split(",").includes(String(symptome.id))),
  icon: getIconPath(item.logo),
  init_symptoms: symptomeJSON.filter((symptome: Symptome) => item.init_symptoms.trim().split(",").includes(String(symptome.id))),
  title_for_bilan: item.title_for_bilan ? item.title_for_bilan : null,
  
}));

export const Evaluateurs: String[]=["Auto-Bilan", "Bilan Aidant", "Bilan Médecin", "Bilan spécialiste", "Bilan Ergo", "Bilan Infirmière", "Bilan Kiné"];

export function calculateBMI(weightString: string | undefined, heightString: string | undefined): number | undefined {
  if (weightString === undefined || heightString === undefined) {
    return undefined; // Return null if either weight or height is undefined
  }

  const weight = parseFloat(weightString.replace(/[^\d.]/g, ''));
  const height = parseFloat(heightString.replace(/[^\d.]/g, ''));

  if (isNaN(weight) || isNaN(height) || height === 0) {
    return undefined; // Return null if either weight or height is not a valid number, or if height is zero to avoid division by zero
  }

  const heightInMeters = height / 100; // Convert height from centimeters to meters

  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi;
}

