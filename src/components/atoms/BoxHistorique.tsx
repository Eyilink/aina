import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AppText from '@components/atoms/AppText';
import DropDownMenu from '@components/molecules/DropDownMenu'
import fonts from '@styles/fonts';
import colors from '@styles/colors';
import layout from '@styles/layout';

type Symptome = {
    nom: string
  }
  
  type Pathologie = {
    nom: string;
    date: string;
    more: string;
    namelogo: string;
  }

type Props = {
    objet: Pathologie;
    objets?: Symptome[]|Pathologie[];
    ischeckeable ?: boolean;
    onPress: () => void;
  };


    const BoxPathologie = ({ objet, onPress }: Props): ReactElement => {
        const onPressnath = (): void => {
            // Faire quelque chose lorsqu'on appuie sur la boîte
          };
        
          return (
            <TouchableOpacity onPress={onPress} style = {styles.container}>
                             
                <AntDesign name={objet.namelogo} size={50} color="black" />
                <View style = {styles.content}>
                    <AppText text={objet.nom} style={styles.title} />
                    <AppText text={objet.more} style={styles.subtitle} />
                    <AppText text= {"Depuis le " + objet.date} style={styles.text} />
                
              </View>
            </TouchableOpacity>
          );
        };
        
        const styles = {
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
           

            //marginRight:15,
            //alignItems: 'center',
    
          },
          content:{
            //textAlign: 'right',
            marginLeft:20,
            //justifyContent: 'center',

          }
};
  
  export default BoxPathologie;

  const stylestfhfg = StyleSheet.create({
    subtitle: {
      fontSize: fonts.subtitle.fontSize,
      color: colors.black,
      marginBottom: layout.padding,
      lineHeight: fonts.subtitle.fontSize + 3,
      marginHorizontal: layout.padding
    }, 
    button: {
      borderRadius: layout.buttons.borderRadius,
      marginHorizontal: layout.padding,
    },
    textClick: {
      marginLeft: 3,
      textAlign: 'center',
    },
    text: {
      marginLeft: 25,
      lineHeight: fonts.subtitle.fontSize + 3,
      textAlign: 'center',
    },
    
  });
  
