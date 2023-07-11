import React, { Component, ReactElement , useContext, useEffect, useReducer, useState} from 'react';
import {
  Text,
  StyleSheetProperties,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType, 
} from 'react-native';
import { format, fromUnixTime } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';


import Container from '@components/molecules/Container';
import Title from '@components/atoms/Title';
import SubTitle from '@components/atoms/SubTitle';
import AppText from '@components/atoms/AppText';
import Button from '@components/atoms/Button';

import { useUserStore } from '@store/store';

import colors from '@styles/colors';
import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { CGU_URL, DATE_TODAY, MALADIE1 } from '@constants/constants';
import Symptoms from './Report/Symptoms';
import NewSuivi from '@components/molecules/NewSuivi';
import BoxPathologieProfile from '@components/atoms/BoxPathologieProfile';
import { Pathologie } from '@store/types';
import GeneratedDocument from "@components/atoms/GeneratedDocument.tsx"
import * as Sharing from "expo-sharing"
import * as Print from "expo-print"
import { ImageContext } from '@components/molecules/ImageContext';
import ProfileAskPersonal from '@components/molecules/ProfileAskPersonnal';
function Profile(): ReactElement {
  // State variable to toggle the visibility of elements
  const [showElements, setShowElements] = useState(false);
   // Custom hooks for accessing user data
  const [user, actions] = useUserStore({ disease: MALADIE1 });
  const [ButtonNewSuiviClicked, setButtonNewSuiviClicked] = React.useState(false);
  // State variable to manage the colors of pictos
  const [couleursPictos, setCouleursPictos] = React.useState<Boolean[]>([true]);
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);
  const {imageProp, setImageProp } = useContext(ImageContext);
useEffect(()=>{console.log("useefect profile works");setImageProp('avq.png')},[])
// Function to handle editing the profile
  const onEditProfile = (): void => {
    Alert.alert(
      i18n.t('commons.attention'),
      i18n.t('profile.erase'),
      [
        { text: i18n.t('commons.errors.cancel'), style: 'cancel' },
        {
          text: i18n.t('commons.errors.ok'),
          onPress: (): Promise<void> => actions.resetUserSession(),
        },
        
      ],
      { cancelable: false }
    );
  };
    // Function to handle the button click for new suivi
 const ValidateButtonNewSuiviPressed = (): void => {
    <NewSuivi/>
    setButtonNewSuiviClicked(!ButtonNewSuiviClicked);
  };
  let couleur = 0;
  const symptoms = [
    { id: 1, date: '2023-06-01', metric: 30, value: 'Fever' },
    { id: 2, date: '2023-06-02', metric: 10, value: 'Cough' },
    { id: 3, date: '2023-06-03', metric: 20, value: 'Headache' },
  ];
  // Function to handle pressing the CGU link
  const onPressCGU = async (): Promise<void> => {
    await WebBrowser.openBrowserAsync(CGU_URL);
  };


  return (
    <Container noMarginBottom>
    
      <View style={styles.container}>
        <View style={styles.container2}>
        <Title isPrimary text={i18n.t('navigation.authenticated.profile')} />
        </View>
        <ScrollView>
       
          {/* <View style={styles.titleContainer}>
            <SubTitle text={user.username} style={styles.username} />
          </View>
          <View style={styles.infosContainer}>
            <SubTitle
              text={user.birthDate}
              style={styles.info} />

          </View>
          
          {user.my_personal_datas?.map((pathologie: Pathologie) => (<BoxPathologieProfile objet={pathologie}/>))} */}


          <ProfileAskPersonal nameText={'Nom : '} inputPlaceholder={'Entrer votre nom'} displayPersonal />
          <ProfileAskPersonal nameText={'Date de nais. : '} inputPlaceholder={'Entrer votre date de naissance'} displayPersonal />
          <ProfileAskPersonal nameText={'Prénom : '} inputPlaceholder={''} displayPersonal={false}  />
          <ProfileAskPersonal nameText={'Code : '} inputPlaceholder={''} displayPersonal={false}  />
          <ProfileAskPersonal nameText={'Tel : '} inputPlaceholder={''} displayPersonal />
          <ProfileAskPersonal nameText={'Mail : '} inputPlaceholder={''} displayPersonal />
          <Button text={'Valider'} isSelected onPress={function (): void {

          } } />


          <Button
            text={i18n.t('profile.edit')}
            onPress={onEditProfile}
            isValidate
            style={styles.editButton} />

          <Button
            text={"Exporter les données"}
            onPress={async()=>{

              function tohtml(re){
                if(typeof re!="object") {
                  return re
                } else if(re.map) {
                  return re.map(tohtml).join("")
                } else if(re.type.call) {
                  return tohtml(re.type(re.props))
                }else{
                  return (
                    "<"+re.type+" "+Object.keys(re.props).map(p=>{
                      if(p=="children")return"";
                      return p+"="+'"'+re.props[p]+'"'
                    }).join("")+">"+(()=>{
                      let children
                      if(!re.props.children)
                        children=[]
                      else if (!re.props.children.map)
                        children = [re.props.children]
                      else
                        children = re.props.children
                      return tohtml(children)
                    })()+"</"+re.type+">"
                  )
                }
              }

              function getUserData(user) {
                const symptoms = new Map()
                const pathologies = user.my_personal_datas||[]
                pathologies.forEach(patho=>{
                  patho.symptoms.forEach(spt=>{
                    symptoms.set(
                      spt.id.toString(),
                      spt
                    )
                  })
                })
                return {
                  pathologies:pathologies,
                  symptoms:[...symptoms.values()]
                }
              }
              const html = tohtml(GeneratedDocument({
                userData:getUserData(user)
              }))
              
              const { uri } = await Print.printToFileAsync({
                html: html
              })
              await Sharing.shareAsync(
                uri
              )
            }}
          />
          <TouchableOpacity onPress={onPressCGU}>
            <AppText text={i18n.t('profile.cgu')} style={styles.cgu} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Container>
  );
}




