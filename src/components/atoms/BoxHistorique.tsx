import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import { View } from 'react-native';
import AppText from '@components/atoms/AppText';
import colors from '@styles/colors';
import { Pathologie } from '@store/types';

type Props = {
  objet: Pathologie;
  onPress?: () => void;
};

const getIconPath = (iconName: string): ImageSourcePropType => {
  switch (iconName) {
    case '1_i.png':
      return require('@assets/images/1_i.png');
    case '2_i.png':
      return require('@assets/images/2_i.png');
    case '3_i.png':
      return require('@assets/images/3_i.png');
    case '4_i.png':
      return require('@assets/images/4_i.png');
    case '5_i.png':
      return require('@assets/images/5_i.png');
    case '6_i.png':
      return require('@assets/images/6_i.png');
    default:
      return require('@assets/images/6_i.png'); // Provide a default image path
  }
};



const BoxPathologie = ({ objet, onPress }: Props): ReactElement => {
  return (
    <TouchableOpacity onPress={onPress} style = {styles.container}>
      {objet.namelogo ? <Image style={{ width: 40, height: 40 }} source={getIconPath(objet.namelogo)} /> : <Image style={{ width: 40, height: 40 }} source={getIconPath("")} />}
      <View style = {styles.content}>
        <AppText text={objet.name} style={styles.title} />
        {objet.more ? <AppText text={objet.more} style={styles.subtitle} /> : null}
        {objet.date ?
          objet.dateend ? 
            <AppText text= {"Du " + objet.date + " au " + objet.dateend } style={styles.text} /> 
            :
            <AppText text= {"Depuis le " + objet.date} style={styles.text} />
         :
          null}
        
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

  
