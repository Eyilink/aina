import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { fromUnixTime } from 'date-fns';

import i18n from '@i18n/i18n';
import { alertError } from '@helpers/utils';
import { PHONE_OS } from '@constants/constants';

export const registerForPushNotificationsAsync = async (): Promise<
  string | null
> => {
  let token = null;

  // Check that we are not on a emulator
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    );
    let finalStatus = existingStatus;

    // Only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      alertError({
        title: i18n.t('commons.attention'),
        message: i18n.t('commons.errors.notifications'),
      });
      return null;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (PHONE_OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }

  return token;
};

export const scheduleLocalNotification = async ({
  date,
}: {
  date: number;
}): Promise<void> => {
  const localNotification = {
    title: i18n.t('notification.title'),
    body: i18n.t('notification.message'),
    ios: { sound: true },
    android: { sound: true, priority: 'high', vibrate: true },
  };
  const schedulingOptions = {
    time: fromUnixTime(date+30),
    repeat: 'day',
  };
  await Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.scheduleLocalNotificationAsync(
    localNotification,
    schedulingOptions,
  );
};
