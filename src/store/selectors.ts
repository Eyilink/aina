import { Auth, Disease, Report, RootState, User } from '@store/types';

export type SelectorWithDiseaseProps = {
  disease: keyof Disease;
};

export const getAuthSelector = (state: RootState): Auth => state.auth;

export const getUserSelector = (
  state: RootState,
  props: SelectorWithDiseaseProps,
): User => state.disease[props.disease].user!;

export const getReportsSelector = (
  state: RootState,
  props: SelectorWithDiseaseProps,
): Report[] => state.disease[props.disease].reports!;
