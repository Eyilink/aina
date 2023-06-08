import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import AppText from '@components/atoms/AppText';
import { FontAwesome5 } from '@expo/vector-icons'; 
import colors from '@styles/colors';


type Symptome = {
    id: number;
    name: string;
    type: string;
  }
type Props = {
    objets: Symptome[];
    onPress?: () => void;
  };


const ListSymptome = ({objets, onPress}: Props): ReactElement => {
  
    return(
    <View style={styles.content}>
      <View style={styles.Symptome}>
      {
        objets.map((object, index) => {    
              return (<AppText text={" - " + object.name} key={index}/>);      
          })
      }
      </View>
    <FontAwesome5 name="edit" size={24} color="black" onPress={onPress}/>
    </View>
          
    );
  };

  const styles = {
    content: {
        padding: 10,
        marginBottom: 10,
        flexDirection:'row',
        backgroundColor:colors.greyLight,
        borderRadius: 20,
        alignItems: 'center', // Pour centrer horizontalement
        justifyContent: 'center', // Pour centrer verticalement
        
    },
    Symptome: {
      flexDirection:'column',
      textAlign: 'left',
      marginRight: 15,
    },
    icon: {
      
    },
  }
  
  export default ListSymptome;