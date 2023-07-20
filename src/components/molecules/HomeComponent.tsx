import React, { ReactElement, useState } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import i18n from '@i18n/i18n';
import Title from '@components/atoms/Title';
import { View,Text,StyleSheet } from 'react-native';
import Button from '@components/atoms/Button';
import HistoryFollowedSymptoms from '@components/atoms/HistoryFollowedSymptoms';
import  {DATE_TODAY, MALADIE1} from '@constants/constants';
import NewSuivi from './NewSuivi';
import { Ionicons } from '@expo/vector-icons';
import layout from '@styles/layout';
import colors from '@styles/colors';
import Container from './Container';
import { useUserStore } from '@store/store';


type Props = {
  isDataEmpty?: boolean;
  
};
// HomeComponent represents the main home screen of the application.
const HomeComponent = ({
    isDataEmpty
}: Props): ReactElement => {
  const [ButtonClicked, setButtonClicked] = React.useState(false);
  const [user, ] = useUserStore({ disease: MALADIE1 });
  const [carryOnSuivi, setCarryOnsuivi] = useState(false);
  const [rData,setRData] = useState(false);

    // ValidatePressed is triggered when the validation button is pressed.
  // It toggles the ButtonClicked state.

  const ValidatePressed = () => {
    
    setButtonClicked(!ButtonClicked);
  };
  const dateString = DATE_TODAY;
  const [date, time] = dateString.split(' ');
  const [day, month] = date.split('/');

const parsedDate = `${day}/${month}`;

  return (
    <View style={styles.container}>
    
    {!ButtonClicked? 
      <>
        {/* If isDataEmpty is true, display a message indicating no data */}
      {isDataEmpty ? 
        <Text style={styles.title}>{i18n.t('home.nodata')}</Text>
      : 
      <>
        {carryOnSuivi ? <>
        <HistoryFollowedSymptoms/>
        <Button text={'Fermer les suivis'} onPress={()=>{setCarryOnsuivi(false)}}/>
         </>: null }
        {/* <Button
          text="Renseigner une donnée ponctuelle"
          onPress={()=>{}}
          stretch
        /> */}
      </>}
{/* Display the validation button */}
{carryOnSuivi ? null : (<>
<Button
        text={'Continuer un suivi'}
        style={{minWidth: '90%'}}
        onPress={()=>{setCarryOnsuivi(true)}}
        
      />
      <Button
        text={'Lancer un suivi'}
        style={{minWidth: '90%'}}
        onPress={ValidatePressed}
        
      />
      <Button
        text={'Renseigner une donnée'}
        style={{minWidth: '90%'}}
        onPress={()=>{}}
        
      /></>) }
      </>
    :<>
        {/* Display the back button that allows to go back to the previous screen */}
      <Ionicons
        name="ios-arrow-round-back"
        size={layout.navigation.previousIcon.size}
        color={colors.black}
        onPress={ValidatePressed}
        style={{marginLeft:12}}
      />
      <View style={styles.newsuivicontainer}>
      <NewSuivi onPress={ValidatePressed} setButtonNewSuiviClicked={setButtonClicked}/>
      </View>
    </>
    }
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'

    },
    custom_title: { 
      fontSize: 30,
 
      textAlign: 'center'
    },
    title: {
      fontSize: 24,
      
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      marginBottom: '60%'
    },
    newsuivicontainer: {
      flex: 1,
      
    }
  });
  

export default HomeComponent;
