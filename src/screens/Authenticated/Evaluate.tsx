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


const Evaluate = (): ReactElement => {
  const [reports] = useReportsStore({ disease: MALADIE1 });
  const isNewReportOfDay = !reports || !hasPreviousReportToday(reports);
  const [ButtonNewSuiviClicked, setButtonNewSuiviClicked] = React.useState(false);
  const [ButtonClicked, setButtonClicked] = React.useState(false);

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
        {ButtonNewSuiviClicked? <NewSuivi></NewSuivi>  : <Button
          text={i18n.t('commons.validate')}
          onPress={ValidateButtonNewSuiviPressed}
          stretch
        />
        }
        
      
      
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
