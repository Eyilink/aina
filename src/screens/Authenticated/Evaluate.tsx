import React, { ReactElement } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';

import { useReportsStore } from '@store/store';
import { AuthenticatedStackParamList } from '@navigation/types';
import { hasPreviousReportToday } from '@helpers/utils';

import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { DATE_TODAY, MALADIE1 } from '@constants/constants';

import AddBoutton from '@components/atoms/AddBoutton';
import Button from '@components/atoms/Button';


type Pathologie = {
  nom: string
}

type Symptome = {
  nom: string
}

type Props = {
  navigation: StackNavigationProp<AuthenticatedStackParamList, 'Temperature'>;
  ButtonClicked : boolean ;
};

const Evaluate = ({ navigation}: Props): ReactElement => {
  const [reports] = useReportsStore({ disease: MALADIE1 });
  const isNewReportOfDay = !reports || !hasPreviousReportToday(reports);
  const [ButtonClicked, setButtonClicked] = React.useState(false);
  
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

  

  const handlePress = () => {
    //     // Fonction vide qui s'active lorsque vous cliquez sur le bouton ADD
    //     // Vous pouvez ajouter votre logique ou vos actions ici
    setButtonClicked(!ButtonClicked);
  };
  const ValidatePressed = () => {
    //     // Fonction vide qui s'active lorsque vous cliquez sur le bouton Validé
    //     // Vous pouvez ajouter votre logique ou vos actions ici
    setButtonClicked(!ButtonClicked);
  };

  // const onStartReport = (): void => {
  //   if (!isNewReportOfDay) {
  //     Alert.alert(
  //       i18n.t('commons.attention'),
  //       i18n.t('evaluate.erase'),
  //       [
  //         { text: i18n.t('commons.errors.cancel'), style: 'cancel' },
  //         {
  //           text: i18n.t('commons.errors.ok'),
  //           onPress: (): void => navigation.navigate('Temperature'),
  //         },
  //       ],
  //       { cancelable: false },
  //     );
  //   } else navigation.navigate('Temperature');
  // };

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

      {ButtonClicked ? (<> <DropDownMenu objets={pathologies} objets2={symptome} ischeckeable={true}/> <Button
          text={i18n.t('commons.validate')}
          onPress={ValidatePressed}
          isValidate
          stretch
        />
        </>) : (<>
        <DropDownMenu objets={pathologies} objets2={symptome} ischeckeable={false}/>
        <AddBoutton onPress={handlePress} style={styles.button}></AddBoutton></>
        )}  
      
      
      </View>
    </Container>
  );
};



export default Evaluate

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
  button: {
    alignItems: 'center',
    justifyContent: 'center',

  },
});
