import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';

import { useAuthStore } from '@store/store';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';

const Confirmation = (): ReactElement => {
  const [, actions] = useAuthStore();

  const onValidate = (): void => {
    actions.signupUser();
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <SubTitle
          text={i18n.t('signup.confirmation')}
          style={styles.subtitle}
        />
        <Button
          text={i18n.t('signup.go')}
          onPress={onValidate}
          isValidate
          isSelected
        />
      </View>
    </Container>
  );
};

export default Confirmation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: layout.padding,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subtitle: {
    fontSize: 26,
    textAlign: 'center',
  },
});
