import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import colors from '@styles/colors';

type Symptome = {
    nom: string,
    date: string,
    valeur:number,
  }
  
  type Pathologie = {
    nom: string;
    date?: string;
    more: string;
    namelogo: string;
    symp: Symptome[];
  }

type Props = {
  objet: Pathologie;
  onPress?: () => void;
};


const BoxPathologie = ({ objet, onPress }: Props): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} style = {styles.container}>
      <AntDesign name={objet.namelogo} size={50} color="black" />
      <View style = {styles.content}>
        <AppText text={objet.nom} style={styles.title} />
        <AppText text={objet.more} style={styles.subtitle} />
        {objet.date ? <AppText text= {"Depuis le " + objet.date} style={styles.text} />:null}
        
      </View>
    </TouchableOpacity>
  );
};

export default BoxPathologie;
    
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold' as 'bold',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  text: {
    fontSize: 14,
  },
  container: {
    padding: 10,
    marginBottom: 10,
    flexDirection:'row',
    backgroundColor:colors.greyLight,
    borderRadius: 20,
  },
  content:{
    marginLeft:20,
  }
});

  
