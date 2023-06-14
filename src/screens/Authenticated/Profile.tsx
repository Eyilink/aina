import React, { Component, ReactElement , useState} from 'react';
import {
  Text,
  StyleSheetProperties,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { format, fromUnixTime } from 'date-fns';
import * as WebBrowser from 'expo-web-browser';
import * as FileSystem from 'expo-file-system'
import * as DocumentPicker from 'expo-document-picker'

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
import { CGU_URL, MALADIE1 } from '@constants/constants';
import Symptoms from './Report/Symptoms';
import NewSuivi from '@components/molecules/NewSuivi';
import Evaluate from '@screens/Authenticated/Evaluate';


function Profile(): ReactElement {
  const [showElements, setShowElements] = useState(false);
  const [user, actions] = useUserStore({ disease: MALADIE1 });
  const [ButtonNewSuiviClicked, setButtonNewSuiviClicked] = React.useState(false);
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

  const onPressCGU = async (): Promise<void> => {
    await WebBrowser.openBrowserAsync(CGU_URL);
  };

  const genererPictogrammeTemperature = (id, metric) => {
    let couleur;

    if (metric < 10) {
      couleur = '#00FFFF'; // Bleu clair
    } else if (metric >= 10 && metric < 20) {
      couleur = '#00FF00'; // Vert
    } else if (metric >= 20 && metric < 30) {
      couleur = '#FFFF00'; // Jaune
    } else {
      couleur = '#FF0000'; // Rouge
    }

    return couleur;
  };

  const handleButtonPress = () => {
    setShowElements(!showElements); // Inverse la valeur de showElements à chaque pression du bouton
  };

  const SymptomTable = () => (
    <View style={styles.container}>
      {symptoms.map((symptom) => (
        <TouchableOpacity key={symptom.value} onPress={onPressCGU}>
          <View style={styles.symptomDetails}>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                display: showElements ? "none" :"flex",
              }}
            >
              <View
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 25,
                  display: showElements ? "none" :"flex",
                  backgroundColor: genererPictogrammeTemperature(
                    symptom.id,
                    symptom.metric
                    
                  ),
                }} />
              <Text style={styles.value}>{symptom.value}</Text>
               
              <Text style={styles.id}>{symptom.id}</Text>
            </View>
          </View>
          <Text style={styles.date}>{symptom.date}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );



  return (
    <Container noMarginBottom>
    
      <View style={styles.container}>
        <Title isPrimary text={i18n.t('navigation.authenticated.profile')} />
        <ScrollView persistentScrollbar>
       
          <View style={styles.titleContainer}>
          {!showElements &&(
            <SubTitle text={user.username} style={styles.username} />
          )}
          </View>
          <View style={styles.infosContainer}>
            {!showElements &&(
            <SubTitle
              text={`${user.age.toString()} ${i18n.t('commons.units.years')}`}
              style={styles.info} />
            )}

          </View>
          
          {user.pregnant && (
            <SubTitle
              text={i18n.t('profile.pregnant')}
              style={styles.pregnant}
            />
          )}
        
          
          
              
          {!showElements && (
          <><SubTitle text={i18n.t('profile.reminder')} style={styles.diseases} /><AppText
              text={user.reminder?.isActive
                ? format(fromUnixTime(user.reminder.date!), "kk'h'mm")
                : i18n.t('commons.none')}
              style={styles.reminder} /></>
          )}
         {ButtonNewSuiviClicked? ( <NewSuivi />  ):(
           
          <Button
            text={'Modifier mon profil'}
            onPress={() => {ValidateButtonNewSuiviPressed(), handleButtonPress()}}
            isValidate
            style={styles.editButton} /> )
          }
          <Button
            text={"Importer des données"}
            onPress={async()=>{
              const document = await DocumentPicker.getDocumentAsync()
              const content = await FileSystem.readAsStringAsync(document.uri)
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







const styles = StyleSheet.create({
  container: {
    paddingTop: layout.padding,
    flex: 1,
    flexDirection:'column',
    
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
  pictogramme: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

 
 
});
export default Profile;


