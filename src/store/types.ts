import { MALADIE1 } from '@constants/constants';
import { ImageSourcePropType } from 'react-native';

type Reminder = {
  isActive: boolean;
  date?: number; // UNIX timestamp
  token?: string; // ExponentPushToken
};

export type Diseases = {
  diabetes: boolean;
  heartDisease: boolean;
  cancer: boolean;
  breathingDisease: boolean;
  kidneyDisease: boolean;
  liverDisease: boolean;
  immunosuppressantDisease: boolean;
  immunosuppressantDrug: boolean;
};

export type User = {
  username: string;
  age: number;
  birthDate: string;
  size: number;
  weight: number;
  allergy: boolean;
  tetanos: boolean;
  my_personal_datas: Pathologie[];
  my_previous_personal_datas: Pathologie[];
  reminder: Reminder;
  code: string,
  tel: string,
  mail: string,
  nom: string,
  prenom: string

};

export type PainSymptoms = {
  throat: boolean;
  head: boolean;
  stiffness: boolean;
  muscular: boolean;
};

export type Report = {
  isFilled: boolean;
  date: number; // UNIX timestamp
  fever: boolean;
  temperature?: number | null; // [ 37 to 40 ]
  pain: boolean;
  painIntensity: number | null; // [ 0 to 10 ]
  painSymptoms: PainSymptoms;
  tiredness: boolean;
  tirednessIntensity?: number | null; // [ 0 to 10 ]
  sleep: boolean;
  sleepIntensity?: number | null; // [ 0 to 10 ]
  cough: boolean;
  coughIntensity?: number | null; // [ 0 to 10 ]
  breathlessness: boolean;
  digestive: boolean;
  agueusiaAnosmia: boolean;
  runnyNose: boolean;
  skinProblem: boolean;
  notes?: string;
  peopleMet?: string;
};

type Maladie1 = {
  user?: User | null;
  reports?: Report[] | null;
};
export type Disease = {
  [MALADIE1]: Maladie1;
};

export type Auth = {
  user: string | null;
  token: string | null;

};

export type RootState = {
  auth: Auth;
  isLoading: boolean;
  disease: Disease;
  twoDArray: string[][];
};

export type SymptomeJSON = {
  id: number;
  name: string,
  type: string,
}

export type Data = { 
  date: string,
  valeur:number | string,
};
export type Symptome = {
  id: number;
  name: string,
  frequency: number,
  data?:Data[],
  type: string;
  question?: String,
  valMin?: number,
  valMax?: number,
  unit?:string,
  caractere?: string
};
  
export type Pathologie = {
  id: string;
  name: string;
  date?: string;
  more?: string;
  namelogo?: string;
  icon?: ImageSourcePropType;
  symptoms: Symptome[];
  dateend?: string;
};
