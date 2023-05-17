import {
  StoreActionApi,
  createHook,
  createStore,
  createSubscriber,
} from 'react-sweet-state';
import { AsyncStorage } from 'react-native';
import { getUnixTime } from 'date-fns';

import {
  SelectorWithDiseaseProps,
  getAuthSelector,
  getReportsSelector,
  getUserSelector,
} from '@store/selectors';
import { Auth, Disease, Report, RootState, User } from '@store/types';
import { scheduleLocalNotification } from '@helpers/notifications';
import { hasPreviousReportToday, orderReportsByDate } from '@helpers/utils';

import {
  ASYNC_STORAGE_AUTH_KEY,
  ASYNC_STORAGE_DISEASE_KEY,
  MALADIE1,
  TOKEN_KEY,
} from '@constants/constants';

type StoreApi = StoreActionApi<RootState>;
type Actions = typeof actions;
type EditUserProfileProps = {
  key: keyof User;
  value: string | number | boolean | object;
};

// This is the value of the store on initialisation
const initialState: RootState = {
  isLoading: false,
  auth: { user: null, token: null },
  disease: { [MALADIE1]: { user: null, reports: null } },
};

// All the actions that mutate the store
const actions = {
  signupUser: () => async ({ setState, getState }: StoreApi): Promise<void> => {
    const { disease } = getState();
    const { user } = getState().disease[MALADIE1];

    if (user) {
      const authSession = { user: user.username, token: TOKEN_KEY };
      setState({ isLoading: true });
      try {
        await AsyncStorage.multiSet([
          [ASYNC_STORAGE_AUTH_KEY, JSON.stringify(authSession)],
          [ASYNC_STORAGE_DISEASE_KEY, JSON.stringify(disease)],
        ]);
        setState({
          auth: { user: authSession.user, token: authSession.token },
          isLoading: false,
        });
        // set up local notification if activated
        if (user.reminder?.isActive) {
          scheduleLocalNotification({ date: user.reminder.date });
        }
      } catch (error) {
        console.warn('ERROR > signupUser: ', error);
        setState({ isLoading: false });
      }
    }
  },

  addNewReport: ({ report }: { report: Report }) => async ({
    setState,
    getState,
  }: StoreApi): Promise<void> => {
    const previousReports = getState().disease.maladie1.reports;
    const currentUser = getState().disease.maladie1.user;

    try {
      if (previousReports) {
        orderReportsByDate(previousReports);

        // if the user has already filled a report today, erase the last one and replace it by the new one
        if (hasPreviousReportToday(previousReports)) previousReports.shift();

        setState({
          disease: {
            [MALADIE1]: {
              reports: [
                { date: getUnixTime(new Date()), isFilled: true, ...report },
                ...previousReports,
              ],
              user: currentUser,
            },
          },
        });
      } else {
        setState({
          disease: {
            [MALADIE1]: {
              reports: [
                { date: getUnixTime(new Date()), isFilled: true, ...report },
              ],
              user: currentUser,
            },
          },
        });
      }

      const { disease } = getState();
      await AsyncStorage.setItem(
        ASYNC_STORAGE_DISEASE_KEY,
        JSON.stringify(disease),
      );
    } catch (error) {
      console.warn('ERROR > addNewReport: ', error);
    }
  },

  editUserProfile: ({ key, value }: EditUserProfileProps) => async ({
    setState,
    getState,
  }: StoreApi): Promise<void> => {
    const currentUser = getState().disease.maladie1.user;
    const previousReports = getState().disease.maladie1.reports;

    setState({
      disease: {
        [MALADIE1]: {
          user: { ...currentUser, [key]: value },
          reports: previousReports ? [...previousReports] : null,
        },
      },
    });
  },

  getUserSession: () => async ({ setState }: StoreApi): Promise<void> => {
    // await AsyncStorage.clear();
    setState({ isLoading: true });
    try {
      const authSession = await AsyncStorage.getItem(ASYNC_STORAGE_AUTH_KEY);
      const diseaseSession = await AsyncStorage.getItem(
        ASYNC_STORAGE_DISEASE_KEY,
      );

      if (authSession && diseaseSession) {
        const session: Auth = JSON.parse(authSession);
        const disease: Disease = JSON.parse(diseaseSession);
        setState({
          auth: { user: session.user, token: session.token },
          disease,
        });
      }
      setState({ isLoading: false });
    } catch (error) {
      setState({ isLoading: false });
      console.warn(error);
    }
  },

  resetUserSession: () => async ({ setState }: StoreApi): Promise<void> => {
    setState({ isLoading: true });
    try {
      await AsyncStorage.removeItem(ASYNC_STORAGE_AUTH_KEY);
      setState({ auth: { user: null, token: null }, isLoading: false });
    } catch (error) {
      setState({ isLoading: false });
      console.warn(error);
    }
  },
};

// Store initialization
const Store = createStore<RootState, Actions>({
  initialState,
  actions,
  name: 'auth',
});

// Subscriber + Hooks that allows us to access Store state and actions in our views
export const StoreSubscriber = createSubscriber(Store);

export const useAuthStore = createHook<RootState, Actions, Auth, void>(Store, {
  selector: getAuthSelector,
});

export const useUserStore = createHook<
  RootState,
  Actions,
  User,
  SelectorWithDiseaseProps
>(Store, {
  selector: getUserSelector,
});

export const useReportsStore = createHook<
  RootState,
  Actions,
  Report[],
  SelectorWithDiseaseProps
>(Store, {
  selector: getReportsSelector,
});
