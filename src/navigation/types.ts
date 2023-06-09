import { Report } from '@store/types';

export type PublicStackParamList = {
  ProfilCreation: undefined;
  ProfileCreated: undefined;
  Username: undefined;
  Age: undefined;
  Size: undefined;
  Weight: undefined;
  NewSuivi: undefined;
  // Diseases: undefined;
  // Pregnant: undefined;
  // Reminder: undefined;
  // Confirmation: undefined;
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
  Suivi: undefined;
  History: undefined;
  Profile: undefined;
};
