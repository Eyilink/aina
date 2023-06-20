import React, { ReactElement } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { View } from 'react-native';
import AppText from '@components/atoms/AppText';
import { FontAwesome5 } from '@expo/vector-icons'; 
import colors from '@styles/colors';
import { Symptome } from '@store/types';

type Props = {
    objets: Symptome[];
    onPress?: () => void;
  };

// The ListSymptome function is a reusable component that renders a list of symptoms.
// It takes objets as a prop, which is an array of symptom objects to be displayed.
// Each symptom is rendered as an AppText component with a bullet point ("-") preceding the symptom name.
// The onPress prop allows for customization of an event when the edit icon is pressed.
// The function provides a visually appealing and interactive way to display a list of symptoms.
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