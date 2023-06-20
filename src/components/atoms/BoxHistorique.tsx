import React, { ReactElement } from 'react';
import { StyleSheet, TouchableOpacity, Image, ImageSourcePropType} from 'react-native';
import { View } from 'react-native';
import AppText from '@components/atoms/AppText';
import colors from '@styles/colors';
import { Pathologie } from '@store/types';

type Props = {
  objet: Pathologie;
  onPress?: () => void;
  isWhite?: boolean;
};

const getIconPath = (iconName: string): ImageSourcePropType => {
  switch (iconName) {
    case 'avq.png':
      return require('@assets/images/avq.png');
    case 'barthel.png':
      return require('@assets/images/barthel.png');
    case 'braden.png':
      return require('@assets/images/braden.png');
    case 'clinimetre.png':
      return require('@assets/images/clinimetre.png');
    case 'coeur.png':
      return require('@assets/images/coeur.png');
    case 'colonne.png':
      return require('@assets/images/colonne.png');
    case 'covid.png' :
      return require('@assets/images/covid.png');
    case 'dentaire.png' :
      return require('@assets/images/dentaire.png');
    case 'genou.png' :
      return require('@assets/images/genou.png');
    case 'grippe.png' :
      return require('@assets/images/grippe.png');
    case 'grossesse.png' :
      return require('@assets/images/grossesse.png');
    case 'insh.png' :
      return require('@assets/images/insh.png');
    case 'mif.png' :
      return require('@assets/images/mif.png');
    case 'orl.png' :
      return require('@assets/images/orl.png');
    case 'peau.png' :
      return require('@assets/images/peau.png');
    case 'poumon.png' :
      return require('@assets/images/poumon.png');
    case 'yeux.png' :
      return require('@assets/images/yeux.png');
    default:
      return require('@assets/images/6_i.png'); // Provide a default image path
  }
};




const BoxPathologie = ({ objet, onPress, isWhite }: Props): ReactElement => {
  return (
    <View style={isWhite ? { backgroundColor: colors.white } : null}>
      <TouchableOpacity onPress={onPress} style={[
        styles.container,
        isWhite ? { backgroundColor: colors.white } : { backgroundColor: colors.greyLight }
      ]}>
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
    </View>
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
    borderRadius: 20,
  },
  content:{
    marginLeft:20,
  }
});

  
