import React, { ReactElement } from 'react';
import { View } from 'react-native';
import AppText from '@components/atoms/AppText';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';

type Symptome = {
    nom: string,
    frequence: string,
    valeur:number,
    unite:string,
  };

  type Props = {
    objet:Symptome;
  };

const BoxSymptome = ({ objet }: Props): ReactElement => {
    const onPressnath = (): void => {
        // Faire quelque chose lorsqu'on appuie sur la boîte
      };
    
  
    return (
        <TouchableOpacity onPress={onPressnath} style={styles.namestyle}>
            <View>
                <AppText text={objet.nom} style={styles.title}/>
                <AppText text={objet.frequence} style={styles.subtitle}/>
            </View>
            <View style={styles.valuestyle}>
                <AppText text={objet.valeur.toString() + " "+ objet.unite}/> 
            </View>        
            
        </TouchableOpacity>
      );
    
};

const styles = StyleSheet.create({
  namestyle: {
    justifyContent:'space-around',
    flexDirection: 'row',
    //marginTop:20,

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
  