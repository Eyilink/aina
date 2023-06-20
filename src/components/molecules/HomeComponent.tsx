import React, { ReactElement } from 'react';
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

const HomeComponent = ({
    isDataEmpty
}: Props): ReactElement => {
  const [ButtonClicked, setButtonClicked] = React.useState(false);
  const [user, ] = useUserStore({ disease: MALADIE1 });

  const ValidatePressed = () => {
    // Fonction vide qui s'active lorsque vous cliquez sur le bouton Validé
    // Vous pouvez ajouter votre logique ou vos actions ici
    setButtonClicked(!ButtonClicked);
  };
  const dateString = DATE_TODAY;
  const [date, time] = dateString.split(' ');
  const [day, month] = date.split('/');

const parsedDate = `${day}/${month}`;

  return (
    <Container style={styles.container}>
    <Title
          text={user.username+"   " + parsedDate}
        />
    {!ButtonClicked?
      <>
      {isDataEmpty ? 
        <Text style={styles.title}>{i18n.t('home.nodata')}</Text>
      : 
      <>
        <HistoryFollowedSymptoms/>
        {/* <Button
          text="Renseigner une donnée ponctuelle"
          onPress={()=>{}}
          stretch
        /> */}
      </>}

      <Button
        text={i18n.t('commons.newsuivi')}
        style={{minWidth: '90%'}}
        onPress={ValidatePressed}
        stretch
      /></>
    :<>
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
    </Container>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
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
