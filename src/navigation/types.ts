import { Report } from '@store/types';

export type PublicStackParamList = {
  Cgu: undefined;
  ProfilCreation: undefined;
  Username: undefined;
  Age: undefined;
  PostalCode: undefined;
  Size: undefined;
  Weight: undefined;
  Diseases: undefined;
  Pregnant: undefined;
  Reminder: undefined;
  Confirmation: undefined;
};

export type AuthenticatedStackParamList = {
  BottomTabNavigator: { screen: string };
  Temperature: undefined;
  Symptoms: { report: Report };
  OtherSymptoms: { report: Report };
  Notes: { report: Report };
};

export type BottomTabParamList = {
  Home: undefined;
  Evaluate: undefined;
  History: undefined;
  Profile: undefined;
};
