import React, { ReactElement } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import i18n from '@i18n/i18n';

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
      date={new Date()}
    />
  );
};

export default DateTimePicker;
