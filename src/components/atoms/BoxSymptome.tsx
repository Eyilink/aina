import React, { ReactElement } from 'react';
import { View } from 'react-native';
import AppText from '@components/atoms/AppText';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Symptome } from '@store/types';
import moment from 'moment';


  type Props = {
    objet:Symptome;
  };

const BoxSymptome = ({ objet }: Props): ReactElement => {
    const onPressnath = (): void => {
        // Faire quelque chose lorsqu'on appuie sur la boîte
      };
      const dateString = objet.data ? objet.data[objet.data.length - 1].date : "(tr";
      const date = moment(dateString, 'DD/MM/YYYY');
      
      let formattedDate = objet.data ? date.locale('fr').format('dddd D MMMM') : "à Renseigner";
      // //let formattedDate;
      // const empty = (): boolean => { 
      //   let variable : boolean = true; 
      //   console.log("zizi");
      //   if (Array.isArray(objet.data) && objet.data.length > 0){
      //     variable = false;
      //     console.log("zizi DUR");
      //   }
      //  return variable;
      // }

      // // if(empty()){
      // //   formattedDate =  "à Renseigner";
      // // }
      // // else{
      // //   formattedDate =  date.locale('fr').format('dddd D MMMM');
      // // }
    
  
      return (
        <TouchableOpacity onPress={onPressnath} style={styles.namestyle}>
          <View>
            <AppText text={objet.name} style={styles.title} />
            <AppText text={formattedDate} style={styles.subtitle} />
          </View>
          <View style={styles.valuestyle}>
            {objet.data && objet.type ? (
              objet.type === "Oui/non éval" ? (
                <AppText text={objet.data[objet.data.length - 1].valeur.toString() + " /10"} />
              ) : (
                <AppText text={objet.data[objet.data.length - 1].valeur.toString() + " " + objet.unit} />
              )
            ) : null}
          </View>
        </TouchableOpacity>
      );
    
};

const styles = StyleSheet.create({
  namestyle: {
    justifyContent:'space-between',
    flexDirection: 'row',
    paddingLeft:50,
    paddingRight:50,
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
  