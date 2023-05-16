import React, { ReactElement } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { AntDesign } from '@expo/vector-icons';
import i18n from '@i18n/i18n';
import { View,Text,StyleSheet } from 'react-native';

type Props = {
  isHealthy: boolean;
  
};

const HomeComponent = ({
    isHealthy 
}: Props): ReactElement => {
  

  return (
    <View style={styles.container}>
    <AntDesign name="hearto" size={96} color={isHealthy ? 'green' : 'red'} />
    <Text style={[styles.title, !isHealthy && styles.redText]}>{'\n\n'}Lors de votre derniere évaluation vous n'aviez pas de symptomes , mais n'hesitez pas à vous évaluer régulièrement !
    {'\n\n'}Protégez vous et vos proches ! Vous pouvez être contagieux même sans symptômes !</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'green',
      textAlign: 'center' // Specify the desired color here
    },
    redText: {
        color: 'red'
    }
  });
  

export default HomeComponent;
