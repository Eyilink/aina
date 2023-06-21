import React, { ReactElement, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getUnixTime } from 'date-fns';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';
import DateTimePicker from '@components/molecules/DateTimePicker';

import { useAuthStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';
import { alertError } from '@helpers/utils';
import {
  registerForPushNotificationsAsync,
  scheduleLocalNotification
} from '@helpers/notifications';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'Reminder'>;
};

const Reminder = ({ navigation }: Props): ReactElement => {
  const [reminder, setReminder] = useState<boolean>(false);
  const [isPickerVisible, setIsPickerVisible] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>(null);
  const [hasUserChosen, setHasUserChosen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, actions] = useAuthStore();

  const onValidate = async (): Promise<void> => {
    if (!hasUserChosen) alertError({});
    else if (reminder) {
      setIsPickerVisible(false)
      setIsLoading(true);
      await registerForPushNotificationsAsync();
      await scheduleLocalNotification(
        getUnixTime(date)
      )
      actions.editUserProfile({
        key: 'reminder',
        value: {
          isActive: reminder,
          date: getUnixTime(date)
        }
      });
      setIsLoading(false);
      navigation.navigate('ProfileCreated');
    } else if (!reminder) {
      actions.editUserProfile({
        key: 'reminder',
        value: { isActive: reminder },
      });
      navigation.navigate('ProfileCreated');
    } else navigation.navigate('ProfileCreated');
  };

  const onCancelPicker = (): void => {
    setIsPickerVisible(false);
    setHasUserChosen(false);
  };

  const onConfirmDate = (date:Date): void => {
    setIsPickerVisible(false)
    setDate(
      new Date(date.nativeEvent.timestamp)
    )
  };

  const onPressYes = (): void => {
    setHasUserChosen(true);
    setReminder(true);
    setIsPickerVisible(true);
  };

  const onPressNo = (): void => {
    setHasUserChosen(true);
    setReminder(false);
    setDate(null);
    setIsPickerVisible(false)
  };

  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <ScrollView persistentScrollbar>
          <SubTitle text={i18n.t('signup.questions.reminder')} />
          <Button
            text={
              date
                ? `${i18n.t('commons.yes')} ${i18n.t(
                    'commons.linkingWords.a',
                  )} ${date.getHours()}${i18n.t('commons.linkingWords.h')}${
                    (date.getMinutes() < 10 ? '0' : '') + date.getMinutes()
                  }`
                : i18n.t('commons.yes')
            }
            onPress={onPressYes}
            isSelected={hasUserChosen ? reminder : false}
            stretch
          />
          <Button
            text={i18n.t('commons.no')}
            onPress={onPressNo}
            isSelected={hasUserChosen ? !reminder : false}
            stretch
          />
          <Button
            text={i18n.t('signup.validate')}
            onPress={onValidate}
            isLoading={isLoading}
            disabled={isLoading}
            isValidate
          />
          {reminder&&isPickerVisible&&<DateTimePicker
            onCancel={onCancelPicker}
            onConfirm={onConfirmDate}
            mode="time"
            isVisible={true}
          />}
        </ScrollView>
      </View>
    </Container>
  );
};

export default Reminder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
