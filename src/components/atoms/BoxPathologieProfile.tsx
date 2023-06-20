import React, { ReactElement } from 'react';
import { ImageSourcePropType, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import DropDownMenu from '@components/molecules/DropDownMenu'



import fonts from '@styles/fonts';
import colors from '@styles/colors';
import layout from '@styles/layout';
import { Pathologie, Symptome } from '@store/types';
import { DATE_TODAY } from '@constants/constants';

type Props = {
  objet: Pathologie;
};



const BoxPathologieProfile = ({ objet }: Props): ReactElement => {
    //const genererPictogrammePathologie=fonction qui permet de choper si la date d'aujourdh'ui est renseigné en valeur ou pas 
    const genererPictogrammePathologie=(pathologie: Pathologie) => {
      var isRempli: Boolean =true;
      pathologie.symptoms.forEach(symptome => {
        if (Array.isArray(symptome.data) && symptome.data.length > 0){
          if (!(isRempli&&(symptome.data[symptome.data.length - 1]?.date?.localeCompare(DATE_TODAY)))) {
            isRempli=false;
            console.log("La derniere valeur  pas aujourd'hui");
            console.log(symptome.data[symptome.data.length - 1]);
          }
          
          else {
            isRempli=true;
            console.log("La derniere valeur  aujourd'hui");
            console.log(symptome.data[symptome.data.length - 1]);
  
          }
        }
        else {
          console.log("Tableau : "+symptome.data+" vide");
  
          isRempli=false;
  
        }
        
      });
      return isRempli;
  
    }
  
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
  return(
    <View style={styles.pathologieContainer}>
      {objet.namelogo ? <Image style={{ width: 40, height: 40 }} source={getIconPath(objet.namelogo)} /> : <Image style={{ width: 40, height: 40 }} source={getIconPath("")} />}
        <AppText text={objet.name} style={styles.text} />
        {genererPictogrammePathologie(objet)?(
          <View style={styles.couleurVert} />
        ) : (
          <View style={styles.couleurRouge} />
        )}
    </View>

  );
};

export default BoxPathologieProfile;

const styles = StyleSheet.create({
  couleurVert:{
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: colors.green
  },
  couleurRouge:{
    width: 25,
    height: 25,
    borderRadius: 25,
    backgroundColor: colors.orange
  },
  text: {
    marginLeft: 25,
    lineHeight: fonts.subtitle.fontSize + 3,
    textAlign: 'center',
  },
  pathologieContainer: {
    padding: 10,
    marginBottom: 10,
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor:colors.greyLight,
    borderRadius: 20,
  },
});
