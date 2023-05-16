import React, { ReactElement , useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
<<<<<<< HEAD
//import * as XLSX from 'xlsx';
//import * as fs from 'fs';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import Button from '@components/atoms/Button';
import AddBoutton from '@components/atoms/AddBoutton';

=======

import Container from '@components/molecules/Container';
import DropDownMenu from '@components/molecules/DropDownMenu';
>>>>>>> origin/main

import { useReportsStore } from '@store/store';
import { AuthenticatedStackParamList } from '@navigation/types';
import { hasPreviousReportToday } from '@helpers/utils';

import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { DATE_TODAY, MALADIE1 } from '@constants/constants';

<<<<<<< HEAD
import { Text, TouchableOpacity } from 'react-native';
=======
type Pathologie = {
  nom: string
}

type Symptome = {
  nom: string
}
>>>>>>> origin/main

type Props = {
  navigation: StackNavigationProp<AuthenticatedStackParamList, 'Temperature'>;
};

const Evaluate = ({ navigation }: Props): ReactElement => {
  const [reports] = useReportsStore({ disease: MALADIE1 });
  const isNewReportOfDay = !reports || !hasPreviousReportToday(reports);
  
  // Exemple :
  const pathologies: Pathologie[] = [
    { nom: 'COVID-19' },
    { nom: 'Grippe' },
    { nom: 'Rhume' },
  ];
  const symptome: Symptome[] = [
    { nom: 'toux' },
    { nom: 'temperature' },
  ];

  const onStartReport = (): void => {
    if (!isNewReportOfDay) {
      Alert.alert(
        i18n.t('commons.attention'),
        i18n.t('evaluate.erase'),
        [
          { text: i18n.t('commons.errors.cancel'), style: 'cancel' },
          {
            text: i18n.t('commons.errors.ok'),
            onPress: (): void => navigation.navigate('Temperature'),
          },
        ],
        { cancelable: false },
      );
    } else navigation.navigate('Temperature');
  };

  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        {/* <Title isPrimary isDate isCenter text={DATE_TODAY} />
        {!isNewReportOfDay ? (
          <SubTitle text={i18n.t('evaluate.restart')} style={styles.subtitle} />
        ) : (
          <SubTitle text={i18n.t('evaluate.start')} style={styles.subtitle} />
        )}
        <Button
          text={i18n.t('commons.validate')}
          onPress={onStartReport}
          isValidate
          stretch
        /> */}
        
      <DropDownMenu objets={pathologies} objets2={symptome} />
      </View>
    </Container>
  );
};

//export default Evaluate;
const selectedSymptomes = [''];

const SymptomesMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
   // liste des symptomes selectionnés
  


  const symptomes = ['Symptome 1', 'Symptome 2', 'Symptome 3' ];

  const handleMenuPress = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSymptomePress = (symptome: string) => {
    selectedSymptomes.push(symptome); // ajouter le symptome selectionné à la liste des symptomes selectionnés
    console.log(selectedSymptomes);
    setMenuOpen(false); // fermer le menu déroulant
  };

  return (
    
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      <AddBoutton
      />
      <Button text={'sdjhkfs'} onPress={handleMenuPress}/>
    </View>
  );
};

export default SymptomesMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: layout.padding,
  },
  subtitle: {
    marginTop: layout.padding * 2,
    fontSize: fonts.sections.fontSize,
    textAlign: 'center',
  },
});
