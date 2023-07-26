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

import { useAuthStore, useUserStore, useUsersStore } from '@store/store';

import colors from '@styles/colors';
import layout from '@styles/layout';
import fonts from '@styles/fonts';
import i18n from '@i18n/i18n';
import { CGU_URL, DATE_TODAY, MALADIE1, symptomeJSON } from '@constants/constants';
import Symptoms from './Report/Symptoms';
import NewSuivi from '@components/molecules/NewSuivi';
import BoxPathologieProfile from '@components/atoms/BoxPathologieProfile';
import { Pathologie, Symptome } from '@store/types';
import GeneratedDocument from "@components/atoms/GeneratedDocument.tsx"
import * as Sharing from "expo-sharing"
import * as Print from "expo-print"
import { ImageContext } from '@components/molecules/ImageContext';
import ProfileAskPersonal from '@components/molecules/ProfileAskPersonnal';
import { InformationContext } from '@components/molecules/InformationContext';
import { useFocusEffect } from '@react-navigation/native';
import Diseases from '@screens/Public/Diseases';
function Profile(): ReactElement {
  // State variable to toggle the visibility of elements
  const [showElements, setShowElements] = useState(false);
   // Custom hooks for accessing user data
  const [, actions] = useAuthStore();
  const [user, ] = useUserStore({ disease: MALADIE1 });
  const [ButtonNewSuiviClicked, setButtonNewSuiviClicked] = React.useState(false);
  // State variable to manage the colors of pictos
  const [couleursPictos, setCouleursPictos] = React.useState<Boolean[]>([true]);
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);
  const {imageProp, setImageProp } = useContext(ImageContext);
  const {infoText,setinfoText} = useContext(InformationContext);
  const [isMod , setIsMod] = useState(false);
  const [code,setCode] = useState<string>(user.code);
  const [nom, setNom] = useState<string>(user.nom);
  const [dateNaissance, setDateNaissance] = useState<string>(user.birthDate);
  const [prenom, setPrenom] = useState<string>(user.prenom);
  const [tel, setTel] = useState<string>(user.tel);
  const [mail, setMail] = useState<string>(user.mail);
  const[users,actions_users] = useUsersStore();
  useFocusEffect(
    
    React.useCallback(() => {
      
      // Code to execute when the component becomes active (tab is focused)
      console.log('Mon utilisateur date naissance est :' + user.birthDate);
      console.log('Mon utilisateur date naissance est :' + user.code);
      console.log('Mon utilisateur date naissance est :' + user.nom);
      console.log('Mon utilisateur date naissance est :' + user.prenom);
      console.log('Mon utilisateur date naissance est :' + user.tel);
      console.log('Mon utilisateur date naissance est :' + user.mail);
      user.my_personal_datas.forEach(p => p.symptoms.filter(item => item.id === 41 ||
        item.id === 42 ||
        item.id === 43 ||
        item.id === 122 ||
        item.id === 133 ||
        item.id === 131 ||
        item.id === 251 ||
        item.id === 252 ||
        item.id === 253 ||
        item.id === 254 ||
        item.id === 255 ||
        item.id === 256 ||
        item.id === 257).forEach(f=> console.log(f.name + "| +++ |" + f.data)));
      setinfoText("Je suis dans la page profile !");
      setImageProp(undefined);
      return () => {
        // Code to execute when the component becomes inactive (tab is unfocused)
        console.log('Component is unfocused');
        setinfoText("");
      };
    }, [])
  );
