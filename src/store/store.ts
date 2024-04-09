import {
  StoreActionApi,
  createHook,
  createStore,
  createSubscriber,
} from 'react-sweet-state';
import { AsyncStorage } from 'react-native';
import { getUnixTime } from 'date-fns';
import * as Sharing from 'expo-sharing';

import {
  SelectorWithDiseaseProps,
  getAuthSelector,
  getReportsSelector,
  getUserSelector,
} from '@store/selectors';
import RNFS from 'react-native-fs';
import { Auth, Disease, Report, RootState, User } from '@store/types';
import { scheduleLocalNotification } from '@helpers/notifications';
import { hasPreviousReportToday, orderReportsByDate } from '@helpers/utils';
import * as FileSystem from 'expo-file-system';

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
type UserStoreState = {
  twoDArray: string[][];
};

// This is the value of the store on initialisation
const initialState: RootState = {
  isLoading: false,
  auth: { user: null, token: null },
  disease: { [MALADIE1]: { user: null, reports: null } },
  twoDArray: [],
  users: [],
};

const exportUsersToJson = async () => {
  try {
    const usersJson = await AsyncStorage.getItem('user');
    if (usersJson) {
      const fileName = FileSystem.documentDirectory + 'users.json';
      await FileSystem.writeAsStringAsync(fileName, usersJson);

      console.log('Users exported to:', fileName);
      console.log('All users :::: ' , usersJson);
    } else {
      console.log('No users data to export.');
    }
  } catch (error) {
    console.error('Error exporting users:', error);
  }
};
const shareUsersFile = async () => {
  const fileName = FileSystem.documentDirectory + 'users.json';
  try {
    await Sharing.shareAsync(fileName);
  } catch (error) {
    console.error('Error sharing users file:', error);
  }
};

// All the actions that mutate the store
const actions = {
  exportUsers: () => async () => {
    await exportUsersToJson();
    await shareUsersFile();
  },
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
  saveUserProfile: () => async ({ setState, getState }: StoreApi): Promise<void> => {
    try {
      const { disease } = getState();
      const currentUser = getState().auth.user; // Access the current user from the auth state

      setState({
        auth: {
          ...getState().auth,
          user: currentUser, // Keep the current user in the auth state
        },
        disease: {
          ...disease,
          [MALADIE1]: {
            ...disease[MALADIE1],
            user: getState().disease.maladie1.user, // Keep the current user in the disease state
          },
        },
      });

      await AsyncStorage.setItem(
        ASYNC_STORAGE_AUTH_KEY,
        JSON.stringify(getState().auth), // Store the updated auth state
      );
      await AsyncStorage.setItem(
        ASYNC_STORAGE_DISEASE_KEY,
        JSON.stringify(disease),
      );
    } catch (error) {
      console.warn('ERROR > saveUserProfile: ', error);
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

  setTwoDArray: (twoDArray: string[][]) => async ({ setState }: StoreActionApi<UserStoreState>) => {
    // Update the state with the new twoDArray
    setState({ twoDArray });

    // Store the twoDArray in AsyncStorage
    try {
      await AsyncStorage.setItem('twoDArray', JSON.stringify(twoDArray));
    } catch (error) {
      console.error('Error storing twoDArray in AsyncStorage:', error);
    }
  },
  getTwoDArray: () => async ({ setState }: StoreActionApi<UserStoreState>) => {
    // Retrieve the twoDArray from AsyncStorage
    try {
      const storedTwoDArray = await AsyncStorage.getItem('twoDArray');
      if (storedTwoDArray) {
        const parsedTwoDArray = JSON.parse(storedTwoDArray);
        setState({ twoDArray: parsedTwoDArray });
      }
    } catch (error) {
      console.error('Error retrieving twoDArray from AsyncStorage:', error);
    }
  },
  addUser: (user: User) => async ({ setState, getState }: StoreApi): Promise<void> => {
    const {users } = getState();
    const updatedUsers = [...users, user];
    setState({ users: updatedUsers });
    // actions.saveUsersToAsyncStorage();
  },

  switchUser: (index: number) => async ({ setState, getState }: StoreApi): Promise<void> => {
    const {users } = getState();
    const user = users[index];
    if (user) {
      setState({
        auth: {
          ...getState().auth,
          user: user.username,
        },
        disease: {
          ...getState().disease,
          [MALADIE1]: {
            user,
            reports: null,
          },
        },
      });
      // Call any other actions to update the state based on the new user if needed
    }
  },
  replaceUser: ( newUser: User) => async ({ setState, getState }: StoreApi): Promise<void> => {
    const users = [...getState().users];
    users.map((u,index)=>{if(u.username === newUser.username) users[index] = newUser;})
    // users[index] = newUser;
    setState({ users });
    // actions.saveUsersToAsyncStorage();
  },
  saveUsersToAsyncStorage: () => async ({ setState, getState }: StoreApi): Promise<void> => {
    try {
      const {users} = getState();
      const serializedUsers = JSON.stringify(users);
      console.log("my s objects in save ::: ");
      await AsyncStorage.setItem('users', serializedUsers);
      console.log("my s objects in save after ::: ");
    } catch (error) {
      console.warn('Error saving users to AsyncStorage:', error);
    }
  },

  // Function to retrieve users from AsyncStorage
  getUsersFromAsyncStorage: () => async ({ setState }: StoreApi): Promise<void> => {
    
    try {
      const serializedUsers = await AsyncStorage.getItem('users');
     
      if (serializedUsers) {
        
        const users: User[] = JSON.parse(serializedUsers);
        console.log("first user username ::::  " + users[0].username)
        setState({ users: users });

      }
    } catch (error) {
      console.warn('Error retrieving users from AsyncStorage:', error);
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
export const useUsersStore = createHook<RootState, Actions, User[], void>(Store, {
  selector: (state) => state.users,
});
export const useReportsStore = createHook<
  RootState,
  Actions,
  Report[],
  SelectorWithDiseaseProps
>(Store, {
  selector: getReportsSelector,
});
