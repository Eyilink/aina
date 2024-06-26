import React, { ReactElement, useEffect, useState } from 'react';
import { ImageSourcePropType, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import DropDownMenu from '@components/molecules/DropDownMenu'



import fonts from '@styles/fonts';
import colors from '@styles/colors';
import layout from '@styles/layout';
import { Pathologie, Symptome } from '@store/types';
import { DATE_TODAY, getIconPath } from '@constants/constants';

type Props = {
  objet: Pathologie;
};



const BoxPathologieProfile = ({ objet }: Props): ReactElement => {
  const [refresh, setRefresh] = useState<boolean>(false); // State variable for refreshing

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('bonjour');
      setRefresh((prevState: boolean) => !prevState); // Update the state variable to trigger refresh
    }, 1000); // 1000 milliseconds = 1 second

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  
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