export default Profile;



const styles = StyleSheet.create({
  container: {

    flex: 1,
    flexDirection:'column',

  },
  container2: {
    
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 10

  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontFamily: fonts.weight.bold.fontFamily,
    fontSize: fonts.sections.fontSize,
    marginRight: layout.padding,
  },
  infosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: layout.padding,
  },
  pathologieContainer: {
    padding: 10,
    marginBottom: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:colors.greyLight,
    borderRadius: 20,
  },
  info: {
    marginBottom: 0,
    paddingVertical: 10,
    marginHorizontal: 0,
  },
  separator: {
    borderLeftWidth: 1,
    borderLeftColor: colors.black,
    height: '100%',
  },
  pregnant: {
    fontFamily: fonts.weight.bold.fontFamily,
    marginTop: layout.padding,
    marginBottom: 0,
  },
  diseases: {
    fontFamily: fonts.weight.bold.fontFamily,
    marginTop: layout.padding,
    marginBottom: layout.padding / 2,
  },
  disease: {
    marginBottom: layout.padding / 2,
  },
  reminder: {
    marginHorizontal: layout.padding,
  },
  editButton: {
    marginTop:layout.padding * 5,
    marginBottom: layout.padding ,
  },
  cgu: {
    textAlign: 'center',
    fontSize: fonts.label.fontSize,
    marginTop:(-25),
    marginBottom: layout.padding,
    textDecorationLine: 'underline',
    color: colors.greyDark,
    
  },
  cell: {

    flex: 1,
    borderWidth: 1,
    padding: 8,

  },
 
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  symptomDetails: {
    flex: 2,
    flexDirection: 'column',
    marginBottom:layout.padding / 3,
    marginTop:layout.padding,
    
    
  },
  value: {
    //fontWeight: 'bold',
    marginHorizontal: layout.padding * 2,
    marginTop: (0) ,
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: 20,
  },
  date: {
    fontStyle: 'italic',
    fontSize: 12,
  },
  id: {
    flex: 1,
    //fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 20,
  },
  couleur: {
    width: 50,
    height: 50,
    //backgroundColor: genererPictogrammeTemperature(symptoms.id),
    backgroundColor: colors.black

  },
  couleurVert:{
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: colors.green
  },
  couleurRouge:{
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: colors.orange
  },
  pictogramme: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    marginLeft: 25,
    lineHeight: fonts.subtitle.fontSize + 3,
    textAlign: 'center',
  },
 
 
});