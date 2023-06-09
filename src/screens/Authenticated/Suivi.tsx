import React, { ReactElement , useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import DropDownMenu from '@components/molecules/DropDownMenu';

import { useReportsStore } from '@store/store';
import { AuthenticatedStackParamList, BottomTabParamList } from '@navigation/types';
import { hasPreviousReportToday } from '@helpers/utils';

import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { DATE_TODAY, MALADIE1 } from '@constants/constants';
import Button from '@components/atoms/Button';
import NewSuivi from '@components/molecules/NewSuivi';
import Title from '@components/atoms/Title';
import BoxHistorique from '@components/atoms/BoxHistorique';
import RecapSuivi from '@components/molecules/RecapSuivi';
import pathologiesJSON from '@assets/json/pathologies.json'
import symptomsJSON from '@assets/json/symptomes.json'
import { Pathologie, Symptome } from '@store/types';
import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';




const Suivi = (): ReactElement => {
  const [reports] = useReportsStore({ disease: MALADIE1 });
  const isNewReportOfDay = !reports || !hasPreviousReportToday(reports);
  const [ButtonNewSuiviClicked, setButtonNewSuiviClicked] = React.useState(false);
  const [ButtonClicked, setButtonClicked] = React.useState(false);

  const symptomeData: Symptome[] = symptomsJSON.map((item: Symptome) => ({
    id: item.id,
    name: item.name,
    type: item.type,
  }));
  const pathologieData: Pathologie[] = pathologiesJSON.map((item: any) => ({
    id: item.id,
    name: item.name,
//    symptoms: symptomeData.filter((symptome: Symptome) => symptome.id == item.symptoms.trim().split(",")),
    symptoms: symptomeData.filter((symptome: Symptome) => item.symptoms.trim().split(",").includes(String(symptome.id)))
  }));

  const ValidateButtonNewSuiviPressed = (): void => {
    setButtonNewSuiviClicked(!ButtonNewSuiviClicked);
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
        {ButtonNewSuiviClicked? <>
          <Ionicons
            name="ios-arrow-round-back"
            size={layout.navigation.previousIcon.size}
            color={colors.black}
            onPress={ValidateButtonNewSuiviPressed}
          />
          <NewSuivi/></>  : 
        <>
          <Title isDate text={i18n.t('commons.today')+DATE_TODAY} />
          <RecapSuivi objet={pathologieData[0]}/>
          <Button
            text={i18n.t('commons.newsuivi')}
            onPress={ValidateButtonNewSuiviPressed}
          />
        </>
        }
        
      
      
      </View>
    </Container>
  );
};



export default Suivi

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