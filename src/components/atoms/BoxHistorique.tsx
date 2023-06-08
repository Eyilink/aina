import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import colors from '@styles/colors';
import { Pathologie } from '@store/types';

type Props = {
  objet: Pathologie;
  onPress?: () => void;
};


const BoxPathologie = ({ objet, onPress }: Props): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} style = {styles.container}>
      {objet.namelogo ? <AntDesign name={objet.namelogo} size={50} color="black" /> : null}
      <View style = {styles.content}>
        <AppText text={objet.name} style={styles.title} />
        {objet.more ? <AppText text={objet.more} style={styles.subtitle} /> : null}
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

  
