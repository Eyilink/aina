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

      };
      const dateString = objet.data ? objet.data[objet.data.length - 1].date : "(tr";
      const date = moment(dateString, 'DD/MM/YYYY');
      const formattedDate = objet.data ? date.locale('fr').format('dddd D MMMM') : "à Renseigner";
    
  
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
// The BoxSymptome function represents a reusable component that displays symptom information.
// It creates a box-like structure with a TouchableOpacity component, allowing users to interact with the symptom box.
// The onPressnath function can be customized to perform specific actions or handle events related to the symptom.
// Inside the box, the function shows the symptom's name using the AppText component as a clear and visually appealing title.
// If available, it retrieves the most recent date from the symptom data array and formats it in French locale using moment.js.
// The formatted date is displayed as a subtitle if objet.frequence exists.
// The function also displays the latest value recorded for the symptom, along with its corresponding type.
// If the type is "num" (indicating a numerical rating), the value is displayed with "/10" appended to it.
// This component provides an interactive and informative representation of a symptom.

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
  