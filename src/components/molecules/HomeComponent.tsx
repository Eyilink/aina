import React, { ReactElement } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import i18n from '@i18n/i18n';
import Title from '@components/atoms/Title';
import { View,Text,StyleSheet } from 'react-native';
import Button from '@components/atoms/Button';
import HistoryFollowedSymptoms from '@components/atoms/HistoryFollowedSymptoms';
import  {DATE_TODAY} from '@constants/constants';

type Props = {
  isDataEmpty?: boolean;
  
};

const HomeComponent = ({
    isDataEmpty
}: Props): ReactElement => {
  

  return (
    <View style={styles.container}>
    <Title
          text={DATE_TODAY}
          style={styles.title}
        />

    {isDataEmpty ? (<>
          <Text style={styles.title}>Vous ne suivez actuellement aucune données.</Text>
          <Button
        text="Lancer un suivi"
        style={{minWidth: '90%'}}
        onPress={()=>{}}
        stretch
      /></>) : <><HistoryFollowedSymptoms/></>
    }
    <Button
      text="Renseigner une donnée ponctuelle"
      onPress={()=>{}}
      stretch
    />

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
