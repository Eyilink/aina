import React, { ReactElement, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';

import { useAuthStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';
import { alertError } from '@helpers/utils';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'Pregnant'>;
};

const Pregnant = ({ navigation }: Props): ReactElement => {
  const [pregnant, setPregnant] = useState<boolean>(false);
  const [hasUserChosen, setHasUserChosen] = useState<boolean>(false);
  const [, actions] = useAuthStore();

  const onValidate = (): void => {
    if (!hasUserChosen) alertError({});
    else {
      actions.editUserProfile({ key: 'pregnant', value: pregnant });
      navigation.navigate('Reminder');
    }
  };

  const onChange = (value: boolean): void => {
    setHasUserChosen(true);
    setPregnant(value);
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <SubTitle text={i18n.t('signup.questions.pregnant')} />
        <Button
          text={i18n.t('commons.yes')}
          onPress={(): void => onChange(true)}
          isSelected={hasUserChosen ? pregnant : false}
          stretch
        />
        <Button
          text={i18n.t('commons.no')}
          onPress={(): void => onChange(false)}
          isSelected={hasUserChosen ? !pregnant : false}
          stretch
        />
        <Button
          text={i18n.t('signup.validate')}
          onPress={onValidate}
          isValidate
        />
      </View>
    </Container>
  );
};

export default Pregnant;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
