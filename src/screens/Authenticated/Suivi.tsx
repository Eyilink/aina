import React, { ReactElement , useContext, useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import Container from '@components/molecules/Container';
import DropDownMenu from '@components/molecules/DropDownMenu';

import { useReportsStore, useUserStore } from '@store/store';
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
import { Pathologie, Symptome } from '@store/types';
import { Ionicons } from '@expo/vector-icons';
import colors from '@styles/colors';
import { InformationContext } from '@components/molecules/InformationContext';
import { useFocusEffect } from '@react-navigation/native';
import { ImageContext } from '@components/molecules/ImageContext';





const Suivi = (): ReactElement => {
   // Custom hook for accessing reports data
  const [reports] = useReportsStore({ disease: MALADIE1 });
   // Check if there is a new report for the day
  const isNewReportOfDay = !reports || !hasPreviousReportToday(reports);
   // State variable to track the click on the new suivi button
  const [ButtonNewSuiviClicked, setButtonNewSuiviClicked] = React.useState(false);
    // Custom hooks for accessing user data
  const [ButtonClicked, setButtonClicked] = React.useState(false);
  const [user, actions] = useUserStore({ disease: MALADIE1 });
  const {imageProp,setImageProp} = useContext(ImageContext);
// Function to handle the click on the new suivi button
  const ValidateButtonNewSuiviPressed = (): void => {
    setButtonNewSuiviClicked(!ButtonNewSuiviClicked);
  };
  const {infoText,setinfoText} = useContext(InformationContext);
  useFocusEffect(
    React.useCallback(() => {
      setImageProp(undefined);
      // Code to execute when the component becomes active (tab is focused)
      console.log('Component is focused');
      setinfoText("Je suis dans la page suivi !")
      return () => {
        // Code to execute when the component becomes inactive (tab is unfocused)
        console.log('Component is unfocused');
        setinfoText("");
      };
    }, [])
  );

 
 
  return (
    <Container noMarginBottom>
      <View style={styles.container}>
        <ScrollView>
          
          {ButtonNewSuiviClicked? <>
            <Ionicons
              name="ios-arrow-round-back"
              size={layout.navigation.previousIcon.size}
              color={colors.black}
              onPress={ValidateButtonNewSuiviPressed}
            />
            <NewSuivi setButtonNewSuiviClicked={setButtonNewSuiviClicked}/></>  : 
          <>
            <Title isDate text={i18n.t('commons.today')+DATE_TODAY} />
            {user.my_personal_datas?user.my_personal_datas.filter(p=>p.id != "21").map((pathologie: Pathologie) => 
              
                pathologie && pathologie.symptoms && pathologie.symptoms.length > 0 && (<RecapSuivi objet={pathologie} />)
              ):null
              }
            <Button
              text={i18n.t('commons.newsuivi')}
              onPress={ValidateButtonNewSuiviPressed}
            />
          </>
          }
        
      
        </ScrollView>
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
