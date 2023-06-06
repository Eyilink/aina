import React, { ReactElement , useState, useEffect } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Assets, StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import DropDownMenu from '@components/molecules/DropDownMenu';

import { useReportsStore } from '@store/store';
import { AuthenticatedStackParamList } from '@navigation/types';
import { hasPreviousReportToday } from '@helpers/utils';

import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { DATE_TODAY, MALADIE1 } from '@constants/constants';

import AddBoutton from '@components/atoms/AddBoutton';
import Button from '@components/atoms/Button';
import pathologiesJSON from '@assets/json/pathologies.json'
import symptomsJSON from '@assets/json/symptomes.json'


type Symptome = {
  id: number;
  name: string;
  type: string;
}

type Pathologie = {
  id: string;
  name: string;
  symptoms: Symptome[];
}

type Props = {
  navigation: StackNavigationProp<AuthenticatedStackParamList, 'Temperature'>;
};

const Evaluate = ({ navigation}: Props): ReactElement => {
  const [reports] = useReportsStore({ disease: MALADIE1 });
  const isNewReportOfDay = !reports || !hasPreviousReportToday(reports);
  const [ButtonClicked, setButtonClicked] = React.useState(false);
  
  const symptomeData: Symptome[] = symptomsJSON.map((item: Symptome) => ({
    id: item.id,
    name: item.name,
    type: item.type,
  }));
  const pathologieData: Pathologie[] = pathologiesJSON.map((item: any) => ({
    id: item.id,
    name: item.name,
    symptoms: symptomeData.filter((symptome: Symptome) => symptome.id == item.symptoms),
  }));

  

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

      {ButtonClicked ? (<> 
        <DropDownMenu objets={pathologieData} ischeckeable={true}/> 
        <Button
          text={i18n.t('commons.validate')}
          onPress={ValidatePressed}
          isValidate
          stretch
        />
        </>) : (
        <>
          <DropDownMenu objets={pathologieData} ischeckeable={false}/>
          <AddBoutton onPress={handlePress} style={styles.button}></AddBoutton>
        </>
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
