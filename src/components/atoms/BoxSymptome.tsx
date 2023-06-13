import React, { ReactElement } from 'react';
import { View } from 'react-native';
import AppText from '@components/atoms/AppText';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Symptome } from '@store/types';
import { format } from 'date-fns';
import fr from 'date-fns/locale/fr';
import moment from 'moment';


  type Props = {
    objet:Symptome;
  };

const BoxSymptome = ({ objet }: Props): ReactElement => {
    const onPressnath = (): void => {
        // Faire quelque chose lorsqu'on appuie sur la boîte
      };
      objet.data ? console.log(objet.data[objet.data.length - 1].date) : (true);
      const dateString = objet.data ? objet.data[objet.data.length - 1].date : "(tr";
      //const date = objet.data ? new Date(objet.data[objet.data.length - 1].date) : new Date("01/01/2021");
      const date = moment(dateString, 'DD/MM/YYYY');
      const formattedDate = date.locale('fr').format('dddd D MMMM');
      //const formattedDate = ""; // format(date, 'EEEE d MMMM', { locale: fr })
      
    
  
      return (
        <TouchableOpacity onPress={onPressnath} style={styles.namestyle}>
          <View>
            <AppText text={objet.name} style={styles.title} />
            {objet.frequence ? <AppText text={formattedDate} style={styles.subtitle} /> : null}
          </View>
          <View style={styles.valuestyle}>
            {objet.data && objet.type ? (
              objet.type === "num" ? (
                <AppText text={objet.data[objet.data.length - 1].valeur.toString() + " /10"} />
              ) : (
                <AppText text={objet.data[objet.data.length - 1].valeur.toString() + " " + objet.type} />
              )
            ) : null}
          </View>
        </TouchableOpacity>
      );
    
};

const styles = StyleSheet.create({
  namestyle: {
    justifyContent:'space-around',
    flexDirection: 'row',
    marginTop:20,

  },
  title: {
    fontSize: 24,
  }, 
  subtitle:{
    fontSize: 16,
  },
  valuestyle: {
    flexDirection:'column',
    justifyContent:'space-between',

  },
});

  
  export default BoxSymptome;
  