import React, { ReactElement, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import Previous from '@components/atoms/Previous';

import { useAuthStore } from '@store/store';
import { PublicStackParamList } from '@navigation/types';
import { Diseases as DiseasesType } from '@store/types';

import layout from '@styles/layout';
import i18n from '@i18n/i18n';

type Props = {
  navigation: StackNavigationProp<PublicStackParamList, 'Diseases'>;
};

const Diseases = ({ navigation }: Props): ReactElement => {
  const [diseases, setDiseases] = useState<DiseasesType>({
    diabetes: false,
    heartDisease: false,
    cancer: false,
    breathingDisease: false,
    kidneyDisease: false,
    liverDisease: false,
    immunosuppressantDisease: false,
    immunosuppressantDrug: false,
  });

  const [, actions] = useAuthStore();

  const onValidate = (): void => {
    actions.editUserProfile({ key: 'diseases', value: diseases });
    navigation.navigate('Pregnant');
  };

  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Title text={i18n.t('signup.sectionTitle')} />
          <Previous />
        </View>
        <SubTitle text={i18n.t('signup.questions.diseases')} />
        <ScrollView persistentScrollbar>
          {Object.keys(diseases).map((disease: string) => (
            <Button
              key={disease}
              text={i18n.t(`diseases.${disease}`)}
              onPress={(): void =>
                setDiseases((prevState: DiseasesType) => {
                  prevState[disease] = !prevState[disease];
                  return { ...prevState };
                })
              }
              isSelected={diseases[disease]}
              stretch
            />
          ))}
          <Button
            text={i18n.t('signup.validate')}
            onPress={onValidate}
            isValidate
          />
        </ScrollView>
      </View>
    </Container>
  );
};

export default Diseases;

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
