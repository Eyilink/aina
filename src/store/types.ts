import { MALADIE1 } from '@constants/constants';

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
  cgu: boolean;
  username: string;
  age: number;
  postalCode: number;
  size: number;
  weight: number;
  diseases: Diseases;
  pregnant: boolean;
  reminder: Reminder;
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
};
