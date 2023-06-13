import React, { ReactElement } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import i18n from '@i18n/i18n';
import Title from '@components/atoms/Title';
import { View,Text,StyleSheet } from 'react-native';
import Button from '@components/atoms/Button';
import HistoryFollowedSymptoms from '@components/atoms/HistoryFollowedSymptoms';
import  {DATE_TODAY} from '@constants/constants';
import NewSuivi from './NewSuivi';
import { Ionicons } from '@expo/vector-icons';
import layout from '@styles/layout';
import colors from '@styles/colors';


type Props = {
  isDataEmpty?: boolean;
  
};

const HomeComponent = ({
    isDataEmpty
}: Props): ReactElement => {
  const [ButtonClicked, setButtonClicked] = React.useState(false);


  const ValidatePressed = () => {
    // Fonction vide qui s'active lorsque vous cliquez sur le bouton Validé
    // Vous pouvez ajouter votre logique ou vos actions ici
    setButtonClicked(!ButtonClicked);
  };

  return (
    <View style={styles.container}>
    <Title
          text={DATE_TODAY}
        />
    {!ButtonClicked?

    isDataEmpty ? (<>
      <Text style={styles.title}>Vous ne suivez actuellement aucune données.</Text>
        <Button
          text={i18n.t('commons.newsuivi')}
          style={{minWidth: '90%'}}
          onPress={ValidatePressed}
          stretch
        />
        </>) 
      : <><HistoryFollowedSymptoms/>
    <Button
      text="Renseigner une donnée ponctuelle"
      onPress={()=>{}}
      stretch
    /></>
  :<>
    <Ionicons
      name="ios-arrow-round-back"
      size={layout.navigation.previousIcon.size}
      color={colors.black}
      onPress={ValidatePressed}
    />
    <NewSuivi onPress={ValidatePressed}/>
  </>}
    </View>
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
    }
  });
  

export default HomeComponent;
