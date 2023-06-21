import React, { ReactElement } from 'react';
import DateTimePickerModal from '@react-native-community/datetimepicker';

import i18n from '@i18n/i18n';
import { View } from 'react-native';

type Props = {
  isVisible: boolean;
  mode: 'date' | 'time' | 'datetime';
  onCancel: () => void;
  onConfirm: (date: Date) => void;
};

const DateTimePicker = ({
  isVisible,
  onCancel,
  onConfirm,
  mode,
}: Props): ReactElement => {
  const handleConfirm = (date: Date): void => {
    onConfirm(date);
  };

  return (
    <DateTimePickerModal
      isVisible={isVisible}
      mode={mode}
      onConfirm={handleConfirm}
      onCancel={onCancel}
      cancelTextIOS={i18n.t('commons.errors.cancel')}
      confirmTextIOS={i18n.t('commons.confirm')}
      headerTextIOS={i18n.t('signup.date')}
      locale={i18n.currentLocale()}
      is24Hour
      value={new Date()}
      onChange={handleConfirm}
    />
  );
};

export default DateTimePicker;