// Function to handle editing the profile
  const onEditProfile = (): void => {
    // Alert.alert(
    //   i18n.t('commons.attention'),
    //   i18n.t('profile.erase'),
    //   [
    //     { text: i18n.t('commons.errors.cancel'), style: 'cancel' },
    //     {
    //       text: i18n.t('commons.errors.ok'),
    //       onPress: (): Promise<void> => actions.resetUserSession(),
    //     },
        
    //   ],
    //   { cancelable: false }
    // );
    setValid(true)
    setIsMod(true);
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
  function calculateBMI(weightString: string | undefined, heightString: string | undefined): number | undefined {
    if (weightString === undefined || heightString === undefined) {
      return undefined; // Return null if either weight or height is undefined
    }
  
    const weight = parseFloat(weightString.replace(/[^\d.]/g, ''));
    const height = parseFloat(heightString.replace(/[^\d.]/g, ''));
  
    if (isNaN(weight) || isNaN(height) || height === 0) {
      return undefined; // Return null if either weight or height is not a valid number, or if height is zero to avoid division by zero
    }
  
    const heightInMeters = height / 100; // Convert height from centimeters to meters
  
    const bmi = weight / (heightInMeters * heightInMeters);
    return bmi;
  }
  
  const addValueUser = (sympt: Symptome, val: string) => {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();

    const formattedDate = `${day}/${month}/${year}`;
    // Iterate over each pathology in my_personal_datas
    user.my_personal_datas.forEach((pathology) => {
      // Find the symptoms with the same id as the provided sympt
      const symptomsToUpdate = pathology.symptoms.filter((symptom) => symptom.id === sympt.id);
  
      // Update the data field of each matching symptom

      if (symptomsToUpdate[0]) {
      
      const newData = { date: formattedDate, valeur: val };

      if (!symptomsToUpdate[0].data) {
        // If data field doesn't exist, create a new array with the new data
        symptomsToUpdate[0].data = [newData];
      } else {
        // If data field already exists, concatenate the new data to the existing array
        symptomsToUpdate[0].data = symptomsToUpdate[0].data.concat(newData);
        }
      }

    console.log(pathology.symptoms);  
    console.log("Value added !")  
    });
  };

const [vali , setValid] = useState(true);
  return (
    <Container noMarginBottom>
    
      <View style={styles.container}>
        <View style={styles.container2}>
        {!isMod ? null : (!vali ? <Title isPrimary text={i18n.t('navigation.authenticated.profile')} /> : null)}
        </View>
        <ScrollView>
        {!isMod ? (
  <>
    {/* Content for the condition when isMod is false */}
    
    {/* <View style={styles.infosContainer}>
      <SubTitle text={user.birthDate} style={styles.info} />
    </View> */}
    
    {user.my_personal_datas?.filter(p => p.id != "21").map((pathologie: Pathologie) => (
      <BoxPathologieProfile objet={pathologie} />
    ))}
    <Button
      text={"Ajouter un utilisateur"}
      onPress={()=>{
        actions_users.replaceUser(user);
        actions_users.saveUsersToAsyncStorage();
        actions.resetUserSession();
      }}
      isValidate
      style={styles.editButton}
    />
    {/* <Button
      text={"save d'utilisateur"}
      onPress={()=>{
        actions.saveUsersToAsyncStorage();
        
       
      }}
      isValidate
      style={styles.editButton}
    /> */}
    <Button
      text={"get d'utilisateur"}
      onPress={()=>{
        actions.getUsersFromAsyncStorage();
        
       
      }}
      isValidate
      style={styles.editButton}
    />
    <Button
      text={i18n.t('profile.edit')}
      onPress={onEditProfile}
      isValidate
      style={styles.editButton}
    />
    <Button
      text={'Exporter les données'}
      onPress={async () => {
        // Export data logic
      }}
    />
  </>
) : (
  <>
    {/* Content for the condition when isMod is true */}
    {!vali ? (
      <>
        {/* Content for the condition when vali is false */}
        <ProfileAskPersonal
                      nameText={'Nom : '}
                      inputPlaceholder={''}
                      displayPersonal
                      onTextChange={(text: string) => setNom(text)} 
                      initValue={user.nom}                  />
                  <ProfileAskPersonal
                    nameText={'Date de nais. : '}
                    inputPlaceholder={''}
                    displayPersonal
                    onTextChange={(text: string) => setDateNaissance(text)}
                    initValue={user.birthDate} 
                  />
                  <ProfileAskPersonal
                    nameText={'Prénom : '}
                    inputPlaceholder={''}
                    displayPersonal={false}
                    onTextChange={(text: string) => setPrenom(text)}
                    initValue={user.prenom} 
                  />
                  <ProfileAskPersonal
                    nameText={'Code : '}
                    inputPlaceholder={''}
                    displayPersonal={false}
                    onTextChange={(text: string) => setCode(text)}
                    initValue={user.code} 
                  />
                  <ProfileAskPersonal
                    nameText={'Tel : '}
                    inputPlaceholder={''}
                    displayPersonal
                    onTextChange={(text: string) => setTel(text)}
                    initValue={user.tel} 
                  />
                  <ProfileAskPersonal
                    nameText={'Mail : '}
                    inputPlaceholder={''}
                    displayPersonal
                    onTextChange={(text: string) => setMail(text)}
                    initValue={user.mail} 
                  />
                  <Button
                    text={'Valider'}
                    isSelected
                    onPress={() => {
                      // setValid(!vali);
                      actions.editUserProfile({ key: 'code', value: code ? code.trim() : "" });
                      actions.editUserProfile({ key: 'nom', value: nom ? nom.trim() : "" });
                      actions.editUserProfile({ key: 'birthDate', value: dateNaissance ? dateNaissance.trim() : "" });
                      actions.editUserProfile({ key: 'prenom', value: prenom ? prenom.trim() : "" });
                      actions.editUserProfile({ key: 'tel', value: tel ? tel.trim() : "" });
                      actions.editUserProfile({ key: 'mail', value: mail ? mail.trim() : "" });
                     
                    }}
                  />
      </>
    ) : (
      <>
        {/* Content for the condition when vali is true */}
        {symptomeJSON
          .filter((item) => {
            return (
              item.id === 41 ||
              item.id === 42 ||
              item.id === 43 ||
              item.id === 122 ||
              item.id === 133 ||
              item.id === 131 ||
              item.id === 251 ||
              item.id === 252 ||
              item.id === 253 ||
              item.id === 254 ||
              item.id === 255 ||
              item.id === 256 ||
              item.id === 257
            );
          })
          .map((item) => {
            return (
              <ProfileAskPersonal
                nameText={item.name}
                inputPlaceholder={item.unit}
                displayPersonal={item.caractere === 'Perso'}
                initValue={item.id === 43 && calculateBMI(user.my_personal_datas.find(p=>p.id=="21")?.symptoms.find(s=>s.id== 42)?.data?.slice(-1)[0].valeur.toString() , user.my_personal_datas.find(p=>p.id=="21")?.symptoms.find(s=>s.id== 41)?.data?.slice(-1)[0].valeur.toString())  ? calculateBMI(user.my_personal_datas.find(p=>p.id=="21")?.symptoms.find(s=>s.id== 42)?.data?.slice(-1)[0].valeur.toString() , user.my_personal_datas.find(p=>p.id=="21")?.symptoms.find(s=>s.id== 41)?.data?.slice(-1)[0].valeur.toString())    :user.my_personal_datas.find(p=>p.id=="21")?.symptoms.find(s=>s.id==item.id)?.data?.slice(-1)[0].valeur}
                onTextChange={(text:string)=>{ addValueUser(item,text);
                }}
              />
            );
          })}
           <Button
      text={'Valider'}
      isSelected
      onPress={() => {
        setIsMod(false);
        actions.saveUserProfile();
        actions.signupUser();
      }}
    />
      </>
    )}
   
  </>
)}

          
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
    
  },
  cgu: {
    textAlign: 'center',
    fontSize: fonts.label.fontSize,

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